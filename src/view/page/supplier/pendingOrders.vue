<template>
    <div>
        <div v-if="isLoadingComponent">
            <span v-if="isLoadingSendOrder"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                    style='color:#1257c0'></i>&nbsp; Đang tải dữ liệu ...</span>
        </div>
        <div v-if="infoSupplier && !isLoadingComponent">
            <div v-if="!infoSupplier.deleted" class="min-h-screen ">
                <!-- Tạo đơn hàng -->
                <CreateOrder @add-order="addOrder" :addresses="addresses" :bank-accounts="bankAccounts"
                    :inventories="inventories" />

                <!-- Danh sách đơn hàng -->
                <OrderList :orders="orders" @open-modal="openProductModal" @update-order="updateOrder"
                    @edit-product="editProduct" @remove-order="removeOrder" @send-order="sendOrder"
                    :isLoadingSendOrder="isLoadingSendOrder" />



                <!-- Modal Thêm Sản Phẩm -->
                <ModalBox :isOpen="showModal" :closeModal="closeProductModal" header="Thêm Sản Phẩm">
                    <template #body>
                        <AddProduct :order="selectedOrder" :product="selectedProduct ? selectedProduct : {}"
                            @add-product="addProductToOrder" @close="closeProductModal" :brands="brands"
                            :categories="categories" />
                    </template>
                </ModalBox>
            </div>
            <div v-else class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <!-- SVG Icon -->
                    <i class='bx bxs-lock bx-tada text-2xl md:text-4xl text-blue-700'></i>
                    <!-- Message -->
                    <p class="text-lg font-light text-blue-700">Đơn đăng ký của bạn vẫn chưa được xét duyệt </p>
                </div>
            </div>
        </div>
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
import { getInfoSuplier } from "@/api/supplierApi";
import { getInventoryArr } from '@/api/inventoryApi';
import { createOrderBySupplier, createProductBySupplier } from '@/api/orderForSupplierApi';
import { convertBase64ToFile } from "@/utils/currencyUtils";
import { updataImage } from '@/api/productApi';
import notificationService from "@/services/notificationService";
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
            infoSupplier: {
                deleted: false
            },
            inventories: [],
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
            isLoadingSendOrder: false,
            isLoadingComponent: false

        };
    },
    mounted() {
        this.isLoadingComponent = true

        this.fetchInfoSupplier();
        this.handleFetchAll();

        this.isLoadingComponent = false
    },
    methods: {
        async fetchInfoSupplier() {
            try {
                const resInfo = await getInfoSuplier();
                this.infoSupplier = resInfo.data;
            } catch (error) {
                console.log(error);
            }
        },
        async handleFetchAll() {
            try {
                const resAddress = await getAddress();
                const resWallet = await getWallet();
                const resBrand = await getBrandWithList();
                const resCategory = await getCategories();
                const resInventory = await getInventoryArr();

                this.inventories = resInventory.data;
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
        async sendOrder(orderId, contractMaintenanceFeeOrder) {
            this.isLoadingSendOrder = !this.isLoadingSendOrder
            try {
                const orderToSend = this.orders.find((order) => order.id === orderId);
                console.log(orderToSend)
                await this.sendOrderFinalToShop(orderToSend, contractMaintenanceFeeOrder)
                this.orders = this.orders.filter((order) => order.id !== orderId);
                localStorage.setItem("orders", JSON.stringify(this.orders));
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoadingSendOrder = !this.isLoadingSendOrder
            }
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
        },
        calculateStorageCost(totalSize, duration) {
            const unitCost = 200000; // Đơn giá thuê (VNĐ/m²/tháng)
            const dailyCost = unitCost / 30; // Đơn giá theo ngày
            return Math.round(totalSize * dailyCost * duration).toLocaleString("vi-VN");
        },
        calculateTotalSizeM2(order) {
            const totalArea = order.products.reduce((total, product) => {
                const area =
                    (product.productWidth / 100) *
                    (product.productLength / 100); // cm² -> m²
                return total + (area * (product.quantity || 1));
            }, 0);
            return totalArea.toFixed(2); // Làm tròn 2 chữ số thập phân
        },
        async sendOrderFinalToShop(data, contractMaintenanceFeeOrder) {
            let dataOrder = {
                addressId: data.address.id,
                paymentMethod: 0,  //0: Payment //1 : COD
                walletId: data.bank.id,
                note: data.notes,
                voucherId: null,
                imgOrder: data.image ? data.image : null,
                oderAcreage: data.products.reduce(
                    (total, item) => total + (item.productWidth * item.productLength) * item.quantity,
                    0
                ),
                totalPrice: data.products.reduce(
                    (total, item) => total + item.productPrice,
                    0
                ),
                totalWeight: data.products.reduce(
                    (total, item) => total + item.productWeight * item.quantity || 0,
                    0
                ),
                contractDate: data.duration,
                contractMaintenanceFee: this.convertContractMaintenanceFee(contractMaintenanceFeeOrder)
                ,
                quantity: 0
            }

            console.log("//////////////////////////// order send final")
            console.log(dataOrder)
            //tạo order
            const resOrder = await createOrderBySupplier(dataOrder)
            await this.handleCreateProduct(resOrder.data, data);
            notificationService.success("Gửi đơn hàng Thành công tiến hàng giao dịch ");
        },
        convertContractMaintenanceFee(contractMaintenanceFeeOrder) {
            // Loại bỏ dấu chấm trong chuỗi
            var formattedFee = contractMaintenanceFeeOrder.replace(/\./g, '');
            // Chuyển chuỗi thành kiểu số
            var contractMaintenanceFee = parseInt(formattedFee);
            return contractMaintenanceFee;
        },
        async handleCreateProduct(resDataOrder, reqData) {
            await reqData.products.map(async (item) => {
                const transformedSpecifications = item.specifications
                    ? item.specifications.reduce((acc, spec) => {
                        if (spec && spec.key != null && spec.value != null) {
                            acc[spec.key] = spec.value;
                        }
                        return acc;
                    }, {})
                    : {};
                let data = {
                    createProductRequest: {
                        productName: item.productName,
                        productPrice: item.productPrice,
                        quantity: item.quantity,
                        inventoryId: reqData.warehouse.id,
                        productCategoryId: item.productCategory,
                        discountProduct: item.discountProduct,
                        productLongDescription: item.productLongDescription,
                        productShortDescription: item.productShortDescription + "\n\n[[[\n" + JSON.stringify(transformedSpecifications, null, 2) + "\n]]]",
                        productWeight: item.productWeight,
                        productArea: item.productWidth * item.productLength,
                        productVolume: 0,
                        Width: item.productWidth,
                        productHeight: item.productHeight,
                        productLength: item.productLength,
                        productBrandId: item.productBrand,
                    },
                    orderRequest: null
                }
                const res = await createProductBySupplier(data, resDataOrder.id);
                setTimeout(async () => {
                    console.log("Đã thực hiện các thao tác sau 1 giây sử lý sản phẩm");
                }, 1000);
                if (item.selectedImages && Array.isArray(item.selectedImages)) {
                    try {
                        let listImage = await item.selectedImages.map((img) => convertBase64ToFile(img.base64));
                        setTimeout(async () => {
                            console.log("Đã thực hiện các thao tác sau 1 giây xử lý hình");
                        }, 1000);
                        console.log('list image');
                        console.log(listImage)
                        const dataUpdateImage = {
                            productId: res.data.id,
                            files: listImage
                        };
                        await this.addImageProduct(dataUpdateImage);
                    } catch (error) {
                        console.log(error)
                    }

                }
            })
        },
        async addImageProduct(data) {
            try {
                const formData = new FormData();
                formData.append("productId", data.productId);
                data.files.forEach(file => {
                    formData.append("files", file);
                });
                await updataImage(formData);
            } catch (error) {
                console.error(error);
            }
        }
    },

};
</script>
