<template>
  <pre
    class="um-pre-class language-"
    :style="{ width, height }"
  ><code
      class="um-code-class"
      :contenteditable="edit"
      v-for="(item, index) in codeList"
      :key="`${key}_${index}`"
      v-html="item.code"
      @input="handleInput($event, item, '__input')"
      @keydown="handleInput($event, item, '__tabDown')"
    ></code></pre>
</template>

<script>
import { defineComponent, ref, watch, nextTick, } from 'vue'
import { getLanguage, getKey, getFrontOffset, getRealDomAndOffset, selection, } from './staticData'

export default defineComponent({
  props: {
    language: {
      type: String,
      default: 'javascript',
    },
    codes: {
      type: [Array, Object, String],
      default () {
        return []
      },
    },
    edit: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'auto',
    },
  },
  setup(props, context) {
    const key = ref(getKey())
    const codeList = ref([])
    let canHandle = true

    // 这里不用computed是因为props.codes里面的内容在(操作本组件的编辑代码功能)时需要改变, computed不支持改变计算后的属性值, 所以这里使用的是watch
    // 注* 必须加{ immediate: true }参数, 使其在组件创建时立即以 props.codes 的当前值触发监听函数
    watch(
      () => props.codes,

      codes => {
        if (Array.isArray(codes)) { // 如果props.codes是一个数组
          codeList.value = codes.map(item => {
            const language = getLanguage(item.language) || getLanguage(props.language)
            item.code = Prism.highlight(item.code, Prism.languages[language], language)
            return item
          })
        } else if (typeof codes === 'object') { // 如果props.codes是一个json
          const language = getLanguage(codes.language) || getLanguage(props.language)
          codeList.value = [
            {
              language,
              code: Prism.highlight(codes.code, Prism.languages[language], language),
            }
          ]
        } else { // 如果props.codes是一个字符串
          const language = getLanguage(props.language)
          codeList.value = [
            {
              language,
              code: Prism.highlight(codes, Prism.languages[language], language),
            }
          ]
        }
      },

      { immediate: true }
    )

    const handleInput = (e, item, handleType) => {
      if (handleType === '__tabDown' && e.keyCode !== 9) { // 这里是监听按键按下事件, 如果handleType === '__tabDown'且按下的不是tab键, 则阻断执行
        return
      } else if (handleType === '__tabDown') { // 如果按下的是tab键, 则取消默认
        e.preventDefault()
      }
      if (!canHandle || !selection.haveRange()) return
      const container = selection.getContainer()

      getFrontOffset(e.target, container, handleType, (totalOffset, textContent) => {
        // 防抖做到这里 ------------------
        // 这里的item对象就是codeList.value[当前索引], 利用引用型对象浅拷贝的特性, 直接操作item
        item.code = Prism.highlight(textContent, Prism.languages[item.language], item.language)
        nextTick(() => {
          getRealDomAndOffset(e.target, totalOffset, (el, i) => {
            selection.setCursorOffset(el, i)
          })
        })
      })
    }

    return {
      key,
      codeList,

      handleInput,
    }
  },
  mounted () {
    
  }
})
</script>

<style scoped>
.um-pre-class { padding: 1rem; border-radius: .3rem; overflow: auto; position: relative; }
.um-pre-class::-webkit-scrollbar { width: 7px; height: 7px; background: #272822; cursor: pointer; }
.um-pre-class::-webkit-scrollbar-thumb { background: rgba(255,255,255,.3); border-radius: 2px; }
.um-code-class { width: 100%; height: 100%; display: inline-block; outline: none; }
</style>
