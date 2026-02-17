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
    {
      path: '/createSheet',
      name: 'CreateSheet',
      component: () => import('@/pages/CreateSheet/CreateSheetPage.vue'),
    },
    {
      path: '/userConfig',
      name: 'UserConfig',
      component: () => import('@/pages/UsersPage/Users.vue'),
    },
    {
      path: '/mySheets',
      name: 'MySheets',
      component: () => import('@/pages/MySheetsPage/MySheets.vue'),
    },
  ],
})

export default router
