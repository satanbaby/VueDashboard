import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'

import Product from './views/Product.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    // {
    //   // 一般建議用name來管理路由
    //   // 這樣不論是 path 和 component 更換
    //   // 都不會出錯
    //   path: '/',
    //   name: 'home',
    //   component: Dashboard,
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'product',
          name: 'Product',
          component: Product,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
