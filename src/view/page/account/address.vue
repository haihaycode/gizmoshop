<template>
    <div class="p-6  min-h-screen space-y-6">
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
import { getAddress, updateAddress, createAddress } from '@/api/auth/addressApi';
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
            this.handleGetAddresses();
            this.isModalOpen = false;
            this.selectedAddress = null;
        },
        handleSaveAddress(address) {
            // Map fields to match the backend DTO structure
            const addressDTO = {
                id: address.id || null,
                fullname: address.fullname,
                specificAddress: address.specificAddress,
                sdt: address.sdt,
                city: address.city,
                district: address.district,
                commune: address.ward, // Map `ward` to `commune`
                longitude: address.lon, // Map `lon` to `longitude`
                latitude: address.lat, // Map `lat` to `latitude`
                deleted: address.deleted,
            };

            if (address.id) {
                // Update existing address
                updateAddress(address.id, addressDTO)
                    .then((response) => {
                        console.log("Address updated successfully:", response);
                    })
                    .catch((error) => console.error("Error updating address:", error));
            } else {
                // Create new address
                createAddress(addressDTO)
                    .then((response) => {
                        console.log("Address created successfully:", response);
                    })
                    .catch((error) => console.error("Error creating address:", error));
            }


            this.closeModal();
        }

    }
};
</script>
