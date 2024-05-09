<script setup lant="ts">
import { computed } from 'vue';
import { useCheckoutStore } from '../store';
import ProductPreview from '../components/ProductPreview.vue';
import MyButton from '../components/MyButton.vue';

const store = useCheckoutStore();
const checkoutProducts = computed(() => store.checkoutProducts);

const confirmPayment = () => {
  alert('Покупка успешно оформлена!');
};
</script>

<template>
  <div class="p-2 md:p-8 bg-gray-50 rounded-md mt-8 space-y-8">
    <h3 v-if="!checkoutProducts.length" class="text-xl text-center">
      <div>Корзина пуста</div>
      <router-link class="underline" to="/">Вернуться на главную</router-link>
    </h3>
    <div v-else class="flex flex-col gap-4">
      <h2 class="text-3xl text-center">Корзина</h2>
      <product-preview v-for="product in checkoutProducts" :product="product" :key="product.id" />
      <my-button @click="confirmPayment" class="justify-self-end">Перейти к опалте</my-button>
    </div>
  </div>
</template>
