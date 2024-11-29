
import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const sendOtpChangePassword = async () => {
    try {
        const response = await Axios.post(`${HOST}/api/public/send-otp-changePassword`);
        return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
        throw new Error(`${error}`);
    }
};



export const changePassword = async (objectChangePass) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/change-password`, objectChangePass);
        return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
        throw new Error(`${error}`);
    }
};
