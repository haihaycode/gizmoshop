<template>
    <div class="bg-white rounded-sm p-6">
        <h1 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500">&nbsp; TẠO ĐƠN HÀNG
            &nbsp; <i class='bx bxs-info-circle text-gray-400 hover:text-gray-600 transition-all '
                @click="showModal = true"></i></h1>
        <form @submit.prevent="submitOrder" class="space-y-4">
            <!-- Chọn ngân hàng -->
            <div>
                <label class="block text-gray-700 font-medium mb-2">Ngân Hàng</label>
                <el-select v-model="order.bank" placeholder="Chọn ngân hàng" class="w-full"
                    :class="{ 'border-red-500': !!errors.bank }" clearable>
                    <el-option v-for="bank in bankAccounts" :key="bank.id"
                        :label="bank.bankName + ' - ' + bank.accountNumber" :value="bank.id"></el-option>
                </el-select>
                <p v-if="errors.bank" class="text-red-500 text-sm">{{ errors.bank }}</p>
            </div>

            <!-- Chọn địa chỉ -->
            <div>
                <label class="block text-gray-700 font-medium mb-2">Địa Chỉ</label>
                <el-select v-model="order.address" placeholder="Chọn địa chỉ" class="w-full"
                    :class="{ 'border-red-500': !!errors.address }" clearable>
                    <el-option v-for="address in addresses" :key="address.id"
                        :label="address.fullname + ' - ' + address.specificAddress + ', ' + address.district + ', ' + address.city + ', ' + address.commune + ' - ' + address.sdt"
                        :value="address.id"></el-option>
                </el-select>
                <p v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</p>
            </div>
            <!-- chọn kho  -->
            <div>
                <label class="block text-gray-700 font-medium mb-2">Kho</label>
                <el-select v-model="order.warehouse" placeholder="Chọn kho" class="w-full"
                    :class="{ 'border-red-500': !!errors.warehouse }" clearable>
                    <el-option v-for="inventory in inventories.filter(inventory => inventory.active)"
                        :key="inventory.id"
                        :label="inventory.inventoryName + '-' + inventory.city + ' - ' + inventory.commune + '-' + inventory.district"
                        :value="inventory.id">
                    </el-option>
                </el-select>
                <p v-if="errors.warehouse" class="text-red-500 text-sm">{{ errors.warehouse }}</p>
            </div>
            <!-- duy trì  -->
            <div>
                <label class="block text-gray-700 font-medium mb-2">Khoảng Thời Gian</label>
                <el-select v-model="order.duration" placeholder="Chọn khoảng thời gian" class="w-full"
                    :class="{ 'border-red-500': !!errors.duration }" clearable>
                    <el-option v-for="duration in durations" :key="duration.value" :label="duration.label"
                        :value="duration.value" />
                </el-select>
                <p v-if="errors.duration" class="text-red-500 text-sm">{{ errors.duration }}</p>
            </div>




            <!-- Ghi chú -->
            <CustomInputComponent v-model="order.notes" label="Ghi Chú" :error="!!errors.notes"
                :message="errors.notes" />

            <!-- Upload hình ảnh -->
            <div>
                <label class="block text-gray-700 font-medium mb-2">Hình Ảnh (Không Bắt Buộc)</label>
                <input type="file" @change="handleImageUpload" class="w-full border rounded-lg px-4 py-2" />
            </div>

            <!-- Nút tạo đơn hàng -->
            <button type="submit" :disabled="!isFormValid"
                class="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Tạo Đơn Hàng
            </button>
        </form>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg w-96">
            <h2 class="text-xl font-semibold mb-4">Điều khoản và Chi phí</h2>
            <p class="mb-2">- Chi phí lưu trữ: (Tổng diện tích đơn hàng * 200,000)/30 * số ngày lưu trữ.</p>
            <p class="mb-4">- Đơn giá thuê: 200,000 VNĐ/m²/tháng.</p>
            <p class="text-gray-600 text-sm">Vui lòng đảm bảo cập nhật gia hạn khi hết thời gian đăng ký.</p>
            <button @click="showModal = false"
                class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700">Đóng</button>
        </div>
    </div>
</template>

<script>
import CustomInputComponent from "@/components/containers/input/CustomInputComponent.vue";
import * as yup from "yup";
import { ElSelect, ElOption } from "element-plus";
import 'element-plus/dist/index.css';
import notificationService from "@/services/notificationService";

export default {
    components: {
        CustomInputComponent,
        ElSelect,
        ElOption
    },
    props: {
        bankAccounts: {
            type: Array,
            required: true,
        },
        addresses: {
            type: Array,
            required: true,
        },
        inventories: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            showModal: false,
            durations: [
                { label: "5 ngày", value: 5 },
                { label: "10 ngày", value: 10 },
                { label: "15 ngày", value: 15 },
                { label: "1 tháng", value: 30 },
                { label: "3 tháng", value: 90 },
                { label: "6 tháng", value: 180 },
                { label: "1 năm", value: 365 },
                { label: "2 năm", value: 730 },
            ],

            order: {
                bank: "",
                address: "",
                notes: "",
                duration: "",
                warehouse: "",
                image: null,
            },
            errors: {},
        };
    },
    computed: {
        isFormValid() {
            return this.order.bank &&
                this.order.address &&
                this.order.duration &&
                this.order.notes &&
                this.order.warehouse && // Kiểm tra thêm warehouse
                !Object.keys(this.errors).length
        },
    },
    methods: {
        async validateOrder() {
            const schema = yup.object().shape({
                bank: yup.number().required("Ngân hàng là bắt buộc"),
                address: yup.number().required("Địa chỉ là bắt buộc"),
                notes: yup.string().required("Ghi chú là bắt buộc"),
                duration: yup.number().required("Khoảng thời gian là bắt buộc"),
                warehouse: yup.number().required("Kho là bắt buộc"),
            });

            try {
                await schema.validate(this.order, { abortEarly: false });
                this.errors = {};
                return true;
            } catch (error) {
                this.errors = {};
                error.inner.forEach((e) => {
                    this.errors[e.path] = e.message;
                });
                return false;
            }
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) {
                this.order.image = null;
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                this.order.image = reader.result;
            };
            reader.onerror = () => {
                notificationService.error('Đã xảy ra lỗi trong quá trình tải hình ảnh.')
            };
            reader.readAsDataURL(file);
        },
        async submitOrder() {
            if (!(await this.validateOrder())) {
                notificationService.error('Vui lòng kiểm tra lại thông tin đơn hàng.');
                return;
            }

            const selectedBank = this.bankAccounts.find(bank => bank.id === this.order.bank);
            const selectedAddress = this.addresses.find(address => address.id === this.order.address);
            const selectedWarehouse = this.inventories.find(inventory => inventory.id === this.order.warehouse);

            if (!selectedBank || !selectedAddress || !selectedWarehouse) {
                notificationService.error('Ngân hàng, địa chỉ hoặc kho không hợp lệ.');
                return;
            }

            const orderToEmit = {
                ...this.order,
                bank: selectedBank,
                address: selectedAddress,
                warehouse: selectedWarehouse,
            };

            this.$emit("add-order", orderToEmit);
            this.resetForm();
        },
        resetForm() {
            this.order = {
                bank: "",
                address: "",
                notes: "",
                duration: "",
                warehouse: "",
                image: null,

            };
        },
    },

};
</script>
