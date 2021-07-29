<template>
  <div class="um-note-container" :style="{ width: boxWidth, height: boxHeight }">
    <div class="um-note-headbox">
      <div class="um-note-config" :style="{background: edit ? '#0fec3f' : 'red'}" @click="toEdit"></div>
    </div>
    <pre
      ref="preRef"
      class="um-pre-class language-"
      :style="{ width, height }"
      @scroll="handleScroll"
    ><div
      class="um-code-box"
      style="position: relative;"
      v-for="(item, index) in codeList" :key="`${item.key}_${index}`"
    ><div
      class="um-sign-public"
      :style="lanStyle"
    >{{ item.language }}</div><div
      class="um-line-dashed"
      :style="dashedStyle"
    ></div><div
      class="um-sign-add"
      :style="addStyle"
      v-show="edit"
      @click="toAdd(index)"
    >+</div><div
      class="um-select-container"
      :style="selectStyle"
      v-show="add && index === addIndex"
    ><div
      class="um-select-item"
      v-for="val in langrageList"
      :key="val"
      @click="toHandleAdd(val, index)"
    >{{ val }}</div></div><code
        :id="item.key"
        class="um-code-class"
        :contenteditable="edit"
        v-html="item.processedCode"
        @input="handleInput($event, item, '__input')"
        @keydown="handleInput($event, item, '__tabDown')"
        @paste="handleInput($event, item, '__paste')"
        @compositionstart="limitInput($event, item, '__input')"
        @compositionend="limitInput($event, item, '__input')"
      ></code></div></pre>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, nextTick, } from 'vue'
import { getLanguage, getKey, selection, setCore, } from './staticData'

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
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'auto',
    },
  },
  setup(props, { emit }) {
    const langrageList = ref(getLanguage.map)

    const codeList = ref([])
    let coreObj = {} // 核心数据对象, 包含codeList数组内代表的每个dom的核心方法(getFrontOffset, getRealDomAndOffset)、根元素(root)、光标所在元素(container)、需要插入的内容(inset)
    watch(
      () => props.codes,
      codes => {
        const coreObjJson = {}
        if (Array.isArray(codes)) { // 如果props.codes是一个数组
          codeList.value = codes.map(item => {
            const language = getLanguage(item.language) || getLanguage(props.language)
            const key = getKey()
            setCore(coreObjJson, key)
            return {
              key,
              language,
              processedCode: Prism.highlight(item.code, Prism.languages[language], language),
              // processedCode: Prism.highlight(item.code, Prism.languages.xml, language),
            }
          })
        } else if (typeof codes === 'object') { // 如果props.codes是一个json
          const language = getLanguage(codes.language) || getLanguage(props.language)
          const key = getKey()
          setCore(coreObjJson, key)
          codeList.value = [
            {
              key,
              language,
              processedCode: Prism.highlight(codes.code, Prism.languages[language], language),
            }
          ]
        } else { // 如果props.codes是一个字符串
          const language = getLanguage(props.language)
          const key = getKey()
          setCore(coreObjJson, key)
          codeList.value = [
            {
              key,
              language,
              processedCode: Prism.highlight(codes, Prism.languages[language], language),
            }
          ]
        }
        coreObj = coreObjJson
      },
      { immediate: true }
    )

    let isPaste = false // 是否正在粘贴操作(粘贴的时候也会触发input事件, 这里定义一个状态, 用于阻止粘贴操作后的input事件)
    let canInput = true // 输入中文时, 在输入过程中且没有确定中文字符时, input也会触发, 这里限制一下绑定在input上面的监听事件

    const handleInput = (e, item, handleType) => {
      if (!selection.haveRange() || !canInput || !edit.value) return // 如果窗口中没有Range对象 或 中文输入过程中 或 组件无法编辑状态, 拦截
      const targetObj = coreObj[item.key]
      targetObj.container = selection.getEndContainer()
      if (!targetObj.root) targetObj.root = document.querySelector(`#${item.key}`)
      targetObj.inset = ''
      if (handleType === '__tabDown' && e.keyCode !== 9) { // 这里是监听按键按下事件, 如果handleType === '__tabDown'且按下的不是tab键, 则阻断执行
        return
      } else if (handleType === '__tabDown') { // 如果按下的是tab键, 则取消默认
        // 由于默认按下tab键会使容器失去焦点, 所以这里要tab按下事件的监听重写
        e.preventDefault()
        targetObj.inset = '  '
      } else if (handleType === '__paste') { // 监听粘贴事件
        // 由于默认粘贴会将粘贴板上所有的样式都会粘贴到目标容器, 可能会导致样式错乱, 所以这里要做粘贴事件的监听重写
        e.preventDefault()
        const clipboard = e.clipboardData || window.clipboardData
        if(clipboard) {
          isPaste = true
          targetObj.container = selection.getStartContainer()
          selection.deleteContents()
          targetObj.inset = clipboard.getData("text/plain").toString()
        } else {
          alert('暂不支持粘贴, 请手动输入.')
          return
        }
      } else if (isPaste) { // input事件(粘贴时会触发input事件, 这里要拦截)
        isPaste = false
        return
      }

      targetObj.getFrontOffset(targetObj.root, targetObj.container, targetObj.inset, (totalOffset, textContent) => {
        const realContent = Prism.highlight(textContent, Prism.languages[item.language], item.language)
        // 当realContent === item.processedCode时, 不会触发页面更新, 须手动更新
        // 适用于当全选内容并粘贴的情况
        if (realContent === item.processedCode) {
          targetObj.root.innerHTML = realContent
        } else {
          // 这里的item对象就是codeList.value[当前索引], 利用引用型对象浅拷贝的特性, 直接操作item
          item.processedCode = realContent
        }
        nextTick(() => {
          targetObj.getRealDomAndOffset(targetObj.root, totalOffset, (el, i) => {
            selection.setCursorOffset(el, i)
          })
        })
      })
    }

    const limitInput = (e, item, handleType) => {
      canInput = !e.isTrusted
      // 中文输入确定的那一刻不会触发input事件, 所以在compositionend事件触发且event.data有内容时(在中文输入过程中删除所有内容时也会触发compositionend事件)须触发一次handleInput事件
      if (canInput && e.data) {
        handleInput(e, item, handleType)
      }
    }

    const preRef = ref()
    const lanStyle = ref({ left: 0, top: 0 })
    const addStyle = ref({ left: `calc(100% - 23px)`, bottom: 0 })
    const dashedStyle = ref({ left: 0, bottom: '8px' })
    const selectStyle = ref({ bottom: '-5px', right: '30px' })
    let last_lang = 0
    const handleScroll = (e) => {
      const offset = preRef.value.scrollLeft
      if (last_lang !== offset) {
        lanStyle.value.left = dashedStyle.value.left = `${offset}px`
        addStyle.value.left = `calc(100% + ${offset - 23}px)`
        selectStyle.value.right = `calc(30px - ${offset}px)`
        last_lang = offset
      }
    }

    const add = ref(false)
    const edit = ref(false)
    const remove = ref(false)
    const addIndex = ref(null)

    const config_remove = {
      get remove () {
        return remove.value
      },
      set remove (bl) {
        remove.value = bl
      },
    }
    const toAdd = (index) => {
      if (window.$_CONFIG_UM_NOTE_PERMISSION.addConfigure) {
        if (addIndex.value === index || addIndex.value === null) {
          add.value = window.$_CONFIG_UM_NOTE_PERMISSION.addConfigure(add.value)
        } else {
          add.value = window.$_CONFIG_UM_NOTE_PERMISSION.addConfigure(false)
        }
      } else {
        add.value = true
      }
      addIndex.value = index
    }
    const toHandleAdd = (val, index) => {
      const key = getKey()
      codeList.value.splice(index + 1, 0, {
        key,
        language: val,
        processedCode: '',
      })
      setCore(coreObj, key)
      add.value = false
    }
    const toEdit = () => {
      if (window.$_CONFIG_UM_NOTE_PERMISSION.editConfigure) {
        edit.value = window.$_CONFIG_UM_NOTE_PERMISSION.editConfigure(edit.value)
      } else {
        edit.value = !edit.value
      }
      // todo some about fetch ...
    }
    const toRemove = (index) => {
      // todo ...
    }

    const boxWidth = computed(() => {
      if (props.width === 'auto') return 'auto'
      return `calc(${props.width} + 1rem)`
    })
    const boxHeight = computed(() => {
      if (props.height === 'auto') return 'auto'
      return `calc(${props.height} + 1rem + 16px)`
    })

    return {
      add,
      edit,
      addIndex,
      boxWidth,
      boxHeight,
      preRef,
      lanStyle,
      addStyle,
      dashedStyle,
      selectStyle,
      codeList,
      langrageList,
      handleInput,
      limitInput,
      handleScroll,
      toAdd,
      toHandleAdd,
      toEdit,
      toRemove,
    }
  },
  mounted () {
    console.log(getLanguage.map)
  }
})
</script>

<style scoped>
.um-note-container { overflow: hidden; border-radius: 5px; background: #272822; position: relative; }
.um-note-config { width: 10px; height: 10px; border-radius: 50%; cursor: pointer; position: absolute; right: 1px; top: 1px; }
.um-note-headbox { width: 100%; height: 16px; position: relative; z-index: 100; }

.um-pre-class { padding-left: 1rem; padding-bottom: 1rem; overflow: auto; position: relative; top: -1rem; }
.um-pre-class::-webkit-scrollbar { width: 7px; height: 7px; background: #272822; cursor: pointer; }
.um-pre-class::-webkit-scrollbar-thumb { background: rgba(255,255,255,.3); border-radius: 2px; }
.um-pre-class::-webkit-scrollbar-corner { background: #272822; }

.um-code-box { position: relative; }
.um-sign-public { font-size: 10px; color: rgb(114, 114, 114); position: absolute; }
.um-line-dashed { width: calc(100% - 30px); border-bottom: 1px dashed rgb(50, 50, 50); position: absolute; }
.um-sign-add { width: 18px; height: 18px; line-height: 16px; text-align: center; cursor: pointer; font-size: 18px; color: rgb(114, 114, 114); position: absolute;
  user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }
.um-select-container { max-width: calc(100% - 34px); padding: 2px; border: 1px solid #0A84D7; background: #474747; outline: 2px solid #474747; position: absolute; z-index: 10; }
.um-select-item { line-height: 20px; padding: 0 5px; margin: 2px; cursor: pointer; border-radius: 3px; background: rgba(255, 255, 255, .1); float: left; }
/* .um-code-class 这里的display务必要写inline-bolock, 不能写bolock, 因为bolock的情况下编辑点回车的时候code标签下会直接产生一个div标签, 而不是添加换行符 */
.um-code-class { min-width: 100%; display: inline-block; padding-right: 1rem; outline: none; margin: 20px 0 30px 0; }
</style>
