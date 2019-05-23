import Vue from 'vue'
import store from '@/store'
import '@/plugins/vuetify'
import App from '@/App.vue'
import router from '@/router'
import firebase from '@/plugins/firebase'


Vue.config.productionTip = false
store.dispatch('bindAuth', firebase.auth())
store.dispatch('bindDb', firebase.firestore())

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
