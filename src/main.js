
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../src/store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import 'babel-polyfill'
import Print from 'vue-print-nb'
import axios from 'axios'
Vue.use(Print)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
