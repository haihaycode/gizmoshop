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

                    <div class="mb-4">
                        <label for="city" class="text-gray-700">Thành phố/Tỉnh</label>
                        <select v-model="localAddress.city" required class="w-full p-2 mt-2 border rounded">
                            <option value="">Chọn Thành phố/Tỉnh</option>
                            <option v-for="city in cities" :key="city.id" :value="city.name">{{ city.name }}</option>
                        </select>
                    </div>

                    <div class="mb-4" v-if="districts.length">
                        <label for="district" class="text-gray-700">Quận/Huyện</label>
                        <select v-model="localAddress.district" required class="w-full p-2 mt-2 border rounded">
                            <option value="">Chọn Quận/Huyện</option>
                            <option v-for="district in districts" :key="district.id" :value="district.name">{{
                                district.name }}</option>
                        </select>
                    </div>

                    <div class="mb-4" v-if="wards.length">
                        <label for="ward" class="text-gray-700">Phường/Xã</label>
                        <select v-model="localAddress.ward" required class="w-full p-2 mt-2 border rounded">
                            <option value="">Chọn Phường/Xã</option>
                            <option v-for="ward in wards" :key="ward.id" :value="ward.name">{{ ward.name }}</option>
                        </select>
                    </div>

                    <CustomInputComponent v-model="localAddress.specificAddress" label="Địa chỉ cụ thể"
                        :error="!!errors.specificAddress" :message="errors.specificAddress"
                        @input="clearError('specificAddress')" @change="fetchCoordinates" required />

                    <div class="mb-4 flex items-center">
                        <input type="checkbox" v-model="localAddress.deleted" id="deleted" class="mr-2">
                        <label for="deleted" class="text-gray-700">Đánh dấu là đã xóa</label>
                    </div>
                </form>

                <div v-if="localAddress.lat && localAddress.lon" class="mt-4 text-gray-700">
                    <p><strong>Tọa độ:</strong> {{ localAddress.lat }}, {{ localAddress.lon }}</p>
                </div>
            </div>

            <div class="flex justify-end space-x-2">
                <button type="button" @click="validateAndSave"
                    class="px-4 py-2 text-white bg-red-500 rounded-sm hover:bg-red-600 focus:outline-none">
                    Lưu địa chỉ
                </button>
            </div>
        </template>
    </ModalBox>
</template>

<script>
import axios from 'axios';
import ModalBox from '@/components/containers/modal/ModalBox.vue';
import CustomInputComponent from '@/components/containers/input/CustomInputComponent.vue';
import * as yup from 'yup';

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
            default: () => ({
                fullname: '',
                sdt: '',
                specificAddress: '',
                district: '',
                city: '',
                ward: '',
                deleted: false,
                lat: '',
                lon: ''
            })
        },
    },
    data() {
        return {
            localAddress: { ...this.address },
            cities: [],
            districts: [],
            wards: [],
            errors: {},
            isLoading: false,
        };
    },
    watch: {
        address: {
            immediate: true,
            deep: true,
            handler(newAddress) {
                this.localAddress = { ...newAddress };
            },
        },

    },
    mounted() {
        this.fetchCities();
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        clearError(field) {
            this.errors[field] = '';
        },
        async fetchCities() {
            try {
                const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                this.cities = response.data.data;
            } catch (error) {
                console.error("Lỗi khi tải danh sách Tỉnh/Thành phố:", error);
            }
        },
        async fetchDistricts() {
            const selectedCity = this.cities.find(city => city.name === this.localAddress.city);
            if (!selectedCity) return;
            try {
                const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedCity.id}.htm`);
                this.districts = response.data.data;
                this.localAddress.district = ''; // Reset district khi chọn thành phố mới
                this.wards = [];
            } catch (error) {
                console.error("Lỗi khi tải danh sách Quận/Huyện:", error);
            }
        },
        async fetchWards() {
            const selectedDistrict = this.districts.find(district => district.name === this.localAddress.district);
            if (!selectedDistrict) return;
            try {
                const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.id}.htm`);
                this.wards = response.data.data;
                this.localAddress.ward = ''; // Reset ward khi chọn quận/huyện mới
            } catch (error) {
                console.error("Lỗi khi tải danh sách Phường/Xã:", error);
            }
        },
        async fetchCoordinates() {
            const address = `${this.localAddress.specificAddress}, ${this.localAddress.district}, ${this.localAddress.city}, Vietnam`;
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`;
            try {
                const response = await axios.get(url);
                const data = response.data;
                if (data.length > 0) {
                    this.localAddress.lat = data[0].lat;
                    this.localAddress.lon = data[0].lon;
                } else {
                    console.error("Không tìm thấy tọa độ cho địa chỉ này.");
                }
            } catch (error) {
                console.error("Lỗi khi lấy tọa độ:", error);
            }
        },
        validateAndSave() {
            const schema = yup.object().shape({
                fullname: yup.string().required('Tên người nhận là bắt buộc'),
                sdt: yup.string().matches(/^\d+$/, 'Số điện thoại chỉ chứa số').required('Số điện thoại là bắt buộc'),
                ward: yup.string().required('Phường/Xã là bắt buộc'),
                district: yup.string().required('Quận/Huyện là bắt buộc'),
                city: yup.string().required('Thành phố/Tỉnh là bắt buộc'),
                specificAddress: yup.string().required('Địa chỉ cụ thể là bắt buộc'),
            });

            schema.validate(this.localAddress, { abortEarly: false })
                .then(() => {
                    this.errors = {};
                    this.save();
                })
                .catch((err) => {
                    this.errors = {};
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                    console.log("Lỗi xác thực:", err);
                });
        },
        save() {
            const savedData = {
                ...this.localAddress,
                city: this.localAddress.city,
                district: this.localAddress.district,
                ward: this.localAddress.ward,
                lat: this.localAddress.lat,
                lon: this.localAddress.lon,
            };

            console.log("Thông tin lưu:", savedData);
            this.$emit('save', savedData);
            this.closeModal();
        },
    },
};
</script>
