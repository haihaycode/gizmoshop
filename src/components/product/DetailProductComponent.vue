<template>
    <div class="max-full mx-auto p-6 rounded-lg ">
        <!-- Phần hình ảnh sản phẩm -->
        <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <!-- Hình ảnh chính -->
            <div class="md:w-1/2 w-full">
                <ImageCarouselProductComponent />
            </div>

            <!-- Phần chi tiết sản phẩm -->
            <div class="md:w-1/2 w-full space-y-4">
                <h2 class="text-xl md:text-2xl font-semibold text-gray-800">{{ productTitle }}</h2>
                <div class="text-gray-500 text-sm flex items-center space-x-2">
                    <span class="flex items-center font-bold">
                        {{ productRating }}
                        <i class="bx bxs-star ml-1 text-yellow-500"></i>
                    </span>
                    <span class="flex items-center">
                        <i class="bx bxs-heart text-red-500 mr-1"></i> {{ productLikes }} lượt thích
                    </span>
                    <span class="flex items-center">
                        <i class="bx bxs-show text-gray-600 mr-1"></i> {{ productViews }} lượt xem
                    </span>
                    <span class="flex items-center">
                        <i class="bx bx-cart text-green-500 mr-1"></i> {{ productSold }} đã bán
                    </span>
                </div>


                <!-- Giá sản phẩm -->
                <div class="flex items-center space-x-4">
                    <span class="text-lg md:text-2xl font-bold text-red-500">{{ productDiscountedPrice }}₫</span>
                    <span class="text-sm line-through text-gray-400">{{ productOriginalPrice }}₫</span>
                    <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">-{{ productDiscountPercentage
                        }}%</span>
                </div>

                <!-- Thông tin sản phẩm -->
                <div class="text-sm text-gray-600 space-y-2">
                    <p><strong>Danh mục:</strong> {{ productCategory }}</p>
                    <p><strong>Thương hiệu:</strong> {{ productBrand }}</p>
                    <p><strong>Số lượng còn lại:</strong> {{ productStock }}</p>
                    <p><strong>Mô tả :</strong> {{ productShortDescription }}</p>
                </div>


                <!-- Số lượng và nút hành động -->
                <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4">
                    <!-- Điều chỉnh số lượng -->
                    <div class="flex items-center border border-gray-300 rounded">
                        <button @click="decreaseQuantity" class="px-3 py-2 md:px-4">
                            <i class="bx bx-minus"></i>
                        </button>
                        <input type="number" v-model="quantity" min="1"
                            class="w-12 text-center border-l border-r border-gray-300" />
                        <button @click="increaseQuantity" class="px-3 py-2 md:px-4">
                            <i class="bx bx-plus"></i>
                        </button>
                    </div>

                    <!-- Nút Thêm Vào Giỏ Hàng -->
                    <button
                        class="bg-red-500 text-white flex items-center justify-center px-3 py-2 md:px-4 md:py-3 rounded hover:bg-red-600 w-full md:w-auto">
                        <i class="bx bx-cart-add mr-1"></i> Thêm Vào Giỏ Hàng
                    </button>


                    <!-- Nút Yêu Thích -->
                    <button @click="toggleWishlist"
                        class="bg-gray-300 text-gray-700 flex items-center justify-center px-3 py-2 md:px-4 md:py-3 rounded hover:bg-gray-400 w-full md:w-auto">
                        <i :class="isInWishlist ? 'bx bxs-heart' : 'bx bx-heart'"></i>
                        <span class="ml-1">{{ isInWishlist ? 'Đã Yêu Thích' : 'Thêm vào Yêu Thích' }}</span>
                    </button>
                </div>

                <div class="mt-4">
                    <h3 class="text-gray-800 font-semibold">Đặc điểm nổi bật:</h3>
                    <p class="text-sm text-gray-600">{{ productLongDescription }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImageCarouselProductComponent from '../containers/image/ImageCarouselProductComponent.vue';

export default {
    components: {
        ImageCarouselProductComponent,
    },
    data() {
        return {
            productTitle: 'Túi Chườm Giữ Nhiệt Nóng Lạnh Nhiều Mẫu Dễ Thương',
            productRating: 4.9,
            productReviews: '6.7k',
            productSold: 28200,
            productViews: 35000,
            productLikes: 2700,
            productOriginalPrice: 39000,
            productDiscountedPrice: 29000,
            productDiscountPercentage: 26,
            productCategory: 'Phụ kiện thời trang',
            productBrand: 'PTK Shop',
            productStock: 1707,
            productShortDescription: 'Giữ nhiệt nóng lạnh, dễ thương và tiện lợi.',
            productLongDescription: 'Túi chườm giữ nhiệt có thể sử dụng để chườm nóng hoặc lạnh, giúp giảm đau và giữ ấm...',
            colorOptions: ['Túi Lông Vịt Vàng', 'Túi Lông Thỏ Mưa', 'Túi Lông Thỏ Bay', 'Túi Chamim Tím'],
            sizeOptions: ['250ML', '500ML', '750ML', '1000ML'],
            quantity: 1,
            isInWishlist: false,
        };
    },
    methods: {
        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) this.quantity--;
        },
        toggleWishlist() {
            this.isInWishlist = !this.isInWishlist;
        },
    },
};
</script>

<style scoped>
/* Thêm style tùy chỉnh nếu cần */
</style>