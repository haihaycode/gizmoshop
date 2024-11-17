<template>
    <div class="container mx-auto p-4 flex mt-[130px]">
        <!-- Left Sidebar Filter (Fixed Position) -->
        <aside class="w-1/4">
            <SideFilterComponent @filterProducts="handleFilterProducts" />
        </aside>

        <!-- Main Product Display Area -->
        <div class="w-3/4 px-2">
            <BreadcrumbComponent :items="breakCrumb"></BreadcrumbComponent>
            <!-- Top Sorting Options -->
            <SortOptionsComponent></SortOptionsComponent>

            <!-- Product Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <!-- Placeholder for product cards -->

            </div>
        </div>
    </div>
</template>

<script>
import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import SideFilterComponent from '@/components/product/SideFilterComponent.vue';
import SortOptionsComponent from '@/components/product/sortOptionsComponent.vue';

export default {
    name: 'productPage',
    components: {
        SideFilterComponent,
        SortOptionsComponent,
        BreadcrumbComponent
    },

    data() {
        return {
            breakCrumb: [
                { text: 'Trang chủ', name: 'home' },
                { text: 'Sản phẩm', name: 'product' },

                this.$route.query.keyword ? { text: this.$route.query.keyword, name: '' } : { text: 'Tất cả sản phẩm', name: '' }
            ],
            products: [
            ],
            filteredProducts: []
        };
    },
    created() {
        // Initially, display all products
        this.filteredProducts = this.products;
    },
    methods: {
        //
    },

};
</script>

<style scoped>
/* Fixed sidebar styling */
aside {
    top: 0;
    left: 0;
    z-index: 10;
}

/* Ensures the main content is offset to the right of the fixed sidebar */
main {
    margin-left: 25%;
}
</style>
