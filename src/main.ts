import Vue from 'vue';
import App from './App.vue';
import Share from '@/mixins/share.js';

Vue.config.productionTip = false;
Vue.mixin(Share);

new App().$mount();
