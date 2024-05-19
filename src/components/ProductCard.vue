<script setup="" lang="ts">
import { computed } from 'vue';
import { useCheckoutStore } from '../store';
import { type Product } from '../types/product';
import MyButton from './MyButton.vue';

const { product } = defineProps<{
  product: Product;
}>();

const store = useCheckoutStore();

const isInCart = computed(() =>
  store.checkoutProducts.find((item: Product) => item.id === product.id)
);
</script>

<template>
  <router-link :to="`/products/${product.id}`">
    <div
      class="w-[170px] md:w-[240px] bg-indigo-50 border border-indigo-100 rounded-md overflow-hidden"
    >
      <div class="">
        <img :src="product.thumbnailUrl" alt="product image" class="w-full object-cover" />
      </div>
      <div class="flex flex-col justify-between p-2 md:p-4 min-h-[140px] md:min-h-[180px]">
        <div class="mb-4">
          <div>
            {{ product.name }}
          </div>
          <div class="text-base md:text-xl font-bold">
            {{ product.defaultDisplayedPriceFormatted }}
          </div>
        </div>
        <my-button @click.stop.prevent="() => store.updateCheckout(product)">
          {{ isInCart ? 'Удалить из коризны' : 'Добавить в корзину' }}
        </my-button>
      </div>
    </div>
  </router-link>
</template>
