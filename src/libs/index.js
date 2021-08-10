import UmNoteTemplate from './template/note/index.vue'
import { _languageMap, getLanguage, UM_NOTE_CONFIG, themeConfigMap } from './template/note/publicData'
import components from 'prismjs/components.js'
import loadLanguages from './template/note/modified-prism.js'
import styleObj from './template/note/theme'

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
  styleObj.public()
  if (json.theme && typeof json.theme === 'string') {
    const validThemesMap = ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
    if (json.theme === 'default' || !validThemesMap.includes(json.theme)) {
      styleObj.default()
      UM_NOTE_CONFIG.theme = 'default'
    } else {
      // require(`prismjs/themes/prism-${json.theme}.css`)
      // UM_NOTE_CONFIG.theme = json.theme
      styleObj[json.theme]()
      UM_NOTE_CONFIG.theme = json.theme
    }
  } else {
    styleObj.default()
    UM_NOTE_CONFIG.theme = 'default'
  }
  const themesData = themeConfigMap[UM_NOTE_CONFIG.theme]
  document.styleSheets[0].insertRule(`._um-_confirm-item { background: ${themesData.button_background} }`)
  document.styleSheets[0].insertRule(`._um-_confirm-item:hover { color: ${themesData.button_hover_delete}; background: ${themesData.button_hover_background} }`)
  document.styleSheets[0].insertRule(`._um-_select-item { background: ${themesData.button_background} }`)
  document.styleSheets[0].insertRule(`._um-_select-item:hover { color: ${themesData.button_hover_add}; background: ${themesData.button_hover_background} }`)
  document.styleSheets[0].insertRule(`._um-_pre-class::-webkit-scrollbar { width: 8px; height: 8px; background: ${themesData.container_background}; cursor: pointer; }`)
  document.styleSheets[0].insertRule(`._um-_pre-class::-webkit-scrollbar-thumb { background: ${themesData.soroll_thumb_background}; border-radius: 2px; }`)
  document.styleSheets[0].insertRule(`._um-_pre-class::-webkit-scrollbar-corner { background: ${themesData.container_background}; }`)
  document.styleSheets[0].insertRule(`._um-_submit-item-cancel,._um-_submit-item-ok { background: ${themesData.button_background}; color: ${themesData.edit_color}; }`)
  document.styleSheets[0].insertRule(`._um-_submit-item-cancel:hover { color: ${themesData.edit_color_hover_cancel}; background: ${themesData.edit_background_hover}; }`)
  document.styleSheets[0].insertRule(`._um-_submit-item-ok:hover { color: ${themesData.edit_color_hover_ok}; background: ${themesData.edit_background_hover}; }`)
  document.styleSheets[0].insertRule(`._um-_sign-add, ._um-_sign-minus { color: ${themesData.add_minus_color}; }`)
  document.styleSheets[0].insertRule(`._um-_sign-add:hover { color: ${themesData.edit_color_hover_ok}; }`)
  document.styleSheets[0].insertRule(`._um-_sign-minus:hover { color: ${themesData.edit_color_hover_cancel}; }`)
}