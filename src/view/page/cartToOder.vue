<template>
  <div class="flex flex-wrap w-full" ref="content">
    <div class="w-full lg:w-7/10 md:w-2/3 p-4">
      <a
        href="/cart"
        class="relative flex items-center text-red-500 hover:text-red-600 font-semibold text-lg bg-white pb-4 "
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
      <VoucherAmountComponent :totalPrice="totalPrice" />
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
      cartItems: [],
    };
  },
  computed: {
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
      try {
        const response = await getCart();
        this.cartItems = response.data; // Lưu giỏ hàng vào cartItems
      } catch (error) {
        console.error("Không thể tải giỏ hàng.", error);
      }
    },
    async removeProduct(index) {
      const productId = this.cartItems[index].productId.id; // Truy xuất id của sản phẩm
      // Xử lý xóa sản phẩm
      console.log(`Xóa sản phẩm với id: ${productId}`);
      // Gọi API xóa sản phẩm tại đây
    },
    updateQuantity(index, delta) {
      let newQuantity = this.cartItems[index].quantity + delta;
      // Đảm bảo số lượng không thấp hơn 1
      if (newQuantity < 1) newQuantity = 1;
      this.cartItems[index].quantity = newQuantity;
      // Gọi API cập nhật số lượng sản phẩm
      console.log(
        `Cập nhật số lượng cho sản phẩm với id: ${this.cartItems[index].productId.id} - mới: ${newQuantity}`
      );
    },
    proceedToCheckout() {
      this.$router.push("/toOrder");
    },
  },
};
</script>
