<template>
    <div class="p-5 sm:p-6 lg:p-8 rounded-sm w-full mx-auto ">
        <!-- Breadcrumb Navigation -->
        <div class="mb-6">
            <BreadcrumbComponent :items="breadcrumbItems" />
        </div>

        <!-- Heading and Description -->
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 lg:mb-4">Địa chỉ giao hàng</h2>
        <p class="text-gray-600 mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg">
            Thêm, chỉnh sửa và quản lý thông tin địa chỉ của bạn để thuận tiện trong quá trình giao hàng.
        </p>

        <!-- Add New Address Button -->
        <div class="flex justify-end mt-6 lg:mb-3 mb-3">
            <button @click="openAddModal" class="text-red-500 hover:underline transition duration-300">
                <i class='bx bx-add-to-queue'></i> Thêm địa chỉ mới
            </button>
        </div>


        <!-- List of Addresses -->
        <div v-if="addresses.length" class="space-y-4">
            <AddressBoxComponent v-for="address in addresses.filter(address => !address.deleted)" :key="address?.id"
                :address="address" @edit="openEditModal(address)" />
        </div>
        <p v-else class="text-gray-500 text-sm sm:text-base lg:text-lg text-center italic">
            Không có địa chỉ nào. Nhấn "Thêm mới" để thêm địa chỉ.
        </p>

        <!-- Address Modal for Adding and Editing -->
        <AddressNewModalComponent :isOpen="isModalOpen" :address="selectedAddress" @close="closeModal"
            @save="handleSaveAddress" />
    </div>
</template>

<script>
import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import AddressBoxComponent from '@/components/addressAccount/AddressBoxComponent.vue';
import AddressNewModalComponent from '@/components/addressAccount/AddressNewModalComponent.vue';

export default {
    name: 'AddressPage',
    components: {
        BreadcrumbComponent,
        AddressBoxComponent,
        AddressNewModalComponent
    },
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'home' },
                { text: 'Địa chỉ', name: '' },
            ],
            addresses: [
                {
                    id: 1,
                    fullname: 'Lê Quyết Tiến',
                    sdt: '0905805643',
                    specific_address: '81 Lê Thiết Hùng',
                    district: 'Hòa Vang',
                    city: 'Đà Nẵng',
                    deleted: false
                },
                {
                    id: 2,
                    fullname: 'Phạm Hải',
                    sdt: '0905748394',
                    specific_address: '51 Núi Thành',
                    district: 'Hòa Vang',
                    city: 'Quảng Nam',
                    deleted: true
                }
            ],
            isModalOpen: false,
            selectedAddress: null
        };
    },
    methods: {
        openAddModal() {
            this.selectedAddress = { fullname: '', sdt: '', specific_address: '', district: '', city: '', deleted: false };
            this.isModalOpen = true;
        },
        openEditModal(address) {
            this.selectedAddress = { ...address };
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedAddress = null;
        },
        handleSaveAddress(address) {
            if (address.id) {
                const index = this.addresses.findIndex((a) => a.id === address.id);
                if (index !== -1) {
                    this.addresses.splice(index, 1, address);
                }
            } else {
                address.id = Date.now();
                this.addresses.push(address);
            }
            this.closeModal();
        }
    }
};
</script>
