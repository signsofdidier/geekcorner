<template>
  <!--  CartOffcanvas-->
  <div class="offcanvas offcanvas-custom offcanvas-end" tabindex="-1" id="cartOffCanvas" aria-labelledby="cartOffCanvasLabel">
    <div class="offcanvas-header shadow-sm px-3 py-2">
      <div class="offcanvas-title d-flex justify-content-center align-items-center text-center">
        <div class="position-relative fs-4" id="cartOffCanvasLabel">
          <i class="bi bi-bag fs-1"></i>
          <span class="position-absolute top-50 start-50 fw-medium translate-middle badge text-dark" style="margin-top:6px; font-size: 14px">{{
              productStore.totalItems
            }}
        </span>
        </div>
        <h5 class="fs-5 fw-normal mt-2 ms-2 mb-0">Your Cart</h5>
      </div>
      <button type="button" class="btn-close me-2" style="font-size: 10px;" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body mt-1 d-flex flex-column justify-content-between">

<!--      Cart products-->
      <div :class="productStore.cart.length > 6 ? 'overflow-y-scroll' : ''">
        <ul v-if="productStore.cart.length > 0" class="list-group">
          <li
              v-for="(item, index) in productStore.cart"
              :key="index"
              class="list-group-item">
            <div class="row">
              <div class="col-2 d-flex align-items-center">
                <img class="img-fluid" :src="item.image" :alt="`${item.title} image`">
              </div>
              <div class="col-5 d-flex flex-column justify-content-center">
                <h3 class="fs-cart-title">{{ item.title.substring(0,15) }}</h3>
                <div class="d-flex">
                  <p class="mb-0 fw-bold text-primary">${{item.price.toFixed(2)}}</p>
                  <p v-if="item.discount" class="mb-0 small text-muted btn-sm ms-2 text-decoration-line-through">${{ (item.price / (1 - item.discount / 100)).toFixed(2) }}</p>
                </div>
              </div>
              <div class="col-5 d-flex justify-content-between align-items-center">
                <!-- product Quantity -->
                <div class="d-flex" style="width: 120px; height:40px">
                  <!--                quantity inputveld-->
                  <input type="number" class="form-control" v-model.number="item.quantity">
                  <!--                Quantity increment and decreasing-->
                  <div class="d-flex flex-column justify-content-center my-2">
                    <button class="border-0 bg-transparent" style="font-size:12px" @click="productStore.cartItemIncrement(item.id)"><i class="bi bi-caret-up-fill"></i></button>
                    <button class="border-0 bg-transparent" style="font-size:12px" @click="productStore.cartItemDecrement(item.id)"><i class="bi bi-caret-down-fill"></i></button>
                  </div>
                </div>

                <div class="">
                  <button class="bg-danger px-2 ms-1 py-1 border-0 rounded text-white" @click="productStore.removeItem(item.id)"><i class="bi bi-trash" style="font-size:14px"></i></button>
                </div>

              </div>
            </div>
          </li>
        </ul>
        <p v-else class="px-2">Je winkelwagen is leeg.</p>
      </div><!--end cart products-->

<!--      Cart calculations & actions-->
      <div class="pt-3">
        <!--      Price calculations-->
        <div v-if="productStore.cart.length > 0" class="center">
          <!--          excl btw-->
<!--          <div class="d-flex justify-content-between">
            <p class="mb-0 text-muted" style="font-size: 12px">Excl. BTW</p>
            <span class="mb-0 text-muted" style="font-size: 12px">${{productStore.cartTotalExcl.toFixed(2)}}</span>
          </div>-->
<!--          Subtotal-->
          <div class="d-flex justify-content-between">
            <p class="text-muted">Subtotaal</p>
            <span class="text-muted">${{productStore.cartTotal.toFixed(2)}}</span>
          </div>
<!--          Shipping-->
          <div class="d-flex justify-content-between">
            <p :class="productStore.freeShippingCalc > 0 ? 'mb-1' : 'mb-2'" class="text-muted">Shipping</p>
            <span class="text-muted">{{productStore.cartTotal > productStore.freeShippingPrice ? 'Free!' : '$5.40'}}</span>
          </div>
          <p v-if="productStore.freeShippingCalc" class="mb-2 text-muted" style="font-size: 12px">Order ${{ productStore.freeShippingCalc }} more for free shipping.</p>
          <div class="d-flex justify-content-between py-2 border-top">
            <p class="fw-bold">Total</p>
            <span class="fw-bold"> ${{productStore.cartTotal > productStore.freeShippingPrice ? productStore.cartTotal.toFixed(2) : (productStore.cartTotal + 5.40).toFixed(2) }}</span>
          </div>
        </div>
        <div>
          <router-link to="/checkout"><button class="btn btn-dark w-100 fw-medium py-2" data-bs-dismiss="offcanvas" aria-label="Close">Checkout</button></router-link>
          <button class="btn btn-warning w-100 fw-medium mt-2"><img src="@/assets/paypal.png" alt="PayPal logo" style="width: 80px;"></button>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { watch } from "vue";

export default {
  setup() {
    const productStore = useProductStore();

    // Watch de winkelwagen om negatieve hoeveelheden te vermijden
    watch(
        () => productStore.cart,
        (newCart) => {
          newCart.forEach((item) => {
            if (item.quantity < 1) item.quantity = 1;
          });
        },
        { deep: true }
    );

    return { productStore };
  },
};
</script>

<style scoped>
.fs-cart-title{
  font-size:16px;
  margin-bottom:0;
}

.offcanvas-custom{
  width:480px;
}

</style>