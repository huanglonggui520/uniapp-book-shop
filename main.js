import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import store from './store'
import {router,RouterMount} from './router/router.js'  //路径换成自己的
Vue.use(router)

// @import './static/iconfont/'
import './static/iconfont/font_3597033_9p7cjz1kcc8/iconfont.css'
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store,
	// router:router
})
RouterMount(app,router,'#app')
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对
Vue.use(httpInterceptor, app)
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif