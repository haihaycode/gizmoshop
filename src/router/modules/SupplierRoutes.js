const useComponentLayout = component => () => import(`@/components/layout/${component}.vue`);
const useLayout = component => () => import(`@/view/layout/${component}.vue`);
const usePage = page => () => import(`@/view/page/${page}.vue`);


const SupplierRoutes = [
    {
        path: '/supplier',
        component: useLayout('SupplierLayout'),
        children: [
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