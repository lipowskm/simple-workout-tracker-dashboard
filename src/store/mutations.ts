import { IUserProfile } from '@/interfaces'
import { State } from './state'
import { getStoreAccessors } from 'typesafe-vuex'

export const mutations = {
  setToken(state: State, payload: string) {
    state.token = payload
  },
  setLoggedIn(state: State, payload: boolean) {
    state.isLoggedIn = payload
  },
  setUserProfile(state: State, payload: IUserProfile) {
    state.userProfile = payload
  }
}

const { commit } = getStoreAccessors<any, State>('')

export const commitSetLoggedIn = commit(mutations.setLoggedIn)
export const commitSetToken = commit(mutations.setToken)
export const commitSetUserProfile = commit(mutations.setUserProfile)
