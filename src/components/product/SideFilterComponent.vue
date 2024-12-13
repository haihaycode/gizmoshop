<template>
    <div class="p-3">
        <h2 class="text-xl font-semibold mb-6 text-gray-700"><i class='bx bx-filter-alt'></i> Bộ Lọc Tìm Kiếm</h2>

        <!-- Keyword Search -->
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">Tìm Kiếm</label>
            <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i class='bx bx-search-alt-2 bx-rotate-90'></i>
                </span>
                <input type="text" v-model="keyword" @input="applyFilter" placeholder="Nhập từ khóa"
                    class="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-red-500 transition duration-150 ease-in-out" />
            </div>
        </div>

        <!-- Category Filter -->
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">Theo Danh Mục</label>
            <el-select clearable v-model="selectedCategory" placeholder="Tất Cả Danh Mục" @change="applyFilter"
                class="w-full">
                <el-option v-for="category in categories" :key="category.id" :label="category.name"
                    :value="category.id" />
            </el-select>
        </div>
        <!-- Brand Filter -->
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">Thương Hiệu</label>
            <el-select clearable v-model="selectedBrand" placeholder="Tất Cả Thương Hiệu" @change="applyFilter"
                class="w-full">
                <el-option v-for="brand in brands" :key="brand.id" :label="brand.name" :value="brand.id" />
            </el-select>
        </div>
        <!-- Price Range Filter -->
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">Khoảng Giá</label>
            <el-select clearable v-model="selectedPriceRange" placeholder="Tất Cả Giá" @change="applyFilter"
                class="w-full">
                <el-option v-for="price in priceOptions" :key="price.id" :label="price.name" :value="price.id" />
            </el-select>
        </div>

        <!-- Apply Filter Button -->
        <div class="flex justify-between mt-4">
            <button @click="applyFilter"
                class="w-full text-center bg-red-500 px-3 py-1 text-white rounded-sm cursor-pointer">
                Áp Dụng bộ lọc
            </button>
            <button @click="clearFilters"
                class="w-full text-center bg-gray-300 px-3 py-1 text-gray-700 rounded-sm cursor-pointer ml-2">
                Xóa tất cả
            </button>
        </div>
    </div>
</template>

<script>
import { ElSelect, ElOption } from 'element-plus';
import { getCategories } from '@/api/categoryApi';
import { getBrandWithList } from '@/api/brandApi';
import 'element-plus/dist/index.css';
import { debounce } from 'lodash';
export default {
    name: 'SideFilter',
    components: {
        ElSelect,
        ElOption
    },
    data() {
        const [param = '', direction = ''] = (this.$route.query.sort || '').split('_');
        return {
            keyword: this.$route.query.keyword || '',
            sortOption: `${param}_${direction}`,
            selectedCategory: this.$route.query.category || '',
            selectedBrand: this.$route.query.brand || '',
            selectedPriceRange: this.$route.query.sort || '',
            categories: [],
            brands: [],
            priceOptions: [
                { id: "under_1000000", name: "Dưới 1,000,000", min: 100, max: 1000000 },
                { id: "1000000_to_5000000", name: "1,000,000 - 5,000,000", min: 1000000, max: 5000000 },
                { id: "5000000_to_10000000", name: "5,000,000 - 10,000,000", min: 5000000, max: 10000000 },
                { id: "15000000_to_20000000", name: "15,000,000 - 20,000,000", min: 15000000, max: 20000000 },
                { id: "20000000_to_25000000", name: "20,000,000 - 25,000,000", min: 20000000, max: 25000000 },
                { id: "above_25000000", name: "Trên 25,000,000", min: 25000000, max: 10000000000 }
            ]
        };
    },
    methods: {
        async handleFetchCategory() {
            try {
                const res = await getCategories();
                this.categories = res.data;
                const idDanhMuc = Number(this.$route.query.idDanhMuc);
                if (idDanhMuc) {
                    this.selectedCategory = this.categories.find(category => category.id === idDanhMuc)?.id || '';
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        },
        async handleFetchBrand() {
            try {
                const res = await getBrandWithList();
                this.brands = res.data;
                const idThuongHieu = Number(this.$route.query.idThuongHieu);
                if (idThuongHieu) {
                    this.selectedBrand = this.brands.find(brand => brand.id === idThuongHieu)?.id || '';
                }
            } catch (error) {
                console.error("Failed to fetch brands:", error);
            }
        },
        applyFilter() {
            const selectedPrice = this.priceOptions.find(price => price.id === this.selectedPriceRange);
            const price1 = selectedPrice ? selectedPrice.min : undefined;
            const price2 = selectedPrice ? selectedPrice.max : undefined;

            this.$emit('filterProducts', {
                keyword: this.keyword || undefined,
                category: this.selectedCategory || undefined,
                brand: this.selectedBrand || undefined,
                price1,
                price2,
            });
        },
        clearFilters() {
            this.keyword = '';
            this.selectedCategory = '';
            this.selectedBrand = '';
            this.selectedPriceRange = '';
            // clear
            this.applyFilter();
            this.debouncedApplyFilter();
        }
    },
    async mounted() {
        await this.handleFetchCategory();
        await this.handleFetchBrand();
        this.applyFilter();
    },
    created() {
        this.debouncedApplyFilter = debounce(this.applyFilter, 300);
    }
};
</script>
