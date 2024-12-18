<template>
  <div>
    <div class="text-red-500 text-center mt-2" v-if="isLoading">
      <p class="text-red-500"> <i class='bx bx-loader bx-spin'></i> &nbsp; Đang tải dữ liệu ...</p>
      <img class="w-[400px] mx-auto animate-pulse opacity-30" :src="require('@/assets/gizmoImageLoading/gizmo.png')"
        alt="">
    </div>
    <div v-if="cartItems.length > 0" class="flex flex-wrap w-full" ref="content">
      <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-800">
        <div class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-red-500"></div>
        <img @error="onImageError" src="https://i.pinimg.com/736x/93/62/f8/9362f8b574c0d01f96129bd57ba2ec3b.jpg"
          class="rounded-full h-20 w-20 opacity-80" />
      </div>
      <div class="w-full lg:w-7/10 md:w-2/3 p-4">
        <a href="/cart"
          class="relative flex items-center text-red-500 hover:text-red-600 font-semibold text-lg bg-white pb-4">
          <!-- Icon mũi tên -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại giỏ hàng
        </a>

        <ListProduct v-for="(product, index) in cartItems" :key="product.productId.id" :product="product" :index="index"
          :formatCurrency="formatCurrency" :updateQuantity="updateQuantity" :removeProduct="removeProduct" />
      </div>

      <!-- Thành phần tổng kết giỏ hàng chiếm 3 phần -->
      <div class="w-full lg:w-3/10 md:w-1/3 p-4">
        <VoucherAmountComponent :totalPrice="finalPrice" @load-cart="getViewCart" :cartItems="cartItems" />
      </div>
    </div>
    <div v-if="cartItems.length <= 0 && !isLoading" class="text-center mt-6 ">
      <img @error="onImageError" src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" class="mx-auto" alt=""
        srcset="">
      <p>Không có sản phẩm nào trong giỏ hàng
        <router-link :to="{ name: 'product' }">
          <span class="text-red-500 underline hover:text-blue-500">Tiếp tục mua sắm</span>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import ListProduct from "@/components/cart/ListProduct.vue";
import VoucherAmountComponent from "@/components/cart/voucherAmoutComponent.vue";
import { getCart } from "@/api/CartApi";
import { mapGetters } from "vuex";
import notificationService from "@/services/notificationService";
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
    ...mapGetters('auth', ['token', 'user', 'name', 'role']),
    ...mapGetters('loading', ['isLoading']),
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
    onImageError(event) {
      event.target.src = 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg';
    },
    formatCurrency(value) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    async getViewCart() {
      if (!this.token) {
        notificationService.info("Vui lòng đăng nhập");
        return;
      }
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
