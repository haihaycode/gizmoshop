<template>
  <div class="flex flex-wrap w-full" ref="content">
    <div
      v-if="isLoading"
      class="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-800"
    >
      <div
        class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-red-500"
      ></div>
      <img
        src="https://i.pinimg.com/736x/93/62/f8/9362f8b574c0d01f96129bd57ba2ec3b.jpg"
        class="rounded-full h-20 w-20 opacity-80"
      />
    </div>
    <div class="w-full lg:w-7/10 md:w-2/3 p-4">
      <a
        href="/cart"
        class="relative flex items-center text-red-500 hover:text-red-600 font-semibold text-lg bg-white pb-4"
      >
        <!-- Icon mũi tên -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Quay lại giỏ hàng
      </a>

      <ListProduct
        v-for="(product, index) in cartItems"
        :key="product.productId.id"
        :product="product"
        :index="index"
        :formatCurrency="formatCurrency"
        :updateQuantity="updateQuantity"
        :removeProduct="removeProduct"
      />
    </div>

    <!-- Thành phần tổng kết giỏ hàng chiếm 3 phần -->
    <div class="w-full lg:w-3/10 md:w-1/3 p-4">
      <VoucherAmountComponent :totalPrice="finalPrice" />
    </div>
  </div>
</template>

<script>
import ListProduct from "@/components/cart/ListProduct.vue";
import VoucherAmountComponent from "@/components/cart/voucherAmoutComponent.vue";
import { getCart } from "@/api/CartApi";

export default {
  name: "CartToOrder",
  components: {
    ListProduct,
    VoucherAmountComponent,
  },
  data() {
    return {
      isLoading: false,
      cartItems: [],
    };
  },
  computed: {
    discountAmount() {
      return this.cartItems.reduce(
        (total, item) =>
          total +
          ((item.productId.productPrice * item.productId.discountProduct) /
            100) *
            item.quantity,
        0
      );
    },
    finalPrice() {
      return this.totalPrice - this.discountAmount;
    },
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.productId.productPrice * item.quantity,
        0
      );
    },
  },
  mounted() {
    this.getViewCart();
    console.log(this.cartItems);
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    async getViewCart() {
      this.isLoading = true;

      try {
        const response = await getCart();
        this.cartItems = response.data;
      } catch (error) {
        this.errorMessage = "Không thể tải giỏ hàng.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
