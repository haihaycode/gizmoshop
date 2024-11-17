<template>
  <div class="flex items-center mb-4">
    <div class="w-3 h-10 bg-red-600 mr-1"></div>
    <p class="text-2xl font-bold text-gray-800 uppercase">Danh mục</p>
  </div>
  <div class="flex flex-col md:flex-row items-start my-1 w-full">
    <!-- Left Section: Image -->
    <div class="md:w-1/3 w-full flex justify-start items-center mb-4 md:mb-0 px-2">
      <img src="https://i.pinimg.com/564x/8f/19/2b/8f192bd414338e40404957e003800a39.jpg" alt="Promotional Image"
        class="rounded-lg object-cover w-full md:w-auto md:h-full h-[130px]" />
    </div>

    <!-- Right Section: Categories with Swiper -->
    <div class="md:w-2/3 w-full bg-white">
      <!-- Swiper for Categories with Multiple Slides -->
      <swiper :slides-per-view="1" :loop="false" class="categories-swiper">
        <swiper-slide v-for="(slideCategories, index) in paginatedCategories" :key="index">
          <!-- Dynamic Grid Layout: 2x3 on mobile, 3x4 on desktop -->
          <div :class="gridLayoutClass">
            <div v-for="(category, idx) in slideCategories" :key="idx"
              class="flex flex-col items-center text-center p-2 border border-gray-200 rounded-md">
              <img :src="loadImage(category.image, 'category')" alt="Category" @error="onImageError"
                class="w-12 h-12 object-contain bg-white rounded-full p-1 border border-gray-200" />
              <p class="text-xs text-gray-700 mt-1 truncate w-16">
                {{ category.name }}
              </p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { getCategories } from "@/api/categoryApi";
import { loadImage } from "@/services/imageService";

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      categories: [],
    };
  },
  computed: {
    //
    gridLayoutClass() {
      return window.innerWidth >= 768
        ? "grid grid-cols-4 gap-2"
        : "grid grid-cols-3 gap-2";
    },
    // 
    paginatedCategories() {
      const itemsPerPage = window.innerWidth >= 768 ? 12 : 6;
      return Array.from(
        { length: Math.ceil(this.categories.length / itemsPerPage) },
        (_, i) =>
          this.categories.slice(
            i * itemsPerPage,
            i * itemsPerPage + itemsPerPage
          )
      );
    },
  },
  mounted() {
    this.handleFetchCategory();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    loadImage,
    onImageError(event) {
      event.target.src = 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg';
    },
    handleResize() {
      this.$forceUpdate(); // 
    },
    async handleFetchCategory() {
      try {
        const res = await getCategories();
        this.categories = res.data;
      } catch (error) {
        //
      }
    }
  },
};
</script>

<style>
.categories-swiper {
  width: 100%;
  height: 100%;
}
</style>
