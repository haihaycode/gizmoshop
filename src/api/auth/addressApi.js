import Axios from '@/api/axios';
import { HOST } from '@/api/config';

// Fetch all addresses
export const getAddress = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/Address/getall`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching addresses: ${error}`);
    }
};

// Create a new address
export const createAddress = async (newAddress) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/Address/create`, newAddress);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating address: ${error}`);
    }
};

// Update an existing address
export const updateAddress = async (addressId, updatedAddress) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/Address/update/${addressId}`, updatedAddress);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating address: ${error}`);
    }
};

// Delete an address
export const deleteAddress = async (addressId) => {
    try {
        const response = await Axios.delete(`${HOST}/api/public/Address/delete/${addressId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting address: ${error}`);
    }
};
