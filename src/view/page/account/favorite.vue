<template>
    <div class="p-6 min-h-screen space-y-6">
        <div>
            <h2 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-8 border-red-500">&nbsp; SẢN PHẨM YÊU
                THÍCH</h2>
        </div>
        <!-- Check if there are no products and show a message -->
        <div v-if="products.length === 0" class="text-center text-gray-500">
            <p>Hiện tại bạn chưa có sản phẩm yêu thích nào.</p>
        </div>
        <!-- Display products if available -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product.product"
                :deleteFavorite="false" @load-product="handleLoadFavoriteProduct" />
        </div>
    </div>
</template>

<script>
import { getProductFavorite } from '@/api/auth/favoriteApi';
import ProductCard from '@/components/product/ProductCard.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'favoritePage',
    data() {
        return {
            page: 0,
            limit: 8,
            sort: {
                sortDirection: 'asc',
                sortField: 'id',
            },
            products: [],
        };
    },
    components: {
        ProductCard,
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    mounted() {
        this.handleFetchProductsFavorite();
    },
    methods: {
        async handleFetchProductsFavorite() {
            try {
                const res = await getProductFavorite(this.page, this.limit, this.sort.sortField, this.sort.sortDirection);
                this.products = res.data.content;
            } catch (error) {
                console.error(error);
            }
        },
        handleLoadFavoriteProduct(product) {
            console.log("Product removed or updated:", product);
            this.handleFetchProductsFavorite();
        }
    },

};
</script>
