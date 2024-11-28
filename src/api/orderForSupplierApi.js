
import Axios from '@/api/axios';
import { HOST } from '@/api/config'



export const createOrderBySupplier = async (orderRequest) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/supplier/t/createOrder`, orderRequest);
        return response.data;
    } catch (error) {
        console.error('Error creating order by supplier:', error);
        throw error;
    }
};
export const createProductBySupplier = async (productAndOrderRequest, idOrder) => {
    try {
        const response = await Axios.post(
            `${HOST}/api/public/supplier/t/create-product`,
            productAndOrderRequest,
            { params: { idOrder } }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating product by supplier:", error);
        throw error;
    }
};

export const findAllOrderForSupplier = async (filter = {}) => {
    try {
        const defaultFilter = {
            page: 0,
            limit: 5,
        };

        const params = { ...defaultFilter, ...filter };

        const response = await Axios.get(`${HOST}/api/public/supplier/t/Order`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders for supplier:', error.response?.data || error.message);
        throw error;
    }
};


//từ chối đơn hàng
//chấp nhận đơn hàng 

export const approveOrderBySupplier = async (orderId, accept) => {
    try {
        const response = await Axios.post(
            `${HOST}/api/public/supplier/t/approve-order/${orderId}`,
            null,
            {
                params: { accept },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
