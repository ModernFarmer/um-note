<template>
  <div id="app">
    <button>Log In</button>
    <button>Log Out</button>
    <um-note
      class="code-outsize"
      :width="width"
      :height="'300px'"
      language="javascript"
      editable
      :foldable="true"
      :unfold="true"
      :codes="code"
      @submit="submit"
    />
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const width = ref('500px')
    const code = ref([{
      language: 'javascript',
      code: `
export const _languageMap = {
  lanList: [{ value: 'Html', fnKey: 'markup' }, { value: 'JavaScript', fnKey: 'javascript' }, { value: 'CSS', fnKey: 'css' }],
  lanMap: {
    html: { fnTitle: 'markup', showTitle: 'Html', },
    Html: { fnTitle: 'markup', showTitle: 'Html', },
    HTML: { fnTitle: 'markup', showTitle: 'Html', },
    javascript: { fnTitle: 'javascript', showTitle: 'JavaScript', },
    JavaScript: { fnTitle: 'javascript', showTitle: 'JavaScript', },
    css: { fnTitle: 'css', showTitle: 'CSS', },
    CSS: { fnTitle: 'css', showTitle: 'CSS', },
  },
}

/**
 * 检测language
 * 
 * @returns {String} 语言字符串
 * 
 * @example 
 * const result = getLanguage('abc')
 * @param {String} str 需要检测的字符串
 * console.log(result) // 'javascript'
 */
export const getLanguage = str => {
  if (!str) return 'javascript'
  return _languageMap.lanMap[str.toLowerCase()]?.fnTitle || 'javascript'
}
getLanguage.list = _languageMap.lanList
      
      `
    }])

    const submit = ({data, close}) => {
      console.log(data)
      close()
    }

    return {
      code,
      width,
      submit,
    }
  },
})
</script>

<style>
#app { width: 100%; height: 100%; overflow: hidden; position: relative; }
.code-outsize { margin-left: 50px; margin-top: 50px; }
</style>
