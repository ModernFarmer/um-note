import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { UmNote, UmNoteConfig } from '@/libs'

UmNoteConfig({
  addConfigure (status) {
    return !status
  },
  editConfigure (status) {
    return !status
  },
  removeConfigure (status) {
    
  },
})

createApp(App).use(store).use(router).use(UmNote).mount('#app')
