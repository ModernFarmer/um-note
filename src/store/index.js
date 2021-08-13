import { createStore } from 'vuex'
import { data } from './mockData/data'

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
    toLogin (state, value) { // 模拟接口-登录登出
      state.commit('toLogin', value)
    },
    getCode1 () { // 模拟接口-获取code1数据
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data.code1)
        }, 200)
      })
    },
    getCode2 () { // 模拟接口-获取code2数据
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data.code2)
        }, 200)
      })
    },
    submit_code1 (state, value) { // 模拟接口-提交1
      const info = value.map(item => {
        return {
          language: item.language,
          code: item.code,
        }
      })
      data.code1 = info
    },
    submit_code2 (state, value) { // 模拟接口-提交2
      const info = value.map(item => {
        return {
          language: item.language,
          code: item.code,
        }
      })
      data.code2 = info
    },
  },
  modules: {}
})
