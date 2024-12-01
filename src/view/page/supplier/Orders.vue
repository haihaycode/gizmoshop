<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-8 flex items-center">
            Quản lý Đơn hàng
            <button @click="openProcessDiagram" class="ml-2 text-gray-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h.01M12 8h.01M19.428 15.341A8 8 0 116.343 6.344a8 8 0 0113.085 8.997z" />
                </svg>
            </button>
        </h1>

        <!-- Tabs -->
        <div class="flex flex-wrap border-b border-gray-200 mb-6">
            <button class="px-4 py-2 border-b-2 bg-gray-50 hover:bg-blue-200 w-full sm:w-auto"
                :class="currentTab === 'inProgress' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'"
                @click="setTab('inProgress')">
                Đơn hàng gần đây (mới)
            </button>
            <button class="px-4 py-2 border-b-2 bg-gray-50 hover:bg-green-200 w-full sm:w-auto"
                :class="currentTab === 'completed' ? 'border-green-500 text-green-500' : 'border-transparent text-gray-600'"
                @click="setTab('completed')">
                Đơn hàng đã hoàn tất
            </button>
            <button class="px-4 py-2 border-b-2 bg-gray-50 hover:bg-red-200 w-full sm:w-auto"
                :class="currentTab === 'rejectedBySupplier' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-600'"
                @click="setTab('rejectedBySupplier')">
                Bị từ chối bởi nhà cung cấp
            </button>
            <button class="px-4 py-2 border-b-2 bg-gray-50 hover:bg-yellow-200 w-full sm:w-auto"
                :class="currentTab === 'rejectedByStore' ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-gray-600'"
                @click="setTab('rejectedByStore')">
                Bị từ chối bởi cửa hàng
            </button>
        </div>


        <!-- Nội dung Tab -->
        <div v-if="currentTab === 'inProgress'">
            <div v-if="isLoading" class="text-blue-500"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                    style='color:#1257c0'></i> Đang tải dữ liệu...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else>
                <div v-if="ordersInProgress.length" class="space-y-4">
                    <CardOrder v-for="order in ordersInProgress" :key="order.id" :order="order"
                        :getStatusText="getStatusText" :isApprovable="isApprovable" :isRejectable="isRejectable"
                        @approve-order="approveOrder" @reject-order="rejectOrder" @view-order="viewOrder" />
                    <Pagination :total-items="paginationInProgress?.totalElements || 0"
                        :items-per-page="limitOrdersInProgress" :current-page="pageOrdersInProgress + 1"
                        @page-changed="handlePageChangeInProgress" @limit-changed="handleLimitChangeInProgress" />
                </div>
                <div v-else class="text-gray-500">Không có đơn hàng đang giao dịch.</div>
            </div>
        </div>

        <div v-else-if="currentTab === 'completed'">
            <div v-if="isLoading" class="text-blue-500"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                    style='color:#1257c0'></i> Đang tải dữ liệu...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else>
                <div v-if="ordersCompleted.length" class="space-y-4">
                    <CardOrder v-for="order in ordersCompleted" :key="order.id" :order="order"
                        :getStatusText="getStatusText" :isApprovable="isApprovable" :isRejectable="isRejectable"
                        @view-order="viewOrder" />
                    <Pagination :total-items="paginationCompleted?.totalElements || 0"
                        :items-per-page="limitOrdersCompleted" :current-page="pageOrdersCompleted + 1"
                        @page-changed="handlePageChangeCompleted" @limit-changed="handleLimitChangeCompleted" />
                </div>
                <div v-else class="text-gray-500">Không có đơn hàng đã hoàn tất.</div>
            </div>
        </div>

        <!-- Tab Bị từ chối bởi nhà cung cấp -->
        <div v-else-if="currentTab === 'rejectedBySupplier'">
            <div v-if="isLoading" class="text-blue-500"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                    style='color:#1257c0'></i> Đang tải dữ liệu...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else>
                <div v-if="ordersRejectedBySupplier.length" class="space-y-4">
                    <CardOrder v-for="order in ordersRejectedBySupplier" :key="order.id" :order="order"
                        :getStatusText="getStatusText" :isApprovable="isApprovable" :isRejectable="isRejectable"
                        @view-order="viewOrder" />
                    <Pagination :total-items="paginationRejectedBySupplier?.totalElements || 0"
                        :items-per-page="limitOrdersRejectedBySupplier" :current-page="pageOrdersRejectedBySupplier + 1"
                        @page-changed="handlePageChangeRejectedBySupplier"
                        @limit-changed="handleLimitChangeRejectedBySupplier" />
                </div>
                <div v-else class="text-gray-500">Không có đơn hàng bị từ chối bởi nhà cung cấp.</div>
            </div>
        </div>

        <!-- Tab Bị từ chối bởi cửa hàng -->
        <div v-else-if="currentTab === 'rejectedByStore'">
            <div v-if="isLoading" class="text-blue-500"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                    style='color:#1257c0'></i> Đang tải dữ liệu...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else>
                <div v-if="ordersRejectedByStore.length" class="space-y-4">
                    <CardOrder v-for="order in ordersRejectedByStore" :key="order.id" :order="order"
                        :getStatusText="getStatusText" :isApprovable="isApprovable" :isRejectable="isRejectable"
                        @view-order="viewOrder" />
                    <Pagination :total-items="paginationRejectedByStore?.totalElements || 0"
                        :items-per-page="limitOrdersRejectedByStore" :current-page="pageOrdersRejectedByStore + 1"
                        @page-changed="handlePageChangeRejectedByStore"
                        @limit-changed="handleLimitChangeRejectedByStore" />
                </div>
                <div v-else class="text-gray-500">Không có đơn hàng bị từ chối bởi cửa hàng.</div>
            </div>
        </div>

        <!-- Modal Order Detail -->
        <ModalOrderDetail :order="selectedOrder" :getStatusText="getStatusText" :isOpen="isModalOpen"
            @close-modal="isModalOpen = false" />
        <!-- Modal for process description -->
        <div v-if="showProcessModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto z-50">
            <div class="bg-white p-6 rounded-sm w-11/12 max-w-4xl shadow-sm ">
                <h2 class="text-2xl font-semibold mb-6 text-center">Mô tả Quy trình Quản lý Đơn Hàng</h2>

                <!-- Description Section -->
                <div class="mb-6 text-gray-700">
                    <p class="mb-4">Quy trình xử lý đơn hàng gồm 3 giai đoạn:</p>
                    <ol class="list-decimal pl-6 space-y-4">
                        <li>
                            <div class="font-semibold mb-2">Giai đoạn 1:</div>
                            <p>Nhà cung cấp gửi đơn hàng qua.</p>
                        </li>
                        <li>
                            <div class="font-semibold mb-2">Giai đoạn 2:</div>
                            <p>Nhân viên xem xét đơn hàng và sản phẩm:</p>
                            <ul class="list-disc pl-6 space-y-1">
                                <li><span class="font-bold text-green-600">Nếu chấp nhận:</span> Đơn hàng được gửi lại
                                    nhà cung cấp để xác nhận.</li>
                                <li><span class="font-bold text-red-600">Nếu từ chối:</span> Đơn hàng sẽ bị từ chối.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div class="font-semibold mb-2">Giai đoạn 3:</div>
                            <p>Nhà cung cấp xác nhận:</p>
                            <ul class="list-disc pl-6 space-y-1">
                                <li><span class="font-bold text-red-600">Nếu từ chối:</span> Đơn hàng sẽ bị từ chối bởi
                                    nhà cung cấp.</li>
                                <li><span class="font-bold text-green-600">Nếu đồng ý:</span> Nhân viên thêm sản phẩm
                                    vào cửa hàng.</li>
                            </ul>
                        </li>
                    </ol>
                </div>
                <!-- Diagram Section -->
                <div id="diagramContainer" class="border p-4 bg-gray-50 rounded-sm h-96 overflow-auto"></div>

                <!-- Close Button -->
                <div class="flex justify-end mt-6">
                    <button @click="showProcessModal = false"
                        class="px-2 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                        Đóng
                    </button>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
import CardOrder from "@/components/orderForSupplier/CardOrder.vue";
import ModalOrderDetail from "@/components/orderForSupplier/ModalOrderDetail.vue";
import { findAllOrderForSupplier, approveOrderBySupplier } from "@/api/orderForSupplierApi";
import Pagination from "@/components/containers/pagination/Pagination.vue";
import flowchart from "flowchart.js";
import Swal from "sweetalert2";
export default {
    name: "OrdersPage",
    components: {
        CardOrder,
        ModalOrderDetail,
        Pagination,
    },
    data() {
        return {
            currentTab: "inProgress",
            pageOrdersInProgress: 0,
            limitOrdersInProgress: 5,
            pageOrdersCompleted: 0,
            limitOrdersCompleted: 5,
            pageOrdersRejectedBySupplier: 0,
            limitOrdersRejectedBySupplier: 5,
            pageOrdersRejectedByStore: 0,
            limitOrdersRejectedByStore: 5,
            ordersInProgress: [],
            ordersCompleted: [],
            ordersRejectedBySupplier: [],
            ordersRejectedByStore: [],
            paginationInProgress: null,
            paginationCompleted: null,
            paginationRejectedBySupplier: null,
            paginationRejectedByStore: null,
            isLoading: false,
            error: null,
            selectedOrder: null,
            isModalOpen: false,
            showProcessModal: false,
        };
    },
    mounted() {
        this.fetchOrders("inProgress");
    },
    methods: {
        currencyFormat(value) {
            if (!value) return "0 đ";
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value);
        },
        openProcessDiagram() {
            this.showProcessModal = true;
            const diagramCode = `
    st=>start: Đối tác gửi order
    e=>end: Kết thúc

    op1=>operation: Nhân viên xét duyệt
    cond1=>condition: Xác nhận hay từ chối?

    op2=>operation: OrderStatus: 9\nLưu vào sản phẩm mà admin muốn xóa
    op3=>operation: OrderStatus: 26\nAll Product: 3

    op4=>operation: Đối tác xác nhận
    cond2=>condition: Chấp nhận hay từ chối?

    op5=>operation: Trừ điểm\nOrderStatus: 9
    op6=>operation: OrderStatus: 19\nChuyển toàn bộ sản phẩm thành status: 3

    op7=>operation: Nhân viên xác nhận
    op8=>operation: Xác nhận\nOrderStatus: 10\nToàn bộ sản phẩm StatusProduct: 1
    op9=>operation: Từ chối\nOrderStatus: 28\nTạo giao dịch chuyển tiền và báo lỗi về nhà cung cấp

    st->op1->cond1
    cond1(yes)->op2->e
    cond1(no)->op3->op4
    op4->cond2
    cond2(yes)->op5->e
    cond2(no)->op6->op7
    op7->op8->e
    op7->op9->e
`;

            const diagram = flowchart.parse(diagramCode);
            setTimeout(() => {
                diagram.drawSVG("diagramContainer");
            }, 0);
        },
        setTab(tab) {
            this.currentTab = tab;
            this.fetchOrders(tab);
        },
        async fetchOrders(tab) {
            this.isLoading = true;
            this.error = null;
            try {
                const params = {
                    page: tab === "inProgress" ? this.pageOrdersInProgress : this.pageOrdersCompleted,
                    limit: tab === "inProgress" ? this.limitOrdersInProgress : this.limitOrdersCompleted,
                };
                if (tab === "completed") {
                    params.idStatus = 10; // Trạng thái đã hoàn tất
                } else if (tab === "rejectedBySupplier") {
                    params.idStatus = 19; // Từ chối bởi nhà cung cấp
                } else if (tab === "rejectedByStore") {
                    params.idStatus = 28; // Từ chối bởi cửa hàng
                }
                const response = await findAllOrderForSupplier(params);
                if (tab === "inProgress") {
                    this.ordersInProgress = response.data.content;
                    this.paginationInProgress = response.data;
                } else if (tab === "completed") {
                    this.ordersCompleted = response.data.content;
                    this.paginationCompleted = response.data;
                } else if (tab === "rejectedBySupplier") {
                    this.ordersRejectedBySupplier = response.data.content;
                    this.paginationRejectedBySupplier = response.data;
                } else if (tab === "rejectedByStore") {
                    this.ordersRejectedByStore = response.data.content;
                    this.paginationRejectedByStore = response.data;
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                this.error = "Không thể tải danh sách đơn hàng.";
            } finally {
                this.isLoading = false;
            }
        },
        handlePageChangeInProgress(newPage) {
            this.pageOrdersInProgress = newPage - 1;
            this.fetchOrders("inProgress");
        },
        handleLimitChangeInProgress(newLimit) {
            this.limitOrdersInProgress = newLimit;
            this.pageOrdersInProgress = 0;
            this.fetchOrders("inProgress");
        },
        handlePageChangeCompleted(newPage) {
            this.pageOrdersCompleted = newPage - 1;
            this.fetchOrders("completed");
        },
        handleLimitChangeCompleted(newLimit) {
            this.limitOrdersCompleted = newLimit;
            this.pageOrdersCompleted = 0;
            this.fetchOrders("completed");
        },
        handlePageChangeRejectedBySupplier(newPage) {
            this.pageOrdersRejectedBySupplier = newPage - 1;
            this.fetchOrders("rejectedBySupplier");
        },
        handleLimitChangeRejectedBySupplier(newLimit) {
            this.limitOrdersRejectedBySupplier = newLimit;
            this.pageOrdersRejectedBySupplier = 0;
            this.fetchOrders("rejectedBySupplier");
        },
        handlePageChangeRejectedByStore(newPage) {
            this.pageOrdersRejectedByStore = newPage - 1;
            this.fetchOrders("rejectedByStore");
        },
        handleLimitChangeRejectedByStore(newLimit) {
            this.limitOrdersRejectedByStore = newLimit;
            this.pageOrdersRejectedByStore = 0;
            this.fetchOrders("rejectedByStore");
        },
        isApprovable(statusId) {
            const approvableStatuses = [9];
            return approvableStatuses.includes(statusId);
        },
        isRejectable(statusId) {
            const rejectableStatuses = [9];
            return rejectableStatuses.includes(statusId);
        },
        viewOrder(order) {
            this.selectedOrder = order;
            this.isModalOpen = true;
        },
        getStatusText(statusId) {
            const statuses = {
                9: "Đơn hàng đang chờ nhà cung cấp xác nhận",
                10: "Đơn hàng hoàn tất",
                19: "Đơn hàng bị từ chối bởi nhà cung cấp",
                28: "Đơn hàng bị từ chối bởi cửa hàng",
            };
            return statuses[statusId] || "Không xác định";
        },
        async approveOrder(order) {
            const result = await Swal.fire({
                title: "Xác nhận chấp nhận đơn hàng (*)?",
                text: "Khi xác nhận đơn hàng bạn sẽ bị trừ phí duy trì là" + this.currencyFormat(order.contractresponse?.contractMaintenanceFee) + '- Hãy chắc chắn rằng bạn đã nạp tiền để chuẩn bị thanh toán cho lần giao dịch này ! (sau khi chấp nhận nhân viên bên cửa hàng sẽ nhanh chóng đến lấy hàng bạn hãy đóng gói chuẩn bị hàng)',
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Xác nhận giao dịch",
                cancelButtonText: "Hủy",
                reverseButtons: true,
            });
            if (result.isConfirmed) {
                try {
                    await approveOrderBySupplier(order.id, true);
                    this.fetchOrders(this.currentTab);
                    Swal.fire(
                        "Thành công!",
                        "Đơn hàng đã được chấp nhận.",
                        "success"
                    );
                } catch (err) {
                    console.error(err);
                    Swal.fire(
                        "Thất bại!",
                        "Không thể chấp nhận đơn hàng. Vui lòng thử lại.",
                        "error"
                    );
                }
            }
        },
        async rejectOrder(order) {
            const result = await Swal.fire({
                title: "Xác nhận từ chối đơn hàng?",
                text: "Bạn có chắc chắn muốn từ chối đơn hàng này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Xác nhận",
                cancelButtonText: "Hủy",
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                try {
                    await approveOrderBySupplier(order.id, false);
                    Swal.fire(
                        "Thành công!",
                        "Đơn hàng đã bị từ chối.",
                        "success"
                    );
                    this.fetchOrders(this.currentTab);
                } catch (err) {
                    console.error(err);
                    Swal.fire(
                        "Thất bại!",
                        "Không thể từ chối đơn hàng. Vui lòng thử lại.",
                        "error"
                    );
                }
            }
        },
    },
};
</script>
