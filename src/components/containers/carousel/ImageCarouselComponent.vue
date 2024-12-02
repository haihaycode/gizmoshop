<template>
  <div>
    <!-- Carousel container -->
    <div
      class="relative w-full mx-auto overflow-hidden rounded-none sm:rounded-md md:rounded-md lg:rounded-md mt-[130px]"
      @touchstart="startSwipe" @touchmove="swiping" @touchend="endSwipe">

      <!-- Info bar -->
      <div class="text-white">
        <p
          class="text-sm font-semibold transition-colors duration-300 ease-in-out transform tracking-wider shadow-md p-4 rounded-sm bg-red-500">
          <i class='bx bx-trip bx-tada'></i> Cơ sở chính: <span class="text-white">137 Nguyễn Thị Thập, Thanh Khê Tây,
            Liên Chiểu, Đà Nẵng</span>
          <br />
          <span class="hidden sm:block">Liên hệ công việc: <span class="text-white"> <i class='bx bx-phone'></i>
              0349748529 - 0999006677</span></span>
        </p>
      </div>

      <!-- Carousel images -->
      <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(item, index) in itemsToDisplay" :key="index"
          class="flex-shrink-0 w-[100%] relative h-[150px] sm:h-80 md:h-[300px] lg:h-[350px] xl:h-[450px]">
          <!-- Image with click event to open lightbox -->
          <img :src="loadImage(item.image, 'voucher')" alt="đang tải" class="w-full h-full" @error="imageError($event)"
            @click="openLightbox(index)" />
        </div>
      </div>

      <!-- Navigation buttons -->
      <button @click="prevSlide"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full">
        <i class="bx bx-chevron-left text-2xl"></i>
      </button>
      <button @click="nextSlide"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full">
        <i class="bx bx-chevron-right text-2xl"></i>
      </button>

      <!-- Dots navigation -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span v-for="(item, index) in itemsToDisplay" :key="index"
          :class="['w-3 h-3 rounded-full cursor-pointer', currentIndex === index ? 'bg-white' : 'bg-gray-300']"
          @click="goToSlide(index)"></span>
      </div>
    </div>

    <!-- Vue Easy Lightbox Modal -->
    <vue-easy-lightbox v-model="showLightbox" :images="lightboxImages" :index="lightboxIndex" :visible="showLightbox"
      :zoomable="true" :transition="true" :overlay="true" :closeOnEsc="true" :closeOnClickOverlay="true" />
  </div>
</template>

<script>
import { loadImage } from '@/services/imageService';
import VueEasyLightbox from 'vue-easy-lightbox';

export default {
  name: "ImageCarouselComponent",
  components: {
    VueEasyLightbox,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentIndex: 0,
      startX: 0,
      deltaX: 0,
      showLightbox: false, // Whether the lightbox is visible
      lightboxIndex: 0, // Index of the image in lightbox
      lightboxImages: [], // Images array for the lightbox
    };
  },
  computed: {
    itemsToDisplay() {
      return this.items.length ? this.items : this.$options.props.items.default();
    },
  },
  mounted() {
    setInterval(this.nextSlide, 4000);
  },
  methods: {
    loadImage,
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.itemsToDisplay.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.itemsToDisplay.length) % this.itemsToDisplay.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    startSwipe(event) {
      this.startX = event.touches[0].clientX;
      this.deltaX = 0;
    },
    swiping(event) {
      const currentX = event.touches[0].clientX;
      this.deltaX = currentX - this.startX;
    },
    endSwipe() {
      const swipeThreshold = 50;
      if (this.deltaX > swipeThreshold) {
        this.prevSlide();
      } else if (this.deltaX < -swipeThreshold) {
        this.nextSlide();
      }
      this.startX = 0;
      this.deltaX = 0;
    },
    imageError(event) {
      event.target.src = "https://via.placeholder.com/150";
    },
    // Open the lightbox and set the selected image index
    openLightbox(index) {
      this.showLightbox = true;
      this.lightboxIndex = index;
      this.lightboxImages = this.itemsToDisplay.map(item => loadImage(item.image, 'voucher'));
    },
  },
};
</script>

<style scoped>
/* Optional styles for lightbox and carousel */
</style>
