
import Axios from '@/api/axios';
import { HOST } from '@/api/config'


//page return 
export const getWithdrawalHistory = async (filters = {}) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/withdrawalhistory/customer/date-range`, {
            params: {
                startDate: filters.startDate,
                endDate: filters.endDate,
                page: filters.page || 0,
                limit: filters.limit || 5,
                sort: `${filters.sortField ? filters.sortField : 'id'},${filters.sortDirection ? filters.sortDirection : 'desc'}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching withdrawal history:", error);
        throw error;
    }
};