
import Axios from '@/api/axios';
import { HOST } from '@/api/config'


/**
 * Fetch orders by various optional filters (order status, date range, pagination, etc.)
 *
 * @param {Object} filters - Object containing optional filter parameters
 * @param {number} filters.idStatus - (Optional) Order status ID
 * @param {string} filters.startDate - (Optional) Start date in 'yyyy-MM-dd' format
 * @param {string} filters.endDate - (Optional) End date in 'yyyy-MM-dd' format
 * @param {number} filters.page - (Optional) Current page number, default is 0
 * @param {number} filters.limit - (Optional) Number of orders per page, default is 7
 * @param {string} filters.sort - (Optional) Sort parameter in format "field,direction" (e.g., "id,ASC")
 * @returns {Promise<Object>} - Response data from the API
 */
export const getOrders = async (filters = {}) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/orders/OrderForUser`, {
            params: {
                idStatus: filters.idStatus,
                startDate: filters.startDate,
                endDate: filters.endDate,
                page: filters.page || 0,
                limit: filters.limit || 5,
                sort: `${filters.sortParams ? filters.sortParams : 'id'},${filters.sortDirection ? filters.sortDirection : 'desc'}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

/**
 * Fetch an order by order code and phone number.
 *
 * @param {string} orderCode - The order code to search for
 * @param {string} sdt - The phone number associated with the order
 * @returns {Promise<Object>} - Response data from the API
 */

//tra cứu 
export const getOrderByCodeAndPhone = async (orderCode, sdt) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/orders/tracuuorder`, {
            params: {
                orderCode: orderCode,
                sdt: sdt,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error calling API to fetch order:", error);
        throw error;
    }
};

/**
 * Get the total number of orders and the total amount spent by a user.
 *
 * @returns {Promise<Object>} - Response data from the API
 */
// tổng đơn & tổng tiền của 1 người 
export const orderSummary = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/orders/orderSummary`);
        return response.data;
    } catch (error) {
        console.error("Error calling API to fetch order summary:", error);
        throw error;
    }
};

/**
 * Cancel an order for a user if the order is still in the "Pending Approval" state.
 *
 * @param {number} idOrder - The ID of the order to cancel
 * @param {string} [note=''] - (Optional) A note explaining the cancellation reason
 * @returns {Promise<Object>} - Response data from the API
 */
// hủy đơn hàng khi đơn hàng vẫn ở trạng thái đang chờ nhân viên xét duyệt
export const cancelOrderForUsers = async (idOrder, note = '') => {
    try {
        const response = await Axios.get(`${HOST}/api/public/orders/cancelOrderForUsers/${idOrder}`, {
            params: {
                note: note || null,  // Pass note only if provided
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error canceling order:", error);
        throw error;
    }
};

// Đặt hàng
// api :  /api/public/orders/OrderPlace

/**
 * Place a new order.
 *
 * @param {Object} orderRequest - The order request data
 * @param {number} orderRequest.addressId - The address ID for the order
 * @param {boolean} orderRequest.paymentMethod - Payment method (true: COD, false: Payment)
 * @param {number} orderRequest.walletId - The wallet ID used for payment
 * @param {string} [orderRequest.note] - (Optional) Note for the order
 * @param {number} [orderRequest.voucherId] - (Optional) Voucher ID applied to the order
 * @returns {Promise<Object>} - Response data from the API
 */
export const placeOrder = async (orderRequest) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/orders/OrderPlace`, orderRequest);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating address: ${error}`);
    }
};