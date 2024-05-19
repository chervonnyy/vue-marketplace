<script setup lang="ts">
import MyButton from './MyButton.vue';
import { useCheckoutStore } from '../store';
import { type Product } from '../types/product';

const { product } = defineProps<{
  product: Product;
}>();

const store = useCheckoutStore();
</script>

<template>
  <router-link :to="`/products/${product.id}`">
    <div
      class="h-[160px] bg-indigo-50 border border-indigo-100 rounded-md flex gap-8 p-2 justify-between items-center pr-4"
    >
      <div class="flex gap-2 h-full">
        <div class="rounded-md overflow-hidden">
          <img :src="product.thumbnailUrl" alt="product image" class="h-full object-cover" />
        </div>
        <div class="flex flex-col justify-between p-4">
          <div class="mb-4">
            <div class="text-sm md:text-base">
              {{ product.name }}
            </div>
            <div class="text-base md:text-xl font-bold">
              {{ product.defaultDisplayedPriceFormatted }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <my-button @click.stop.prevent="() => store.updateCheckout(product)"> Удалить </my-button>
      </div>
    </div>
  </router-link>
</template>
