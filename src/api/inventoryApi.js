
import Axios from "@/api/axios";
import { HOST } from "@/api/config";

// Hàm gọi API để lấy danh sách InventoryResponse
export const getInventoryArr = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/inventory/getArr`);
        return response.data;
    } catch (error) {
        console.error("Failed to get inventory array:", error);
        throw error;
    }
};