import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

/* Router Modules */
import userRouter from './modules/user'

Vue.use(Router)

/* constant Router Map */
export const constantRouterMap = [
  userRouter,
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '*',
    name: 'error',
    meta: {
      title: '页面不存在'
    },
    component: () => import('@/views/error/404')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)

  if (to.matched.some(record => record.meta.requireAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
