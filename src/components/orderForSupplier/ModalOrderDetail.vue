<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative overflow-auto max-h-[90vh]">
            <h2 class="text-2xl font-bold mb-4">Chi tiết Đơn hàng</h2>

            <!-- Tên và trạng thái đơn hàng -->
            <p><strong>Tên Đơn hàng:</strong> {{ order.name || order.orderCode || "Không có tên" }}</p>
            <p><strong>Trạng thái:</strong> {{ order.orderStatus?.status }}</p>

            <!-- Bảng sản phẩm -->
            <div v-if="order.orderDetails?.length" class="mt-4">
                <strong class="block text-lg font-semibold mb-2">Danh sách sản phẩm:</strong>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full text-sm border-collapse border border-gray-200 ">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 px-4 py-2 text-left">Tên sản phẩm</th>
                                <th class="border border-gray-300 px-4 py-2 text-left ">Trạng thái</th>
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
                                <td class="border border-gray-300 px-4 py-2 w-7">
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
<style scoped>
td {
    white-space: nowrap;
    /* Ngừng việc xuống dòng tự động */
    overflow: hidden;
    text-overflow: ellipsis;
    /* Thêm dấu '...' nếu văn bản quá dài */
}

th,
td {
    word-wrap: normal;
    /* Ngừng wrap chữ */
    overflow: hidden;
    /* Đảm bảo văn bản không bị tràn ra ngoài */
    text-overflow: ellipsis;
    /* Thêm dấu '...' nếu văn bản quá dài */
}


/*(Chrome, Safari) */
::-webkit-scrollbar {
    width: 8px;
    /* Độ rộng của scrollbar */
    height: 8px;
    /* Chiều cao của scrollbar cho cuộn ngang */
}

::-webkit-scrollbar-thumb {
    background-color: #88888855;
    /* Màu của thanh cuộn */
    border-radius: 2px;
    /* Bo tròn góc thanh cuộn */
}

::-webkit-scrollbar-thumb:hover {
    background-color: #55555593;
    /* Màu khi hover thanh cuộn */
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}
</style>