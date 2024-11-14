<template>
    <div v-if="!isLoading" class="p-6 min-h-screen space-y-6">
        <div>
            <h2 class="text-xl font-semibold text-gray-600 mb-4">Sản phẩm đã yêu thích</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        <!-- Add pagination controls if needed -->
    </div>
</template>

<script>
import { getProductFavorite } from '@/api/auth/favoriteApi';
import ProductCard from '@/components/productDetail/ProductCard.vue';
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
            products: [], // Chứa danh sách sản phẩm yêu thích
        };
    },
    components: {
        ProductCard,
    },
    async created() {
        await this.handleFetchProductsFavorite();
    },
    methods: {
        async handleFetchProductsFavorite() {
            try {
                const res = await getProductFavorite(this.page, this.limit, this.sort.sortField, this.sort.sortDirection);
                this.products = res.data.content;
                console.log(this.products)
            } catch (error) {
                console.error("Failed to fetch favorite products:", error);
            }
        },
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
};
</script>

<style scoped>
/* Add custom styles here if necessary */
</style>
