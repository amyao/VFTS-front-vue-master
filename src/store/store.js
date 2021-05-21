// store.js 中都mutation中增加添加和删除token的方法
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = { // 全局管理的数据存储
  isLogin: '0',
  uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid'): ''
}

export default new Vuex.Store({
  state,
  getters: { // 监听数据变化的
    getStorage (state) { // 获取本地存储的登录信息
      if (!state.uuid) {
        state.uuid = JSON.parse(localStorage.getItem('uuid'))
      }
      return state.uuid
    }
  },
  mutations: {
    $_setToken (state, uuid) { // 设置存储登陆账户的uuid
      state.uuid = uuid
      localStorage.setItem('uuid', JSON.stringify(uuid))
    },
    $_removeStorage (state, value) { // 账户退出登录时删除uuid
      localStorage.removeItem('uuid')
    }
  }
})
