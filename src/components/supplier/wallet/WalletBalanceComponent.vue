<template>
    <div class="rounded-lg p-6 mb-6">
        <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Ví của bạn</h2>
        </div>
        <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <p class="text-lg font-medium text-gray-700">Số dư hiện tại</p>
            <p class="text-xl font-bold text-blue-600">{{ formatCurrency(walletData.balance) }}</p>
        </div>
        <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <p class="text-lg font-medium text-gray-700">Số dư khóa</p>
            <p class="text-xl font-bold text-red-600">{{ formatCurrency(walletData.frozen_balance) }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">
                <span class="font-medium text-gray-600">Tên nhà cung cấp : </span> {{ walletData.nameSupplier }}
            </p>
            <p class="text-sm text-gray-500">
                <span class="font-medium text-gray-600">Mã số thuế : </span> {{ walletData.tax_code }}
            </p>
            <p class="text-sm text-gray-500 mt-2">
                <span class="font-medium text-gray-600">Mô tả (Ghi chú và note) : </span> {{ walletData.description ||
                    "Không có " }}
            </p>
            <br>

            <button @click="showModal = true" class=" text-blue-600 hover:underline rounded-sm px-2 py-1">
                <i class="bx bx-user-x"></i> Đăng ký hủy bỏ tư cách nhà cung cấp
            </button>
        </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50  flex justify-center items-center">
        <div class="bg-white p-6 rounded-sm shadow-lg min-w-[120px]">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Xác nhận hành động</h3>

            <!-- Thông tin chi tiết về hành động từ chối -->
            <p class="text-gray-700 mb-6">Bạn có chắc chắn muốn từ chối tư cách nhà cung cấp không?</p>
            <ul class="list-disc pl-5 text-gray-700 mb-6">
                <li>Chỉ có thể từ chối hủy bỏ tư cách nhà cung cấp nếu đã đủ 30 ngày kể từ ngày đăng ký.</li>
                <li>Đơn hàng của bạn đang trong quá trình giao hàng sẽ bị từ chối nếu nhân viên giao hàng đang xử lý
                    giao dịch.</li>
                <li>Các giao dịch về đơn hàng đang xảy ra sẽ bị từ chối bởi nhân viên quản lý.</li>
                <li>Nếu các sản phẩm bạn đã cung cấp vẫn còn hàng, chúng tôi sẽ gửi trả hàng cho bạn với phí trừ hao là
                    30.000 VND.</li>
                <li>Tiền dư trong tài khoản của bạn sẽ được giữ lại và tiền bị khóa sẽ được chuyển về tài khoản ngân
                    hàng của bạn.</li>
                <li>Để hoàn tất quá trình hủy bỏ tư cách nhà cung cấp, bạn cần cung cấp thông tin ngân hàng và địa chỉ
                    giao hàng cho chúng tôi.</li>
            </ul>

            <form @submit.prevent="rejectAction" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-2">Ngân Hàng</label>
                    <el-select v-model="reject.bank" placeholder="Chọn ngân hàng" class="w-full"
                        :class="{ 'border-red-500': !!errors.bank }" clearable>
                        <el-option v-for="bank in bankAccounts" :key="bank.id"
                            :label="bank.bankName + ' - ' + bank.accountNumber" :value="bank.id"></el-option>
                    </el-select>
                    <p v-if="errors.bank" class="text-red-500 text-sm">{{ errors.bank }}</p>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-2">Địa Chỉ</label>
                    <el-select v-model="reject.address" placeholder="Chọn địa chỉ" class="w-full"
                        :class="{ 'border-red-500': !!errors.address }" clearable>
                        <el-option v-for="address in addresses" :key="address.id"
                            :label="address.fullname + ' - ' + address.specificAddress + ', ' + address.district + ', ' + address.city + ', ' + address.commune + ' - ' + address.sdt"
                            :value="address.id"></el-option>
                    </el-select>
                    <p v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</p>
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2">Đăng ký
                        từ chối</button>
                    <button @click="showModal = false"
                        class="bg-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded">Hủy bỏ</button>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
import * as yup from "yup";
import { ElSelect, ElOption } from "element-plus";
import 'element-plus/dist/index.css';
import { cancelSupplier } from '@/api/supplierApi';
import notificationService from "@/services/notificationService";
export default {
    data() {
        return {
            showModal: false,
            reject: {
                bank: null,
                address: null
            },
            errors: {},
        }
    },
    components: {
        ElSelect,
        ElOption
    },
    props: {
        walletData: {
            type: Object,
            required: true,
            default: () => ({
                currentBalance: 0,
                frozenBalance: 0,
                taxCode: "",
                description: "",
            }),
        },
        addresses: {
            type: Array,
            default: new Array()
        },
        bankAccounts: {
            type: Array,
            default: new Array()
        }
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(amount);
        },
        async validate() {
            const schema = yup.object().shape({
                bank: yup.number().required("Ngân hàng là bắt buộc"),
                address: yup.number().required("Địa chỉ là bắt buộc"),
            });
            try {
                await schema.validate(this.reject, { abortEarly: false });
                return true;
            } catch (error) {
                this.errors = {};
                error.inner.forEach((e) => {
                    this.errors[e.path] = e.message;
                });
                return false;
            }
        },
        async rejectAction() {
            if (!(await this.validate())) {
                return;
            }
            const selectedBank = this.bankAccounts.find(bank => bank.id === this.reject.bank);
            const selectedAddress = this.addresses.find(address => address.id === this.reject.address);
            try {
                await cancelSupplier(selectedBank.id, selectedAddress.id)
                notificationService.info('Đăng ký hủy bỏ tư cách nhà cung cấp thành công , nhân viên bên cửa hàng sẽ xem sét và xét duyệt cho bạn ')
            } catch (error) {
                console.error(error)
            }

        }
    },
};
</script>