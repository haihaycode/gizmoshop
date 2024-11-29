<template>
    <div class="bg-white rounded-sm p-6 mt-2">
        <h2 class="text-xl font-semibold mb-1"> Danh Sách Đơn Hàng đã tạo </h2>
        <p class="text-xl font-normal mb-4">Lưu ý : Mỗi đơn hàng chỉ được gửi tối đa 3 mặt hàng </p>
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

                    <p v-if="order.warehouse" class="text-gray-700 text-sm mt-2">
                        <span class="font-semibold">Kho :</span>
                        {{ order.warehouse.inventoryName }} - {{ order.warehouse.inventoryName }},
                        {{ order.warehouse.commune }}, {{ order.warehouse.district }}, {{ order.warehouse.icity }}
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
                        <!-- Tổng kích thước và cân nặng -->
                        <div class="mt-4 text-gray-700 text-sm">
                            <p><span class="font-semibold">Tổng kích thước (m3/ m2):</span> {{
                                calculateTotalSizeM3(order)
                                }}m3 / {{ calculateTotalSizeM2(order) }}m2
                            </p>
                            <p><span class="font-semibold">Tổng cân nặng:</span> {{ calculateTotalWeight(order) }} kg
                            </p>
                            <p><span class="font-semibold">Thời gian đăng ký cung cấp :</span> {{ order.duration }}
                                (Ngày)
                            </p>
                            <p>
                                <span class="font-semibold">Gia hạn :</span>
                                Nếu bạn đăng ký cung cấp sản phẩm trong vòng
                                {{ order.duration }} ngày, thì đến ngày
                                {{ calculateRenewalDate(order.duration) }}
                                bạn phải gia hạn nếu số lượng sản phẩm mỗi đơn hàng vẫn còn.
                            </p>
                            <p>
                                <span class="font-semibold">Chi phí lưu trữ (ước tính - tính đến hiện tại) : </span>
                                <i class="text-red-500"> {{
                                    formatCurrencyVN(calculateStorageCost(calculateTotalSizeM2(order), order.duration))
                                    }} (VNĐ/{{ order.duration }} ngày)</i>

                            </p>

                        </div>

                    </div>
                </div>

                <!-- Hành động -->
                <div class="mt-6 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <button v-if="order.products.length < 3" @click="$emit('open-modal', order)"
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
import { formatCurrencyVN } from '@/utils/currencyUtils';
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
        formatCurrencyVN,
        //chi phí duy trì
        calculateStorageCost(totalSize, duration) {
            const unitCost = 200000; // Đơn giá thuê (VNĐ/m²/tháng)
            const dailyCost = unitCost / 30; // Đơn giá theo ngày
            return Math.round(totalSize * dailyCost * duration).toLocaleString("vi-VN");
        },
        //tính ngày phải gia hạn
        calculateRenewalDate(duration) {
            if (!duration) return "N/A"; // Nếu chưa chọn duration, hiển thị N/A

            const today = new Date();
            const renewalDate = new Date(today);
            renewalDate.setDate(today.getDate() + duration);

            // Định dạng ngày thành DD/MM/YYYY
            const day = String(renewalDate.getDate()).padStart(2, "0");
            const month = String(renewalDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
            const year = renewalDate.getFullYear();

            return `${day}/${month}/${year}`;
        },

        // Tính tổng thể tích (m³)
        calculateTotalSizeM3(order) {
            const totalVolume = order.products.reduce((total, product) => {
                const volume =
                    (product.productWidth / 100) *
                    (product.productHeight / 100) *
                    (product.productLength / 100); // cm³ -> m³
                return total + (volume * (product.quantity || 1)); // Nhân với số lượng
            }, 0);
            return totalVolume.toFixed(3); // Làm tròn 3 chữ số thập phân
        },

        // Tính tổng diện tích (m²)
        calculateTotalSizeM2(order) {
            const totalArea = order.products.reduce((total, product) => {
                const area =
                    (product.productWidth / 100) *
                    (product.productLength / 100); // cm² -> m²
                return total + (area * (product.quantity || 1)); // Nhân với số lượng
            }, 0);
            return totalArea.toFixed(2); // Làm tròn 2 chữ số thập phân
        },

        // Tính tổng cân nặng (kg)
        calculateTotalWeight(order) {
            if (!order.products || !Array.isArray(order.products)) return "0.00";
            const totalWeight = order.products.reduce((total, product) => {
                const weight = parseFloat(product.productWeight) || 0; // Trọng lượng của 1 sản phẩm
                return total + (weight * (product.quantity || 1)); // Nhân với số lượng
            }, 0);
            return totalWeight.toFixed(2); // Làm tròn 2 chữ số thập phân
        },



        // khác
        emitUpdateOrder(order) {
            this.$emit("update-order", order);
        },
        editProduct(order, product) {
            this.$emit("edit-product", { order, product });
        },
        removeProduct(order, productIndex) {
            order.products.splice(productIndex, 1);
            this.emitUpdateOrder(order);
        },
        removeOrder(order) {
            this.$emit("remove-order", order.id);
        },
        sendOrder(order) {
            this.$emit("send-order", order.id);
        }
    },
};
</script>
