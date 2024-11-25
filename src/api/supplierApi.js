
import Axios from "@/api/axios";
import { HOST } from "@/api/config";
// /api/public/account/register/note/supplier

export const registerNoteSupplierAccount = async (supplierNewObject) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/account/register/note/supplier`, supplierNewObject);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
