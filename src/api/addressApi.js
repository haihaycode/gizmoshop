
import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const getAddressUser = async () => {
  try {
    const response = await Axios.get(`${HOST}/api/public/Address/getall`);
    return response.data; // Chỉ trả về data
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    throw error; // Đảm bảo lỗi được ném để xử lý ở nơi gọi
  }
};
