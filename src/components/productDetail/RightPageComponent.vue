<template>
  <div class="product-container px-4 md:p-4">
    <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      <div class="w-full space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">{{ productTitle }}</h2>
        <hr class="m-1 border-gray-300" />
        <div class="text-gray-500 text-sm flex items-center space-x-2">
          <span class="flex items-center font-bold">
            {{ productRating }}
            <i class="bx bxs-star ml-1 text-yellow-500"></i>
          </span>
          <span class="flex items-center">
            <i class="bx bxs-heart text-red-500 mr-1"></i>
            <span class="hidden md:inline">{{ productLikes }}</span>
            <span class="md:hidden">{{ productLikes }}</span>
            <span class="hidden lg:inline"> lượt thích</span>
          </span>

          <!-- Lượt xem -->
          <span class="flex items-center">
            <i class="bx bxs-show text-gray-600 mr-1"></i>
            <span class="hidden md:inline">{{ productViews }}</span>
            <span class="md:hidden">{{ productViews }}</span>
            <span class="hidden lg:inline"> lượt xem</span>
          </span>

          <!-- Đã bán -->
          <span class="flex items-center">
            <i class="bx bx-cart text-green-500 mr-1"></i>
            <span class="hidden md:inline">{{ productSold }}</span>
            <span class="md:hidden">{{ productSold }}</span>
            <span class="hidden lg:inline"> đã bán</span>
          </span>
        </div>

        <!-- Giá sản phẩm -->
        <div class="flex items-center space-x-4 mt-2">
          <span class="text-lg md:text-xl font-bold text-red-500">
            {{ formatCurrency(productDiscountedPrice) }}₫
          </span>
          <!-- Hiển thị giá gốc -->
          <span class="text-sm line-through text-gray-400">
            {{ formatCurrency(productOriginalPrice) }}₫
          </span>
          <!-- Hiển thị phần trăm giảm giá -->
          <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{{ productDiscountPercentage }}%
          </span>
        </div>

        <!-- Thông tin sản phẩm -->
        <div class="text-sm text-gray-600 space-y-2 mt-2">
          <p><strong>Danh mục:</strong> {{ productCategory }}</p>
          <p><strong>Thương hiệu:</strong> {{ productBrand }}</p>
          <p><strong>Số lượng còn lại:</strong> {{ productStock }}</p>
          <p><strong>Mô tả :</strong> {{ productShortDescription }}</p>
        </div>
    
        <div
          class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 mt-4"
        >
          <!-- Điều chỉnh số lượng -->
          <div class="flex items-center border border-gray-300 rounded">
            <button @click="decreaseQuantity" class="px-3 py-1 md:px-4">
              <i class="bx bx-minus"></i>
            </button>
            <input
              type="number"
              v-model="quantity"
              min="1"
              class="w-12 text-center border-l border-r border-gray-300"
            />
            <button @click="increaseQuantity" class="px-3 py-1 md:px-4">
              <i class="bx bx-plus"></i>
            </button>
          </div>

          <!-- Nút Thêm Vào Giỏ Hàng -->
          <button
            class="bg-red-500 text-white flex items-center justify-center px-3 py-1 md:px-4 md:py-1 rounded hover:bg-red-600 w-full md:w-auto"
          >
            <i class="bx bx-cart-add mr-1"></i>
            <span class="hidden lg:inline">Thêm Vào Giỏ Hàng</span>
            <span class="inline lg:hidden">Thêm</span>
            <!-- Chỉ hiển thị "Thêm" trên điện thoại -->
          </button>

          <!-- Nút Yêu Thích -->
          <button
            @click="toggleWishlist"
            class="bg-gray-300 text-gray-700 flex items-center justify-center px-3 py-1 md:px-4 md:py-1 rounded hover:bg-gray-400 w-full md:w-auto"
          >
            <i :class="isInWishlist ? 'bx bxs-heart' : 'bx bx-heart'"></i>
            <span class="hidden lg:inline ml-1">
              {{ isInWishlist ? "Đã Yêu Thích" : "Thêm vào Yêu Thích" }}
            </span>
            <span class="inline lg:hidden ml-1">
              {{ isInWishlist ? "Đã Yêu Thích" : "Thêm" }}
            </span>
          </button>
        </div>

        <!-- <div class="mt-6 p-4 border rounded-lg shadow-sm bg-white">
          <h3 class="text-xl text-gray-800 font-semibold">Đặc điểm nổi bật:</h3>

          <p
            class="text-sm text-gray-600 mt-2"
            :class="{
              'line-clamp-3': !isExpanded,
              'line-clamp-none': isExpanded,
            }"
            v-html="productLongDescription"
          ></p>

          <button
            @click="toggleDescription"
            class="text-blue-500 text-sm mt-3 underline"
          >
            {{ isExpanded ? "Thu gọn" : "Xem thêm" }}
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productTitle: "RAM G.Skill Trident Z RGB 16GB (2 x 8GB) DDR4-3200",
      productRating: 4.8,
      productReviews: "1.5k",
      productSold: 12000,
      productViews: 25000,
      productLikes: 1800,
      productOriginalPrice: 3500000,
      productDiscountedPrice: 2900000,
      productDiscountPercentage: 17,
      productCategory: "RAM & Bộ Nhớ",
      productBrand: "G.Skill",
      productStock: 1500,
      productShortDescription:
        "RAM DDR4 hiệu suất cao, RGB nổi bật và ổn định.",
      productLongDescription:
        "G.Skill Trident Z RGB là bộ RAM DDR4 hiệu suất cao, với thiết kế RGB đẹp mắt mang đến trải nghiệm ánh sáng sống động. Tốc độ đạt tới 3200MHz, giúp bạn nâng cao hiệu suất cho các tác vụ đòi hỏi khả năng xử lý mạnh mẽ như chơi game, chỉnh sửa video, và render đồ họa. RAM này hỗ trợ các phần mềm RGB phổ biến như ASUS Aura Sync, MSI Mystic Light, và Gigabyte RGB Fusion để bạn có thể tùy chỉnh ánh sáng theo sở thích cá nhân. Bộ nhớ có dung lượng 16GB (2 x 8GB) là lựa chọn lý tưởng cho các hệ thống chơi game, máy tính workstation hoặc bất kỳ ứng dụng yêu cầu khả năng đa nhiệm cao và ổn định. Sử dụng công nghệ XMP 2.0, RAM tự động ép xung để đảm bảo hiệu suất tối ưu mà không cần ",
      productImage: "https://via.placeholder.com/500", // Sử dụng ảnh thực tế của RAM nếu có
      colorOptions: ["RGB"],
      sizeOptions: ["16GB (2 x 8GB)", "32GB (2 x 16GB)", "64GB (4 x 16GB)"],
      quantity: 1,
      isInWishlist: false,
      isExpanded: false,
    };
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    toggleWishlist() {
      this.isInWishlist = !this.isInWishlist;
    },
    toggleDescription() {
      this.isExpanded = !this.isExpanded; // Chuyển đổi trạng thái hiển thị mô tả
    },
    formatCurrency(value) {
      return value.toLocaleString("vi-VN"); // Định dạng tiền theo kiểu Việt Nam
    },
  },
};
</script>

<style scoped>
/* Thêm style tùy chỉnh nếu cần */
.product-container {
  max-width: 1200px;
  margin: 0 auto;
}
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Hiển thị tối đa 3 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f4f4f4;
}
</style>
