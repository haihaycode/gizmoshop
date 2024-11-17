import Axios from '@/api/axios';
import { HOST } from '@/api/config'


export const getCategories = async () => {
  try {
    const response = await Axios.get(`${HOST}/api/public/list/categories`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};



