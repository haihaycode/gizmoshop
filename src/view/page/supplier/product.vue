<template>
    <div>

        <div class="flex justify-between items-center mb-4">
            <div class="p-2">
                <DateFilter @date-range-selected="setDateRange" />
            </div>
            <div class="p-2 flex items-center space-x-2">
                <!-- Ô nhập từ khóa -->
                <div class="flex">
                    <input type="text" v-model="keyword" placeholder="Nhập từ khóa tìm kiếm"
                        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <!-- Nút tìm kiếm -->
                <button @click="fetchProducts"
                    class="bg-blue-600 text-white h-auto px-4 py-2 rounded-md hover:bg-blue-700">
                    Tìm kiếm
                </button>
            </div>
        </div>

        <div v-if="products.length === 0 && !isLoading" class="text-center text-gray-500">
            <p>Hiện tại bạn chưa có sản phẩm yêu thích nào.</p>
        </div>
        <!-- Display products if available -->
        <div v-if="isLoading" class="text-blue-500 text-center"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                style='color:#1257c0'></i> Đang tải dữ liệu...</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product"
                :hiddenButtonFavotite="false" />

        </div>
        <Pagination v-if="!isLoading && products.length > 0" :total-items="pagination?.totalElements || 0"
            :items-per-page="limit" :current-page="page + 1" @page-changed="handlePageChange"
            @limit-changed="handleLimitChange">
        </Pagination>

    </div>
</template>

<script>
import { getSupplierProducts } from "@/api/supplierApi";
import ProductCard from '@/components/product/ProductCard.vue';
import Pagination from "@/components/containers/pagination/Pagination.vue";
import DateFilter from '@/components/orderForCustomer/DateFilterComponent.vue';
import { formatDateToYYYYMMDD } from '@/utils/currencyUtils';
import { mapGetters } from "vuex";
export default {
    name: "SupplierProducts",
    components: {
        ProductCard,
        Pagination,
        DateFilter
    },
    data() {
        return {
            pagination: null,
            products: [],
            limit: 8,
            page: 0,
            keyword: "",
            startDate: null,
            endDate: null,
            sortField: "id",
            sortDirection: "asc",
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        setDateRange({ startDate, endDate }) {
            this.startDate = formatDateToYYYYMMDD(startDate);
            this.endDate = formatDateToYYYYMMDD(endDate);
            this.fetchProducts();
        },
        async fetchProducts() {
            try {
                const params = {
                    keyword: this.keyword || null,
                    startDate: this.startDate ? this.startDate : null,
                    endDate: this.endDate ? this.endDate : null,
                    page: this.page,
                    limit: this.limit,
                    sort: `${this.sortField},${this.sortDirection}`,
                };

                // Loại bỏ các tham số null hoặc undefined
                Object.keys(params).forEach(
                    (key) => (params[key] == null || params[key] === "") && delete params[key]
                );

                const response = await getSupplierProducts(params);
                this.products = response.data.content;
                this.Pagination = response.data;
            } catch (error) {
                console.error("Error fetching supplier products:", error);
            }
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.fetchProducts();
        },
        handleLimitChange(limitPanigation) {
            this.limit = limitPanigation;
            this.page = 0;
            this.fetchProducts();
        },
    },
    mounted() {
        this.fetchProducts();
    },
};
</script>