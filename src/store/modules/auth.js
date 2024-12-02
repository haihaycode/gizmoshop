import Cookies from 'js-cookie';// Import js-cookie để thao tác với cookie
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode để giải mã JWT
import router from '@/router'; // Đảm bảo bạn đã import router
import { deleteAllNotifications } from '@/services/notiServiceC';

const state = {
    token: Cookies.get('tokenU') || null, // Đọc token từ cookie nếu có
    refreshToken: Cookies.get('refreshTokenU') || null, // Đọc refreshToken từ cookie nếu có
    user: Cookies.get('userU') ? JSON.parse(Cookies.get('userU')) : null,
};

const getters = {
    token: (state) => state.token,
    refreshToken: (state) => state.refreshToken,
    user: (state) => state.user, // Getter cho user
    role: (state) => state.user ? state.user.a : null, // Lấy role từ token (key "a")
    name: (state) => state.user ? state.user.e : null, // Lấy name/email từ token (key "e")
};

const actions = {
    setToken({ commit }, token) {
        // Lưu token vào cookie
        Cookies.set('tokenU', token, { expires: 1 }); // expires: 1 là 1 ngày
        commit('SET_TOKEN', token);
        // Giải mã JWT để lấy thông tin user từ token
        const decoded = jwtDecode(token);
        Cookies.set('userU', JSON.stringify(decoded), { expires: 1 });
        commit('SET_USER', decoded); // Lưu toàn bộ dữ liệu đã giải mã từ token vào state
    },
    setRefreshToken({ commit }, refreshToken) {
        // Lưu refresh token vào cookie
        Cookies.set('refreshTokenU', refreshToken, { expires: 30 });
        commit('SET_REFRESH_TOKEN', refreshToken);
    },
    logout({ commit }) {
        // Xoá token và refreshToken từ cookie khi đăng xuất
        Cookies.remove('tokenU');
        Cookies.remove('refreshTokenU');
        Cookies.remove('userU');
        commit('LOGOUT');
    },
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
        state.refreshToken = refreshToken;
    },
    SET_USER(state, user) {
        state.user = user; // Lưu thông tin người dùng từ token
    },
    LOGOUT(state) {
        //xóa notification
        deleteAllNotifications();
        //setNullForAll
        state.token = null;
        state.refreshToken = null;
        state.user = null;
        // Chuyển hướng đến trang login
        router.push({ name: 'login' }); // Giả sử tên của route login là 'Login'
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
