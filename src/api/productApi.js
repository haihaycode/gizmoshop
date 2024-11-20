import Axios from '@/api/axios';
import { HOST } from '@/api/config'


/**
 * Fetch products with various optional filters.
 *
 * @param {Object} filter - Object containing optional filter parameters
 * @param {number} filter.limit - (Optional) Number of products per page
 * @param {number} filter.page - (Optional) Current page number
 * @param {string} filter.sortParams - (Optional) Sort field
 * @param {string} filter.sortDirection - (Optional) Sort direction ('asc' or 'desc')
 * @param {string} filter.keyword - (Optional) Keyword for search
 * @param {string} filter.sortFieldCase - (Optional) Field to use for case-insensitive sorting
 * @param {number} filter.price1 - (Optional) Minimum price filter
 * @param {number} filter.price2 - (Optional) Maximum price filter
 * @param {number} filter.brand - (Optional) Brand ID filter
 * @param {number} filter.category - (Optional) Category ID filter
 * @returns {Promise<Object>} - Response data from the API
 */
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