<template>
  <pre class="pre-class language-">
    <code v-for="(item, index) in codeList" :key="`${key}_${index}`" v-html="item.code"></code>
  </pre>
</template>

<script>
import { defineComponent, ref, computed, } from 'vue'
import { codeMap } from '../../assets/js/map'

export default defineComponent({
  props: {
    language: {
      type: String,
      default: 'javascript',
    },
    code: {
      type: String || Array,
      default: '',
    },
  },
  setup(props, context) {
    const key = 'abc'

    const codeList = computed(() => {
      if (typeof props.code === 'object') {
        return props.code.map(item => {
          const language = codeMap(item.language) || codeMap(props.language)
          item.code = Prism.highlight(item.code, Prism.languages[language], language)
          return item
        })
      } else {
        const language = codeMap(props.language)
        return [
          {
            language,
            code: Prism.highlight(props.code, Prism.languages[language], language)
          }
        ]
      }
    })

    return {
      key,
      codeList,
    }
  },
  mounted () {
    
  }
})
</script>

<style scoped>
.pre-class { width: 600px; height: 500px; overflow: auto; }
.pre-class::-webkit-scrollbar { width: 7px; height: 7px; background: #272822; cursor: pointer; }
.pre-class::-webkit-scrollbar-thumb { background: rgba(255,255,255,.3); border-radius: 2px; }
</style>
