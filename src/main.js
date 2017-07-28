import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import "./js/rem"  // 引入rem
import AwesomeSwiper from 'vue-awesome-swiper'
import BScroll from 'better-scroll'

window.axios = Axios
window.BScroll = BScroll
Vue.config.productionTip = false
Vue.use(AwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
