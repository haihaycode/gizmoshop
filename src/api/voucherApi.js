import Axios from "@/api/axios";
import { HOST } from "@/api/config";

// /api/public/voucher/getallforuser/page
export const getVoucherPage = async () => {
  try {
    const response = await Axios.get(
      `${HOST}/api/public/voucher/getallforuser/page`
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const getAllVoucher = async () => {
  try {
    const response = await Axios.get(`${HOST}/api/public/voucher/`);
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
