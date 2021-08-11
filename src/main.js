import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { UmNote, UmNoteConfig } from '@/libs'
// import { UmNote, UmNoteConfig } from '../um-note/um-note.umd'

// console.log(Prism.allLanguages)
// console.log(Prism.hasLanguage('html'))

UmNoteConfig({
  addConfigure (config) {
    // const num = Math.ceil(Math.random() * 100)
    // console.log(num)
    // setTimeout(() => {
    //   if (num % 2 === 0) {
    //     config.done = true
    //   } else {
    //     alert('Oh, no!!!')
    //   }
    // }, 1000)
    config.done = !config.done
  },
  editConfigure (config) {
    config.done = !config.done
  },
  removeConfigure (config) {
    config.done = !config.done
  },
  submitConfigure (config) {
    console.log('in')
    config.done = !config.done
  },
  contentNames: {
    cancel: '取消',
    confirm: '确定',
    explain: '确定删除?',
  },
  languages: ['html', 'javascript', 'css', 'c++', 'ASP.NET (C#)'],
  // theme: 'okaidia',
  theme: '',
})
// ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
createApp(App).use(store).use(router).use(UmNote).mount('#app')