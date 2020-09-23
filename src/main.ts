import Vue from 'vue'
import App from './App.vue'
import Req from './utils/req'
import Api from './utils/api'
import BaseUrl from './config/baseUrl'

Vue.config.productionTip = false

Vue.prototype.$req = Req
Vue.prototype.$api = Api
Vue.prototype.$baseUrl = BaseUrl

new App().$mount()
