import Axios from '@/api/axios';
import { HOST } from '@/api/config';

export const getProductFavorite = async (page = 0, limit = 8, sortField = 'id', sortDirection = 'desc') => {
    try {
        const response = await Axios.get(`${HOST}/api/public/WishList/getAllFavourite`, {
            params: {
                page,
                limit,
                sort: `${sortField},${sortDirection}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};


export const toggleProductFavorite = async (productId) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/WishList/favourite`, null, {
            params: { productId },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to toggle favorite status: ${error}`);
    }
};