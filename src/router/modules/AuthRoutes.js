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
                    title: "Gizmo Shop",
                    description: "Đồ công nghệ Giá rẻ"
                },
                components: {
                    default: usePage('login'),
                }
            },{
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
    
]
export default guestRoutesAuth;