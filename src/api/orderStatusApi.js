import Axios from '@/api/axios';
import { HOST } from '@/api/config';

/**
 * Fetch all order statuses, optionally filtered by type.
 *
 * @param {number|null} type - (Optional) The type of order status (1, 0, or null)
 * @returns {Promise<Object>} - Response data from the API
 */
export const getAllOrderStatuses = async (type = null) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/orders/status`, {
            params: type !== null ? { type } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching order statuses:", error);
        throw error;
    }
};
