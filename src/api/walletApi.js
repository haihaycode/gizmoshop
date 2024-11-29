import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const getWallet = async () => {
  try {
    const response = await Axios.get(
      `${HOST}/api/public/walletaccount/getall`
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};