import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { UmNote, UmNoteConfig } from '@/libs'

UmNoteConfig({
  addConfigure (config) {
    config.show = !config.show
  },
  editConfigure (config) {
    config.show = !config.show
  },
  removeConfigure (config) {
    config.show = !config.show
  },
})

createApp(App).use(store).use(router).use(UmNote).mount('#app')
