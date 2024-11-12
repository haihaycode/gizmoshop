<template>
    <ModalBox :isOpen="isOpen" :closeModal="closeModal" closeText="Đóng">
        <template #header>
            <h3 class="text-lg font-semibold text-gray-700">
                {{ account ? 'Chỉnh sửa ngân hàng' : 'Thêm ngân hàng' }}
            </h3>
        </template>

        <template #body>
            <form @submit.prevent="validateAndSave" class="w-full sm:w-full md:w-[600px] mx-auto p-4">
                <CustomInputComponent v-model="localAccount.bank_name" label="Tên ngân hàng" :error="!!errors.bank_name"
                    :message="errors.bank_name" />

                <CustomInputComponent v-model="localAccount.account_number" label="Số tài khoản"
                    :error="!!errors.account_number" :message="errors.account_number" />

                <CustomInputComponent v-model="localAccount.branch" label="Chi nhánh" :error="!!errors.branch"
                    :message="errors.branch" />

                <CustomInputComponent v-model="localAccount.swift_code" label="SWIFT Code (tuỳ chọn)"
                    :error="!!errors.swift_code" :message="errors.swift_code" />

            </form>
            <div class="flex justify-end space-x-2">
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
            default: () => ({ bank_name: '', account_number: '', branch: '', swift_code: '' })
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
        closeModal() {
            this.$emit('close');
        },
        validateAndSave() {
            const schema = yup.object().shape({
                bank_name: yup.string().required('Tên ngân hàng là bắt buộc'),
                account_number: yup.string().required('Số tài khoản là bắt buộc'),
                branch: yup.string().required('Chi nhánh là bắt buộc'),
                swift_code: yup.string().nullable(),
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
                    });
                });
        }
    }
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
