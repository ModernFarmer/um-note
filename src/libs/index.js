import UmNoteTemplate from './template/note/index.vue'
import { _languageMap, getLanguage } from './template/note/staticData'
// import loadLanguages from 'prismjs/components/index'
import loadLanguages from './template/note/modified-prism.js'

window.$_CONFIG_UM_NOTE_PERMISSION = null

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
    loadLanguages(['SML'])
    console.log(Prism.languages)
    _languageMap.lanList = json.languages
    const obj = {}
    json.languages.forEach(val => {
      obj[val] = true
    })
    _languageMap.lanMap = obj
    getLanguage.list = _languageMap.lanList
  }
}