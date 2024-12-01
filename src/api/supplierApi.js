
import Axios from "@/api/axios";
import { HOST } from "@/api/config";
// /api/public/account/register/note/supplier

export const registerNoteSupplierAccount = async (supplierNewObject) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/account/register/note/supplier`, supplierNewObject);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

// /api/public/supplier/t/info
export const getInfoSuplier = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/supplier/t/info`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch addresses:", error);
        throw error;
    }
};

// /api/public/supplier/t/withdraw
export const withdrawSupplierFunds = async (withdrawData) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/supplier/t/withdraw`, withdrawData);
        return response.data;
    } catch (error) {
        console.error("Failed to withdraw funds:", error);
        throw error;
    }
};

//đơn hàng đã giao dịch của supplier theo trạng thái
export const getOrderCountByStatus = async (statusIds) => {
    try {
        const params = new URLSearchParams();
        statusIds.forEach(id => params.append('statusIds', id));
        const response = await Axios.get(`${HOST}/api/public/supplier/t/count-order-by-status`, { params });
        return response.data;
    } catch (error) {
        console.error("Failed to get order count by status:", error);
        throw error;
    }
};
// /api/public/supplier/t/Order-Total-Price-By-Supplier
export const getOrderTotalPriceBySupplier = async (statusIds, startDate, endDate) => {
    try {
        const params = new URLSearchParams();
        statusIds.forEach(id => params.append('statusIds', id));
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        const response = await Axios.get(`${HOST}/api/public/supplier/t/Order-Total-Price-By-Supplier`, { params });
        return response.data;
    } catch (error) {
        console.error("Failed to get total price by supplier:", error);
        throw error;
    }
};

export const getSupplierProducts = async (params) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/supplier/t/product-supplier`, { params });
        return response.data;
    } catch (error) {
        console.error("Failed to get supplier products:", error);
        throw error;
    }
};

//Đăng ký hủy bỏ tư cách 
export const cancelSupplier = async (idWallet, idAddress) => {
    try {
        if (!idWallet || !idAddress) {
            throw new Error("ID Wallet và ID Address là bắt buộc");
        }
        const response = await Axios.post(`${HOST}/api/public/supplier/t/register-cancel-Supplier`, null, {
            params: {
                idwallet: idWallet,
                idAddress: idAddress,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};