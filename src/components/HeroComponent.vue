<template>
  <header>
    <!-- Hero Section -->
    <div id="hero" class="bg-image position-relative" style="height: 500px;">
      <img alt="Christmas background" class="background-img" src="../assets/christmas.jpg">
      <div class="hero-overlay"></div>
      <div class="mask d-flex align-items-center justify-content-center text-center text-white h-100">
        <div class="hero-text">
          <h1 class="mb-3">Winter Sale</h1>
          <h4 class="mb-4">Discounts up to 70%!</h4>
          <router-link to="/" class="btn btn-outline-light btn-lg" href="#" role="button">Unleash the geek in you <i
              class="bi bi-gift ms-1"></i></router-link>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default{
  setup(){

  }
}
</script>

<style scoped>
#hero .background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

#hero .hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

#hero .hero-text {
  z-index: 5;
}
</style>