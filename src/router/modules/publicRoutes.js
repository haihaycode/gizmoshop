
const useComponentLayout = component => () => import(`@/components/layout/${component}.vue`);
const useLayout = component => () => import(`@/view/layout/${component}.vue`);
const usePage = page => () => import(`@/view/page/${page}.vue`);

const publicRoutes = [
    {
        path: '',
        component: useLayout('MemberLayout'),
        children: [
            {
                path: '/demodev',
                name: 'demodev',
                meta: {
                    title: "...Updating...",
                    description: " "
                },
                components: {
                    default: usePage('demo'),
                    header: useComponentLayout('Header')

                }
            },
            {
                path: '',
                name: 'home',
                meta: {
                    title: "Gizmo Shop",
                    description: "Đồ công nghệ Giá rẻ   "
                },
                components: {
                    default: usePage('homePage'),
                    header: useComponentLayout('Header')

                }
            },

        ]
    }
];

export default publicRoutes;  