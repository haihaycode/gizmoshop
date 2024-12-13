import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const forgotPass = async (ForgotObject) => {
  try {
    const response = await Axios.post(
      `${HOST}/api/public/send-email`,
      ForgotObject
    );
    console.log("API Response:", response); // Log phản hồi đầy đủ
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("API Error:", error.response); // Log lỗi chi tiết
    throw error; // Ném lỗi ra để xử lý ở `handleForgotPassword`
  }
};
export const sendmailOtp = async (ForgotObject) => {
  try {
    const response = await Axios.post(
      `${HOST}/api/public/send-emailsignin`,
      ForgotObject
    );
    console.log("API Response:", response); // Log phản hồi đầy đủ
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("API Error:", error.response); // Log lỗi chi tiết
    throw error; // Ném lỗi ra để xử lý ở `handleForgotPassword`
  }
};
export const confirmOtpAndResetPassword = async (resetObject) => {
  try {
    const response = await Axios.post(
      `${HOST}/api/public/confirm-otp-and-reset-password`,
      resetObject
    );
    console.log("API Response:", response); // Log phản hồi đầy đủ
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("API Error:", error.response); // Log lỗi chi tiết
    throw error; // Ném lỗi ra để xử lý
  }
};
