<template>
  <div
    class="fixed top-1/2 left-0 ml-2.5 w-[56px] max-h-[75vh] bg-white shadow-lg z-50 transform -translate-y-1/2 rounded-lg border border-gray-200 overflow-hidden hidden  sm:hidden md:hidden lg:block">
    <ul :class="['flex flex-col items-center p-2', dynamicHeightClass]">
      <li v-for="item in menuItems.slice(0, 12)" :key="item.id" @click="() => { searchByBrand(item.id) }"
        class="relative group w-full py-2 flex justify-center items-center border-b last:border-b-0 border-gray-200 cursor-pointer text-gray-800 hover:bg-gray-100 transition-all ease-in-out">
        <img :src="item.image" alt="icon" class="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
        <span
          class="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {{ item.name }}
        </span>
      </li>
    </ul>
  </div>


  <div>
    <!-- Fixed Phone Icon -->
    <div class="fixed bottom-20 right-6  z-50  hidden md:block">
      <router-link :to="{ name: 'contactUs' }"
        class="rounded-full hover:shadow-lg w-10 h-10 flex items-center justify-center">
        <i class='bx bx-phone-call bx-tada text-4xl text-blue-700'></i>
      </router-link>
      <div class="rounded-full hover:shadow-lg w-10 h-10 flex items-center justify-center">
        <i class='bx bx-gift bx-tada text-4xl text-red-700'></i>
      </div>
    </div>
  </div>
</template>


<script>
import { getBrand } from '@/api/brandApi';
export default {
  computed: {
    dynamicHeightClass() {
      const itemCount = Math.min(this.menuItems.length, 10);
      return `h-[${itemCount * 48}px]`;
    },
  },
  data() {
    return {
      menuItems: [],
    };
  },
  mounted() {
    this.handleFetchBrand();
  },
  methods: {
    searchByBrand(id) {
      window.location.href = '/product?idThuongHieu=' + id;
    },
    async handleFetchBrand() {
      try {
        const response = await getBrand();
        this.menuItems = response.data.content.map(item => ({
          ...item,
          thumbnail: item.thumbnail || 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg',
        }));
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>

<style scoped>
/* Thêm các style tuỳ chỉnh nếu cần */
</style>
