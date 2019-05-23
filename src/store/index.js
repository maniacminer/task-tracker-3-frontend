import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth'
import Nav from './navigation'
import Db from './db'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth, Nav, Db
  }
})
