


import Axios from '@/api/axios';
import { HOST } from '@/api/config'


// lấy thông tin account đang đăng nhập
export const getAddress = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/Address/getall`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};