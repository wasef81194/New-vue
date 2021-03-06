import Vue from 'vue'
import router from './core/router'

import App from './App.vue'
import './style/main.css'

new Vue({
  router,
  render: (createElement) => {
    return createElement(App)
  }
}).$mount('#news')

console.log(process.env.API_TOKEN)
