import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'start',
    component: () => import(/* webpackChunkName: "start" */ '@/views/Start.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
      }
    ]
  },
  {
    path: '/*', redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
