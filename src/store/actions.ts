import { getLocalToken, removeLocalToken, saveLocalToken } from '@/token-utils'
import { commitLoginError, commitSetLoggedIn, commitSetToken, commitSetUserProfile } from '@/store/mutations'
import { State } from '@/store/state'
import { api } from '@/api'
import { ActionContext } from 'vuex'
import router from '@/router'
import { AxiosError } from 'axios'
import { getStoreAccessors } from 'typesafe-vuex'

type MainContext = ActionContext<any, State>;

export const actions = {
  async actionLogIn(context: MainContext, payload: { username: string; password: string }) {
    try {
      const response = await api.logInGetToken(payload.username, payload.password)
      const token = response.data.access_token
      if (token) {
        saveLocalToken(token)
        commitSetToken(context, token)
        commitSetLoggedIn(context, true)
        commitLoginError(context, '')
        await dispatchSetUserProfile(context)
        await dispatchRouteLoggedIn(context)
        return true
      } else {
        await dispatchLogOut(context)
        return false
      }
    } catch (error) {
      await dispatchLogOut(context)
      if (error.response) {
        commitLoginError(context, error.response.data.detail)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      return false
    }
  },
  async actionRegister(context: MainContext, payload: {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  }) {
    try {
      const response = await api.registerAccount(
        payload.username,
        payload.password,
        payload.email,
        payload.firstName,
        payload.lastName)
      let msg: string = response.data.msg
      if (!msg) {
        msg = 'New account email sent, check your inbox to verify your account'
        return { message: msg, success: true }
      }
      return { message: msg, success: true }
    } catch (error) {
      await dispatchLogOut(context)
      if (error.response) {
        return { message: error.response.data.detail, success: false }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      return { message: 'Something went wrong, please try again', success: false }
    }
  },
  async actionSetUserProfile(context: MainContext) {
    try {
      const response = await api.getMe(context.state.token)
      if (response.data) {
        commitSetUserProfile(context, response.data)
      }
    } catch (error) {
      await dispatchCheckApiError(context, error)
    }
  },
  async actionCheckLoggedIn(context: MainContext) {
    if (!context.state.isLoggedIn) {
      let token = context.state.token
      if (!token) {
        const localToken = getLocalToken()
        if (localToken) {
          commitSetToken(context, localToken)
          token = localToken
        }
      }
      if (token) {
        try {
          const response = await api.getMe(token)
          commitSetLoggedIn(context, true)
          commitSetUserProfile(context, response.data)
        } catch (error) {
          await dispatchRemoveLogIn(context)
        }
      } else {
        await dispatchRemoveLogIn(context)
      }
    }
  },
  async actionRemoveLogIn(context: MainContext) {
    removeLocalToken()
    commitSetToken(context, '')
    commitSetLoggedIn(context, false)
  },
  async actionLogOut(context: MainContext) {
    await dispatchRemoveLogIn(context)
    await dispatchRouteLogOut(context)
  },
  async actionCheckApiError(context: MainContext, payload: AxiosError) {
    if (payload.response!.status === 401) {
      await dispatchLogOut(context)
    }
  },
  actionRouteLoggedIn() {
    if (router.currentRoute.path === '/login' || router.currentRoute.path === '/') {
      router.push('/dashboard')
    }
  },
  actionRouteLogOut() {
    if (router.currentRoute.path !== '/login') {
      router.push('/login')
    }
  }
}

const { dispatch } = getStoreAccessors<any, State>('')

export const dispatchCheckApiError = dispatch(actions.actionCheckApiError)
export const dispatchCheckLoggedIn = dispatch(actions.actionCheckLoggedIn)
export const dispatchSetUserProfile = dispatch(actions.actionSetUserProfile)
export const dispatchLogIn = dispatch(actions.actionLogIn)
export const dispatchLogOut = dispatch(actions.actionLogOut)
export const dispatchRegister = dispatch(actions.actionRegister)
export const dispatchRemoveLogIn = dispatch(actions.actionRemoveLogIn)
export const dispatchRouteLoggedIn = dispatch(actions.actionRouteLoggedIn)
export const dispatchRouteLogOut = dispatch(actions.actionRouteLogOut)
