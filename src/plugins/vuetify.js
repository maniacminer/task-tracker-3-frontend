import Vue from "vue"
import Vuetify from "vuetify/lib"
import "vuetify/src/stylus/app.styl"

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    // primary: '#eeeeee', // grey lighten-3
    // primaryText: '#eeeeee', // grey lighten-3
    secondary: "#F5F5F5",
    // accent: '#8c9eff',
    error: "#EF5350"
  }
})
