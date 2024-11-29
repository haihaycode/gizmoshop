// src/store.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import loading from './modules/loading';
import leftMenu from './modules/leftMenu';
import nav from './modules/nav';
export default createStore({
    modules: {
        auth,
        loading,
        leftMenu,
        nav
    },
});
