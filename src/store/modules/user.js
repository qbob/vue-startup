import * as types from '../types'
import { getToken, setToken, removeToken } from '@/utils/auth'
import user from '@/api/user'

// initial state
const state = {
  token: getToken()
}
// getters
const getters = {}
// actions
const actions = {
  handleLogin ({ commit }) {
    return new Promise((resolve, reject) => {
      user.login().then((res) => {
        console.log('login res', res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
// mutations
const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
    setToken(token)
  },
  [types.USER_LOGOUT] (state) {
    state.token = null
    removeToken()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
