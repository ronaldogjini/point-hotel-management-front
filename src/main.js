import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import "vuetify/dist/vuetify.min.css";
import VueRouter from 'vue-router';
import router from "./router";
import store from './store'
import api from './api.js';

Vue.prototype.$http = api

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  VueRouter,
  store,
  render: h => h(App),
}).$mount('#app')
