const useLayout = component => () => import(`@/view/layout/${component}.vue`);
const usePage = page => () => import(`@/view/page/${page}.vue`);
// const useComponentPage = component => () => import(`@/components/${component}.vue`);

const guestRoutesAuth = [
    {
        path: '/',
        component: useLayout('GuestLayout'),
        children: [
            {
                path: 'login',
                name: 'login',
                meta: {
                    title: "Quản Lý Cửa Hàng",
                    description: "Đăng nhập"
                },
                components: {
                    default: usePage('login'),
                }
            },

        ]
    },
]
export default guestRoutesAuth;