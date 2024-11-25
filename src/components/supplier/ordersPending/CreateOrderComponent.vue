<template>
    <div class="bg-white rounded-sm p-6">
        <h1 class="text-2xl font-semibold mb-4">Tạo Đơn Hàng</h1>
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
    },
    data() {
        return {
            order: {
                bank: "",
                address: "",
                notes: "",
                image: null,
            },
            errors: {},
        };
    },
    computed: {
        isFormValid() {
            return this.order.bank && this.order.address && !Object.keys(this.errors).length;
        },
    },
    methods: {
        async validateOrder() {
            const schema = yup.object().shape({
                bank: yup.number().required("Ngân hàng là bắt buộc"),
                address: yup.number().required("Địa chỉ là bắt buộc"),
                notes: yup.string().required("Ghi chú là bắt buộc"),
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

            if (!selectedBank || !selectedAddress) {
                notificationService.error('Ngân hàng hoặc địa chỉ không hợp lệ.');
                return;
            }

            const orderToEmit = {
                ...this.order,
                bank: selectedBank,
                address: selectedAddress,
            };

            this.$emit("add-order", orderToEmit);
            console.log(orderToEmit)
            this.resetForm();
        },
        resetForm() {
            this.order = {
                bank: "",
                address: "",
                notes: "",
                image: null,

            };
        },
    },

};
</script>
