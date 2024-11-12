import Axios from '@/api/axios';
import { HOST } from '@/api/config'


export const getProduct = async () => {
    try {
      const response = await Axios.get(`${HOST}/api/admin/product/list`);
      console.log("Dữ liệu nhận được:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      throw error;
    }
  };
  
