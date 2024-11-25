
const useComponentLayout = component => () => import(`@/components/layout/${component}.vue`);
const useLayout = component => () => import(`@/view/layout/${component}.vue`);
const usePage = page => () => import(`@/view/page/${page}.vue`);

const paymentRoutes = [
    {
        path: '/',
        component: useLayout('MemberLayout'),
        children: [
            {
                path: 'payment/payment-success',
                name: 'paymentSuccess',
                meta: {
                    title: "Thanh toán thành công",
                    description: " "
                },
                components: {
                    default: usePage('payment/PaymentSuccess'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent'),
                    mobile: useComponentLayout('ResponsiveMobile')
                }
            },
            {
                path: 'payment/payment-failed',
                name: 'paymentFailed',
                meta: {
                    title: "Thanh toán thất bại",
                    description: " "
                },
                components: {
                    default: usePage('payment/PaymentFailed'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    sidebar: useComponentLayout('NavigationLeftCategoryAsideComponent'),
                    mobile: useComponentLayout('ResponsiveMobile')

                }
            },





        ]
    }
];

export default paymentRoutes;  