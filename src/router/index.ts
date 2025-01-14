import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    redirect: '/product/upload',
    children: [
      {
        path: '/product/upload',
        name: 'ProductUpload',
        component: () => import('../views/product/ProductUpload.vue'),
        meta: { title: '商品信息录入' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
