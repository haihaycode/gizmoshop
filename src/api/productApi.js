import Axios from '@/api/axios';
import { HOST } from '@/api/config'


export const getProduct = async (filter) => {
  try {
    const response = await Axios.get(`${HOST}/api/public/product/all`, {
      params: {
        limit: filter.limit,
        page: filter.page,
        sort: `${filter.sortParams},${filter.sortDirection}`,
        keyword: filter.keyword,
      },
    });
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