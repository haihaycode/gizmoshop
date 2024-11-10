<template>
  <div>
    <div
      class="discounted-products-container my-2 mx-auto border border-gray-50 rounded-lg shadow-md"
    >
      <!-- Header with title and view all link -->
      <div
        class="header flex flex-col sm:flex-row justify-between items-center bg-red-500 text-white px-4 py-2 rounded-t-lg"
      >
        <div class="flex items-center space-x-2">
          <!-- Lightning Icon (SVG) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-yellow-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 2L3 14h7v8l11-12h-8z" />
          </svg>
          <h2 class="font-bold text-lg sm:text-xl md:text-2xl">Giảm Giá Sốc</h2>
        </div>
        <a href="#" class="text-xs sm:text-sm md:text-base hover:underline"
          >Xem Thêm</a
        >
      </div>

      <!-- Swiper for Products with Responsive Slides Per View -->
      <swiper
        :slides-per-view="getSlidesPerView"
        :space-between="10"
        :loop="false"
        class="products-swiper p-4"
      >
        <swiper-slide
          v-for="(product, index) in products"
          :key="index"
          class="product-card text-center flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <img
            :src="product.image"
            alt="Product Image"
            class="product-image mx-auto"
          />
          <div
            class="product-name font-semibold text-gray-800 mt-2 text-sm sm:text-base md:text-lg line-clamp-1"
          >
            {{ product.name }}
          </div>
          <p
            class="product-description text-xs sm:text-sm text-gray-600 mt-1 text-center line-clamp-2"
          >
            {{ product.description }}
          </p>
          <div
            class="product-price font-bold text-red-500 mt-2 text-sm sm:text-base md:text-lg"
          >
            {{ product.price }} VND
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
      products: [
        {
          image:
            "https://i.pinimg.com/564x/6a/cf/cd/6acfcda8d507182a09a999bb76db2714.jpg",
          name: "IPhone 16 ProMax 126GB",
          description: "Latest iPhone with cutting-edge features.",
          price: "40.000.000đ",
          old_price: "43.000.000đ",
          brand: "Apple",
        },
        {
          image:
            "https://i.pinimg.com/564x/cf/30/d6/cf30d6005ede065f9999b213e06d8c10.jpg",
          name: "iPhone 14 Pro Max",
          description: "Advanced iPhone with ProMotion display and A16 chip.",
          price: "30.000.000đ",
          old_price: "35.000.000đ",
          brand: "Apple",
        },
        {
          image:
            "https://i.pinimg.com/564x/a9/98/ed/a998ed474b5b008ac358228c8cff6ca5.jpg",
          name: "Dell XPS 13",
          description:
            "High-performance laptop with 11th Gen Intel processors.",
          price: "25.000.000đ",
          old_price: "28.000.000đ",
          brand: "Dell",
        },
        {
          image:
            "https://i.pinimg.com/564x/ef/80/21/ef802136370ef03b5149701084010e3f.jpg",
          name: "Samsung Galaxy S21 Ultra",
          description:
            "Premium smartphone with a 108MP camera and 120Hz display.",
          price: "35.000.000đ",
          old_price: "40.000.000đ",
          brand: "Samsung",
        },
        {
          image:
            "https://i.pinimg.com/564x/5f/3a/31/5f3a3124a238127a08400c303242cc24.jpg",
          name: "LG Gram 17",
          description: "Lightweight 17-inch laptop with long battery life.",
          price: "27.000.000đ",
          old_price: "32.000.000đ",
          brand: "LG",
        },
        {
          image:
            "https://i.pinimg.com/564x/f1/ef/2b/f1ef2be92c47d67a539dca1bf5b5fde2.jpg",
          name: "Xiaomi Redmi Note 11 Pro 5G",
          description:
            "Feature-rich phone with 5G connectivity and 108MP camera.",
          price: "15.000.000đ",
          old_price: "18.000.000đ",
          brand: "Xiaomi",
        },
        {
          image:
            "https://i.pinimg.com/564x/4d/14/b5/4d14b5d4ad9ae9632ff54f1fb51622fa.jpg",
          name: "HP Omen 17",
          description:
            "High-performance gaming laptop with NVIDIA GeForce RTX graphics.",
          price: "40.000.000đ",
          old_price: "45.000.000đ",
          brand: "HP",
        },
        {
          image:
            "https://i.pinimg.com/564x/91/5e/a4/915ea4ca4b118c13680a62cc1ac0eaf6.jpg",
          name: "Sony WH-1000XM4",
          description: "Top-rated noise-canceling wireless headphones.",
          price: "8.000.000đ",
          old_price: "10.000.000đ",
          brand: "Sony",
        },
        {
          image:
            "https://i.pinimg.com/564x/9a/b6/0a/9ab60a3fc57bdbd48f524199b1f0a5bc.jpg",
          name: "Apple AirPods Pro",
          description:
            "Wireless earbuds with active noise cancellation and transparency mode.",
          price: "5.000.000đ",
          old_price: "6.500.000đ",
          brand: "Apple",
        },
      ],
    };
  },
  computed: {
    getSlidesPerView() {
      if (window.innerWidth >= 1024) return 6; // Desktop
      if (window.innerWidth >= 768) return 4; // Tablet
      return 2; // Mobile
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateSlidesPerView);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSlidesPerView);
  },
  methods: {
    updateSlidesPerView() {
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
/* Truncate product name and description */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.product-card {
  max-width: 250px; /* Same width for all cards */
  height: 300px; /* Ensure consistent card height */
}
.product-image {
  width: 170px;
  height: 150px;
  object-fit: cover; /* Hình ảnh sẽ tự cắt để vừa với kích thước */
}
</style>
