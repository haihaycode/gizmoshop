    <template>
        <div class="p-6 min-h-screen space-y-6">
            <div class="flex justify-between">
                <h2 class="text-xl font-semibold text-gray-600 mb-4">Địa chỉ giao hàng</h2>
                <span class="text-sm font-semibold text-gray-600 mb-4 cursor-pointer" @click="openEditModal(null)">+
                    Thêm
                    địa chỉ
                </span>
            </div>
            <div v-if="addresses.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AddressBoxComponent v-for="address in addresses.filter(address => !address.deleted)" :key="address?.id"
                    :address="address" @edit="openEditModal(address)" @save="handleGetAddresses" />
                <div class="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition duration-200"
                    @click="openAddModal">
                    <span class="text-4xl text-gray-500">+</span>
                </div>
            </div>
            <p v-else class="text-gray-500 text-sm sm:text-base lg:text-lg text-center italic">
                Không có địa chỉ nào. Nhấn "Thêm mới" để thêm địa chỉ.
            </p>
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
import { mapActions } from 'vuex';
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
        ...mapActions('nav', ['setNavMenuOpen']),
        toggleNav(isOpen) {
            this.setNavMenuOpen(isOpen);
        },

        openAddModal() {
            this.toggleNav(false);
            this.selectedAddress = { fullname: '', sdt: '', specificAddress: '', district: '', city: '', deleted: false };
            this.isModalOpen = true;
        },
        openEditModal(address) {
            this.toggleNav(false);
            this.selectedAddress = { ...address };
            this.isModalOpen = true;
        },
        closeModal() {
            this.toggleNav(true)
            this.handleGetAddresses();
            this.isModalOpen = false;
            this.selectedAddress = null;
        },
        handleSaveAddress(address) {
            const addressDTO = {
                id: address.id || null,
                fullname: address.fullname,
                specificAddress: address.specificAddress,
                sdt: address.sdt,
                city: address.city,
                district: address.district,
                commune: address.ward,
                longitude: address.lon,
                latitude: address.lat,
                deleted: address.deleted,
            };

            if (address.id) {
                updateAddress(address.id, addressDTO)
                    .then((response) => {
                        console.log("Address updated successfully:", response);
                    })
                    .catch((error) => console.error("Error updating address:", error));
            } else {
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
