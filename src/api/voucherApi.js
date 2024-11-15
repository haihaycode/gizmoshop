import Axios from '@/api/axios';
import { HOST } from '@/api/config'


// /api/public/voucher/getallforuser/page
export const getVoucherPage = async (data) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/voucher/getallforuser/page`, {
            params: data,
        });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
