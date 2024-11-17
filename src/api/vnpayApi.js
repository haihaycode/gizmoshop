import Axios from './axios';
import { HOST } from '@/api/config';

export const createPaymentForOrderCustumer = async (amount, idWallet, idAddress, type) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/payment/vn-pay`, {
            params: {
                amount: amount,
                idWallet: idWallet,
                idAddress: idAddress,
                type: type,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating payment URL: ${error}`);
    }
};
