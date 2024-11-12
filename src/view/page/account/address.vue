<template>
    <div v-if="!isLoading" class="p-6  min-h-screen space-y-6">
        <div>
            <h2 class="text-xl font-semibold text-gray-600 mb-4">Địa chỉ giao hàng</h2>
        </div>

        <!-- List of Addresses -->
        <div v-if="addresses.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AddressBoxComponent v-for="address in addresses.filter(address => !address.deleted)" :key="address?.id"
                :address="address" @edit="openEditModal(address)" />
            <div class="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition duration-200"
                @click="openAddModal">
                <span class="text-4xl text-gray-500">+</span>
            </div>
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
// import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import { getAddress } from '@/api/auth/addressApi';
import AddressBoxComponent from '@/components/addressAccount/AddressBoxComponent.vue';
import AddressNewModalComponent from '@/components/addressAccount/AddressNewModalComponent.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'AddressPage',
    components: {
        // BreadcrumbComponent,
        AddressBoxComponent,
        AddressNewModalComponent
    },
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'home' },
                { text: 'Địa chỉ', name: '' },
            ],
            addresses: [],
            isModalOpen: false,
            selectedAddress: null
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    mounted() {
        this.handleGetAddresses();
    },
    methods: {
        async handleGetAddresses() {
            const res = await getAddress();
            console.log(res)
            this.addresses = res.data;
        },
        openAddModal() {
            this.selectedAddress = { fullname: '', sdt: '', specificAddress: '', district: '', city: '', deleted: false };
            this.isModalOpen = true;
        },
        openEditModal(address) {
            this.selectedAddress = { ...address };
            console.log(this.selectedAddress)
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
