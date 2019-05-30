import Vue from "vue";
import store from "@/store";
import "@/plugins/vuetify";
import App from "@/App.vue";
import router from "@/router";
import firebase from "@/plugins/firebase";

import Document from "@/components/Document.vue";
import Journal from "@/components/Journal.vue";

Vue.config.productionTip = false;
store.dispatch("bindAuth", firebase.auth());
store.dispatch("bindDb", firebase.firestore());

Vue.component("app-doc", Document);
Vue.component("app-journal", Journal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
