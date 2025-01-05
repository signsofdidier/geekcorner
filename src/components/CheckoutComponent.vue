<!--CheckoutComponent-->
<template>
  <HeroComponent/>
  <div class="bg-light py-5">
    <div class="container">
      <div class="row g-4">
        <!-- Cart Items Section -->
        <div class="col-lg-8">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h4 class="mb-0">Checkout</h4>
            <div class="position-relative fs-4">
              <i class="bi bi-bag fs-1"></i>
              <span class="position-absolute top-50 start-50 fw-medium translate-middle badge text-dark" style="margin-top:6px; font-size: 14px">{{
                  productStore.totalItems
                }}
        </span>
            </div>
          </div>

          <p v-if="productStore.totalItems === 0">Your cart is empty</p>

          <!-- Product Cards -->
          <div class="d-flex flex-column gap-3">
            <!-- Product 1 -->
            <div v-for="(item, index) in productStore.cart" :key="index" class="card shadow-sm border-0">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <img :src="item.image" alt="Product" class="product-image">
                  </div>
                  <div class="col-md-4">
                    <h6 class="mb-1">{{ item.model }}</h6>
                    <p class="text-muted mb-1 first-letter-capital">{{ item.brand }}</p>
                    <span class="badge bg-success text-light discount-badge">{{ item.discount }}% OFF</span>
                  </div>
                  <div class="col-md-3">
                    <div class="input-group">
                      <button  class="btn btn-outline-secondary btn-sm" @click="productStore.cartItemDecrement(item.id)">-</button>
                      <input type="number" class="form-control quantity-input" v-model.number="item.quantity" min="1">
                      <button class="btn btn-outline-secondary btn-sm" @click="productStore.cartItemIncrement(item.id)">+</button>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <span class="fw-bold">${{ item.price }}</span>
                    <span v-if="item.discount" class="mb-0 small text-muted btn-sm ms-2 text-decoration-line-through">${{ (item.price / (1 - item.discount / 100)).toFixed(2) }}</span>
                  </div>
                  <div class="col-md-1 text-end">
                    <button class="bg-danger px-2 ms-1 py-1 border-0 rounded text-white" @click="productStore.removeItem(item.id)"><i class="bi bi-trash" style="font-size:14px"></i></button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Summary Section -->
        <div class="col-lg-4">
          <div class="card summary-card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title mb-4">Order Summary</h5>
              <div class="d-flex justify-content-between mb-3">
                <span class="text-muted">Subtotal</span>
                <span>${{ productStore.cartTotal.toFixed(2) }}</span>
              </div>
<!--              <div class="d-flex justify-content-between mb-3">
                <span class="text-muted">Discount</span>
                <span class="text-success">-$</span>
              </div>-->
              <div class="d-flex justify-content-between mb-3">
                <span class="text-muted">Shipping</span>
                <span>{{productStore.cartTotal > productStore.freeShippingPrice ? 'Free!' : '$5.40'}}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between mb-4">
                <span class="fw-bold">Total</span>
                <span class="fw-bold">${{productStore.cartTotal > productStore.freeShippingPrice ? productStore.cartTotal.toFixed(2) : (productStore.cartTotal + 5.40).toFixed(2) }}</span>
              </div>
              <div class="input-group mb-4">
                <input type="text" class="form-control" placeholder="Promo code">
                <button class="btn btn-outline-secondary">Apply</button>
              </div>
              <button class="btn btn-dark w-100">Proceed to Checkout</button>
              <button class="btn btn-warning w-100 fw-medium mt-2  mb-3"><img src="@/assets/paypal.png" alt="PayPal logo" style="width: 80px;"></button>
              <div class="text-center text-muted small">
                <i class="bi bi-shield-check text-success me-1"></i> Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useProductStore} from "@/stores/productStore";
import HeroComponent from "@/components/HeroComponent.vue";
import {onMounted} from "vue";

 export default {
   name: 'checkoutComponent',
   components: {HeroComponent},
   setup(){
     const productStore = useProductStore();

     onMounted(() => {
       productStore.fetchProducts();
     });

     return{productStore}
   }

 }
</script>

<style scoped>
.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.375rem;
}

.quantity-input {
  width: 60px;
  text-align: center;
}

.discount-badge {
  font-size: 0.875rem;
}

.summary-card {
  position: sticky;
  top: 20px;
}
</style>
