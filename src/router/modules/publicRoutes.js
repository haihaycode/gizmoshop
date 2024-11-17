
const useComponentLayout = component => () => import(`@/components/layout/${component}.vue`);
const useLayout = component => () => import(`@/view/layout/${component}.vue`);
const usePage = page => () => import(`@/view/page/${page}.vue`);

const publicRoutes = [
    {
        path: '',
        component: useLayout('MemberLayout'),
        children: [
            {
                path: '/cart',
                name: 'yourCart',
                meta: {
                    title: "...Updating...",
                    description: " "
                },
                components: {
                    default: usePage('cart'),
                    header: useComponentLayout('Header'),
                    footer: useComponentLayout('Footer'),
                    // sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent')

                }
            },
            {
                path: '/toOrder',
                name: 'cartToOrder',
                meta: {
                    title: "...Updating...",
                    description: " "
                },
                components: {
                    default: usePage('cartToOder'),
                    header: useComponentLayout('Header'),
                    footer: useComponentLayout('Footer'),
                    // sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent')

                }
            },
            {
                path: '/product',
                name: 'productDetail',
                meta: {
                    title: "...Updating...",
                    description: " "
                },
                components: {
                    default: usePage('productDetail'),
                    header: useComponentLayout('Header'),
                    footer: useComponentLayout('Footer'),
                    // sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent')

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
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent'),
                    mobile: useComponentLayout('ResponsiveMobile')

                }
            },

        ]
    }
];

export default publicRoutes;  