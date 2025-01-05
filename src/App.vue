<!--App.vue-->
<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
    <div class="container">
      <!-- Navbar brand -->
      <router-link class="navbar-brand d-flex align-items-center" href="#" to="/">
        <i class="bi bi-laptop fs-4 me-2"></i>
        <span class="fw-bold">GeekCorner</span>
      </router-link>

      <!-- Toggler Button for Mobile -->
      <button aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
              data-bs-target="#navbarNav" data-bs-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible Navbar Content -->
      <div id="navbarNav" class="collapse navbar-collapse">
        <form class="d-flex d-md-flex input-group mx-auto w-50 mb-3 mb-lg-0">
          <input v-model="searchQuery" @input="updateSearch" aria-label="Search" class="form-control rounded-start" placeholder="Search" type="search">
          <button class="btn btn-secondary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </form>

        <!-- Nav items -->
        <ul class="navbar-nav ms-auto py-lg-1">

          <!-- Shop -->
          <li class="nav-item me-lg-2">
            <router-link class="nav-link" href="#" to="/">
              <i class="bi bi-bag d-inline-block d-lg-none"></i>
              <span class="d-none d-lg-inline">Shop</span>
            </router-link>
          </li>

          <!-- Cart -->
          <li class="nav-item me-lg-3">
            <button aria-controls="cartOffCanvas" class="btn btn-warning btn-sm position-relative" data-bs-target="#cartOffCanvas"
                    data-bs-toggle="offcanvas" type="button">
              <i class="bi bi-cart fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{
                  productStore.totalItems
                }}
                  <span class="visually-hidden">unread messages</span></span>
            </button>
          </li>

          <!-- Checkout -->
          <li class="nav-item me-lg-2">
            <router-link class="nav-link" href="#" to="/checkout">
              <i class="bi bi-bag d-inline-block d-lg-none"></i>
              <span class="d-none d-lg-inline">Checkout</span>
            </router-link>
          </li>

          <!-- Notifications -->
          <li class="nav-item me-lg-2 dropdown">
            <a id="notificationsDropdown" aria-expanded="false" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
               href="#" role="button">
              <i class="bi bi-bell"></i>
            </a>
            <ul aria-labelledby="notificationsDropdown" class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Some news</a></li>
              <li><a class="dropdown-item" href="#">Another news</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>

          <!-- User Avatar -->
          <li class="nav-item me-lg-2 dropdown">
            <a id="userDropdown" aria-expanded="false" class="nav-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown"
               href="#" role="button">
              <img alt="User" class="rounded-circle" height="30"
                   loading="lazy" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg">
            </a>
            <ul aria-labelledby="userDropdown" class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">My profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!--Cart offcanvas-->
  <CartOffcanvas/>

  <div>
    <router-view></router-view>
  </div>

  <footer class="footer pt-5 bg-dark text-white">
    <div class="container">
      <div class="row g-4">
        <!-- Company Info -->
        <div class="col-lg-4 col-md-6">
          <h3 class="footer-title text-white mb-4">GeekCorner</h3>
          <p class="mb-4 pe-5">Wij zijn gepassioneerd over het aanbieden van innovatieve elektronische oplossingen die gamers, audioliefhebbers en mobiele enthousiastelingen helpen om hun passie naar een hoger niveau te tillen. De perfecte winkel voor elke geek!</p>
          <div class="social-links mb-4">
            <a href="#" class="me-4" aria-label="Facebook">
              <i class="bi bi-facebook fs-5 text-light"></i>
            </a>
            <a href="#" class="me-4" aria-label="Twitter">
              <i class="bi bi-twitter fs-5 text-light"></i>
            </a>
            <a href="#" class="me-4" aria-label="Instagram">
              <i class="bi bi-instagram fs-5 text-light"></i>
            </a>
            <a href="#" class="me-4" aria-label="LinkedIn">
              <i class="bi bi-linkedin fs-5 text-light"></i>
            </a>
            <a href="#" aria-label="YouTube">
              <i class="bi bi-youtube fs-5 text-light"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6">
          <h3 class="footer-title text-white mb-4">Quick Links</h3>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white text-decoration-none">Shop</router-link></li>
            <li><router-link to="/checkout" class="text-white text-decoration-none">Checkout</router-link></li>
            <li><a href="#" class="text-white text-decoration-none">Login</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="col-lg-2 col-md-6">
          <h3 class="footer-title text-white mb-4">Support</h3>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">Help Center</a></li>
            <li><a href="#" class="text-white text-decoration-none">Community</a></li>
            <li><a href="#" class="text-white text-decoration-none">Privacy Policy</a></li>
            <li><a href="#" class="text-white text-decoration-none">Terms of Service</a></li>
            <li><a href="#" class="text-white text-decoration-none">Cookie Policy</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-lg-4 col-md-6">
          <h3 class="footer-title text-white mb-4">Newsletter</h3>
          <p class="mb-4">Subscribe to our newsletter for updates, news, and exclusive offers.</p>
          <form class="mb-4">
            <div class="input-group">
              <input type="email" class="form-control" placeholder="Enter your email" aria-label="Enter your email">
              <button class="btn btn-primary" type="submit">Subscribe</button>
            </div>
          </form>
          <p class="small">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom mt-5 bg-warning text-dark">
      <div class="container">
        <div class="row py-3">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0">&copy; 2024 GeekCorner. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <p class="mb-0">Designed by <a href="#" class="text-dark text-decoration-none">Didier Vanassche</a></p>
          </div>
        </div>
      </div>
    </div>
  </footer>


</template>

<script>
import {useProductStore} from "@/stores/productStore";
import CartOffcanvas from "@/components/CartOffcanvas.vue";

export default {
  components: {CartOffcanvas},

  setup(){
    const productStore = useProductStore();
    const searchQuery = productStore.searchQuery;
    const updateSearch = (event) => {
      productStore.updateSearchQuery(event.target.value);
    };

    return{ productStore, searchQuery, updateSearch }
  }
}
</script>


<!--STYLE voor enkel deze pagina-->
<style scoped>
footer a,  footer a i{
  transition: all .2s ease;
}
footer a:hover, footer a i:hover{
  color: rgba(255,193,7,1) !important;
}

.footer-bottom a:hover{
  color: inherit !important;
  text-decoration:underline !important;
}

@layer base {
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}


</style>

<!-- STYLE voor alle pagina's-->
<style>
/* WebKit Browsers (Chrome, Edge, Safari) */
::-webkit-scrollbar {
  width: 8px; /* Breedte van de verticale scrollbar */
  height: 8px; /* Hoogte van de horizontale scrollbar */
}

::-webkit-scrollbar-thumb {
  background: rgba(255,193,7,1); /* Kleur van de scrollbar */
  border-radius: 4px; /* Ronding van de scrollbar */
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255,193,7,1); /* Kleur bij hover */
}

::-webkit-scrollbar-track {
  background: rgba(255,193,7,1); /* Achtergrond van de scrollbar */
  border-radius: 4px;
}

/* Voor andere browsers (Firefox) */
* {
  scrollbar-width: thin; /* Dikte van de scrollbar */
  scrollbar-color: rgba(255,193,7,1) #f4f4f4; /* Thumb-kleur en track-kleur */
}

.first-letter-capital:first-letter{
  text-transform: capitalize;
}
</style>