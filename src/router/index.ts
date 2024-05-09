import { createRouter, createWebHistory } from 'vue-router'
import ProductsListView from '@/views/ProductsListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ProductsListView
    },
    {
      path: '/products/:id',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/checkout',
      component: () => import('../views/CheckoutView.vue')
    },
  ]
})

export default router
