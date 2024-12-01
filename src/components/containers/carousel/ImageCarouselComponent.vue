<template>
  <div>
    <div
      class="relative w-full mx-auto overflow-hidden rounded-none sm:rounded-md md:rounded-md lg:rounded-md mt-[130px]"
      @touchstart="startSwipe" @touchmove="swiping" @touchend="endSwipe">

      <div class="text-red-500">
        <p
          class="text-sm font-semibold hover:text-red-700 transition-colors duration-300 ease-in-out transform tracking-wider shadow-md p-4 rounded-sm  bg-red-50 bg-opacity-20">
          <i class='bx bx-trip bx-tada'></i> Cơ sở chính : <span class="text-red-600 ">137 Nguyễn Thị Thập, Thanh Khê
            Tây, Liên Chiểu, Đà Nẵng</span>
          <br />
          Liên hệ công việc : <span class="text-blue-500"> <i class='bx bx-phone'></i> 0349748529 - 0999006677</span>
        </p>
      </div>


      <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(item, index) in itemsToDisplay" :key="index"
          class="flex-shrink-0 w-[100%] relative h-[150px] sm:h-80 md:h-[300px] lg:h-[300px] xl:h-[400px]">
          <img :src="loadImage(item.image, 'voucher')" alt="đang tải" class="w-full h-full "
            @error="imageError($event)" />
        </div>
      </div>
      <button @click="prevSlide"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full">
        <i class="bx bx-chevron-left text-2xl"></i>
      </button>
      <button @click="nextSlide"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full">
        <i class="bx bx-chevron-right text-2xl"></i>
      </button>
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span v-for="(item, index) in itemsToDisplay" :key="index" :class="[
          'w-3 h-3 rounded-full cursor-pointer',
          currentIndex === index ? 'bg-white' : 'bg-gray-300',
        ]" @click="goToSlide(index)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { loadImage } from '@/services/imageService';

export default {
  name: "ImageCarouselComponent",
  props: {
    items: {
      type: Array,
      default: () => [
        { name: "Slide 1", description: "", image: "https://truonggiang.vn/wp-content/uploads/2023/01/banner-pc-tg.jpg" },
        { name: "Slide 2", description: "Giảm giá sập sàn tháng 11", image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/may-choi-game-sony-playstation-5-slim-home.png" },
        { name: "Slide 3", description: "Giảm giá sập sàn tháng 11", image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/may-choi-game-sony-playstation-5-slim-home.png" },
        { name: "Slide 4", description: "Giảm giá sập sàn tháng 11", image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/may-choi-game-sony-playstation-5-slim-home.png" },
      ],
    },
  },
  data() {
    return {
      currentIndex: 0,
      startX: 0,
      deltaX: 0,
    };
  },
  computed: {
    itemsToDisplay() {
      return this.items.length
        ? this.items
        : this.$options.props.items.default();
    },
  },
  mounted() {
    setInterval(this.nextSlide, 2000);  // 2000ms = 2 seconds
  },
  methods: {
    loadImage,
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.itemsToDisplay.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.itemsToDisplay.length) %
        this.itemsToDisplay.length;
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
      event.target.src = "https://via.placeholder.com/150"; // Đặt lại hình ảnh nếu có lỗi
    },
  },
};
</script>

<style scoped></style> tôi không thể load hình ảnh