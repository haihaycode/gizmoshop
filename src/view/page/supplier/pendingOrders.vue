<template>
    <div class="min-h-screen ">
        <!-- Tạo đơn hàng -->
        <CreateOrder @add-order="addOrder" :addresses="addresses" :bank-accounts="bankAccounts" />

        <!-- Danh sách đơn hàng -->
        <OrderList :orders="orders" @open-modal="openProductModal" @update-order="updateOrder"
            @edit-product="editProduct" @remove-order="removeOrder" @send-order="sendOrder" />



        <!-- Modal Thêm Sản Phẩm -->
        <ModalBox :isOpen="showModal" :closeModal="closeProductModal" header="Thêm Sản Phẩm">
            <template #body>
                <AddProduct :order="selectedOrder" :product="selectedProduct ? selectedProduct : {}"
                    @add-product="addProductToOrder" @close="closeProductModal" :brands="brands"
                    :categories="categories" />
            </template>
        </ModalBox>
    </div>
</template>

<script>
import ModalBox from "@/components/containers/modal/ModalBox.vue";
import CreateOrder from "@/components/supplier/ordersPending/CreateOrderComponent.vue";
import OrderList from "@/components/supplier/ordersPending/OrderListComponent.vue";
import AddProduct from "@/components/supplier/ordersPending/AddProductComponent.vue";
import { getAddress } from '@/api/auth/addressApi';
import { getWallet } from '@/api/auth/walletApi';
import { getBrandWithList } from '@/api/brandApi';
import { getCategories } from '@/api/categoryApi';
// import { mapGetters } from "vuex";
export default {
    components: {
        ModalBox,
        CreateOrder,
        OrderList,
        AddProduct,
    },
    data() {
        return {
            brands: [],
            categories: [],
            addresses: [],
            bankAccounts: [],
            orders: JSON.parse(localStorage.getItem("orders")) || [],
            selectedOrder: null,
            selectedProductIndex: null,
            selectedProduct: null,
            showModal: false,
            isEditingProduct: false,
        };
    },
    mounted() {
        this.handleFetchAll();
    },
    methods: {
        async handleFetchAll() {
            try {
                const resAddress = await getAddress();
                const resWallet = await getWallet();
                const resBrand = await getBrandWithList();
                const resCategory = await getCategories();
                this.categories = resCategory.data;
                this.brands = resBrand.data;
                this.addresses = resAddress.data;
                this.bankAccounts = resWallet.data;
            } catch (error) {
                console.log(error);
            }
        },
        // Tạo đơn hàng
        addOrder(order) {
            order.id = this.orders.length + 1;
            order.products = [];
            this.orders.push(order);
            localStorage.setItem("orders", JSON.stringify(this.orders));
        },
        openProductModal(order) {
            this.selectedOrder = order;
            this.showModal = true;
            this.isEditingProduct = false; // Không phải chỉnh sửa sản phẩm
        },
        closeProductModal() {
            this.showModal = false;
            this.selectedProductIndex = null;
            this.selectedProduct = null;
        },
        updateOrder(updatedOrder) {
            const index = this.orders.findIndex((order) => order.id === updatedOrder.id);
            if (index !== -1) {
                this.orders[index] = updatedOrder;
                localStorage.setItem("orders", JSON.stringify(this.orders));
            }
        },
        addProductToOrder(product) {
            if (this.isEditingProduct) {
                // Nếu đang chỉnh sửa sản phẩm
                this.selectedOrder.products[this.selectedProductIndex] = product;
            } else {
                // Thêm sản phẩm mới
                this.selectedOrder.products.push(product);
            }
            localStorage.setItem("orders", JSON.stringify(this.orders));
            this.closeProductModal();
        },
        async editProduct({ order, product }) {
            this.selectedOrder = order;
            this.selectedProductIndex = order.products.findIndex(p => p.id === product.id)
            if (product.selectedImages && Array.isArray(product.selectedImages)) {
                await this.convertBase64ToBlobs(product.selectedImages.map((image) => image.base64))
                    .then((files) => {
                        product.selectedImages = files;
                        console.log("Converted files:", product.selectedImages);
                    })
                    .catch((error) => {
                        console.error("Error converting Base64 to File objects:", error);
                    });
            } else {
                console.warn("No valid selectedImages found:", product.selectedImages);
            }
            this.selectedProduct = product;
            this.showModal = true;
            this.isEditingProduct = true;
        },
        removeOrder(orderId) {
            this.orders = this.orders.filter((order) => order.id !== orderId);
            localStorage.setItem("orders", JSON.stringify(this.orders)); // Cập nhật localStorage
        },
        sendOrder(orderId) {
            const orderToSend = this.orders.find((order) => order.id === orderId);
            console.log(orderToSend)
            // thực hiện logic trước khi xóas đơn hàng
            this.orders = this.orders.filter((order) => order.id !== orderId);
            localStorage.setItem("orders", JSON.stringify(this.orders)); // Cập nhật localStorage
        },
        async convertBase64ToBlobs(base64Strings) {
            const blobPromises = base64Strings.map(async (base64) => {
                // Extract the MIME type and Base64 data
                const [metadata, data] = base64.split(',');
                const mimeType = metadata.match(/data:(.*?);base64/)?.[1] || 'application/octet-stream';

                // Decode Base64 into binary data
                const binary = atob(data);
                const array = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) {
                    array[i] = binary.charCodeAt(i);
                }

                // Create a Blob from binary data
                return new Blob([array], { type: mimeType });
            });

            return Promise.all(blobPromises); // Return all the blobs
        }
    },

};
</script>