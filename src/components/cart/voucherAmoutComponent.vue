<template>
  <div class="bg-white w-full p-4 rounded-lg shadow-lg border border-gray-200">
    <h2 class="text-lg font-bold mb-4">Tổng kết giỏ hàng</h2>
    <div class="mb-4">
      <div class="border p-4 rounded-lg cursor-pointer bg-orange-50 border-orange-500 text-orange-800">
        <div class="flex items-center">
          <div class="w-1/3 mr-4">
            <img v-if="selectedVoucher && selectedVoucher.image" :src="loadImage(selectedVoucher.image, 'voucher')"
              alt="Voucher Image" class="w-full h-20 object-cover rounded-lg" />
            <img v-else src="https://i.pinimg.com/736x/0d/b3/96/0db3963e06b67499f517d7074229f1a9.jpg"
              alt="Voucher Default Image" class="w-full h-20 object-cover rounded-lg" />
          </div>
          <div class="w-2/3">
            <h3 class="text-sm font-bold">
              {{ selectedVoucher ? selectedVoucher.code : "Chọn voucher..." }}
            </h3>
            <p v-if="selectedVoucher" class="text-gray-500">
              Giảm {{ selectedVoucher.discountPercent }}%
            </p>
            <button class="mt-2 text-sm underline text-orange-600" @click="showModal = true">
              Chọn voucher khác
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <div class="flex justify-end mt-6">
          <button class="px-4 py-2  text-red-500 text-sm sm:text-base rounded-sm" @click="showModal = false">
            X
          </button>
        </div>
        <!-- Danh sách voucher -->
        <div v-if="vouchers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="voucher in vouchers" :key="voucher.id" @click="selectVoucher(voucher)"
            class="border p-4 rounded-lg cursor-pointer hover:bg-gray-100 border-gray-300 text-gray-700 transition-transform transform hover:scale-105"
            :class="{
              'border-orange-500 bg-orange-50':
                selectedVoucher && selectedVoucher.id === voucher.id,
            }">
            <div class="flex items-center space-x-4">
              <!-- Hình ảnh voucher -->
              <div class="w-1/3">
                <img v-if="voucher.image" :src="loadImage(voucher.image, 'voucher')" alt="Voucher Image"
                  class="w-full h-20 object-cover rounded-lg" />
                <img v-else src="https://i.pinimg.com/736x/0d/b3/96/0db3963e06b67499f517d7074229f1a9.jpg"
                  alt="Voucher Default Image" class="w-full h-20 object-cover rounded-lg" />
              </div>

              <!-- Nội dung voucher -->
              <div class="w-2/3">
                <h4 class="text-sm sm:text-base md:text-lg font-bold">
                  {{ voucher.code }}
                </h4>
                <!-- Kiểm tra nếu có discountPercent thì hiển thị phần trăm, ngược lại hiển thị số tiền giảm -->
                <p class="text-gray-500 text-xs sm:text-sm md:text-base">
                  <span v-if="voucher.discountPercent">
                    Giảm {{ voucher.discountPercent }}%
                  </span>
                  <span v-else>{{ voucher.discountAmount }} VND </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-gray-500 text-center">
          Không có voucher khả dụng
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mb-4 mt-4">
      <p class="text-gray-600">Tạm tính:</p>
      <p class="font-semibold">{{ formatCurrency(totalPrice) }}</p>
    </div>
    <div class="flex justify-between items-center mb-4">
      <p class="text-gray-600">Giảm giá (voucher):</p>
      <p class="font-semibold text-red-500">
        {{ formatCurrency(discountAmount) }}
      </p>
    </div>
    <div class="flex justify-between items-center border-t pt-4">
      <p class="text-lg font-bold">Tổng cộng:</p>
      <p class="text-lg font-bold text-green-600">
        {{ formatCurrency(finalPrice) }}
      </p>
    </div>

    <div class="mt-2">
      <label class="block text-gray-700 font-medium mb-2">
        Chọn địa chỉ giao hàng
      </label>
      <div @click="toggleAddressList" class="border p-4 rounded-lg cursor-pointer hover:bg-gray-100">
        <p v-if="selectedAddress">
          {{ selectedAddress.city }} - {{ selectedAddress.specificAddress }}
        </p>
        <p v-else>Chọn địa chỉ giao hàng</p>
      </div>

      <div v-if="userAddresses.length === 0" class="mt-0 text-red-500">
        Bạn chưa thêm địa chỉ nhận hàng
      </div>

      <div v-if="showAddressList && userAddresses.length > 0" class="mt-4 max-h-60 overflow-y-auto">
        <div v-for="address in userAddresses" :key="address.id" @click="selectAddress(address)"
          class="border p-4 rounded-lg mb-2 cursor-pointer hover:bg-orange-50" :class="{
            'bg-orange-50 border-orange-500':
              selectedAddress && selectedAddress.id === address.id,
            'bg-white border-gray-300': !(
              selectedAddress && selectedAddress.id === address.id
            ),
          }">
          <p>{{ address.city }} - {{ address.specificAddress }}</p>
          <p class="text-sm text-gray-500">
            {{ address.district }}, {{ address.commune }}
          </p>
          <p class="text-sm text-gray-500">SĐT: {{ address.sdt }}</p>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <div class="flex items-center justify-between">
        <label class="text-gray-700 font-medium">Chọn ngân hàng (hoàn trả)</label>
        <button v-if="!showBankList" class="text-red-500 hover:text-red-600 font-sans text-sm" @click="toggleBankList">
          Thay đổi <i class="bx bx-edit-alt"></i>
        </button>
      </div>

      <div v-if="selectedBank"
        class="bank-card p-4 bg-white border border-gray-300 w-full rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
        @click="toggleBankList">
        <div class="bank-info text-center">
          <div class="bank-name text-lg font-semibold text-gray-800">
            {{ selectedBank.bankName }}
          </div>
          <div class="bank-seri text-sm text-gray-500 mt-2">
            Số thẻ: {{ selectedBank.swiftCode || "Không có" }}
          </div>
        </div>
      </div>
      <div v-if="userBanks.length === 0" class="mt-1 text-red-500">
        Bạn chưa liên kết ngân hàng nào.
      </div>
      <div v-if="showBankList && userBanks.length > 0" class="grid gap-4 mt-4">
        <div v-for="(bank, index) in userBanks" :key="index"
          class="bank-card p-4 bg-white border border-gray-300 w-full rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
          @click="selectBank(bank)">
          <div class="bank-info text-center">
            <div class="bank-name text-lg font-semibold text-gray-800">
              {{ bank.bankName }}
            </div>
            <div class="bank-seri text-sm text-gray-500 mt-2">
              Số thẻ: {{ bank.swiftCode || "Không có" }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <label class="block text-gray-700 font-medium mb-2">
          Chọn phương thức thanh toán
        </label>
        <div class="grid grid-cols-2 gap-4">
          <div class="payment-method border p-4 rounded-lg cursor-pointer text-center hover:bg-gray-100" :class="{
            'border-green-500 bg-green-50': selectedPaymentMethod === 'cash',
            'border-gray-300 bg-white': selectedPaymentMethod !== 'cash',
          }" @click="selectPaymentMethod('cash')">
            <i class="bx bx-money text-green-500 text-2xl"></i>
            <p class="mt-2 text-gray-700 font-medium">Thanh toán trực tiếp</p>
          </div>
          <div class="payment-method border p-4 rounded-lg cursor-pointer text-center hover:bg-gray-100" :class="{
            'border-green-500 bg-green-50': selectedPaymentMethod === 'bank',
            'border-gray-300 bg-white': selectedPaymentMethod !== 'bank',
          }" @click="selectPaymentMethod('bank')">
            <i class="bx bx-credit-card text-blue-500 text-2xl"></i>
            <p class="mt-2 text-gray-700 font-medium">
              Thanh toán qua ngân hàng
            </p>
          </div>
        </div>
      </div>
    </div>

    <button v-if="isPurchaseReady"
      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-3 rounded w-full" @click="handlePurchase">
      Mua Ngay
    </button>
  </div>
</template>

<script>
import { loadImage } from "@/services/imageService";
import { getVoucherForUser } from "@/api/voucherApi";
import { getWallet } from "@/api/walletApi";
import { getAddressUser } from "@/api/addressApi";
import { placeOrder } from "@/api/orderForCustomerApi";
import notificationService from "@/services/notificationService";
import { createPaymentForOrderCustumer } from "@/api/vnpayApi";
import { mapGetters } from "vuex";
export default {
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      selectedVoucher: null,

      selectedBank: null,
      showBankList: false,
      selectedWallet: "",
      vouchers: [],
      showAddressList: false,
      selectedAddress: null,
      userBanks: [],
      selectedPaymentMethod: null,
      userAddresses: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['token', 'user', 'name', 'role']),
    isPurchaseReady() {
      return (
        this.selectedAddress !== null &&
        this.selectedBank !== null &&
        this.selectedPaymentMethod !== null
      );
    },
    discountAmount() {
      if (this.selectedVoucher) {

        if (this.selectedVoucher.discountPercent > 0) {
          const discount =
            (this.totalPrice * this.selectedVoucher.discountPercent) / 100;
          return discount > this.selectedVoucher.maxDiscountAmount
            ? this.selectedVoucher.maxDiscountAmount
            : discount;
        }
        // Nếu voucher có discountAmount cố định
        else if (this.selectedVoucher.discountAmount > 0) {
          return this.selectedVoucher.discountAmount;
        }
      }
      return 0;
    },
    finalPrice() {
      return this.totalPrice - this.discountAmount;
    },
  },
  methods: {
    handlePurchase() {
      if (!this.token) {
        notificationService.info("Vui lòng đăng nhập");
        return
      }
      console.log("Thông tin mua hàng:");
      console.log("Địa chỉ đã chọn:", this.selectedAddress);
      console.log("Ngân hàng đã chọn:", this.selectedBank);
      console.log("Phương thức thanh toán:", this.selectedPaymentMethod);
      console.log("Voucher đã chọn:", this.selectedVoucher);
      console.log("Tổng tiền thanh toán:", this.finalPrice);
      if (this.selectedPaymentMethod === "cash") {
        this.handleCashPayment(); //khi nhận hàng
      } else if (this.selectedPaymentMethod === "bank") {
        this.handleOnlinePayment(); //khi đặt hàng (online)
      } else {
        console.log("Phương thức thanh toán không hợp lệ.");
      }
    },
    async handleCashPayment() {
      const orderRequest = {
        addressId: this.selectedAddress.id,
        paymentMethod: true, // true for COD
        walletId: this.selectedBank.id, // No wallet ID required for cash
        note: this.orderNote,
        voucherId: this.selectedVoucher ? this.selectedVoucher.id : null,
      };
      try {
        const res = await placeOrder(orderRequest);
        notificationService.success(res.message);
        this.$emit("load-cart");
      } catch (error) {
        console.error(error);
      }
    },
    async handleOnlinePayment() {
      const orderRequest = {
        addressId: this.selectedAddress.id,
        paymentMethod: false, //false for online payment
        walletId: this.selectedBank.id, // No wallet ID required for cash
        note: this.orderNote,
        voucherId: this.selectedVoucher ? this.selectedVoucher.id : null,
        amount: this.finalPrice,
        type: "order_payment",
      };
      try {
        const res = await createPaymentForOrderCustumer(
          orderRequest.amount,
          orderRequest.walletId,
          orderRequest.voucherId,
          orderRequest.addressId,
          orderRequest.type
        );
        if (res && res.data.paymentUrl) {
          window.location.href = res.data.paymentUrl;
        } else {
          console.error("Không tìm thấy URL thanh toán trong phản hồi .");
        }
      } catch (error) {
        console.error(error);
      }
    },
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
    },
    selectBank(bank) {
      this.selectedBank = bank;
      this.showBankList = false;
      console.log("Ngân hàng đã chọn:", bank);
    },

    toggleBankList() {
      this.showBankList = !this.showBankList;
    },
    loadImage,
    toggleAddressList() {
      this.showAddressList = !this.showAddressList;
    },
    selectAddress(address) {
      this.selectedAddress = address;
      this.showAddressList = false;
    },
    async handleFetchVoucher() {
      try {
        const response = await getVoucherForUser();
        // Lọc các voucher
        this.vouchers = response.data.filter((voucher) => {
          let isValid = false;
          const totalPrice = this.totalPrice;
          if (voucher.discountAmount > 0) {
            if (totalPrice >= voucher.minimumOrderValue) {
              isValid = true;
            }
          } else if (voucher.discountPercent > 0) {
            const discount = (voucher.discountPercent / 100) * totalPrice;
            if (discount <= voucher.maxDiscountAmount) {
              isValid = true;
            }
          }

          return isValid;
        });
      } catch (error) {
        console.error("Failed to load vouchers:", error?.message || error);
      }
    },
    async handleFetchWallet() {
      try {
        const response = await getWallet();

        this.userBanks = response.data; // Gán dữ liệu vào userBanks
      } catch (error) {
        console.error("Failed to load wallets:", error?.message || error);
      }
    },
    async handleFetchAddress() {
      try {
        const response = await getAddressUser();
        this.userAddresses = response.data;
        if (response.length > 0) {
          this.selectedAddress = response[0]; // Mặc định chọn địa chỉ đầu tiên
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    },

    selectVoucher(voucher) {
      this.selectedVoucher = voucher;
      this.showModal = false;
    },
  },
  mounted() {
    if (!this.token) {
      notificationService.info("Vui lòng đăng nhập");
      return;
    }
    this.handleFetchVoucher();
    this.handleFetchAddress();
    this.handleFetchWallet();
  },
  created() {
    if (!this.token) {
      notificationService.info("Vui lòng đăng nhập");
      return;
    }
    this.handleFetchWallet();
  },
};
</script>
