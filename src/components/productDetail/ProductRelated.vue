<template>
  <div>
    <div class="flex items-center mb-4">
      <div class="w-3 h-10 bg-orange-600 mr-1"></div>
      <p class="text-xl font-bold text-gray-800">Sản phẩm liên quan</p>
    </div>
    <div v-if="products.length === 0" class="flex items-center justify-center">
      không có dữ liệu
    </div>
    <div v-else class="discounted-products-container my-2 mx-auto border border-gray-50 rounded-lg shadow-md">
      <swiper :slides-per-view="getSlidesPerView" :space-between="10" :loop="false" class="products-swiper p-4">
        <swiper-slide v-for="(product, index) in products" :key="index" class="product-card-wrapper">
          <ProductCard :product="product" />
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
import { fetchRelatedProducts } from "@/api/productApi";

export default {
  components: { Swiper, SwiperSlide, ProductCard },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    getSlidesPerView() {
      if (window.innerWidth >= 1024) return 6;
      if (window.innerWidth >= 768) return 4;
      return 2;
    },
  },
  watch: {
    product: {
      immediate: true,
      handler(newProduct) {
        if (newProduct) {
          this.handleFetchProductRelated();
        }
      },
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
    async handleFetchProductRelated() {
      console.log(this.product)
      try {
        const { productBrand, productCategories } = this.product;
        const brandId = productBrand?.id;
        const categoryId = productCategories?.id;

        if (brandId && categoryId) {
          const response = await fetchRelatedProducts(brandId, categoryId);
          this.products = response.data;
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    },
  },
};
</script>
