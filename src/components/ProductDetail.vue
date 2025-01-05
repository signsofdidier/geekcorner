<!--ProductDetail.vue-->
<template>

  <HeroComponent/>

  <div class="container py-5">
    <div class="row">
      <!-- Product Images -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <img :src="product.image" class="card-img-top" alt="Product Image">
          <div class="card-body">
            <div class="row g-2">
              <div class="col-3">
                <img :src="product.image" class="img-thumbnail" alt="Thumbnail 1">
              </div>
              <div class="col-3">
                <img :src="product.image" class="img-thumbnail" alt="Thumbnail 2">
              </div>
              <div class="col-3">
                <img :src="product.image" class="img-thumbnail" alt="Thumbnail 3">
              </div>
              <div class="col-3">
                <img :src="product.image" class="img-thumbnail" alt="Thumbnail 4">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <h2 class="h3 mb-3">{{ product.title }}</h2>
        <div class="mb-3">
          <span class="h4 me-2">${{product.price}}</span>
          <span v-if="product.discount" class="text-muted text-decoration-line-through">${{ (product.price / (1 - product.discount / 100)).toFixed(2) }}</span>
          <span :class="product.discount > 0 ? 'd-inline-block' : 'd-none'" class="badge bg-danger ms-2">{{ product.discount }}% OFF</span>
        </div>

        <div class="mb-3">
          <div class="d-flex align-items-center">
            <div class="text-warning me-2">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
            </div>
            <span class="text-muted">(128 reviews)</span>
          </div>
        </div>

        <p class="mb-4">{{
             product.description
          }}</p>

        <!-- Color Selection -->
<!--        <div class="mb-4">
          <h6 class="mb-2">Color</h6>
          <div class="btn-group" role="group">
            <input type="radio" class="btn-check" name="color" id="silver" checked>
            <label class="btn btn-outline-secondary" for="silver">Silver</label>
            <input type="radio" class="btn-check" name="color" id="gold">
            <label class="btn btn-outline-secondary" for="gold">Gold</label>
            <input type="radio" class="btn-check" name="color" id="black">
            <label class="btn btn-outline-secondary" for="black">Black</label>
          </div>
        </div>-->

        <!-- Quantity -->
        <div class="mb-4">
          <div class="d-flex align-items-center">
            <label class="me-2">Quantity:</label>
            <select class="form-select w-auto">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>

        <!-- Actions -->
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button" @click="addToCart(product)">Add to Cart</button>
          <button @click="addToFavorite(product)" class="btn btn-outline-secondary" type="button">
            <i class="me-2" :class="productStore.favoriteProducts.find(fav => fav.id === product.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>Add to Wishlist
          </button>
        </div>

        <!-- Additional Info -->
        <div class="mt-4">
          <div class="d-flex align-items-center mb-2">
            <i class="bi bi-truck text-primary me-2"></i>
            <span>Free shipping on orders over ${{ productStore.freeShippingPrice }}</span>
          </div>
          <div class="d-flex align-items-center mb-2">
            <i class="bi bi-arrow-counterclockwise text-primary me-2"></i>
            <span>30-day return policy</span>
          </div>
          <div class="d-flex align-items-center">
            <i class="bi bi-shield-lock text-primary me-2"></i>
            <span>2-year warranty</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<!--<template>
  <div class="container" style="margin-top:100px">
    <h1>Product Detail</h1>
    <div v-if="product">
      <h2>{{ product.title }}</h2>
      <img :src="product.image" alt="Product Image" class="img-fluid">
      <p><strong>Category:</strong> {{ product.category }}</p>
      <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
      <p><strong>Description:</strong> {{ product.description }}</p>
      <button @click="addToCart(product)" class="btn btn-primary">Add to Cart</button>
    </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
  </div>
</template>-->

<script>
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { computed } from 'vue';
import HeroComponent from "@/components/HeroComponent.vue";

export default {
  name: 'ProductDetail',
  components: {HeroComponent},
  setup() {
    const route = useRoute();  // Toegang tot de routeparameters
    const productStore = useProductStore();  // Toegang tot de Pinia store

    // Verkrijg het product op basis van de routeparameter (ID)
    const product = computed(() => {
      return productStore.products.find(p => p.id === Number(route.params.id));
    });

    // Voeg een product toe aan het winkelwagentje
    const addToCart = (product) => {
      productStore.addToCart(product);
    };

    const addToFavorite = (product) => {
      const index = productStore.favoriteProducts.findIndex(fav => fav.id === product.id);
      if (index === -1) {
        productStore.favoriteProducts.push(product);
      } else {
        productStore.favoriteProducts.splice(index, 1);
      }
    };


    return {
      productStore,
      product,
      addToCart,
      addToFavorite,

    };
  },
};
</script>

