import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import 'boxicons/css/boxicons.min.css';
import '@/assets/css/hoverCursorpointer.css'
import { initializeToast } from '@/services/notificationService';

import router from './router'
import store from './store'
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
const app = createApp(App)


app.use(store)
app.use(router)
app.use(FloatingVue);
initializeToast(app);

app.mount('#app')
