import Axios from '@/api/axios';
import { HOST } from '@/api/config'



export const getProduct = async (filter = {}) => {
  try {
    const params = {};

    if (filter.limit) params.limit = filter.limit;
    if (filter.page) params.page = filter.page;
    if (filter.sort) {
      params.sort = filter.sort;
    }
    if (filter.keyword) params.keyword = filter.keyword;
    if (filter.sortFieldCase) params.sortFieldCase = filter.sortFieldCase;
    if (filter.price1) params.price1 = filter.price1;
    if (filter.price2) params.price2 = filter.price2;
    if (filter.brand) params.brand = filter.brand;
    if (filter.category) params.category = filter.category;

    const response = await Axios.get(`${HOST}/api/public/product/all`, { params });
    return response.data;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
};


// api/public/product/product-detail
export const getProductDetail = async (id) => {
  try {
    const response = await Axios.get(`${HOST}/api/public/product/product-detail`, {
      params: {
        idProduct: Number(id),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
};

export const updataImage = async (formData) => {
  try {
    const response = await Axios.post(`${HOST}/api/admin/product/updateimage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Lỗi API updataImage: ${error}`);
  }
};
