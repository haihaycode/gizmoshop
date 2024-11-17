<template>
    <div>
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-4 pt-3 px-2">
            <!-- Title Section -->
            <div class="flex mb-4 md:mb-0">
                <div class="w-3 h-10 bg-red-600 mr-1"></div>
                <p class="text-xl font-bold text-gray-800 uppercase">Sản phẩm nổi bật</p>
            </div>

            <!-- Sorting Buttons Section -->
            <div class="flex overflow-x-auto space-x-2 mb-4 md:mb-0 whitespace-nowrap hide-scrollbar">
                <button @click="sortProducts('desc', 'id')"
                    :class="filter.sortParams === 'id' ? 'bg-red-600 text-white' : ''"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Nổi bật
                </button>
                <button @click="sortProducts('desc', 'price')"
                    :class="filter.sortParams === 'price' && filter.sortDirection === 'desc' ? 'bg-red-600 text-white' : ''"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Giá Cao - Thấp
                </button>
                <button @click="sortProducts('asc', 'price')"
                    :class="filter.sortParams === 'price' && filter.sortDirection === 'asc' ? 'bg-red-600 text-white' : ''"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Giá Thấp - Cao
                </button>
                <button @click="sortProducts('desc', 'view')"
                    :class="filter.sortParams === 'view' && filter.sortDirection === 'desc' ? 'bg-red-600 text-white' : ''"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Xem Nhiều
                </button>
            </div>
        </div>




        <!-- Product Grid -->
        <div class="product pl-2 pr-2 mx-auto mt-5 md:container-flush">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>
            <div class="text-center mt-4" v-if="hasMoreProducts">
                <Button @click="loadMore" :isLoading="isLoading" :text="'Tải thêm'"
                    class="bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-500">
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "@/components/product/ProductCard.vue";
import { getProduct } from "@/api/productApi";
import Button from "../containers/buttons/button.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        ProductCard,
        Button
    },
    data() {
        return {
            filter: {
                limit: 5,
                page: 0,
                sortDirection: 'desc',
                sortParams: 'id',
                keyword: '',
            },
            products: [],
            hasMoreProducts: true,
        };
    },
    async mounted() {
        await this.getProduct();
    },
    computed: {
        ...mapGetters("loading", ["isLoading"]),
    },
    methods: {
        async getProduct() {
            try {
                const res = await getProduct(this.filter);
                if (res && res.data.content) {
                    const newProducts = res.data.content.map((product) => ({
                        id: product.id,
                        soldProduct: product.soldProduct,
                        productName: product.productName,
                        productPrice: product.productPrice,
                        discountProduct: product.discountProduct,
                        thumbnail: product.thumbnail,
                        productShortDescription: product.productShortDescription,
                        productCategories: product.productCategories,
                        productBrand: product.productBrand,
                    }));

                    this.products = [...this.products, ...newProducts];
                    if (newProducts.length < this.filter.limit) {
                        this.hasMoreProducts = false;
                    }
                    this.filter.page += 1;
                }
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        },
        loadMore() {
            if (this.hasMoreProducts) {
                this.getProduct();
            }
        },
        sortProducts(direction, param) {
            this.filter.sortDirection = direction;
            this.filter.sortParams = param;
            this.hasMoreProducts = true;
            this.products = [];
            this.filter.page = 0;
            this.getProduct();
        }
    },
};


</script>

<style>
.hide-scrollbar {
    overflow-x: auto;
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}
</style>
