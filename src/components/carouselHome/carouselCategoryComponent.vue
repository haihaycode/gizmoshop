<template>
  <div class="flex items-center mb-4">
    <div class="w-3 h-10 bg-orange-600 mr-1"></div>
    <p class="text-2xl font-bold text-gray-800 uppercase">Danh mục</p>
  </div>
  <div class="flex flex-col md:flex-row items-start my-1 w-full">
    <!-- Left Section: Image -->
    <div
      class="md:w-1/3 w-full flex justify-start items-center mb-4 md:mb-0 px-2"
    >
      <img
        src="https://i.pinimg.com/564x/8f/19/2b/8f192bd414338e40404957e003800a39.jpg"
        alt="Promotional Image"
        class="rounded-lg object-cover w-full md:w-auto md:h-full h-[130px]"
      />
    </div>

    <!-- Right Section: Categories with Swiper -->
    <div class="md:w-2/3 w-full bg-white">
      <!-- Swiper for Categories with Multiple Slides -->
      <swiper :slides-per-view="1" :loop="false" class="categories-swiper">
        <swiper-slide
          v-for="(slideCategories, index) in paginatedCategories"
          :key="index"
        >
          <!-- Dynamic Grid Layout: 2x3 on mobile, 3x4 on desktop -->
          <div :class="gridLayoutClass">
            <div
              v-for="(category, idx) in slideCategories"
              :key="idx"
              class="flex flex-col items-center text-center p-2 border border-gray-200 rounded-md"
            >
              <img
                :src="require(`@/assets/image/Categories/${category.icon}.png`)"
                alt="Category Icon"
                class="w-12 h-12 object-contain bg-white rounded-full p-1 border border-gray-200"
              />
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

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      categories: [
        { id: 1, icon: "circuit-board", name: "Circuit Board" },
        { id: 2, icon: "wifi", name: "WiFi" },
        { id: 3, icon: "graphics-card", name: "Graphics Card" },
        { id: 4, icon: "memory-card", name: "Memory Card" },
        { id: 5, icon: "microchip", name: "Microchip" },
        { id: 6, icon: "processor", name: "Processor" },
        { id: 7, icon: "display", name: "Display" },
        { id: 8, icon: "ssd-card", name: "SSD" },
        { id: 9, icon: "web-camera", name: "Web camera" },
        { id: 10, icon: "memory-card", name: "Memory Card" },
        { id: 11, icon: "wifi-router", name: "Wifi Router" },
        { id: 12, icon: "fan", name: "FAN" },
        { id: 13, icon: "ssd-card", name: "SSD" },
        { id: 14, icon: "web-camera", name: "Web camera" },
        { id: 15, icon: "memory-card", name: "Memory Card" },
        { id: 16, icon: "wifi-router", name: "Wifi Router" },
        { id: 17, icon: "fan", name: "FAN" },
      ],
    };
  },
  computed: {
    // Dynamically determine grid layout based on screen size
    gridLayoutClass() {
      return window.innerWidth >= 768
        ? "grid grid-cols-4 gap-2"
        : "grid grid-cols-3 gap-2";
    },
    // Paginate categories based on screen size
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
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.$forceUpdate(); // Rerender component on resize to adjust grid layout and pagination
    },
  },
};
</script>

<style>
/* Custom Swiper styles if needed */
.categories-swiper {
  width: 100%;
  height: 100%;
}
</style>
