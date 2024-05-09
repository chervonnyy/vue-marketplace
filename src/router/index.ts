import { createRouter, createWebHistory } from 'vue-router'
import ProductsListView from '@/views/ProductsListView.vue'
import ProductView from '@/views/ProductView.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ProductsListView
    },
    {
      path: '/products/:id',
      component: ProductView
    },
    {
      path: '/checkout',
      component: CheckoutView
    },
  ]
})

export default router
