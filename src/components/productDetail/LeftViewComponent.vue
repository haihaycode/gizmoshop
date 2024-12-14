<template>
  <div class="w-full mx-auto pt-4">
    <!-- Main Image Display -->
    <div class="relative" @click="showLightbox = true">
      <img :src="loadImage(displayedImage, 'product')" alt="image"
        class="w-full max-h-[400px] md:h-full rounded-md object-cover border-2" @error="handleImageError" />
      <div class="absolute inset-0 flex items-center justify-between p-4">

        <!-- Previous Image Button -->
        <button @click="previousImage" @click.stop class=" text-gray-700 p-2 rounded-full hover:bg-gray-400"
          :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === 0 }" :disabled="currentImageIndex === 0">
          &#10094;
        </button>

        <!-- Next Image Button -->
        <button @click="nextImage" @click.stop class=" text-gray-700 p-2 rounded-full hover:bg-gray-400" :class="{
          'opacity-50 cursor-not-allowed':
            currentImageIndex === imagesWithFallback.length - 1,
        }" :disabled="currentImageIndex === imagesWithFallback.length - 1">
          &#10095;
        </button>
      </div>
    </div>

    <!-- Thumbnail Swiper -->
    <div class="pt-3">
      <swiper ref="thumbnailSwiper" :slides-per-view="5" space-between="10" class="mySwiper" :loop="false">
        <swiper-slide v-for="(image, index) in imagesWithFallback" :key="index" @click="selectImage(index)"
          class="cursor-pointer">
          <img :src="loadImage(image, 'product')" @click="showLightbox = true" alt="thumbnail"
            class="w-24 h-16 md:w-28 md:h-20 lg:w-28 lg:h-20 object-cover rounded-md border-2 shadow-lg"
            :class="{ 'border-blue-500': currentImageIndex === index }" @error="handleImageError" />
        </swiper-slide>
      </swiper>
    </div>

    <!-- Vue Easy Lightbox -->
    <vue-easy-lightbox v-if="showLightbox" :visible="showLightbox"
      :imgs="imagesWithFallback.map(image => loadImage(image, 'product'))" :index="currentImageIndex"
      @hide="showLightbox = false" />

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { loadImage } from "@/services/imageService";
import VueEasyLightbox from "vue-easy-lightbox";
export default {
  components: {
    Swiper,
    SwiperSlide,
    VueEasyLightbox
  },
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      showLightbox: false,
      currentImageIndex: 0,
      placeholderImage: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
    };
  },
  computed: {
    displayedImage() {
      // Show the current image if available, otherwise use the placeholder
      return this.imagesWithFallback[this.currentImageIndex] || this.placeholderImage;
    },
    imagesWithFallback() {
      // Transform nested structure into an array of URLs or fallback if empty
      return this.images.length > 0
        ? this.images.flatMap(item => item.image.map(img => img.fileDownloadUri))
        : [this.placeholderImage];
    },
  },
  methods: {
    loadImage,
    nextImage() {
      if (this.currentImageIndex < this.imagesWithFallback.length - 1) {
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
        const visibleSlides = 5;
        if (this.currentImageIndex >= swiperInstance.activeIndex + visibleSlides) {
          swiperInstance.slideTo(this.currentImageIndex - visibleSlides + 1);
        } else if (this.currentImageIndex < swiperInstance.activeIndex) {
          swiperInstance.slideTo(this.currentImageIndex);
        }
      }
    },
    handleImageError(event) {
      event.target.src = this.placeholderImage;
    },
  },
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
