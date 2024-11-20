import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const registerApi = async (registerObject) => {
  try {
    const response = await Axios.post(
      `${HOST}/api/public/auth/register`,
      registerObject
    );
    console.log("Payload gửi đi: ", registerObject);
    return response.data;
  } catch (error) {
    console.error("API Error: ", error.response?.data || error.message);
    throw error;
  }
};
