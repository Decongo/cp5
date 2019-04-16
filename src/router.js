import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Weeks from './views/Weeks.vue'
import Months from './views/Months.vue'

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
      name: 'week',
      component: Weeks
    },
    {
      path: '/months',
      name: 'months',
      component: Months
    }
  ]
})
