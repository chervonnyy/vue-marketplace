<script setup lang="ts">
import { computed } from 'vue';
import MyButton from './components/MyButton.vue';
import { useCheckoutStore } from './store';

const store = useCheckoutStore();
const checkoutProductsLength = computed(() => store.checkoutProducts.length);
</script>

<template>
  <header class="p-8 text-white bg-indigo-600">
    <div class="max-w-[1200px] w-full mx-auto flex justify-between items-center">
      <RouterLink to="/">
        <h1 class="text-3xl">Ecwid Marketplace</h1>
      </RouterLink>
      <RouterLink to="/checkout">
        <my-button>
          Корзина
          <div
            class="flex items-center justify-center h-5 w-5 text-xs rounded-full bg-indigo-600 text-white"
            v-if="checkoutProductsLength"
          >
            {{ checkoutProductsLength }}
          </div>
        </my-button>
      </RouterLink>
    </div>
  </header>

  <main class="max-w-[1200px] mx-auto w-full">
    <RouterView />
  </main>
</template>
