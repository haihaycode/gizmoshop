<template>
    <div class="p-5 sm:p-6 lg:p-8 rounded-sm w-full mx-auto ">
        <!-- Breadcrumb Navigation -->
        <BreadcrumbComponent :items="breadcrumbItems" />

        <!-- Title and Description -->
        <h2 class="text-lg md:text-2xl font-semibold text-gray-700 mb-1">Hồ Sơ Của Tôi</h2>
        <p class="text-sm md:text-base text-gray-500 mb-6">Quản lý thông tin hồ sơ để bảo mật tài khoản của bạn.</p>

        <!-- Profile Form -->
        <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Profile Details Section -->
                <div class="col-span-2 space-y-4">
                    <!-- Name Field -->
                    <CustomInputComponent v-model="user.fullname" label="Họ và tên (*)" :error="!!errors.fullname"
                        :message="errors.fullname" />

                    <!-- Email Field -->
                    <CustomInputComponent v-model="user.email" label="Email" :error="!!errors.email"
                        :message="errors.email" :disabled="true">
                        <template #label>
                            Email <span @click="modalUpdateEmailIsOpen = true"
                                class="text-blue-500 text-sm cursor-pointer hover:underline">
                                Chỉnh sửa
                            </span>
                        </template>
                    </CustomInputComponent>

                    <!-- Phone Field -->
                    <CustomInputComponent v-model="user.phone" label="Số điện thoại (*)" :error="!!errors.phone"
                        :message="errors.phone" type="tel" />

                    <!-- Date of Birth Selectors -->
                    <div>
                        <label class="block text-gray-600">Ngày sinh</label>
                        <div class="flex flex-wrap md:flex-nowrap space-y-2 md:space-y-0 md:space-x-4 mt-1">
                            <select v-model="user.day" class="p-2 border border-gray-300 rounded-sm w-full md:w-auto"
                                aria-label="Ngày">
                                <option disabled selected>Ngày</option>
                                <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                            </select>
                            <select v-model="user.month" class="p-2 border border-gray-300 rounded-sm w-full md:w-auto"
                                aria-label="Tháng">
                                <option disabled selected>Tháng</option>
                                <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
                            </select>
                            <select v-model="user.year" class="p-2 border border-gray-300 rounded-sm w-full md:w-auto"
                                aria-label="Năm">
                                <option disabled selected>Năm</option>
                                <option v-for="year in yearRange" :key="year" :value="year">{{ year }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Extra Info Field -->
                    <CustomInputComponent v-model="user.extraInfo" label="Thông tin thêm" :error="!!errors.extraInfo"
                        :message="errors.extraInfo" type="textarea" />

                    <!-- Save Button -->
                    <Button :text="'Cập nhật thông tin'" :isLoading="isLoading"
                        class="w-full md:w-auto mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-sm">
                        Lưu
                    </Button>
                </div>

                <!-- Profile Picture Section -->
                <div class="flex flex-col items-center">
                    <img :src="user.image ? loadImage(user.image, 'account') : 'https://via.placeholder.com/100'"
                        alt="User avatar" class="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4" />
                    <Button @click="modalUpdateImageIsOpen = true" type="button" :text="'Chọn Ảnh '"
                        class="bg-red-300 font-semibold px-4 py-2 rounded-sm hover:bg-gray-300 focus:outline-none">
                        Chọn Ảnh
                    </Button>
                    <p class="text-xs text-gray-500 mt-2 text-center">
                        Dung lượng file tối đa 1 MB<br />
                        Định dạng: JPEG, PNG
                    </p>
                </div>
            </div>
        </form>

        <!-- Modals -->
        <updateAvatarForUserComponent :isOpen="modalUpdateImageIsOpen" @close="modalUpdateImageIsOpen = false"
            :currentImage="user?.image" :account="user" @update-success="handleFetchInfo" />
        <ChangeEmail :isOpen="modalUpdateEmailIsOpen" @close="modalUpdateEmailIsOpen = false"
            @update-success="handleFetchInfo" />
    </div>
</template>

<script>
import * as yup from 'yup';
import { getinfo, updateMe } from '@/api/auth/meApi';
import { loadImage } from '@/services/imageService';
import updateAvatarForUserComponent from '@/components/yourAccount/updateAvatarForUserComponent.vue';
import notificationService from '@/services/notificationService';
import ChangeEmail from '@/components/yourAccount/changeEmail.vue';
import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import CustomInputComponent from '@/components/containers/input/CustomInputComponent.vue';
import Button from '@/components/containers/buttons/button.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'ProfilePage',
    components: {
        updateAvatarForUserComponent,
        ChangeEmail,
        BreadcrumbComponent,
        CustomInputComponent,
        Button
    },
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'home' },
                { text: 'Hồ sơ cá nhân', name: '' },
            ],
            modalUpdateImageIsOpen: false,
            modalUpdateEmailIsOpen: false,
            user: {
                fullname: null,
                email: null,
                phone: null,
                day: null,
                month: null,
                year: null,
                extraInfo: null,
                image: null,
            },
            errors: {},
            yearRange: Array.from({ length: 74 }, (_, i) => 2023 - i) // Array of years from 2023 to 1950
        };
    },
    async created() {
        await this.handleFetchInfo();
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        loadImage,
        async handleFetchInfo() {
            try {
                const response = await getinfo();
                const data = response.data;

                this.user.fullname = data.fullname;
                this.user.email = data.email;
                this.user.phone = data.sdt;
                this.user.extraInfo = data.extra_info;
                this.user.image = data.image;

                if (data.birthday) {
                    const [year, month, day] = data.birthday.split('-').map(Number);
                    this.user.day = day;
                    this.user.month = month;
                    this.user.year = year;
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.$emit('load');
            }
        },
        async handleSubmit() {
            const schema = yup.object().shape({
                fullname: yup.string().required('Họ và tên là bắt buộc'),
                email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
                phone: yup.string().matches(/^\d+$/, 'Số điện thoại chỉ chứa số').nullable(),
                day: yup.number().nullable(),
                month: yup.number().nullable(),
                year: yup.number().nullable(),
            });

            try {
                await schema.validate(this.user, { abortEarly: false });
                this.errors = {};
                const { ...userData } = this.user;
                await this.handleUpdateAccount(userData);
            } catch (validationErrors) {
                this.errors = {};
                validationErrors.inner.forEach((err) => {
                    this.errors[err.path] = err.message;
                });
            }
        },
        async handleUpdateAccount(userData) {
            const birthday = `${userData.year}-${String(userData.month).padStart(2, '0')}-${String(userData.day).padStart(2, '0')}`;
            try {
                const dataMe = {
                    fullname: userData.fullname,
                    sdt: userData.phone,
                    birthday: birthday,
                    extraInfo: userData.extraInfo,
                };
                const formData = new FormData();
                formData.append('accountRequest', new Blob([JSON.stringify(dataMe)], { type: 'application/json' }));
                const res = await updateMe(formData);
                notificationService.success(res.data.message);
                this.handleFetchInfo();
                this.$emit('load');
            } catch (error) {
                console.error("Failed to update account:", error);
            }
        }
    }
};
</script>
