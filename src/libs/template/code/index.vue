<template>
  <pre
    class="pre-class language-"
    :style="{ width, height }"
  ><code
      class="code-class"
      :contenteditable="edit"
      v-for="(item, index) in codeList"
      :key="`${key}_${index}`"
      v-html="item.code"
      @input="handleInput($event, item)"
    ></code></pre>
</template>

<script>
import { defineComponent, ref, watch, nextTick, } from 'vue'
import { getLanguage, getKey, getFrontTextcontent, getRealDom, selection, } from './staticData'

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

    const handleInput = ({ target:dom }, item) => {
      if (!canHandle || !selection.haveRange()) return
      const container = selection.getContainer()
      let textLength = 0 // 主容器下光标所在element元素之前的所有textContent的长度
      let cursorOffset = 0 // 光标偏移量
      // 这里的item对象就是codeList.value[当前索引], 利用应用型对象浅拷贝的特性, 直接操作item
      item.code = Prism.highlight(dom.textContent, Prism.languages[item.language], item.language)
      /* nextTick(() => {
        getFrontTextcontent(dom.childNodes, container, result => {
          textLength = result.length
          cursorOffset = selection.getCursorPosition()
          console.log(cursorOffset)
          getRealDom(dom.childNodes, textLength, el => {
            console.log(el)
            selection.setCursorPosition(el, cursorOffset)
          })
        })
      }) */
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
.pre-class { position: relative; }
.pre-class::-webkit-scrollbar { width: 7px; height: 7px; background: #272822; cursor: pointer; }
.pre-class::-webkit-scrollbar-thumb { background: rgba(255,255,255,.3); border-radius: 2px; }
.code-class { width: 100%; height: 100%; display: inline-block; outline: none; }
</style>
