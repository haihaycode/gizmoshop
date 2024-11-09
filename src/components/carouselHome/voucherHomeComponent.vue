<template>
    <div class="voucher-container my-1 mx-1 sm:mx-0 md:mx-0 lg:mx-0 xl:mx-auto">
        <!-- Carousel for Mobile View -->
        <div v-if="isMobile" class="carousel">
            <div class="voucher-ticket flex shadow-sm rounded-sm overflow-hidden bg-white relative border-1">
                <!-- Left Section with Icon and Perforated Edge -->
                <div class="bg-red-500 flex items-center justify-center w-1/4 p-3 relative">
                    <div class="text-white text-3xl font-bold">
                        <i class='bx bxs-cart'></i>
                    </div>
                    <div class="perforated-edge absolute -right-2 top-0 bottom-0 flex flex-col justify-between">
                        <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                        <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                        <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                        <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                    </div>
                </div>

                <!-- Right Section with Text -->
                <div class="flex flex-col justify-between w-3/4 p-3">
                    <div>
                        <h3 v-if="currentVoucher.discountPercent" class="text-sm font-semibold text-gray-800">
                            Giảm {{ currentVoucher.discountPercent }}% Tối đa {{
                                currentVoucher.maxDiscountAmount?.toLocaleString() || '0' }} VND
                        </h3>
                        <h3 v-else-if="currentVoucher.discountAmount" class="text-sm font-semibold text-gray-800">
                            Giảm {{ currentVoucher.discountAmount?.toLocaleString() || '0' }} VND
                        </h3>
                        <p class="text-xs text-gray-600 mt-1">
                            Đơn Tối Thiểu: {{ currentVoucher.minimumOrderValue?.toLocaleString() || '0' }} VND
                        </p>
                    </div>
                    <div class="text-xs text-gray-500 flex items-center mt-2">
                        <i class="far fa-clock mr-1"></i>
                        Hiệu lực: {{ formatDay(currentVoucher.validFrom) }} - {{ formatDay(currentVoucher.validTo) }}
                        <a href="#" class="text-blue-500 ml-1">Điều Kiện</a>
                    </div>
                </div>

                <!-- New Label -->
                <div class="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                    Mới
                </div>
            </div>
        </div>

        <!-- Grid for Desktop View -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(voucher, index) in limitedVouchers" :key="voucher.id || index"
                class="voucher-ticket flex  rounded-sm overflow-hidden bg-white relative">
                <!-- Left Section with Icon and Perforated Edge -->
                <div class="bg-red-500 flex items-center justify-center w-1/4 p-3 relative">
                    <div class="text-white text-3xl font-bold">
                        <i class='bx bxs-cart'></i>
                    </div>
                    <div class="perforated-edge absolute -right-2 top-0 bottom-0 flex flex-col justify-between">
                        <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                        <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                        <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                        <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                    </div>
                </div>

                <!-- Right Section with Text -->
                <div class="flex flex-col justify-between w-3/4 p-3">
                    <div>
                        <h3 v-if="voucher.discountPercent" class="text-sm font-semibold text-gray-800">
                            Giảm {{ voucher.discountPercent }}% Tối đa {{ voucher.maxDiscountAmount?.toLocaleString() ||
                                '0' }}
                            VND
                        </h3>
                        <h3 v-else-if="voucher.discountAmount" class="text-sm font-semibold text-gray-800">
                            Giảm {{ voucher.discountAmount?.toLocaleString() || '0' }} VND
                        </h3>
                        <p class="text-xs text-gray-600 mt-1">
                            Đơn Tối Thiểu: {{ voucher.minimumOrderValue?.toLocaleString() || '0' }} VND
                        </p>
                    </div>
                    <div class="text-xs text-gray-500 flex items-center mt-2">
                        <i class="far fa-clock mr-1"></i>
                        Hiệu lực: {{ formatDay(voucher.validFrom) }} - {{ formatDay(voucher.validTo) }}
                        <a href="#" class="text-blue-500 ml-1">Điều Kiện</a>
                    </div>
                </div>

                <!-- New Label -->
                <div class="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                    Mới
                </div>
            </div>
        </div>


    </div>
    <div class="flex justify-end ">
        <span class="  font-semibold cursor-pointer text-base text-red-500 transition">
            Xem tất cả
        </span>
    </div>
</template>

<script>
import { getVoucherPage } from '@/api/voucherApi';
import { formatDay } from '@/utils/currencyUtils';

export default {
    data() {
        return {
            vouchers: [],
            currentIndex: 0,
            isMobile: window.innerWidth < 640,
        };
    },
    computed: {
        limitedVouchers() {
            return this.vouchers.slice(0, 4);
        },
        currentVoucher() {
            return this.vouchers[this.currentIndex] || {};
        },
    },
    async mounted() {
        await this.handleFetchVoucher();
        window.addEventListener("resize", this.checkScreenSize);

        if (this.isMobile) {
            setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.vouchers.length;
            }, 1500);
        }
    },
    methods: {
        formatDay,
        async handleFetchVoucher() {
            try {
                const response = await getVoucherPage();
                this.vouchers = response.data.content;
            } catch (error) {
                console.error("Failed to load vouchers:", error);
            }
        },
        checkScreenSize() {
            this.isMobile = window.innerWidth < 640;
        },
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkScreenSize);
    },
};
</script>

<style scoped>
.voucher-container {
    display: grid;
    gap: 1rem;
}

.voucher-ticket {
    display: flex;
    position: relative;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.voucher-ticket:hover {
    transform: translateY(-2px);
}

.perforated-edge {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.5rem 0;
}

.dot {
    height: 0.375rem;
    width: 0.375rem;
    background-color: white;
    border-radius: 50%;
}

.bg-red-500 {
    background-color: #ee4d2d;
}
</style>
