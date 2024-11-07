// const useComponentLayout = component => () => import(`@/components/layout/${component}.vue`);
// const useComponentPage = component => () => import(`@/components/${component}.vue`);


const useLayout = component => () => import(`@/view/layout/${component}.vue`);
// const usePage = page => () => import(`@/view/page/${page}.vue`);
const useErrorPage = page => () => import(`@/view/error/${page}.vue`);
const errorRoutes = [
    {
        path: '/err',
        component: useLayout('GuestLayout'),
        children: [

            {
                path: '404',
                name: 'NotFound',
                meta: {
                    title: "Đường dẫn không tồn tại",
                    description: "Gizmo"
                },
                components: {
                    default: useErrorPage('404'),

                }

            },
            {
                path: '403',
                name: 'forbidden',
                meta: {
                    title: "Không đủ quyền",
                    description: "Gizmo"
                },
                components: {
                    default: useErrorPage('403'),

                }

            },
            {
                path: '500',
                name: 'ServerError',
                meta: {
                    title: "Đã có lỗi xảy ra",
                    description: "Gizmo"
                },
                components: {
                    default: useErrorPage('500'),
                }
            },
            {
                path: '',
                /* eslint-disable */
                redirect: '/err/500'
            },
            //thêm route lỗi
        ]
    },

]
export default errorRoutes;  