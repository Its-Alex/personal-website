import Vue from 'vue'
import Router from 'vue-router'
import Profil from './views/Profil.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Profil
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
