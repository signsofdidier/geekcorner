<!-- ShopComponent -->
<template>

  <HeroComponent/>

  <!--MAIN-->
  <main class="bg-light">
    <div class="container py-5">

      <!-- Product Collection titel & sort by filter -->
      <div class="d-flex justify-content-between align-products-center mb-4">
        <h4 class="mb-0">Product Collection</h4>
        <div class="d-flex gap-2 align-products-center">
          <span class="text-muted">Sort by:</span>
          <div class="dropdown">
            <button aria-expanded="false" class="btn btn-outline-secondary d-flex align-products-center gap-1"
                    data-bs-toggle="dropdown" type="button">
              Newest <i class="bi bi-chevron-down"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Newest</a></li>
              <li><a class="dropdown-item" href="#">Oldest</a></li>
              <li><a class="dropdown-item" href="#">Lowest Price</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!--      productcard en filters row-->
      <div class="row g-4">
        <!-- Filters Sidebar -->
        <div class="col-lg-3">
          <div class="filter-sidebar bg-white shadow-sm p-4">
            <div class="mb-4">
              <h6 class="mb-3">Categories</h6>
              <div
                  v-for="category in uniqueCategories"
                  :key="category"
                  class="form-check mb-2">
                <input
                    :id="category"
                    v-model="selectedCategories"
                    :value="category"
                    class="form-check-input"
                    type="checkbox"
                >
                <label
                    :for="category"
                    class="form-check-label"
                >{{ category }}</label>
              </div>
            </div>

            <!--            Filter rangeslider-->
            <div class="mb-4">
              <h6 class="mb-3">Price Range</h6>
              <input class="form-range" max="5000" min="0" type="range" value="2500">
              <div class="d-flex justify-content-between">
                <span class="text-muted">$0</span>
                <span class="text-muted">$5000</span>
              </div>
            </div>

            <!--            Filter colors-->
            <div class="mb-4">
              <h6 class="mb-3">Colors</h6>
              <div class="d-flex gap-2">
                <div class="color-option bg-dark selected"></div>
                <div class="color-option bg-danger"></div>
                <div class="color-option bg-primary"></div>
                <div class="color-option bg-success"></div>
              </div>
            </div>

            <!--            Filter ratings-->
            <div class="mb-4">
              <h6 class="mb-3">Rating</h6>
              <div class="form-check mb-2">
                <input id="rating4" class="form-check-input" name="rating" type="radio">
                <label class="form-check-label" for="rating4">
                  <i class="bi bi-star-fill text-warning"></i> 4 & above
                </label>
              </div>
              <div class="form-check mb-2">
                <input id="rating3" class="form-check-input" name="rating" type="radio">
                <label class="form-check-label" for="rating3">
                  <i class="bi bi-star-fill text-warning"></i> 3 & above
                </label>
              </div>
            </div>

            <button class="btn btn-outline-primary w-100">Apply Filters</button>
          </div>
        </div><!--Einde filters-->

        <!-- Product Grid -->
        <div class="col-lg-9">
          <div class="row g-4">

            <!-- Product Card 1 -->
            <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="col-md-4">
              <div class="card product-card shadow-sm border-0 h-100">
                <div class="position-relative">
                  <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
                    <img :src="product.image" alt="Product" class="card-img-top product-image">
                  </router-link>

                  <span :class="product.discount > 0 ? 'd-block' : 'd-none'"
                        class="badge bg-danger position-absolute top-0 end-0 mt-2 me-2">-{{ product.discount }}%</span>
                  <button @click="productStore.addToFavorite(product)" class="btn wishlist-btn position-absolute top-0 start-0 mt-2 ms-2 p-0">
                    <i :class="productStore.favoriteProducts.find(fav => fav.id === product.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
                  </button>
                </div>
                <div class="card-body">
                  <span class="badge bg-warning text-dark mb-2">{{ product.category }}</span>
                  <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
                    <h6 class="card-title mb-2 text-decoration-none">{{ product.title.substring(0, 25) }}..</h6>
                  </router-link>

                  <div class="d-flex align-products-center mb-2">
                    <div class="text-warning">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-half"></i>
                    </div>
                    <span class="text-muted ms-2">(4.5)</span>
                  </div>
                  <div class="d-flex justify-content-between align-products-center">
                    <div>
                      <span class="fw-bold text-primary btn-sm">${{ product.price.toFixed(2) }}</span>
                      <span v-if="product.discount" class=" small text-muted btn-sm ms-2 text-decoration-line-through">${{ (product.price / (1 - product.discount / 100)).toFixed(2) }}</span>
                    </div>

                    <button class="btn btn-primary" @click="productStore.addToCart(product)">
                      <i class="bi bi-cart-plus"></i>
                    </button>

                  </div>
                </div>
              </div>

            </div><!--einde product-->

          </div>
        </div>
      </div><!--einde Product grid-->
    </div><!--einde container-->
  </main>
</template>

<script>
import {useProductStore} from '@/stores/productStore'
import {computed, onMounted, ref} from "vue";
import HeroComponent from "@/components/HeroComponent.vue";

export default {
  components: {HeroComponent},
  setup() {
    const productStore = useProductStore();
    const selectedCategories = ref([]); // Reactieve lijst voor geselecteerde categorieën

    // Unieke categorieën ophalen
    const uniqueCategories = computed(() => {
      const categories = productStore.products.map((product) => product.category);
      return [...new Set(categories)]; // Dubbele categorieën verwijderen
    });

    // Gefilterde producten gebaseerd op geselecteerde categorieën
    const filteredProducts = computed(() => {
      if (selectedCategories.value.length === 0) {
        return productStore.products; // Geen filter, toon alle producten
      }
      return productStore.products.filter((product) =>
          selectedCategories.value.includes(product.category)
      );
    });

    onMounted(() => {
      productStore.fetchProducts();
    });

    return {
      productStore,
      uniqueCategories,
      selectedCategories,
      filteredProducts,
    };
  },
}
</script>

<style scoped>
.filter-sidebar {
  border-radius: 12px;
  position: sticky;
  top: 20px;
}

.product-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  border-radius: 12px 12px 0 0;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.color-option.selected::after {
  content: '';
  position: absolute;
  inset: -3px;
  border: 2px solid #2563eb;
  border-radius: 50%;
}

.filter-sidebar .form-check-label::first-letter {
  text-transform: capitalize;
}

.card a{
  color:inherit;
  text-decoration:none;
}
</style>