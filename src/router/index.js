import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import userRouter from './modules/user'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    userRouter
  ]
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
