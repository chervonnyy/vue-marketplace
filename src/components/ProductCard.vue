<script setup="" lang="ts">
import { computed } from 'vue';
import { useCheckoutStore } from '../store';
import { Product } from '../types/product';
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
    <div class="w-[260px] bg-indigo-50 border border-indigo-100 rounded-md overflow-hidden">
      <div class="">
        <img :src="product.thumbnailUrl" alt="product image" class="h-full object-cover" />
      </div>
      <div class="flex flex-col justify-between p-4">
        <div class="mb-4">
          <div>
            {{ product.name }}
          </div>
          <div class="text-xl font-bold">
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
