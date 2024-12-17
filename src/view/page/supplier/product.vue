<template>
    <div>
        <h2 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500">&nbsp; DANH SÁCH SẢN
            PHẨM ĐÃ
            CUNG
            CẤP </h2>
        <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div class="p-2 w-full sm:w-auto">
                <DateFilter @date-range-selected="setDateRange" />
            </div>
            <div
                class="p-2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <!-- Ô nhập từ khóa -->
                <div class="flex w-full sm:w-auto">
                    <input type="text" v-model="keyword" placeholder="Nhập từ khóa tìm kiếm"
                        class="w-full border rounded-sm px-4 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <!-- Nút tìm kiếm -->
                <button @click="fetchProducts"
                    class="bg-blue-600 text-white h-auto px-4 py-2 rounded-sm hover:bg-blue-700 w-full sm:w-auto">
                    Tìm kiếm
                </button>
            </div>
        </div>


        <div v-if="products.length === 0 && !isLoading" class="text-center text-gray-500">
            <p>Hiện tại bạn chưa có sản phẩm nào.</p>
        </div>
        <div v-if="isLoading">
            <ProductsSkeletionComponent />
        </div>
        <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
import ProductsSkeletionComponent from "@/components/containers/skeleton/productsSkeletionComponent.vue";
export default {
    name: "SupplierProducts",
    components: {
        ProductCard,
        Pagination,
        DateFilter,
        ProductsSkeletionComponent
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