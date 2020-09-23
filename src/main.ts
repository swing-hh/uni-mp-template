import Vue from 'vue'
import App from './App.vue'
import Req from './utils/req'
import Api from './utils/api'

Vue.config.productionTip = false

Vue.prototype.$req = Req
Vue.prototype.$api = Api

new App().$mount()
