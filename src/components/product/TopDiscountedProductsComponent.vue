<template>
  <div>
    <div class="discounted-products-container my-2 mx-auto border border-gray-50 rounded-lg shadow-md">
      <!-- Header with title and view all link -->
      <div
        class="header flex flex-col sm:flex-row justify-between items-center bg-red-600 text-white px-4 py-2 rounded-t-lg">
        <div class="flex items-center space-x-2">
          <!-- Lightning Icon (SVG) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-200" fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M13 2L3 14h7v8l11-12h-8z" />
          </svg>
          <h2 class="font-bold text-lg sm:text-xl md:text-2xl">Giảm Giá Sốc</h2>
        </div>
      </div>

      <!-- Swiper for Products with Responsive Slides Per View -->
      <swiper :slides-per-view="getSlidesPerView" :space-between="10" :loop="false" class="products-swiper p-4">
        <swiper-slide v-for="(product, index) in products" :key="index" class="product-card-wrapper">
          <!-- Sử dụng component ProductCard -->
          <div v-if="isLoading">
            <ProductSkeletonComponent v-for="n in 5" :key="n" />
          </div>
          <div v-else>
            <ProductCard :product="product" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="flex justify-end px-3">
      <span class="font-semibold cursor-pointer text-base text-red-500 transition">
        Xem tất cả
      </span>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import ProductCard from "@/components/product/ProductCard.vue";
import { getProduct } from "@/api/productApi";
import ProductSkeletonComponent from "../containers/loading/ProductSkeletonComponent.vue";

export default {
  components: { Swiper, SwiperSlide, ProductCard, ProductSkeletonComponent },
  data() {
    return {
      products: [
      ],
      filter: {
        limit: 15,
        page: 0,
        sortDirection: 'desc',
        sortParams: 'discountProduct',
        searchWith: '',
      },
    };
  },
  computed: {
    getSlidesPerView() {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      return 2; // Mobile
    },
  },
  mounted() {
    this.handleFetchProduct()
    window.addEventListener("resize", this.updateSlidesPerView);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSlidesPerView);
  },
  methods: {
    updateSlidesPerView() {
      this.$forceUpdate();
    },
    async handleFetchProduct() {
      const res = await getProduct(this.filter)
      this.products = res.data.content;
    }


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
  max-width: 250px;
  /* Same width for all cards */
  height: 300px;
  /* Ensure consistent card height */
}

.product-image {
  width: 170px;
  height: 150px;
  object-fit: cover;
  /* Hình ảnh sẽ tự cắt để vừa với kích thước */
}
</style>
