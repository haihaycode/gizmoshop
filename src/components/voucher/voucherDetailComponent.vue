<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal">
            <template #header>
                <h2 class="text-2xl font-bold text-center">Phiếu giảm giá</h2>
            </template>
            <template #body>
                <div class="bg-white shadow-md rounded-lg p-6 space-y-6">
                    <!-- Discount Banner -->

                    <img :src="voucherData.image ? loadImage(voucherData.image, 'voucher') : imageDefault"
                        alt="Promotion Image" class="w-full h-20 rounded-lg object-cover shadow-md" />
                    <!-- <div class="w-full h-32 bg-cover bg-center rounded-lg shadow-lg"
                        :style="{ backgroundImage: `url(${voucherData.image ? loadImage(voucherData.image, 'voucher') : imageDefault}))` }">
                    </div> -->
                    <div class="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                        :style="{ backgroundImage: `url(${imageBgDefault})` }">
                    </div>
                    <!-- Discount Information -->
                    <div class="border-t border-gray-200 pt-4">
                        <h3 class="text-lg font-semibold text-[#ee4d2d]">Thông tin giảm giá</h3>
                        <div class="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-700">
                            <div v-if="!voucherData.discountPercent">
                                <span class="font-medium">Giảm giá:</span>
                                <span class="ml-1">{{ voucherData.discountAmount }} VNĐ</span>
                            </div>
                            <div>
                                <span class="font-medium">Phần trăm giảm:</span>
                                <span class="ml-1">{{ voucherData.discountPercent }}%</span>
                            </div>
                            <div>
                                <span class="font-medium">Giá trị đơn hàng tối thiểu:</span>
                                <span class="ml-1">{{ voucherData.minimumOrderValue }} VNĐ</span>
                            </div>
                            <div v-if="!voucherData.discountPercent">
                                <span class="font-medium">Giảm giá tối đa:</span>
                                <span class="ml-1">{{ voucherData.maxDiscountAmount }} VNĐ</span>
                            </div>
                        </div>
                    </div>

                    <!-- Validity Period -->
                    <div class="border-t border-gray-200 pt-4">
                        <h3 class="text-lg font-semibold text-[#ee4d2d]">Thời gian hiệu lực</h3>
                        <div class="mt-2 text-sm text-gray-700">
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

                    <!-- Usage Limit -->
                    <div class="border-t border-gray-200 pt-4 flex items-center justify-between text-sm text-gray-700">
                        <span class="font-medium">Số lần sử dụng:</span>
                        <span>{{ voucherData.usedCount }} / {{ voucherData.usageLimit }}</span>
                    </div>

                    <!-- Status with Blink Effect -->
                    <div class="border-t border-gray-200 pt-4 flex items-center space-x-2">
                        <span class="font-medium text-gray-700">Trạng thái:</span>
                        <span :class="voucherData.status ? 'text-blue-600' : 'text-red-600'"
                            class="font-medium animate-blink">
                            {{ voucherData.status ? 'Đang hoạt động' : 'Không hoạt động' }}
                        </span>
                    </div>

                    <!-- Created and Updated At -->
                    <div class="border-t border-gray-200 pt-4 text-sm text-gray-600">
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

export default {
    name: 'VoucherDetailComponent',
    components: {
        ModalBox,
    },
    data() {
        return {
            imageBgDefault: require('@/assets/image/bg-voucher-2.png'),
            imageDefault: require('@/assets/image/bg-voucher.png'),
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
