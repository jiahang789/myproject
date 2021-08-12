import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 从session中获取token，没有则为空
    Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : ''
  },
  mutations: {
    // 修改token(该消息来自登录页面）
    changeToken (state, token) {
      state.Authorization = token
      sessionStorage.setItem('Authorization', token)
    }
  }

})
export default store
