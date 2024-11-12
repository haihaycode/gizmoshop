<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" closeText="Đóng">
        <template #header>
            <h3 class="text-lg font-semibold text-gray-700">{{ localAddress.id ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ' }}
            </h3>
        </template>

        <template #body>
            <div class="sm:w-full md:w-[600px] mx-auto p-4">
                <form @submit.prevent="validateAndSave">
                    <CustomInputComponent v-model="localAddress.fullname" label="Tên người nhận"
                        :error="!!errors.fullname" :message="errors.fullname" @input="clearError('fullname')"
                        required />

                    <CustomInputComponent v-model="localAddress.sdt" label="Số điện thoại" type="tel"
                        :error="!!errors.sdt" :message="errors.sdt" @input="clearError('sdt')" required />

                    <CustomInputComponent v-model="localAddress.specific_address" label="Địa chỉ cụ thể"
                        :error="!!errors.specific_address" :message="errors.specific_address"
                        @input="clearError('specific_address')" required />

                    <CustomInputComponent v-model="localAddress.district" label="Phường/Xã" :error="!!errors.district"
                        :message="errors.district" @input="clearError('district')" required />

                    <CustomInputComponent v-model="localAddress.city" label="Thành phố/Tỉnh" :error="!!errors.city"
                        :message="errors.city" @input="clearError('city')" required />

                    <div class="mb-4 flex items-center">
                        <input type="checkbox" v-model="localAddress.deleted" id="deleted" class="mr-2">
                        <label for="deleted" class="text-gray-700">Đánh dấu là đã xóa</label>
                    </div>
                </form>
            </div>
            <div class="flex justify-end space-x-2">
                <button type="button" @click="validateAndSave"
                    class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">
                    Lưu
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
    name: 'AddressFormModal',
    components: {
        ModalBox,
        CustomInputComponent,
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        address: {
            type: Object,
            default: () => ({ fullname: '', sdt: '', specific_address: '', district: '', city: '', deleted: false }),
        },
    },
    data() {
        return {
            localAddress: { ...this.address }, // Create a local copy of address
            isLoading: false,
            errors: {}, // Store validation errors here
        };
    },
    watch: {
        address: {
            immediate: true,
            deep: true,
            handler(newAddress) {
                // Update localAddress whenever address prop changes
                this.localAddress = { ...newAddress };
            },
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        clearError(field) {
            this.errors[field] = '';
        },
        validateAndSave() {
            const schema = yup.object().shape({
                fullname: yup.string().required('Tên người nhận là bắt buộc'),
                sdt: yup.string()
                    .matches(/^\d+$/, 'Số điện thoại chỉ chứa số')
                    .required('Số điện thoại là bắt buộc'),
                specific_address: yup.string().required('Địa chỉ cụ thể là bắt buộc'),
                district: yup.string().required('Phường/Xã là bắt buộc'),
                city: yup.string().required('Thành phố/Tỉnh là bắt buộc'),
            });

            schema.validate(this.localAddress, { abortEarly: false })
                .then(() => {
                    this.errors = {}; // Clear previous errors if validation succeeds
                    this.save();
                })
                .catch((err) => {
                    // Populate errors from Yup validation
                    this.errors = {};
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                });
        },
        save() {
            this.$emit('save', { ...this.localAddress });
            this.closeModal();
        },
    },
};
</script>

<style scoped></style>
