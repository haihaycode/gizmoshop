<template>
  <!-- moblie navigation bottom  -->
  <div v-if="isNavOpen"
    class="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-between px-4 py-3 md:max-w-lg md:mx-auto items-center rounded-t-lg"
    style="z-index: 50;">
    <!-- Home Icon -->
    <router-link :to="{ name: 'home' }"
      class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-home text-2xl md:text-3xl hover:text-red-600"></i>
      <span v-if="$route.name === 'home'" class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ab1616]"></span>
    </router-link>

    <!-- Cart Icon -->
    <a href="/supplier"
      class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-group text-2xl md:text-3xl hover:text-red-600"></i>
      <span v-if="$route.name === 'SupplierHome'" class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ab1616]"></span>
    </a>

    <!-- Add Product Icon -->
    <router-link :to="{ name: 'product' }"
      class="icon w-12 h-12 flex items-center bg-gray-100 justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-package text-2xl md:text-3xl hover:text-red-600"></i>
      <span v-if="$route.name === 'product'" class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ab1616]"></span>
    </router-link>

    <!-- Categories Icon -->
    <router-link :to="{ name: 'contactUs' }"
      class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-phone-call text-2xl md:text-3xl hover:text-red-600"></i>
      <span v-if="$route.path.includes('contact')" class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ab1616]"></span>
    </router-link>

    <router-link :to="{ name: 'mobilePage' }"
      class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bxs-user text-2xl md:text-3xl hover:text-red-600"></i>
      <span v-if="$route.path.includes('account')" class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ab1616]"></span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'navigationBottom',
  computed: {
    ...mapGetters('nav', ['isNavOpen']),
  }
}
</script>

<style scoped>
.icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Modern hover effect */
.icon:hover {
  transform: scale(1.15);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  background-color: #f0f0f0;
}

/* Underline on hover */
.icon:hover::after {
  content: '';
  position: absolute;
  top: -5px;
  /* Position the underline slightly above the button */
  left: 0;
  right: 0;
  height: 2px;
  /* Custom color */
}
</style>
