import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from '@/store/mutations'
import { State } from '@/store/state'
import { getters } from '@/store/getters'
import { actions } from '@/store/actions'

Vue.use(Vuex)

const defaultState: State = {
  isLoggedIn: null,
  token: '',
  userProfile: null
}

export default new Vuex.Store({
  state: defaultState,
  mutations: mutations,
  actions: actions,
  getters: getters
})
