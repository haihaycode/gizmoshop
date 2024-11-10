<template>
  <div>
   
    <div class="flex items-center mb-4 pt-5">
      <div class="w-3 h-10 bg-orange-600 mr-1"></div>
      <p class="text-2xl font-bold text-gray-800 uppercase">DANH MỤC</p>
    </div>

    <!-- Main Section -->
    <div class="flex flex-col md:flex-row items-start my-1 w-full lg:max-h-[350px]">
      <!-- Left Section: Image -->
      <div class="md:w-1/3 w-full mb-4 md:mb-0 px-4">
        <div
          class="relative w-full h-0 pb-[60%] md:pb-[100%] overflow-hidden rounded-lg"
        >
          <img
            src="https://i.pinimg.com/564x/98/ae/b3/98aeb30cc1d4eda9eed6bfdf050006d3.jpg"
            alt="Promotional Image"
            class="absolute top-0 left-0 w-full h-full object-cover lg:max-h-[315px]"
          />
        </div>
      </div>

      <!-- Right Section: Categories Grid -->
      <div class="md:w-2/3 w-full bg-white">
        <swiper :slides-per-view="1" :loop="false" class="categories-swiper">
          <swiper-slide
            v-for="(slideCategories, index) in paginatedCategories"
            :key="index"
          >
            <div class="grid grid-cols-3 md:grid-cols-4 gap-2">
              <div
                v-for="(category, idx) in slideCategories"
                :key="idx"
                class="flex flex-col items-center text-center p-2 border max-h-[100px] w-full justify-center border-gray-200 rounded-md aspect-square"
              >
                <img
                  :src="
                    require(`@/assets/image/Categories/${category.icon}.png`)
                  "
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
      ],

      get paginatedCategories() {
        const itemsPerPage = 12;
        const result = [];
        for (let i = 0; i < this.categories.length; i += itemsPerPage) {
          result.push(this.categories.slice(i, i + itemsPerPage));
        }
        return result;
      },
    };
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
