
import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const getAddressUser = async () => {
  try {
    const response = await Axios.get(`${HOST}/api/public/Address/getall`);
    return response.data; // Trả về dữ liệu địa chỉ
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
