import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { UmNote, UmNoteConfig } from '@/libs'

UmNoteConfig({
  addConfigure (config) {
    config.done = !config.done
  },
  editConfigure (config) {
    config.done = !config.done
  },
  removeConfigure (config) {
    config.done = !config.done
  },
  submitConfigure (config) {
    config.done = !config.done
  },
  contentNames: {
    cancel: '取消',
    confirm: '确定',
    explain: '确定删除?',
  },
  languages: ['html', 'javascript', 'css', 'c++'],
  // theme: 'okaidia',
  theme: 'solarizedlight',
})
// ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
createApp(App).use(store).use(router).use(UmNote).mount('#app')