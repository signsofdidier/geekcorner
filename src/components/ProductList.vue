<template>
  <div>
    <h1>Producten</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <p>{{ product.name }}</p>
        <button @click="goToDetails(product.id)">Meer info</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useProductStore } from '../stores/ProductStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const productStore = useProductStore();
    const router = useRouter();

    productStore.fetchProducts(); // Haal data op bij componentload

    const goToDetails = (id) => {
      router.push(`/product/${id}`); // Verwijs naar de geneste route
    };

    return {
      products: productStore.products,
      goToDetails,
    };
  },
};
</script>
