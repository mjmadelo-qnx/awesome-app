
const routes = [
  {
    path: '',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/login.vue') },
      { path: '/bmi', component: () => import('pages/bmi.vue') }
    ]
  },
  {
    path: '',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/admin/dashboard', component: () => import('pages/admin/dashboard.vue') },
      { path: '/admin/reports/:report_no', component: () => import('pages/admin/reports.vue') }   
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
