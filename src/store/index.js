import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
  },
  getters: {
    isLogin (state) {
      return state.isLogin
    },
  },
  mutations: {
    toLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {
  },
  modules: {
  }
})
