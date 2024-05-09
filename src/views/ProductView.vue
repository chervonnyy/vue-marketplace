<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '../hooks/useFetch';
import MyButton from '../components/MyButton.vue';
import { useCheckoutStore } from '../store';
import { Product } from '../types/product';

const route = useRoute();
const store = useCheckoutStore();

const { data: product } = useFetch({
  endpoint: `products/${route.params.id}`,
  single: true
});

const isInCart = computed(() =>
  // @ts-ignore
  store.checkoutProducts.find((item: Product) => item.id === product.value?.id)
);
</script>

<template>
  <div class="min-h-[500px] flex items-center justify-center text-2xl" v-if="!product">
    Загрузка...
  </div>
  <div v-else class="flex gap-8 p-4">
    <div class="rounded-md overflow-hidden">
      <picture>
        <source :srcset="product.thumbnailUrl" type="image/webp" />
        <img :src="product.thumbnailUrl" alt="product image" />
      </picture>
    </div>
    <div class="space-y-4 max-w-[500px]">
      <h1 class="text-xl lg:text-3xl font-bold">{{ product.name }}</h1>

      <div class="flex gap-4 items-center">
        <div class="text-lg lg:text-2xl font-bold">{{ product.price }} ₽</div>
        <my-button @click="() => store.updateCheckout(product)">
          {{ isInCart ? 'Удалить из коризны' : 'Добавить в корзину' }}
        </my-button>
      </div>
      <p class="text-gray-700" v-html="product.description"></p>
    </div>
  </div>
</template>
