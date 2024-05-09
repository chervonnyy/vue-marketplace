<script setup lang="ts">
import { computed, Ref, watch } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '../hooks/useFetch';
import ProductCard from '../components/ProductCard.vue';
import MyButton from '../components/MyButton.vue';

const { data: products } = useFetch({ endpoint: 'products' });
const { data: categories } = useFetch({ endpoint: 'categories' });

const router = useRouter();
const selectedCategory: Ref<string | null> = ref(
  (router.currentRoute.value.query.category as string) || null
);

const handleCategorySelect = (id: string) => {
  router.push({ path: '/', query: id ? { category: id } : {} });
};

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value;
  return products.value.filter((product) =>
    product.categoryIds.includes(parseInt(selectedCategory.value))
  );
});

watch(router.currentRoute, (to) => {
  selectedCategory.value = (to.query.category as string) || null;
});
</script>

<template>
  <div
    class="min-h-[500px] flex items-center justify-center text-2xl"
    v-if="!products?.length || !categories.length"
  >
    Загрузка...
  </div>
  <div v-else class="p-4 space-y-4">
    <div class="flex gap-2 items-center">
      <my-button
        v-for="category in categories"
        v-bind:key="category.id"
        @click="() => handleCategorySelect(category.id)"
      >
        <div class="flex gap-2 items-center">
          <img :src="category.thumbnailUrl" class="w-8 h-8" />
          {{ category.name }}
        </div>
      </my-button>
      <button v-if="selectedCategory" @click="() => handleCategorySelect(null)" class="ml-2">
        Сбросить
      </button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit">
      <product-card
        v-for="product in filteredProducts"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
  </div>
</template>
