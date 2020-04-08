export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { name: 'login', title: 'login' },
    type: 'LINK'
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: { name: '404', title: '404' },
    type: 'LINK'
  },

  {
    path: '/',
    redirect: '/dashboard',
    type: 'LINK'
  }
]
