import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'highlight.js/styles/vs2015.css'
import hljs from 'highlight.js/lib/core'
import _javascript from 'highlight.js/lib/languages/javascript'
import _html from 'highlight.js/lib/languages/xml'
import _css from 'highlight.js/lib/languages/css'
hljs.registerLanguage('javascript', _javascript)
hljs.registerLanguage('html', _html)
hljs.registerLanguage('css', _css)
window.hljs = hljs

import baseTemplate from '@/libs'

createApp(App).use(store).use(router).use(baseTemplate).mount('#app')
