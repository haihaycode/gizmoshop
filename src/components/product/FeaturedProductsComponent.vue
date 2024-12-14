<template>
    <div>
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-4 pt-3 px-2">
            <div class="flex items-center mb-4 md:mb-0">
                <div class="w-3 h-10 bg-red-600 mr-1"></div>
                <p class="text-xl font-bold text-gray-800 uppercase">Sản phẩm nổi bật</p>
            </div>

            <!-- Sorting  -->
            <div class="flex overflow-x-auto space-x-2 mb-4 md:mb-0 whitespace-nowrap hide-scrollbar">
                <button @click="sortProducts('desc', 'id')"
                    :class="filter.sort.includes('id') ? 'bg-red-600 text-white' : ''"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Nổi bật
                </button>
                <button @click="sortProducts('desc', 'price')"
                    :class="filter.sort.includes('price,desc') ? 'bg-red-600 text-white' : ''"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Giá Cao - Thấp
                </button>
                <button @click="sortProducts('asc', 'price')"
                    :class="filter.sort.includes('price,asc') ? 'bg-red-600 text-white' : ''"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Giá Thấp - Cao
                </button>
                <button @click="sortProducts('desc', 'view')"
                    :class="filter.sort.includes('view') ? 'bg-red-600 text-white' : ''"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Xem Nhiều
                </button>
            </div>
        </div>




        <!-- Product List -->
        <div>
            <div v-if="products.length > 0" class="product pl-2 pr-2 mx-auto mt-5 md:container-flush">
                <!-- Skeleton Loading Grid -->
                <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <!-- Repeat skeleton SVGs as needed -->
                    <div v-for="n in 8" :key="n" class="p-4 border rounded-sm shadow-sm bg-gray-100">
                        <svg class="w-full h-32 bg-gray-300 rounded-sm" viewBox="0 0 400 150"
                            preserveAspectRatio="none">
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#loadingGradient)" />
                            <defs>
                                <linearGradient id="loadingGradient">
                                    <stop offset="0%" stop-color="#e0e0e0">
                                        <animate attributeName="offset" from="0" to="1" dur="1s"
                                            repeatCount="indefinite" />
                                    </stop>
                                    <stop offset="50%" stop-color="#f0f0f0">
                                        <animate attributeName="offset" from="0.5" to="1.5" dur="1s"
                                            repeatCount="indefinite" />
                                    </stop>
                                    <stop offset="100%" stop-color="#e0e0e0">
                                        <animate attributeName="offset" from="1" to="2" dur="1s"
                                            repeatCount="indefinite" />
                                    </stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <svg class="w-full mt-2">
                            <rect x="0" y="0" width="60%" height="12" fill="url(#loadingGradient)" />
                            <rect x="0" y="20" width="40%" height="12" fill="url(#loadingGradient)" />
                        </svg>
                    </div>
                </div>

                <!-- Product Grid -->
                <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <ProductCard v-for="product in products" :key="product.id" :product="product" />
                </div>

                <!-- Load More Button -->
                <div class="text-center mt-4" v-if="hasMoreProducts">
                    <Button @click="loadMore" :isLoading="isLoading" :text="'Tải thêm'"
                        class="bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-500">
                    </Button>
                </div>
            </div>

            <div v-if="isLoading" class="text-blue-500 font-thin px-2">
                <div v-if="!isLoading">
                    <div class="max-w-md w-full md:w-1/2">
                        <WalletActions @deposit="handleDeposit" @withdraw="handleWithdraw" />
                        <WalletBalance :walletData="wallet" />
                    </div>
                    <div class="w-full md:w-1/2 flex  justify-center">
                        <img src="https://omisell.com/vi-vn/wp-content/uploads/sites/2/2021/12/Screenshot_2.jpg"
                            alt="Mô tả ảnh" class="w-full h-[450px]" />
                    </div>
                </div>
                <div v-else>
                    <div class="text-red-500 text-center"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                            style='color:red'></i> Đang tải dữ
                        liệu...</div>
                </div>
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
                limit: 8,
                page: 0,
                sort: 'id,desc',
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
            this.filter.sort = `${param},${direction}`
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
