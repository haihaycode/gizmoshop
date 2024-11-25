<template>
    <div class="bg-white rounded-sm p-6 mt-2">
        <h2 class="text-xl font-semibold mb-4">Danh Sách Đơn Hàng đã tạo</h2>
        <div v-if="orders.length > 0" class="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            <div v-for="(order) in orders" :key="order.id"
                class="bg-white shadow-md rounded-sm p-4 border border-gray-200 flex flex-col justify-between">
                <!-- Thông tin đơn hàng -->
                <div>
                    <!-- Ngân hàng -->
                    <p class="text-gray-700 text-sm">
                        <span class="font-semibold">Ngân Hàng:</span>
                        {{ order.bank.bankName }} - {{ order.bank.accountNumber }} ({{ order.bank.branch }})
                    </p>

                    <!-- Địa chỉ -->
                    <p class="text-gray-700 text-sm mt-2">
                        <span class="font-semibold">Địa Chỉ:</span>
                        {{ order.address.fullname }} - {{ order.address.specificAddress }},
                        {{ order.address.commune }}, {{ order.address.district }}, {{ order.address.city }} - SĐT:
                        {{ order.address.sdt }}
                    </p>

                    <!-- Ghi chú -->
                    <p class="text-gray-700 text-sm mt-2">
                        <span class="font-semibold">Ghi Chú:</span> {{ order.notes }}
                    </p>

                    <!-- Hình ảnh -->
                    <div v-if="order.image" class="mt-4">
                        <img :src="order.image" alt="Order Image" @click="visible = true"
                            class="w-full max-w-[120px] h-auto object-cover rounded-md border border-gray-300 mt-2" />
                        <vue-easy-lightbox :visible="visible" :imgs="order.image" :index="currentIndex"
                            @hide="visible = false" />
                    </div>

                    <!-- Danh sách sản phẩm -->
                    <div v-if="order.products.length > 0" class="mt-4">
                        <h4 class="text-sm font-semibold mb-2">Danh sách sản phẩm:</h4>
                        <table class="table-auto w-full text-sm border-collapse border border-gray-300">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="border border-gray-300 px-4 py-2 text-left">Tên sản phẩm</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Số lượng</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, i) in order.products" :key="product.id" class="hover:bg-gray-50">
                                    <td class="border border-gray-300 px-4 py-2">{{ product.productName }}</td>
                                    <td class="border border-gray-300 px-4 py-2">{{ product.quantity }}</td>
                                    <td class="border border-gray-300 px-4 py-2">
                                        <div class="flex space-x-2">
                                            <button @click="editProduct(order, product)"
                                                class="text-blue-500 hover:text-blue-700 text-xs underline">
                                                Chỉnh sửa
                                            </button>
                                            <button @click="removeProduct(order, i)"
                                                class="text-red-500 hover:text-red-700 text-xs underline">
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Hành động -->
                <div class="mt-6 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <button @click="$emit('open-modal', order)"
                        class="flex-1 bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700">
                        Thêm Sản Phẩm
                    </button>
                    <button @click="removeOrder(order)"
                        class="flex-1 bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700">
                        Xóa Đơn Hàng
                    </button>
                    <button @click="sendOrder(order)" :disabled="!order.products.length"
                        :class="!order.products.length ? 'bg-gray-500 cursor-not-allowed' : ''"
                        class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-sm ">
                        Gửi Đơn Hàng
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-gray-500 text-center">Chưa có đơn hàng nào được tạo.</p>
        </div>
    </div>
</template>


<script>
import VueEasyLightbox from 'vue-easy-lightbox';
export default {
    data() {
        return {
            visible: false
        }
    },
    components: {
        VueEasyLightbox
    },
    props: {
        orders: {
            type: Array,
            required: true,
        },
    },
    methods: {
        emitUpdateOrder(order) {
            this.$emit("update-order", order);
        },
        editProduct(order, product) {
            this.$emit("edit-product", { order, product }); // Truyền thông tin sản phẩm và đơn hàng
        },
        removeProduct(order, productIndex) {
            // Xóa sản phẩm khỏi danh sách
            order.products.splice(productIndex, 1);
            this.emitUpdateOrder(order); // Cập nhật đơn hàng
        },
        removeOrder(order) {
            // Emit sự kiện để xóa đơn hàng
            this.$emit("remove-order", order.id);
        },
        sendOrder(order) {
            this.$emit("send-order", order.id);
        }
    },
};
</script>
