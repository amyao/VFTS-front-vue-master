// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getRequest, postRequest, postServerRequest} from './utils/api'
import * as math from 'mathjs'
import qs from 'qs'

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$math = math
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.postServerRequest = postServerRequest
Vue.prototype.$message = Message
Vue.prototype.$qs = qs

// 全局路由构造函数，判断是否登录和要跳转到页面，路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) { // 需要登录
    if (window.localStorage.uuid) {
      next()
    } else if (to.path !== '/login') {
      let uuid = window.localStorage.uuid
      if (uuid === 'null' || uuid === '' || uuid === undefined) {
        Message({
          message: '您还未登陆，请先登录！',
          type: 'warning'
        })
        next({path: '/login'})
      }
    } else {
      next()
    }
  } else { // 不需要登录
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
