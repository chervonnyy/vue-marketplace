import { defineStore } from "pinia"
import type { Product } from "./types/product";
import { ref } from "vue";

export const useCheckoutStore = defineStore('checkout', () => {

  // could be a custom hook with data converting and error handling
  const savedValue = localStorage.getItem('checkout');

  const checkoutProducts = ref<Product[]>(savedValue ? JSON.parse(savedValue) : []);

  function updateCheckout(product: Product) {
    if (checkoutProducts.value.find((p) => p.id === product.id)) {
      checkoutProducts.value = checkoutProducts.value.filter((p) => p.id !== product.id);
    } else {
      checkoutProducts.value = [...checkoutProducts.value, product];
    }

    localStorage.setItem('checkout', JSON.stringify(checkoutProducts.value));
  }

  return { checkoutProducts, updateCheckout }
});
