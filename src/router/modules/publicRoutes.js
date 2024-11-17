
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
                path: '/product/detail',
                name: 'productDetail',
                meta: {
                    title: "Sản phẩm mô tả",
                    description: " "
                },
                components: {
                    default: usePage('productDetail'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent')

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
            {
                path: '/search-order/:phoneNumber?/:orderCode?',
                name: 'searchOrder',
                meta: {
                    title: "Gizmo Shop",
                    description: "Tra cứu đơn hàng"
                },
                components: {
                    default: usePage('searchOrder'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    mobile: useComponentLayout('ResponsiveMobile')
                }
            },
            {
                path: '/product',
                name: 'product',
                meta: {
                    title: "Đồ công nghệ rẻ",
                    description: " "
                },
                components: {
                    default: usePage('product'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent')

                }
            },
            {
                path: '/tt',
                name: 'tt',
                meta: {
                    title: "Đồ công nghệ rẻ",
                    description: " "
                },
                components: {
                    default: usePage('testthanhtoan'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent')

                }
            },




        ]
    }
];

export default publicRoutes;  