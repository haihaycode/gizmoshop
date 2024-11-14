<template>
  <div class="rounded-md">
    <div class="flex items-center mb-4">
      <button class="text-red-600 font-semibold">Giỏ hàng</button>
    </div>
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center">
        <input
          type="checkbox"
          class="form-checkbox h-5 w-5 text-red-600"
          v-model="selectAll"
          @change="toggleSelectAll"
        />
        <label class="ml-2 text-gray-700">Bỏ chọn tất cả</label>
      </div>
      <button class="text-gray-500 text-sm" @click="removeSelectedProducts">
        Xóa sản phẩm đã chọn
      </button>
    </div>

    <div
      v-for="(product, index) in products"
      :key="index"
      class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between mb-2"
    >
      <div class="flex items-center">
        <input
          type="checkbox"
          class="form-checkbox h-5 w-5 text-red-600 mr-4"
          v-model="product.selected"
        />
        <img
          :src="product.image"
          alt="Product Image"
          class="w-16 h-16 object-cover rounded-lg"
        />
        <div class="ml-4">
          <p class="text-gray-700 font-medium">{{ product.name }}</p>
          <div class="flex items-center mt-1">
            <p class="text-red-500 text-lg font-semibold">
              {{ product.price }}đ
            </p>
            <p
              class="text-gray-400 text-sm line-through ml-2"
              v-if="product.originalPrice"
            >
              {{ product.originalPrice }}đ
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <button
          class="text-gray-500 border rounded-full w-8 h-8 flex items-center justify-center"
          @click="decreaseQuantity(index)"
        >
          -
        </button>
        <input
          type="text"
          class="w-10 text-center border border-gray-300 mx-2 rounded-md"
          v-model.number="product.quantity"
        />
        <button
          class="text-gray-500 border rounded-full w-8 h-8 flex items-center justify-center"
          @click="increaseQuantity(index)"
        >
          +
        </button>
        <button class="text-gray-500 ml-4" @click="removeProduct(index)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartComponent",
  data() {
    return {
      selectAll: false,
      products: [
        {
          name: "Tai nghe Bluetooth True Wireless Baseus Bowie E11-Đen",
          image: "https://via.placeholder.com/60",
          price: 270000,
          originalPrice: 690000,
          quantity: 1,
          selected: true,
        },
        {
          name: "Tai nghe Bluetooth True Wireless Baseus Bowie E11-Đen",
          image: "https://via.placeholder.com/60",
          price: 270000,
          originalPrice: 690000,
          quantity: 1,
          selected: true,
        },
        // Thêm nhiều sản phẩm khác vào đây
      ],
    };
  },
  methods: {
    toggleSelectAll() {
      this.products.forEach((product) => {
        product.selected = this.selectAll;
      });
    },
    removeSelectedProducts() {
      this.products = this.products.filter((product) => !product.selected);
      this.selectAll = false;
    },
    increaseQuantity(index) {
      this.products[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
      }
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
  },
  watch: {
    products: {
      handler(newProducts) {
        this.selectAll = newProducts.every((product) => product.selected);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* Thêm bất kỳ style tùy chỉnh nào nếu cần */
</style>
