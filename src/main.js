import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from './plugins/firebase'


Vue.config.productionTip = false
Vue.prototype.$auth = firebase.auth()
Vue.prototype.$db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
