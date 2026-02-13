import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/main',
      name: 'MainLayout',
      component: () => import('@/pages/MainLayoutPage/MainLayout.vue'),
    },
    {
      path: '/downloads',
      name: 'Download',
      component: () => import('@/pages/Downloads/DownloadPage.vue'),
    },
  ],
})

export default router
