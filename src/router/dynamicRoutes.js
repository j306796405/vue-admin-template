import Layout from '@/layout'

/**
 * @type NAVBAR: 左侧菜单， BUTTON: 权限按钮， LINK: 链接
 * */
export default [
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: 'dashboard', icon: 'dashboard', name: 'dashboard', type: 'NAVBAR' },
    children: [{
      path: 'index',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard-index', name: 'dashboard-index', icon: 'dashboard', type: 'NAVBAR' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    meta: { title: 'example', icon: 'example', name: 'example', type: 'NAVBAR' },
    children: [
      {
        path: 'table',
        component: () => import('@/views/table/index'),
        meta: { title: 'example-table', name: 'example-table', icon: 'table', type: 'NAVBAR' }
      },
      {
        path: 'tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'example-tree', name: 'example-tree', icon: 'tree', type: 'NAVBAR' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    meta: { title: 'form', name: 'form', type: 'NAVBAR' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/form/index'),
        meta: { title: 'form-index', name: 'form-index', icon: 'form', type: 'NAVBAR' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    meta: {
      title: 'nested',
      name: 'nested',
      icon: 'nested',
      type: 'NAVBAR'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        meta: { title: 'nested-menu1', name: 'nested-menu1', type: 'NAVBAR' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            meta: { title: 'menu1-1', name: 'nested-menu1-menu1-1', type: 'NAVBAR' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            meta: { title: 'menu1-2', name: 'nested-menu1-menu1-2', type: 'NAVBAR' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                meta: { title: 'menu1-2-1', name: 'nested-menu1-menu1-2-menu1-2-1', type: 'NAVBAR' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                meta: { title: 'menu1-2-2', name: 'nested-menu1-menu1-2-menu1-2-2', type: 'NAVBAR' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            meta: { title: 'menu1-3', name: 'nested-menu1-menu1-3', type: 'NAVBAR' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'nested-menu2', name: 'nested-menu2' }
      }
    ]
  },

  {
    path: 'externalLink',
    component: Layout,
    meta: { title: 'External Link', icon: 'link', name: 'externalLink' },
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'externalLink-A', icon: 'link', name: 'externalLink-A' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
