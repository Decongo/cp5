import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Weeks from './views/Weeks.vue'
import Months from './views/Months.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/weeks',
      name: 'weeks',
      component: Weeks
    },
    {
      path: '/months',
      name: 'months',
      component: Months
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
