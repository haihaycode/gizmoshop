const useLayout = component => () => import(`@/view/layout/${component}.vue`);
const usePage = page => () => import(`@/view/page/${page}.vue`);
// const useComponentPage = component => () => import(`@/components/${component}.vue`);
const useComponentLayout = component => () => import(`@/components/layout/${component}.vue`);
const guestRoutesAuth = [
    {
        path: '/',
        component: useLayout('GuestLayout'),
        children: [
            {
                path: 'login',
                name: 'login',
                meta: {
                    title: "Gizmo Shop",
                    description: "Đồ công nghệ Giá rẻ"
                },
                components: {
                    default: usePage('login'),
                }
            }, {
                path: '/signin',
                name: 'signin',
                meta: {
                    title: "Gizmo Shop",
                    description: "Đồ công nghệ Giá rẻ   "
                },
                components: {
                    default: usePage('signin'),


                }
            },

        ]
    },
    //account Routes
    {
        path: '/',
        components: {
            default: useLayout('MemberLayout'),
        },
        children: [
            {
                path: 'account',
                name: 'account',
                components: {
                    default: useLayout('layoutAccount/AccountLayout'),
                    header: useComponentLayout('Nav'),
                    footer: useComponentLayout('Footer'),
                    mobile: useComponentLayout('ResponsiveMobile')
                },

                children: [
                    {
                        path: '',
                        name: 'mobilePage',
                        meta: {
                            title: "Thông tin cá nhân",
                            description: "Gizmo"
                        },
                        components: {
                            default: usePage('account/InfomationPageMobile'),
                        }
                    },
                    {
                        path: 'profile',
                        name: 'profile',
                        meta: {
                            title: "Thông tin cá nhân",
                            description: "Gizmo"
                        },
                        components: {
                            default: usePage('account/profile'),
                        }
                    },
                    {
                        path: 'favorite',
                        name: 'favorite',
                        meta: {
                            title: "Yêu thích",
                            description: "Gizmo"
                        },
                        components: {
                            default: usePage('account/favorite'),
                        }
                    },
                    {
                        path: 'address',
                        name: 'address',
                        meta: {
                            title: "Địa chỉ",
                            description: "Gizmo"
                        },
                        components: {
                            default: usePage('account/address'),
                        }
                    },
                    {
                        path: 'bank',
                        name: 'bank',
                        meta: {
                            title: "Ngân hàng",
                            description: "Gizmo"
                        },
                        components: {
                            default: usePage('account/bank'),
                        }
                    },
                    {
                        path: 'changepassword',
                        name: 'changepassword',
                        meta: {
                            title: "Đổi mật khẩu",
                            description: "Gizmo"
                        },
                        components: {
                            default: usePage('account/changePass'),
                        }
                    },
                    {
                        path: 'withdrawalHistory',
                        name: 'withdrawalHistory',
                        meta: {
                            title: "Lịch sử rút tiền",
                            description: "Gizmo"
                        },
                        components: {
                            default: usePage('account/withdrawalHistory'),
                        }
                    },
                    {
                        path: 'orderHistory',
                        name: 'orderHistory',
                        meta: {
                            title: "Đơn hàng",
                            description: "Gizmo"
                        },
                        components: {
                            default: usePage('account/orderHistory'),
                        }
                    }

                ]
            },
        ]
    }

]
export default guestRoutesAuth;