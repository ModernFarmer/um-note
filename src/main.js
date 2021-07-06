import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import baseTemplate from '@/libs'

createApp(App).use(store).use(router).use(baseTemplate).mount('#app')
