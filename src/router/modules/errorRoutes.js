// const useComponentLayout = component => () => import(`@/components/layout/${component}.vue`);
// const useComponentPage = component => () => import(`@/components/${component}.vue`);


const useLayout = component => () => import(`@/view/layout/${component}.vue`);
const usePage = page => () => import(`@/view/page/${page}.vue`);

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
                    default: usePage('404'),

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
                    default: usePage('403'),

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
                    default: usePage('500'),
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