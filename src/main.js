// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './../static/iconfont/iconfont.css'
import TheHead from './components/theHead'
import TheBreadcrumb from './components/thebreadcrumb'
import TheColinput from './components/thecolinput'
import echarts from 'echarts'
import config from './api/config'
import fetch from './api/axios'

import $ from 'jquery'
import 'babel-polyfill'

//引入公共的css
import '../static/css/total.css'
console.log(11151542)
import { buttonObj , promptInfoObj } from '@/init/public';
import { downLoad } from '@/api/https';
buttonObj(Vue);
promptInfoObj(Vue);


// import 'babel-polyfill'
// 引入BUS中间件
import VueBus from './api/bus.js'
Vue.use(VueBus)
Vue.prototype.baseUrl = fetch.baseUrl;//图片拼接路径
Vue.prototype.downLoad = downLoad;//图片下载
Vue.prototype.$config = config;
Vue.prototype.$echarts = echarts;
Vue.prototype.$jq = $;
Vue.component("TheHead",TheHead);
Vue.component("TheBreadcrumb",TheBreadcrumb);
Vue.component("TheColinput",TheColinput);
Vue.config.productionTip = false
Vue.use(ElementUi)

import {getRouters} from './api/addRouter'
let menuList = JSON.parse(sessionStorage.getItem('menuList'))
if (menuList){
  // 这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次,sessionStorage.handlerResh是与请求刷新区别开来
  sessionStorage.setItem('_firstNvb_remove','no')
  // if(!sessionStorage.handlerResh) getRouters(menuList)
  getRouters(menuList)
}else{
  router.push('/logins/login');
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})