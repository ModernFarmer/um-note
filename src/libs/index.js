import UmNoteTemplate from './template/note/index.vue'
import { _languageMap, getLanguage } from './template/note/staticData'
// import loadLanguages from 'prismjs/components/index'
import components from 'prismjs/components.js'
import loadLanguages from './template/note/modified-prism.js'

window.$_CONFIG_UM_NOTE_PERMISSION = null

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
  window.$_CONFIG_UM_NOTE_PERMISSION = {}
  if (json.addConfigure) window.$_CONFIG_UM_NOTE_PERMISSION.addConfigure = json.addConfigure
  if (json.editConfigure) window.$_CONFIG_UM_NOTE_PERMISSION.editConfigure = json.editConfigure
  if (json.removeConfigure) window.$_CONFIG_UM_NOTE_PERMISSION.removeConfigure = json.removeConfigure
  if (json.contentNames) window.$_CONFIG_UM_NOTE_PERMISSION.contentNames = json.contentNames
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
    console.log(lanMap)
    _languageMap.lanList = getLanguage.list = lanList
    _languageMap.lanMap = lanMap
  }
}