const useComponentLayout = component => () => import(`@/components/layout/${component}.vue`);
const useLayout = component => () => import(`@/view/layout/${component}.vue`);
const usePage = page => () => import(`@/view/page/${page}.vue`);


const SupplierRoutes = [
    {
        path: '/supplier',
        component: useLayout('SupplierLayout'),
        children: [
            {
                path: 'contact-us',
                name: 'ContactUs',
                meta: {
                    title: "Liên hệ với chúng tôi",
                    description: " Gizmo"
                },
                components: {
                    default: usePage('supplier/Contact'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            {
                path: 'about-us',
                name: 'AboutUs',
                meta: {
                    title: "Giới thiệu",
                    description: " Gizmo"
                },
                components: {
                    default: usePage('supplier/About'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            {
                path: '',
                name: 'SupplierHome',
                meta: {
                    title: "Nhà cung cấp",
                    description: " Gizmo"
                },
                components: {
                    default: usePage('supplier/dashboard'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            {
                path: 'orders-pending',
                name: 'OrdersPendingSupplier',
                meta: {
                    title: "Đơn hàng chưa gửi",
                    description: " Gizmo"
                },
                components: {
                    default: usePage('supplier/pendingOrders'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            {
                path: 'orders',
                name: 'OrdersSupplier',
                meta: {
                    title: "Đơn hàng ",
                    description: " Gizmo"
                },
                components: {
                    default: usePage('supplier/Orders'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            // Đơnn hàng cần gia hạn
            {
                path: 'renewal-order',
                name: 'renewalOrder',
                meta: {
                    title: "Đơn hàng gia hạn ",
                    description: " Gizmo"
                },
                components: {
                    default: usePage('supplier/renewalOrder'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            {
                path: 'products-me',
                name: 'productSupplier',
                meta: {
                    title: "Sản phẩm của tôi",
                    description: "Gizmo"
                },
                components: {
                    default: usePage('supplier/product'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            {
                path: 'wallet-me',
                name: 'walletSupplier',
                meta: {
                    title: "Ví của bạn",
                    description: "Gizmo"
                },
                components: {
                    default: usePage('supplier/wallet'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            {
                path: 'transactions-history',
                name: 'TransactionsHistory',
                meta: {
                    title: "Lịch sử giao dịch",
                    description: " Gizmo"
                },
                components: {
                    default: usePage('supplier/transactionsHistory'),
                    header: useComponentLayout('supplier/Header'),
                    footer: useComponentLayout('supplier/Footer'),
                    sidebar: useComponentLayout('supplier/Sidebar'),
                }
            },
            {
                path: 'register',
                name: 'supplierRegister',
                meta: {
                    title: "Đăng ký trở thành nhà cung cấp",
                    description: " Gizmo"
                },
                components: {
                    default: usePage('supplier/register/registerSupplier'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                }
            },

        ]
    }
];

export default SupplierRoutes;  