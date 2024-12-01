<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :loading="isloading" :footerIsActive="true">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">Mã Giảm Giá</h3>
            </template>
            <template #body>
                <div class="w-full max-w-[1000px] mt-2">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                        <div v-for="(voucher, index) in vouchers" :key="index"
                            class="voucher-ticket flex rounded-sm overflow-hidden bg-white relative">
                            <div class="bg-red-500 flex items-center justify-center w-1/4 p-3 relative">
                                <div class="text-white text-3xl font-bold">
                                    <i class='bx bxs-cart'></i>
                                </div>
                                <div
                                    class="perforated-edge absolute -right-2 top-0 bottom-0 flex flex-col justify-between">
                                    <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                                    <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                                    <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                                    <span class="dot h-1.5 w-1.5 bg-white rounded-full"></span>
                                </div>
                            </div>

                            <div @click="openVoucherModal(voucher)"
                                class="flex flex-col justify-between w-3/4 p-3 cursor-pointer">
                                <div>
                                    <h3 v-if="voucher.discountPercent" class="text-sm font-semibold text-gray-800">
                                        Giảm {{ voucher.discountPercent }}% Tối đa {{
                                            voucher.maxDiscountAmount?.toLocaleString() || '0' }} VND
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

                            <div class="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                                Mới
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="w-full">
                    <Pagination :total-items="pagination?.totalElements || 1" :items-per-page="limit"
                        :current-page="page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                    </Pagination>
                </div>
            </template>
        </ModalBox>
        <voucherDetailComponent :isOpen="isOpenModalVoucherDetail" :voucherSelected="voucherSelected"
            @closeModal="isOpenModalVoucherDetail = false">
        </voucherDetailComponent>
    </div>
</template>
<script>
import Pagination from '../containers/pagination/Pagination.vue';
import voucherDetailComponent from './voucherDetailComponent.vue';
import ModalBox from '../containers/modal/ModalBox.vue';
import { formatDay } from '@/utils/currencyUtils';
import { getVoucherPage } from '@/api/voucherApi';
import { mapGetters } from 'vuex';

export default {
    name: 'VoucherViewAllComponent',
    data() {
        return {
            pagination: null,
            code: null,
            status: null,
            page: 0,
            limit: 8,
            sortt: 'id,desc',
            isOpenModalVoucherDetail: false,
            voucherSelected: null,
            vouchers: [],
        }
    },
    components: {
        Pagination,
        voucherDetailComponent,
        ModalBox,
    },
    emits: ['closeModal'],
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapGetters("loading", ['isloading']),
    },
    mounted() {
        this.getAllVoucher();
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        formatDay,
        async getAllVoucher() {
            try {
                const data = {
                    code: this.code,
                    status: this.status,
                    page: this.page,
                    limit: this.limit,
                    sort: this.sort,
                }
                const response = await getVoucherPage(data);
                this.vouchers = response.data.content;
                this.pagination = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        openVoucherModal(voucher) {
            this.voucherSelected = voucher;
            this.isOpenModalVoucherDetail = !this.isOpenModalVoucherDetail
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.getAllVoucher();
        },
        handleLimitChange(limitPagination) {
            this.limit = limitPagination;
            this.page = 0;
            this.getAllVoucher();
        },
    },
}
</script>

<style scoped>
/* Styles for voucher ticket */

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
