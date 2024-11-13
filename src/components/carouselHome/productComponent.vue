<template>
  <div>
    <div class="flex items-center mb-4 pt-3 h-screen">
      <div class="w-3 h-10 bg-orange-600 mr-1"></div>
      <p class="text-xl font-bold text-gray-800 uppercase">Sản phẩm nổi bật</p>
    </div>
    <div class="product pl-2 pr-2 mx-auto mt-5 md:container-flush">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="(product, index) in products" :key="index"
          class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
          <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            - 30%
          </div>
          <img class="w-full h-48 object-cover" :src="imageService(product.productImageMappingResponse, 'product')"
            :alt="product.productName" @error="handleImageError" />

          <div class="p-3 space-y-3">
            <h3 class="text-lg font-bold mb-1 text-gray-800 h-11 overflow-hidden" style="line-height: 1.5rem">
              {{ product.productName }}
            </h3>
            <div class="flex items-center space-x-1">
              <span class="text-lg font-semibold text-red-600">
                {{ formatCurrency(product.productPrice) }}
              </span>
              <span class="text-sm line-through text-gray-500">
                {{ formatCurrency(product.productPrice) }}
              </span>
            </div>
            <div class="bg-gray-100 p-1 rounded-md border border-gray-300">
              <p class="text-sm text-gray-700 h-12 overflow-hidden flex flex-col justify-between">
                {{ product.productShortDescription }}
              </p>
            </div>
            <div class="flex items-center justify-between space-x-2">
              <span class="text-yellow-500 text-lg"> ★★★★☆ </span>
              <button class="text-gray-500 hover:text-red-500 text-sm font-medium">
                Yêu thích ❤️
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-4" v-if="visibleProducts.length < products.length">
        <button @click="loadMore" class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500">
          Xem thêm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { imageService } from "@/services/imageService";
import { getProduct } from "@/api/productApi";
export default {
  data() {
    return {
      fallbackImage:
        "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
      products: [],

      itemsToShow: 10, // Khai báo đúng
    };
  },

  computed: {
    visibleProducts() {
      return this.products.slice(0, this.itemsToShow);
    },
  },
  async mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.scrollTo(0, 0);
  },
  methods: {
    imageService,
    async getProduct() {
      try {
        const res = await getProduct();
        // Ánh xạ dữ liệu từ API và gán vào mảng products
        this.products = res.data.content.map((product) => {
          return {
            ...product,
            productImageMappingResponse:
              product.productImageMappingResponse || [],
          };
        });
        console.log(this.products); // Kiểm tra lại dữ liệu
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error.message);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    loadMore() {
      this.itemsToShow += 10;
    },
  },
};
</script>
