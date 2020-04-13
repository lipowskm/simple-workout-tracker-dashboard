import { State } from './state'
import { getStoreAccessors } from 'typesafe-vuex'

export const getters = {
  hasAdminAccess: (state: State) => {
    return (
      state.userProfile &&
      state.userProfile.is_superuser && state.userProfile.is_active)
  },
  userProfile: (state: State) => state.userProfile,
  token: (state: State) => state.token,
  isLoggedIn: (state: State) => state.isLoggedIn,
  loginError: (state: State) => state.loginError
}

const { read } = getStoreAccessors<any, State>('')

export const readHasAdminAccess = read(getters.hasAdminAccess)
export const readIsLoggedIn = read(getters.isLoggedIn)
export const readLoginError = read(getters.loginError)
export const readToken = read(getters.token)
export const readUserProfile = read(getters.userProfile)
