<template>
  <pre
    class="um-pre-class language-"
    :style="{ width, height }"
  ><code
      :id="key"
      class="um-code-class"
      :contenteditable="edit"
      v-for="(item, index) in codeList"
      :key="`${key}_${index}`"
      v-html="item.code"
      @input="handleInput($event, item, '__input')"
      @keydown="handleInput($event, item, '__tabDown')"
      @paste="handleInput($event, item, '__paste')"
    ></code></pre>
</template>

<script>
import { defineComponent, ref, watch, nextTick, } from 'vue'
import { getLanguage, getKey, getFrontOffset, getRealDomAndOffset, selection, } from './staticData'
import { _antiShake } from '@/utils'

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
      if (!selection.haveRange()) return // 如果窗口中没有Range对象, 拦截
      let container = null
      let inset = ''
      if (handleType === '__tabDown' && e.keyCode !== 9) { // 这里是监听按键按下事件, 如果handleType === '__tabDown'且按下的不是tab键, 则阻断执行
        return
      } else if (handleType === '__tabDown') { // 如果按下的是tab键, 则取消默认
        e.preventDefault()
        inset = '  '
      } else if (handleType === '__paste') { // 监听粘贴事件
        // 由于默认粘贴会将粘贴板上所有的样式都会粘贴到目标容器, 可能会导致样式错乱, 所以这里要做粘贴事件的监听重写
        e.preventDefault()
        if(e.clipboardData || window.clipboardData) {
          isPaste = true
          container = selection.getStartContainer()
          selection.deleteContents()
          inset = (e.clipboardData || window.clipboardData).getData("text/plain").toString()
        } else {
          alert('浏览器不支持, 请手动复制')
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

      // 尼玛, 当末尾空行被删减至最后一个含有tab原生空格的时候, 页面默认会添加一个<br>标签, 导致Range.startContainer和Range.endContainer为根元素
      // 如果container === root, 会导致getFrontOffset()方法获取不到相应判断条件而直接返回默认错误返回, 导致整个根元素下所有内容被清空

      const antiShake_getFrontOffset = _antiShake(getFrontOffset) // 防抖处理getFrontOffset  // 这里还有问题, 待解决

      // antiShake_getFrontOffset(root, container, inset, (totalOffset, textContent) => {
      //   console.log(root, container, inset)
      //   // 这里的item对象就是codeList.value[当前索引], 利用引用型对象浅拷贝的特性, 直接操作item
      //   item.code = Prism.highlight(textContent, Prism.languages[item.language], item.language)
      //   nextTick(() => {
      //     getRealDomAndOffset(root, totalOffset, (el, i) => {
      //       selection.setCursorOffset(el, i)
      //     })
      //   })
      // })

      getFrontOffset(root, container, inset, (totalOffset, textContent) => {
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
