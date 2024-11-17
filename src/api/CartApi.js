import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const getCart = async () => {
  try {
    const response = await Axios.get(`${HOST}/api/public/cart/view`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};
export const removeProductFromCart = async (productId) => {
  try {
    const response = await Axios.delete(
      `${HOST}/api/public/cart/remove?productId=${productId}`
    );
    return response.data; // Trả về dữ liệu giỏ hàng sau khi xóa sản phẩm
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    throw error;
  }
};
export const addProductToCart = async (productId, quantity) => {
  try {
    const response = await Axios.post(
      `${HOST}/api/public/cart/add?productId=${productId}&quantity=${quantity}`
    );
    return response.data; // Trả về giỏ hàng sau khi thêm sản phẩm
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ:", error);
    throw error;
  }
};
