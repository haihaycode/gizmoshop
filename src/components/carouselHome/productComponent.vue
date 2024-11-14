<template>
  <div>
    <div class="flex items-center mb-4 pt-3">
      <div class="w-3 h-10 bg-orange-600 mr-1"></div>
      <p class="text-xl font-bold text-gray-800 uppercase">Sản phẩm nổi bật</p>
    </div>
    <div class="product pl-2 pr-2 mx-auto mt-5 md:container-flush">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
           @mouseover="handleHover(product)"
          class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
        >
          <div
              class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg"
          >
            <!-- Kiểm tra xem product.discountProduct có giá trị không -->
            <span v-if="product.discountProduct">
              {{ product.discountProduct }}%
            </span>
            <span v-else>0%</span>
          </div>

          <img
              class="w-full h-48 object-cover"
              :src="loadImage(product.thumbnail, 'product')"
              :alt="product.productName"
              @error="handleImageError"
          />
          <div class="p-3 space-y-3">
            <h3
                class="text-lg font-bold mb-1 text-gray-800 h-11 overflow-hidden"
                style="line-height: 1.5rem"
            >
              {{ product.productName }}
            </h3>
            <div class="flex items-center space-x-1">
              <span class="text-lg font-semibold text-red-600">
                {{ formatCurrency(product.productPrice) }}
              </span>
              <span class="text-sm line-through text-gray-500">
                {{
                  formatCurrency(
                      calculateOldPrice(
                          product.productPrice,
                          product.discountProduct
                      )
                  )
                }}
              </span>
            </div>
            <div class="bg-gray-100 p-1 rounded-md border border-gray-300">
              <p
                  class="text-sm text-gray-700 h-12 overflow-hidden flex flex-col justify-between"
              >
                {{ product.productShortDescription }}
              </p>
            </div>
            <div class="flex items-center justify-between w-full">
              <!-- Phần hiển thị số lượng sản phẩm đã bán -->
              <div class="flex items-center">
                <span class="text-black text-lg sm:text-sm font-medium">
                  {{ product.soldProduct ? product.soldProduct : 0 }} đã bán
                </span>
              </div>

              <!-- Phần nút yêu thích với Boxicons, căn sang phải -->
              <div class="flex items-center justify-end ml-auto">
                <button
                  class="text-black hover:text-red-500 text-sm font-medium flex items-center space-x-2 transition duration-200 relative group"

                >
                  <i class="bx bx-heart text-xl"></i>
                  <span
                    class="absolute left-1/2 transform -translate-x-1/2 -top-6 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >Yêu thích</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
          class="text-center mt-4"
          v-if="visibleProducts.length < products.length"
      >
        <button
            @click="loadMore"
            class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
        >
          Xem thêm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { loadImage } from "@/services/imageService";
import { getProduct } from "@/api/productApi";

export default {
  data() {
    return {
      fallbackImage:
          "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
      products: [],
      itemsToShow: 10, // Hiển thị 10 sản phẩm đầu tiên
    };
  },

  computed: {
    // Dùng để hiển thị danh sách sản phẩm có số lượng sản phẩm giới hạn
    visibleProducts() {
      return this.products.slice(0, this.itemsToShow);
    },
  },

  async mounted() {
    // Lắng nghe sự kiện scroll
    window.addEventListener("scroll", this.handleScroll);
    window.scrollTo(0, 0);
    await this.getProduct(); // Lấy sản phẩm khi trang được tải
  },

  methods: {
    loadImage,
    handleHover(product) {
      this.$emit("hovered", product);
    },
    async getProduct() {
      try {
        const res = await getProduct();
        console.log(res); // Kiểm tra dữ liệu trả về từ API

        if (res && res.data && res.data.content) {
          this.products = res.data.content.map((product) => ({
            id: product.id,
            soldProduct: product.soldProduct,
            productName: product.productName,
            productPrice: product.productPrice,
            discountProduct: product.discountProduct,
            thumbnail: product.thumbnail, // Dữ liệu ảnh thumbnail
            productShortDescription: product.productShortDescription,
            productBrand: product.productBrand, // Thêm thông tin thương hiệu nếu cần
            productCategories: product.productCategories, // Thêm thông tin danh mục sản phẩm nếu cần
          }));
          console.log("Sản phẩm đã được lấy:", this.products);
        } else {
          console.error("Dữ liệu sản phẩm không hợp lệ:", res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error.message);
      }
    },
    calculateOldPrice(productPrice, discountProduct) {
      // Tính giá cũ bằng cách sử dụng giá gốc và phần trăm giảm giá
      if (discountProduct && productPrice) {
        return productPrice * (1 + discountProduct / 100);
      }
      return productPrice; // Nếu không có giảm giá, trả về giá gốc
    },
    formatCurrency(value) {
      // Hàm định dạng tiền tệ theo kiểu VND
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    handleScroll() {
      // Xử lý sự kiện scroll khi người dùng kéo xuống cuối trang
      const bottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight;
      if (bottom) {
        this.loadMore(); // Nếu đã kéo đến cuối trang, tải thêm sản phẩm
      }
    },

    loadMore() {
      // Tăng số lượng sản phẩm hiển thị lên mỗi khi nhấn "Xem thêm"
      this.itemsToShow += 10;
    },

    handleImageError(event) {
      // Xử lý lỗi khi hình ảnh không thể tải được (hiển thị hình ảnh mặc định)
      event.target.src = this.fallbackImage;
    },
  },
};
</script>

<style scoped>
/* CSS tùy chỉnh (nếu cần) */
</style>
