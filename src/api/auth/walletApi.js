

import Axios from '@/api/axios';
import { HOST } from '@/api/config'


export const getWallet = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/walletaccount/getall`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const addWallet = async (walletObject) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/walletaccount/create`, walletObject);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};


export const updateWallet = async (walletObject) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/walletaccount/update/${walletObject.id}`, walletObject);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const deleteWallet = async (walletObject) => {
    try {
        const response = await Axios.delete(`${HOST}/api/public/walletaccount/delete/${walletObject.id}`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};






