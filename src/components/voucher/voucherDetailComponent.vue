<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal">
            <template #header>
                <h2 class="text-2xl font-bold text-center">Mã giảm giá: <span class="text-[#ee4d2d]">{{
                    voucherData.code }}</span></h2>
            </template>
            <template #body>
                <div
                    class="bg-white shadow-sm rounded-sm p-1 space-y-2 min-w-[600px] max-w-[1000px] mx-auto relative overflow-x">
                    <!-- Discount Banner -->
                    <img :src="voucherData.image ? loadImage(voucherData.image, 'voucher') : imageDefault"
                        class="w-full h-full rounded-sm  shadow-md mb-4 transition-transform transform " />


                    <div class="border-t border-gray-300 pt-4">
                        <h3 class="text-lg font-semibold text-[#ee4d2d]">Thông tin giảm giá</h3>
                        <div class="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-800">
                            <div v-if="!voucherData.discountPercent">
                                <span class="font-medium">Giảm giá:</span>
                                <span class="ml-1">{{ voucherData.discountAmount }} VNĐ</span>
                            </div>
                            <div v-if="!voucherData.discountAmount">
                                <span class="font-medium">Phần trăm giảm:</span>
                                <span class="ml-1">{{ voucherData.discountPercent }}%</span>
                            </div>
                            <div>
                                <span class="font-medium">Đơn hàng tối thiểu:</span>
                                <span class="ml-1">{{ formatCurrencyVN(voucherData.minimumOrderValue) }}</span>
                            </div>
                            <div v-if="!voucherData.discountAmount">
                                <span class="font-medium">Giảm giá tối đa:</span>
                                <span class="ml-1">{{ formatCurrencyVN(voucherData.maxDiscountAmount) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-gray-300 pt-4">
                        <h3 class="text-lg font-semibold text-[#ee4d2d]">Mô tả:</h3>
                        <div class="mt-2 text-sm text-gray-800 space-y-1">
                            <span class="text-gray-600">{{ voucherData.description }}</span>
                        </div>
                    </div>
                    <div class="border-t border-gray-300 pt-4">
                        <h3 class="text-lg font-semibold text-[#ee4d2d]">Thời gian hiệu lực</h3>
                        <div class="mt-2 text-sm text-gray-800 space-y-1">
                            <p>
                                <span class="font-medium">Từ:</span>
                                <span class="ml-1">{{ new Date(voucherData.validFrom).toLocaleString() }}</span>
                            </p>
                            <p>
                                <span class="font-medium">Đến:</span>
                                <span class="ml-1">{{ new Date(voucherData.validTo).toLocaleString() }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="border-t border-gray-300 pt-4 flex items-center justify-between text-sm text-gray-800">
                        <span class="font-medium">Số lần sử dụng:</span>
                        <span class="text-gray-600">{{ voucherData.usedCount }} / {{ voucherData.usageLimit }}</span>
                    </div>
                    <div class="border-t border-gray-300 pt-4 flex items-center space-x-2">
                        <span class="font-medium text-gray-700">Trạng thái:</span>
                        <span :class="voucherData.status ? 'text-green-600' : 'text-red-600'"
                            class="font-semibold animate-blink">
                            {{ voucherData.status ? 'Đang hoạt động' : 'Không hoạt động' }}
                        </span>
                    </div>
                    <div class="border-t border-gray-300 pt-4 text-sm text-gray-600">
                        <p>Ngày tạo: {{ new Date(voucherData.createdAt).toLocaleDateString() }}</p>
                        <p>Cập nhật lần cuối: {{ new Date(voucherData.updatedAt).toLocaleDateString() }}</p>
                    </div>
                </div>
            </template>

        </ModalBox>
    </div>
</template>

<script>
import ModalBox from '@/components/containers/modal/ModalBox.vue'
import { loadImage } from '@/services/imageService.js'
import { formatCurrencyVN } from '@/utils/currencyUtils.js'

export default {
    name: 'VoucherDetailComponent',
    components: {
        ModalBox,
    },
    data() {
        return {
            imageBgDefault: require('@/assets/image/bg-voucher-2.png'),
            imageDefault: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
            voucherData: {},
        };
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        voucherSelected: {
            type: Object,
            required: true,
        },
    },
    watch: {
        voucherSelected: {
            immediate: true,
            handler(newVoucher) {
                this.voucherData = newVoucher;
            },
        },
    },
    methods: {
        formatCurrencyVN,
        loadImage,
        closeModal() {
            this.$emit('closeModal');
        },
    },
}
</script>

<style scoped>
.animate-flash {
    color: #ee4d2d;
    animation: flash 1.5s ease-in-out infinite;
}

@keyframes flash {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-blink {
    animation: blink 1s step-start infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
