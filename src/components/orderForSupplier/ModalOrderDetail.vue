<template>
    <div v-if="isOpen" class="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-sm p-6 w-11/12 md:w-3/4 lg:w-full">
            <h2 class="text-2xl font-bold mb-4">Chi tiết Đơn hàng</h2>

            <!-- Tên và trạng thái đơn hàng -->
            <p><strong>Tên Đơn hàng:</strong> {{ order.name || order.orderCode || "Không có tên" }}</p>
            <p><strong>Trạng thái:</strong> {{ order.orderStatus?.status }}</p>

            <!-- Bảng sản phẩm -->
            <div v-if="order.orderDetails?.length" class="mt-4">
                <strong class="block text-lg font-semibold mb-2">Danh sách sản phẩm:</strong>
                <div class="overflow-x-auto">
                    <table class="table-auto min-w-full text-sm border-collapse border border-gray-200">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 px-4 py-2 text-left">Tên sản phẩm</th>
                                <th class="border border-gray-300 px-4 py-2 text-left">Trạng thái</th>
                                <th class="border border-gray-300 px-4 py-2 text-right">Số lượng</th>
                                <th class="border border-gray-300 px-4 py-2 text-right">Giá</th>
                                <th class="border border-gray-300 px-4 py-2 text-right">Giảm giá</th>
                                <th class="border border-gray-300 px-4 py-2 text-right">Giá sau giảm</th>
                                <th class="border border-gray-300 px-4 py-2 text-right">Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.orderDetails" :key="item.id" class="odd:bg-white even:bg-gray-50">
                                <td class="border border-gray-300 px-4 py-2">{{ item.product.productName }}</td>
                                <td class="border border-gray-300 px-4 py-2">
                                    {{ item.product.productStatusResponse?.name || "Không xác định" }}
                                </td>

                                <td class="border border-gray-300 px-4 py-2 text-right">{{ item.quantity }}</td>
                                <td class="border border-gray-300 px-4 py-2 text-right">
                                    {{ currencyFormat(item.product.productPrice) }}
                                </td>
                                <td class="border border-gray-300 px-4 py-2 text-right">
                                    {{ item.product.discountProduct }}%
                                </td>
                                <td class="border border-gray-300 px-4 py-2 text-right">
                                    {{ currencyFormat(calculateDiscountedPrice(item.product.productPrice,
                                        item.product.discountProduct)) }}
                                </td>
                                <td class="border border-gray-300 px-4 py-2 text-right">
                                    {{ currencyFormat(
                                        calculateDiscountedPrice(item.product.productPrice, item.product.discountProduct) *
                                        item.quantity
                                    ) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <!-- Ghi chú -->
            <div v-if="order.note" class="mt-4">
                <strong class="block text-lg font-semibold">Ghi chú:</strong>
                <p>{{ order.note }}</p>
            </div>

            <!-- Nút đóng -->
            <div class="mt-6 flex justify-end">
                <button @click="$emit('close-modal')"
                    class="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600">
                    Đóng
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalOrderDetail",
    props: {
        order: {
            type: Object,
            required: true,
        },
        getStatusText: {
            type: Function,
            required: true,
        },
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        currencyFormat(value) {
            if (!value) return "0 đ";
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value);
        },
        calculateDiscountedPrice(price, discount) {
            if (!price || !discount) return price || 0;
            return price * (1 - discount / 100);
        },
    },
};
</script>