import UmNoteTemplate from './template/note/index.vue'
import { _languageMap, getLanguage, UM_NOTE_CONFIG } from './template/note/staticData'
import components from 'prismjs/components.js'
import loadLanguages from './template/note/modified-prism.js'

const fullMap = {}
Object.entries(components.languages).forEach(item => {
  if (item[0] !== 'meta') {
    const json = { fnTitle: item[0], showTitle: item[1].title, }
    fullMap[item[0]] = fullMap[item[1].title.toLowerCase()] = json
    let alias = item[1].alias
    if (alias) {
      if (!Array.isArray(alias)) alias = [alias]
      alias.forEach(val => {
        fullMap[val] = {
          fnTitle: item[0],
          showTitle: val.replace(val[0], val[0].toUpperCase()),
        }
      })
    }
  }
})

export const UmNote = {
  install: function (Vue) {
    Vue.component('UmNote', UmNoteTemplate)
  }
}

export const UmNoteConfig = (json) => {
  if (json.addConfigure) UM_NOTE_CONFIG.addConfigure = json.addConfigure
  if (json.editConfigure) UM_NOTE_CONFIG.editConfigure = json.editConfigure
  if (json.removeConfigure) UM_NOTE_CONFIG.removeConfigure = json.removeConfigure
  if (json.submitConfigure) UM_NOTE_CONFIG.submitConfigure = json.submitConfigure
  if (json.contentNames) UM_NOTE_CONFIG.contentNames = json.contentNames
  if (Array.isArray(json.languages)) {
    const lanMap = {}
    const lanList = []
    const fnKeyList = []
    json.languages.forEach(val => {
      const item = fullMap[val]
      if (item) {
        lanMap[item.fnTitle] = lanMap[item.showTitle.toLowerCase()] = item
        lanList.push({ value: item.showTitle, fnKey: item.fnTitle })
        fnKeyList.push(item.fnTitle)
      }
    })
    loadLanguages(fnKeyList)
    _languageMap.lanList = getLanguage.list = lanList
    _languageMap.lanMap = lanMap
  }
  if (json.theme && typeof json.theme === 'string') {
    const validThemesMap = ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
    if (json.theme === 'default' || !validThemesMap.includes(json.theme)) {
      require('prismjs/themes/prism.css')
      UM_NOTE_CONFIG.theme = 'default'
    } else {
      require(`prismjs/themes/prism-${json.theme}.css`)
      UM_NOTE_CONFIG.theme = json.theme
    }
  } else {
    require('prismjs/themes/prism.css')
    UM_NOTE_CONFIG.theme = 'default'
  }
}