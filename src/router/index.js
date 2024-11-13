import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { DEV } from '@/api/config';
import store from '@/store'; //
import { SUPPLIER } from '@/services/authService';

import AuthRoutes from '@/router/modules/AuthRoutes';
import PublicRoutes from '@/router/modules/publicRoutes';
import ErrorRoutes from '@/router/modules/errorRoutes';

export const routes = [
    ...AuthRoutes,
    ...PublicRoutes,
    ...ErrorRoutes,
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
    // Nếu người dùng không có token và đường dẫn chưa account thì chuyển về login
    if (!isAuthenticated && to.path.includes('/account')) {
        return next('/login');
    }
    if (isAuthenticated && to.path === 'supplier' && !SUPPLIER()) {
        return next('/403'); //hoac chuyen toi trang dang SUPPLIER
    }
    return next();
});

export default router;