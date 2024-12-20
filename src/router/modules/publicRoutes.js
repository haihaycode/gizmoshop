
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
                    title: "Giỏ hàng",
                    description: "Gizmo"
                },
                components: {
                    default: usePage('cart'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    // sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent')
                    mobile: useComponentLayout('ResponsiveMobile')

                }
            },
            {
                path: '/cart/toOrder',
                name: 'cartToOrder',
                meta: {
                    title: "Tiến hành đặt hàng",
                    description: "Gizmo"
                },
                components: {
                    default: usePage('cartToOder'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    // sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent')
                    mobile: useComponentLayout('ResponsiveMobile')
                }
            },
            {
                path: '/product/detail',
                name: 'productDetail',
                meta: {
                    title: "Sản phẩm mô tả",
                    description: "Gizmo"
                },
                components: {
                    default: usePage('productDetail'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent'),
                    mobile: useComponentLayout('ResponsiveMobile')

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
                path: '/contact-us',
                name: 'contactUs',
                meta: {
                    title: "Gizmo Shop",
                    description: "Giới thiệu & Liên hệ "
                },
                components: {
                    default: usePage('contactUs'),
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
                    description: "Gizmo"
                },
                components: {
                    default: usePage('product'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent'),
                    mobile: useComponentLayout('ResponsiveMobile')
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
            {
                path: "/builder",
                name: "builder",
                meta: {
                    title: "Build PC",
                    description: " ",
                },
                components: {
                    default: usePage("builderPC"),
                    header: useComponentLayout("Nav"),
                    footer: useComponentLayout("Footer"),
                },
            },




        ]
    }
];

export default publicRoutes;  