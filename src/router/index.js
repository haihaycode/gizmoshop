import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { DEV } from '@/api/config';
import store from '@/store'; //
import { SUPPLIER } from '@/services/authService';

import AuthRoutes from '@/router/modules/AuthRoutes';
import PublicRoutes from '@/router/modules/publicRoutes';
import ErrorRoutes from '@/router/modules/errorRoutes';
import paymentRoutes from './modules/paymentRoutes';
import SupplierRoutes from './modules/SupplierRoutes';


import NProgress from 'nprogress'
import 'nprogress/nprogress.css'



export const routes = [
    ...AuthRoutes,
    ...PublicRoutes,
    ...ErrorRoutes,
    ...paymentRoutes,
    ...SupplierRoutes,
    { path: '/:pathMatch(.*)*', redirect: { name: 'NotFound' } }

];


const router = createRouter({
    history: !DEV ? createWebHashHistory() : createWebHistory(),
    routes,
    linkActiveClass: 'bg-gray-100 bg-opacity-5',
    linkExactActiveClass: 'bg-gray-100 bg-opacity-5',
});



router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title + ' - ' + to.meta.description;
    }
    if (to.meta.description) {
        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', to.meta.description);
        } else {
            const newDescriptionTag = document.createElement('meta');
            newDescriptionTag.setAttribute('name', 'description');
            newDescriptionTag.setAttribute('content', to.meta.description);
            document.head.appendChild(newDescriptionTag);
        }
    }

    next();
});


router.beforeEach(async (to, from, next) => {
    const isAuthenticated = store.getters['auth/token'];

    if (!isAuthenticated && to.path.includes('/cart')) {
        return next('/login');
    }
    if (!isAuthenticated && to.path.includes('/account')) {
        return next('/login');
    }

    // Chuyển đến đăng nhập nếu chưa đăng nhập mà truy cập các route bắt đầu với /supplier
    if (!isAuthenticated && to.path.startsWith('/supplier')) {
        return next('/login');
    }


    // Nếu đã đăng nhập và đang ở /supplier/register
    if (isAuthenticated) {
        // Kiểm tra nếu người dùng chưa là nhà cung cấp và đang cố gắng truy cập trang /supplier
        if (!SUPPLIER() && (to.path === '/supplier' || to.path == '/supplier/')) {
            return next('/supplier/register'); // Chuyển hướng đến trang đăng ký
        }

        // Kiểm tra nếu người dùng đã là nhà cung cấp và đang cố gắng truy cập trang đăng ký
        if (SUPPLIER() && to.path === '/supplier/register') {
            return next('/supplier/dashboard'); // Chuyển hướng đến trang Dashboard
        }

        // Nếu người dùng đã là nhà cung cấp và đang vào trang /supplier hoặc /supplier/dashboard
        if (SUPPLIER() && (to.path === '/supplier/' || to.path == '/supplier' || to.path === '/supplier/dashboard')) {
            return next(); // Cho phép truy cập vào trang
        }
    }

    // Nếu đã đăng nhập và truy cập các route /supplier/t/*
    if (isAuthenticated && to.path.startsWith('/supplier/t/')) {
        if (!SUPPLIER()) {
            // Chưa là nhà cung cấp -> Chuyển đến trang đăng ký
            return next('/supplier/register');
        } else {
            // Đã là nhà cung cấp -> Cho phép tiếp tục
            return next();
        }
    }

    // Mặc định cho phép đi tiếp
    return next();
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach(() => {
    //cuộn lên đầu trang
    NProgress.done();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

export default router;