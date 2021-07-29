import UmNoteTemplate from './template/note/index.vue'

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
}