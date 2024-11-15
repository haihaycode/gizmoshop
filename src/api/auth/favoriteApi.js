import Axios from '@/api/axios';
import { HOST } from '@/api/config';

export const getProductFavorite = async (page = 0, limit = 8, sortField = 'id', sortDirection = 'asc') => {
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
