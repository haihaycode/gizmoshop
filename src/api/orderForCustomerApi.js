
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



export const orderSummary = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/orders/orderSummary`);
        return response.data;
    } catch (error) {
        console.error("Error calling API to fetch order summary:", error);
        throw error;
    }
};