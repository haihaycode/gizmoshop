<template>
    <div class="p-2 flex flex-col md:flex-row items-center md:items-start gap-6">
        <!-- Form -->
        <div class="flex-1">
            <h2 class="text-2xl font-bold mb-4">Cập nhật thông tin để đăng ký nhà cung cấp</h2>
            <form @submit.prevent="validateAndSubmit" class="space-y-4">
                <!-- Tên doanh nghiệp -->
                <CustomInputComponent v-model="supplier.nameSupplier" label="Tên doanh nghiệp"
                    :error="!!errors.nameSupplier" :message="errors.nameSupplier" />
                <!-- Mô tả -->
                <CustomInputComponent v-model="supplier.description" label="Mô tả thông tin của bạn"
                    :error="!!errors.description" :message="errors.description" />
                <!-- Mã số thuế -->
                <CustomInputComponent v-model="supplier.tax_code" label="Mã số thuế" :error="!!errors.tax_code"
                    :message="errors.tax_code" />
                <!-- Next - prev -->
                <div class="flex justify-between mt-6">
                    <button type="button" @click="$emit('prev')"
                        class=" text-red-500 py-2 px-4 rounded hover:underline">
                        Quay lại
                    </button>
                    <button type="submit" class="bg-red-500 text-white py-2 px-4 rounded-sm hover:bg-red-600">
                        Tiếp tục
                    </button>
                </div>
            </form>
        </div>
        <!-- Image -->
        <div class="w-full md:w-1/3 flex justify-center">
            <img src="https://omisell.com/vi-vn/wp-content/uploads/sites/2/2021/12/Screenshot_2.jpg"
                alt="Supplier registration" class="max-w-full " />
        </div>
    </div>
</template>

<script>
import * as yup from 'yup';
import CustomInputComponent from '@/components/containers/input/CustomInputComponent.vue';

export default {
    name: 'SupplierUpdateForm',
    components: {
        CustomInputComponent,
    },
    data() {
        return {
            supplier: {
                nameSupplier: '',
                description: '',
                tax_code: '',
            },
            errors: {},
        };
    },
    methods: {
        validateAndSubmit() {
            const schema = yup.object().shape({
                nameSupplier: yup.string().required('Tên doanh nghiệp là bắt buộc'),
                description: yup.string().required('Mô tả là bắt buộc'),
                tax_code: yup.string().required('Mã số thuế là bắt buộc'),
            });
            schema
                .validate(this.supplier, { abortEarly: false })
                .then(() => {
                    this.errors = {};
                    this.$emit('next', { ...this.supplier });
                })
                .catch((validationErrors) => {
                    this.errors = {};
                    validationErrors.inner.forEach((error) => {
                        this.errors[error.path] = error.message;
                    });
                });
        },
    },
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
