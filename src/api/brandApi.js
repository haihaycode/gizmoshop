import Axios from '@/api/axios';
import { HOST } from '@/api/config'


export const getBrand = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/brand/listBrand`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};


export const getBrandWithList = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/brand`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};


