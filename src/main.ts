import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

// 在 Vue 使用插件
// https://vuejs.org/v2/guide/plugins.html
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
axios.defaults.withCredentials = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('需要驗證')
    const api = `${process.env.VUE_APP_Path}/api/user/check`
    axios.post(api)
      .then(response => {
        console.log(response.data)
        if (response.data.success) {
          next()
        } else {
          next({ name: 'Login' })
        }
      })
      .catch(err => console.log(err))
  }
  next()
})
