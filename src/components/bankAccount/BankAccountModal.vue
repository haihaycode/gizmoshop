<template>
    <ModalBox :isOpen="isOpen" :closeModal="closeModal" closeText="Đóng">
        <template #header>
            <h3 class="text-lg font-semibold text-gray-700">
                {{ account ? 'Chỉnh sửa ngân hàng' : 'Thêm ngân hàng' }}
            </h3>
        </template>

        <template #body>
            <form @submit.prevent="validateAndSave" class="w-full sm:w-full md:w-[600px] mx-auto p-4">
                <CustomInputComponent v-model="localAccount.bankName" label="Họ và tên ( IN HOA KHÔNG DẤU )"
                    :error="!!errors.bankName" :message="errors.bankName" />

                <CustomInputComponent v-model="localAccount.accountNumber" label="Số tài khoản"
                    :error="!!errors.accountNumber" :message="errors.accountNumber" />

                <CustomInputComponent v-model="localAccount.branch" label="Tên Ngân Hàng" :error="!!errors.branch"
                    :message="errors.branch" />

                <CustomInputComponent v-model="localAccount.swiftCode" label="SWIFT Code (tuỳ chọn)"
                    :error="!!errors.swiftCode" :message="errors.swiftCode" />

            </form>
            <div class="flex justify-end space-x-2">
                <button v-if="account" type="button" @click="() => this.$emit('delete', account)"
                    class="px-4 py-2 text-white bg-gray-500 rounded-sm hover:bg-red-600 focus:outline-none">Xóa ngân
                    hàng</button>
                <button type="button" @click="validateAndSave"
                    class="px-4 py-2 text-white bg-red-500 rounded-sm hover:bg-red-600 focus:outline-none">
                    Lưu Ngân Hàng
                </button>
            </div>
        </template>


    </ModalBox>
</template>

<script>
import * as yup from 'yup';
import ModalBox from '@/components/containers/modal/ModalBox.vue';
import CustomInputComponent from '@/components/containers/input/CustomInputComponent.vue';
import { mapActions } from 'vuex';
export default {
    name: 'BankAccountModal',
    components: {
        ModalBox,
        CustomInputComponent
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        account: {
            type: Object,
            default: () => ({ bankName: '', accountNumber: '', branch: '', swiftCode: '' })
        }
    },
    data() {
        return {
            localAccount: { ...this.account },
            errors: {}
        };
    },
    watch: {
        account: {
            handler(newAccount) {
                this.localAccount = { ...newAccount };
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        ...mapActions('nav', ['setNavMenuOpen']),
        toggleNav(isOpen) {
            this.setNavMenuOpen(isOpen);
        },
        closeModal() {
            this.toggleNav(true)
            this.$emit('close');
        },
        validateAndSave() {
            const schema = yup.object().shape({
                bankName: yup.string().required('Tên ngân hàng là bắt buộc'),
                accountNumber: yup.string().required('Số tài khoản là bắt buộc'),
                branch: yup.string().required('Chi nhánh là bắt buộc'),
                swiftCode: yup.string().nullable(),
            });

            schema.validate(this.localAccount, { abortEarly: false })
                .then(() => {
                    this.errors = {};
                    this.$emit('save', { ...this.localAccount });
                    this.closeModal();
                })
                .catch((err) => {
                    this.errors = {};
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                        console.log(validationError.message)
                    });
                });
        }
    }
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
