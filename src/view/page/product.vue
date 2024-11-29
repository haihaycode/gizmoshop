<template>
    <div class="container mx-auto p-4 flex mt-[130px]">
        <!-- Left Sidebar Filter -->
        <aside class="w-1/4">
            <SideFilterComponent @filterProducts="updateFilter" />
        </aside>

        <!-- Main  -->
        <div class="w-3/4 px-2">
            <BreadcrumbComponent :items="breakCrumb"></BreadcrumbComponent>
            <SortOptionsComponent @sortSelected="updateSort" :initialSort="filter.sort"></SortOptionsComponent>
            <div v-if="!isLoading && products.length === 0" class="text-center text-gray-500">
                <p>không có sản phẩm nào</p>
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
                <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>
            <div v-if="isLoading" class="flex justify-center items-center py-10 text-red-500">
                Đang tải dữ liệu ...
            </div>
            <Pagination v-if="!isLoading && products.length > 0" :total-items="pagination?.totalElements || 1"
                :items-per-page="filter?.limit" :current-page="filter?.page + 1" @page-changed="handlePageChange"
                @limit-changed="handleLimitChange">
            </Pagination>
        </div>
    </div>
</template>

<script>
import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import SideFilterComponent from '@/components/product/SideFilterComponent.vue';
import SortOptionsComponent from '@/components/product/sortOptionsComponent.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import { mapGetters } from 'vuex';
import { getProduct } from '@/api/productApi';
import Pagination from '@/components/containers/pagination/Pagination.vue';
export default {
    name: 'productPage',
    components: {
        SideFilterComponent,
        SortOptionsComponent,
        BreadcrumbComponent,
        ProductCard,
        Pagination
    },

    data() {
        return {
            breakCrumb: [
                { text: 'Trang chủ', name: 'home' },
                { text: 'Sản phẩm', name: 'product' },

                this.$route.query.keyword ? { text: this.$route.query.keyword, name: '' } : { text: 'Tất cả sản phẩm', name: '' }
            ],
            products: [],
            pagination: null,
            filter: {
                limit: 8,
                page: 0,
                keyword: this.$route.query.keyword || '',
                category: '',
                brand: '',
                price1: undefined,
                price2: undefined,
                sort: 'id,desc'
            },
            filteredProducts: []
        };
    },
    created() {
        this.filteredProducts = this.products;
    },
    methods: {
        async handleFetchProducts() {
            try {
                const res = await getProduct(this.filter);
                this.products = res.data.content;
                this.pagination = res.data;
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        },
        updateFilter(newFilter) {
            this.filter = { ...this.filter, ...newFilter };
            this.handleFetchProducts();
        },
        updateSort(sort) {
            this.filter.sort = sort;
            this.handleFetchProducts();
        },
        handlePageChange(newPage) {
            this.filter.page = newPage - 1;
            this.handleFetchProducts();
        },
        handleLimitChange(limitPagination) {
            this.filter.limit = limitPagination;
            this.filter.page = 0;
            this.handleFetchProducts();
        },
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    }

};
</script>
