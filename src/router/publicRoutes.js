const useComponent = component => () => import(`../view/${component}.vue`);
import client from '@/view/client.vue';
const publicRoutes = [
    {
        path: '/login',
        component: client,
        children: [

            {
                path: '',
                meta: {
                    title: "Tên routes ",
                    description: " Mô tả "
                },
                components: {
                    default: useComponent('test')
                }

            },

        ]
    },
];

export default publicRoutes;