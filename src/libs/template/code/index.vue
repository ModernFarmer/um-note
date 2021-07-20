<template>
  <pre
    class="um-pre-class language-"
    :style="{ width, height }"
  ><template v-for="(item, index) in codeList" :key="`${key}_${index}`"><code
      :id="key"
      class="um-code-class"
      :contenteditable="edit"
      v-html="item.code"
      @input="handleInput($event, item, '__input')"
      @keydown="handleInput($event, item, '__tabDown')"
      @paste="handleInput($event, item, '__paste')"
      @compositionstart="limitInput($event, item, '__input')"
      @compositionend="limitInput($event, item, '__input')"
    ></code><br></template></pre>
</template>

<script>
import { defineComponent, ref, watch, nextTick, } from 'vue'
import { getLanguage, getKey, getFrontOffset, getRealDomAndOffset, selection, } from './staticData'
import { _antiShake } from '@/utils'
const antiShake_getFrontOffset = _antiShake(getFrontOffset) // 防抖处理getFrontOffset, 默认500毫秒

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
    let root = null // 文本操作的根元素
    let isPaste = false // 是否正在粘贴操作(粘贴的时候也会触发input事件, 这里定义一个状态, 用于阻止粘贴操作后的input事件)
    let canInput = true // 输入中文时, 在输入过程中且没有确定中文字符时, input也会触发, 这里限制一下绑定在input上面的监听事件

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

    const limitInput = (e, item, handleType) => {
      canInput = !e.isTrusted
      // 中文输入确定的那一刻不会触发input事件, 所以在compositionend事件触发且event.data有内容时(在中文输入过程中删除所有内容时也会触发compositionend事件)须触发一次handleInput事件
      if (canInput && e.data) {
        handleInput(e, item, handleType)
      }
    }

    const handleInput = (e, item, handleType) => {
      if (!selection.haveRange() || !canInput) return // 如果窗口中没有Range对象 或 中文输入过程中, 拦截
      let container = null
      let inset = ''
      let coreHandler = antiShake_getFrontOffset // 核心处理函数
      if (handleType === '__tabDown' && e.keyCode !== 9) { // 这里是监听按键按下事件, 如果handleType === '__tabDown'且按下的不是tab键, 则阻断执行
        return
      } else if (handleType === '__tabDown') { // 如果按下的是tab键, 则取消默认
        // 由于默认按下tab键会使容器失去焦点, 所以这里要tab按下事件的监听重写
        e.preventDefault()
        antiShake_getFrontOffset.stop()
        coreHandler = getFrontOffset // 当tab键按下时, 不需要防抖
        inset = '  '
      } else if (handleType === '__paste') { // 监听粘贴事件
        // 由于默认粘贴会将粘贴板上所有的样式都会粘贴到目标容器, 可能会导致样式错乱, 所以这里要做粘贴事件的监听重写
        e.preventDefault()
        antiShake_getFrontOffset.stop()
        coreHandler = getFrontOffset // 当粘贴时, 不需要防抖
        const clipboard = e.clipboardData || window.clipboardData
        if(clipboard) {
          isPaste = true
          container = selection.getStartContainer()
          selection.deleteContents()
          inset = clipboard.getData("text/plain").toString()
        } else {
          alert('暂不支持粘贴, 请手动输入.')
          return
        }
      } else if (isPaste) { // input事件(粘贴时会触发input事件, 这里要拦截)
        isPaste = false
        return
      }

      if (!container) container = selection.getEndContainer()
      if (!root) {
        root = document.querySelector(`#${key.value}`)
      }

      coreHandler(root, container, inset, (totalOffset, textContent) => {
        // 这里的item对象就是codeList.value[当前索引], 利用引用型对象浅拷贝的特性, 直接操作item
        item.code = Prism.highlight(textContent, Prism.languages[item.language], item.language)
        nextTick(() => {
          getRealDomAndOffset(root, totalOffset, (el, i) => {
            selection.setCursorOffset(el, i)
          })
        })
      })
    }

    return {
      key,
      codeList,

      handleInput,
      limitInput,
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
/* .um-code-class 这里的display务必要写inline-bolock, 不能写bolock, 因为bolock的情况下编辑点回车的时候code标签下会直接产生一个div标签, 而不是添加换行符 */
.um-code-class { min-width: 100%; display: inline-block; outline: none; }
</style>
