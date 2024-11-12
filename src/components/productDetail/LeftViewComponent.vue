<template>
  <div class="w-full mx-auto pt-4">
    <!-- Hình ảnh chính -->
    <div class="relative">
      <img
        :src="images[currentImageIndex]"
        alt="image"
        class="w-full max-h-[400px] md:h-full rounded-md object-cover border-2 "
      />
      <div class="absolute inset-0 flex items-center justify-between p-4">
        <!-- Nút chuyển qua hình trước -->
        <button
          @click="previousImage"
          class="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400"
          :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === 0 }"
          :disabled="currentImageIndex === 0"
        >
          &#10094;
        </button>

        <!-- Nút chuyển qua hình kế tiếp -->
        <button
          @click="nextImage"
          class="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400"
          :class="{
            'opacity-50 cursor-not-allowed':
              currentImageIndex === images.length - 1,
          }"
          :disabled="currentImageIndex === images.length - 1"
        >
          &#10095;
        </button>
      </div>
    </div>

    <!-- Danh sách hình nhỏ dưới dạng Swiper -->
    <div class="pt-3">
      <swiper
        ref="thumbnailSwiper"
        :slides-per-view="5"
        space-between="10"
        class="mySwiper"
        :loop="false"
      >
        <swiper-slide
          v-for="(image, index) in images"
          :key="index"
          @click="selectImage(index)"
          class="cursor-pointer"
        >
          <img 
            :src="image"
            alt="thumbnail"
            class="w-24 h-16 md:w-28 md:h-20 lg:w-28 lg:h-20 object-cover rounded-md border-2 shadow-lg"
            :class="{ 'border-blue-500': currentImageIndex === index }"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [
        "https://i.pinimg.com/564x/6c/af/eb/6cafeb9bf4235db7ef53b737c835b9dc.jpg",
        "https://i.pinimg.com/564x/ed/9a/4c/ed9a4c8cb9f2504ac15845e793d9baf9.jpg",
        "https://i.pinimg.com/564x/8d/90/d6/8d90d633685e7ffb8794e0a6be4eb378.jpg",
        "https://i.pinimg.com/564x/ed/9a/4c/ed9a4c8cb9f2504ac15845e793d9baf9.jpg",
        "https://i.pinimg.com/564x/8d/90/d6/8d90d633685e7ffb8794e0a6be4eb378.jpg",
        "https://i.pinimg.com/564x/6c/af/eb/6cafeb9bf4235db7ef53b737c835b9dc.jpg",
        "https://i.pinimg.com/564x/ed/9a/4c/ed9a4c8cb9f2504ac15845e793d9baf9.jpg",
        "https://i.pinimg.com/564x/8d/90/d6/8d90d633685e7ffb8794e0a6be4eb378.jpg",
        "https://i.pinimg.com/564x/ed/9a/4c/ed9a4c8cb9f2504ac15845e793d9baf9.jpg",
        "https://i.pinimg.com/564x/8d/90/d6/8d90d633685e7ffb8794e0a6be4eb378.jpg",
      ],
    },
  },
  data() {
    return {
      currentImageIndex: 0,
    };
  },
  methods: {
    nextImage() {
      if (this.currentImageIndex < this.images.length - 1) {
        this.currentImageIndex++;
        this.updateThumbnailSwiper();
      }
    },
    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
        this.updateThumbnailSwiper();
      }
    },
    selectImage(index) {
      this.currentImageIndex = index;
      this.updateThumbnailSwiper();
    },
    updateThumbnailSwiper() {
      const swiperInstance = this.$refs.thumbnailSwiper.swiper;
      if (swiperInstance) {
        const visibleSlides = 5; // số lượng slide hiển thị cùng lúc
        if (
          this.currentImageIndex >=
          swiperInstance.activeIndex + visibleSlides
        ) {
          swiperInstance.slideTo(this.currentImageIndex - visibleSlides + 1);
        } else if (this.currentImageIndex < swiperInstance.activeIndex) {
          swiperInstance.slideTo(this.currentImageIndex);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Thêm style tùy chỉnh nếu cần */
</style>
