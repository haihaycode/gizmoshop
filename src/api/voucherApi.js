import Axios from '@/api/axios';
import { HOST } from '@/api/config'


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


export const getVoucherForUser = async () => {
  try {
    const response = await Axios.get(`${HOST}/api/public/voucher/getallforuser`);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
