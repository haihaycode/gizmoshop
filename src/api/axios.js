import axios from 'axios';
import { MAX_TIME_OUT, HOST, SUCCESS_CODE } from '@/api/config';
import store from '@/store';
import notificationService from '@/services/notificationService';
import router from '@/router';

// Tạo instance Axios với cấu hình cơ bản
const Axios = axios.create({
    baseURL: HOST,
    timeout: MAX_TIME_OUT,
    responseType: 'json',
    withCredentials: false, // Đặt true để gửi cookie nếu có

});

let isRefreshing = false;
let failedQueue = [];


const processQueue = (error, token = null) => {
    console.log("line 22")
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Thêm interceptor cho yêu cầu
Axios.interceptors.request.use(
    config => {
        store.dispatch('loading/setLoading', true);
        if (config.method === 'post') {
            console.log("request : post")
        }
        const token = store.getters['auth/token'];
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        store.dispatch('loading/setLoading', false);
        return Promise.reject(error);
    }
);

// Thêm interceptor cho phản hồi
Axios.interceptors.response.use(
    response => {
        store.dispatch('loading/setLoading', false);
        if (response.status === SUCCESS_CODE) {
            return response;
        } else {
            notificationService.error(response.message || 'Có lỗi xảy ra!');
            return Promise.reject(response);
        }
    },
    error => {
        console.log("line 65")
        const originalRequest = error.config;
        store.dispatch('loading/setLoading', false);

        if (error.status === 404) {
            notificationService.error('Không tìm thấy dữ liệu.');
            router.push({ name: 'NotFound' });
            return Promise.reject(error);
        }

        if (error.message === 'Network Error') {
            notificationService.error('Không thể kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn.');
            router.push({ name: 'ServerError' });
            return Promise.reject(error);
        }

        // Kiểm tra xem có phải lỗi do timeout không
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            notificationService.error('Yêu cầu đã quá thời gian chờ. Vui lòng thử lại.');

            router.push({ name: 'ServerError' });
            return Promise.reject(error);
        }

        // Xử lý lỗi 401 - Unauthorized và kiểm tra refresh token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log("line 75")
            if (store.getters['auth/refreshToken']) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return Axios(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(function (resolve, reject) {
                    Axios.post('/api/public/refresh', { refreshToken: store.getters['auth/refreshToken'] })
                        .then(({ data }) => {
                            store.dispatch('auth/setToken', data.token);
                            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                            processQueue(null, data.token);
                            resolve(Axios(originalRequest));
                        })
                        .catch(err => {
                            processQueue(err, null);
                            store.dispatch('auth/logout');
                            notificationService.error('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
                            reject(err);
                        })
                        .finally(() => {
                            isRefreshing = false;
                        });
                });
            } else {
                notificationService.error('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
                store.dispatch('auth/logout'); // logout
            }
        }

        // Xử lý các lỗi khác
        if (error.response && error.response.data) {
            notificationService.error(error.response.data.message || 'Có lỗi xảy ra!');
        }
        return Promise.reject(error);
    }
);

export default Axios;
