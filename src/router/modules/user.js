
const userRouter = {
  path: '/user',
  name: 'user',
  meta: {
    title: '用户中心',
    requireAuth: true
  },
  component: () => import('@/views/user/index'),
  children: [

  ]
}

export default userRouter
