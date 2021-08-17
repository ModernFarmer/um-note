<template>
  <div class="_um-_note-container" :style="containerStyle">
    <div class="_um-_note-headbox _um-_not-chooseable"
      :style="headBoxStyle"
    >
      <div class="_um-_unfold-box"
        v-if="foldable || foldable === ''"
        :style="{ width: showing ? 'calc(100% - 55px)' : 'calc(100% - 30px)' }"
        @click="toFoldOrUnfold"
      >
        <div class="_um-_unfold-text"
          :style="{ left: showing ? '20px' : '0', color: unfoldColor }"
        >{{ showing ? 'fold' : 'unfold note' }}</div>
        <div class="_um-_unflod-arrow"
          :style="{ left: showing ? '0' : '57px', color: arrowColor }"
        >{{ showing ? '‹‹‹' : '›››' }}</div>
      </div>
      <div
        class="_um-_note-config-edit"
        v-if="editable || editable === ''"
        v-show="showing"
        :style="{background: edit ? '#0fec3f' : 'red'}"
        @click="toEdit"
      ></div>
      <div
        class="_um-_note-config-submit"
        v-if="editable || editable === ''"
        v-show="contentChange"
        @click.stop="toSubmit"
      ></div>
      <div
        class="_um-_submit-confirm"
        :style="{ background: confirmBackground }"
        v-if="submit"
        @click.stop
      >
        <div class="_um-_submit-item-cancel" @click="submit = false"><span class="_um-submit-span">×</span></div>
        <div class="_um-_submit-item-ok" @click="toHandleSubmit">√</div>
      </div>
    </div>
    <pre
      ref="preRef"
      class="_um-_pre-class language-"
      :style="{ height }"
      @scroll="handleScroll"
    ><div
      :id="`${item.key}_codeBox`"
      class="_um-_code-box"
      v-for="(item, index) in codeList" :key="`${item.key}_${index}`"
    ><div
      class="_um-_sign-public"
      :style="lanStyle"
    >{{ item.showingLanguage }}</div><div
      class="_um-_line-dashed"
      :style="dashedStyle"
    ></div><div
      class="_um-_sign-add _um-_not-chooseable"
      :style="addStyle"
      v-show="edit"
      @click.stop="toAdd(index, item.key)"
    >+</div><div
      class="_um-_sign-minus _um-_not-chooseable"
      :style="minusStyle"
      v-show="edit && codeList.length > 1"
      @click.stop="toRemove(index)"
    >-</div><div
      :id="`${item.key}_selectBox`"
      class="_um-_select-container"
      :style="selectStyle"
      v-if="add && index === addIndex"
    ><div
      class="_um-_select-item _um-_not-chooseable"
      v-for="val in languageList"
      :key="val"
      @click="toHandleAdd(val, index, item.key)"
    >{{ val.value }}</div></div><div
      class="_um-_confirm-container"
      :style="confirmStyle"
      v-if="remove && index === removeIndex"
    ><div
      class="_um-_confirm-message"
      :style="{ color: confirmMessageColor }"
    >{{ deleteObj.explain }}</div><div
      class="_um-_confirm-item _um-_not-chooseable"
      v-for="val in deleteObj.list"
      :key="val"
      @click="toHandleRemove(val.key, item.key, index)"
    >{{ val.value }}</div></div><code
        :id="item.key"
        class="_um-_code-class"
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
import { defineComponent, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { getLanguage, getShowingLanguage, getKey, selection, setCore, _BD, _unBD, UM_NOTE_CONFIG } from './publicData'
import { themeConfigMap } from './theme'

let domClick = null

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
    editable: {
      type: Boolean,
      default: false,
    },
    unfold: {
      type: Boolean,
      default: false,
    },
    foldable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const themesData = themeConfigMap[UM_NOTE_CONFIG.theme]
    const languageList = ref(getLanguage.list)
    const contentChange = ref(false)
    const deleteObj = ref({
      explain: UM_NOTE_CONFIG.contentNames?.explain || '确定删除?',
      list: [
        { key: 0, value: UM_NOTE_CONFIG.contentNames?.cancel || '取消' },
        { key: 1, value: UM_NOTE_CONFIG.contentNames?.confirm || '确定' },
      ]
    })

    const setContainerHeight = () => {
      containerStyle.value.height = `${preRef.value.offsetHeight + 19}px`
    }
    const showing = ref(props.foldable === false ? true : (props.unfold || props.unfold === '' ? true : false))
    const containerStyle = ref({
      width: showing.value ? (props.width === 'auto' ? 'auto' : props.width) : '260px',
      height: showing.value ? 'auto' : '16px',
      background: themesData.container_background,
    })

    const toFoldOrUnfold = () => {
      showing.value = !showing.value
      if (showing.value) {
        containerStyle.value.width = props.width
        setContainerHeight()
      } else {
        edit.value = false
        containerStyle.value.width = '260px'
        containerStyle.value.height = '16px'
      }
    }

    const headBoxStyle = ref({ background: showing.value ? 'transparent' : themesData.head_background_hidden })
    watch(
      () => {
        return showing.value
      },
      val => {
        headBoxStyle.value = { background: val ? 'transparent' : themesData.head_background_hidden }
      }
    )

    const preRef = ref()
    const lanStyle = ref({ color: themesData.language_color, left: 0, top: 0 })
    const addStyle = ref({ left: `calc(100% - 22px)`, bottom: 0 })
    const minusStyle = ref({ left: `calc(100% - 38px)`, bottom: 0 })
    const dashedStyle = ref({ width: 'calc(100% - 1em)', borderBottom: `1px dashed ${themesData.block_hr_background}`, left: 0, bottom: '8px' })
    const selectStyle = ref({
      border: `1px solid ${themesData.languageSelect_border}`,
      background: themesData.languageSelect_container,
      outline: `2px solid ${themesData.languageSelect_container}`,
      bottom: '-5px',
      right: '27px',
    })
    const confirmStyle = ref({
      border: `1px solid ${themesData.deleteSelect_border}`,
      background: themesData.languageSelect_container,
      outline: `2px solid ${themesData.languageSelect_container}`,
      bottom: '-5px',
      right: '47px',
    })
    const confirmBackground = ref(themesData.edit_container)
    const confirmMessageColor = ref(themesData.confirm_message_color)
    const unfoldColor = ref(themesData.unfold_text_color)
    const arrowColor = ref(themesData.unfold_arrow_color)
    let last_lang = 0
    const handleScroll = (e) => {
      const offset = preRef.value.scrollLeft
      if (last_lang !== offset) {
        lanStyle.value.left = dashedStyle.value.left = `${offset}px`
        addStyle.value.left = `calc(100% + ${offset - 22}px)`
        minusStyle.value.left = `calc(100% + ${offset - 38}px)`
        selectStyle.value.right = `calc(27px - ${offset}px)`
        confirmStyle.value.right = `calc(47px - ${offset}px)`
        last_lang = offset
      }
    }

    const codeList = ref([])
    let coreObj = {} // 核心数据对象, 包含codeList数组内代表的每个dom的核心方法(getFrontOffset, getRealDomAndOffset)、根元素(root)、光标所在元素(container)、需要插入的内容(inset)
    watch(
      () => props.codes,
      codes => {
        const coreObjJson = {}
        if (Array.isArray(codes)) { // 如果props.codes是一个数组
          if (codes.length) {
            codeList.value = codes.map(item => {
              const _language = getLanguage(item.language)
              const language = _language === 'javascript' ? getLanguage(props.language) : _language
              const showingLanguage = getShowingLanguage(language)
              const key = getKey()
              setCore(coreObjJson, key)
              return {
                key,
                language,
                showingLanguage,
                code: item.code || '',
                processedCode: window.Prism.highlight(item.code || '', window.Prism.languages[language], language),
              }
            })
          } else {
            const key = getKey()
            setCore(coreObjJson, key)
            codeList.value = [{
              key,
              language: 'javascript',
              showingLanguage: 'JavaScript',
              code: '',
              processedCode: '',
            }]
          }
        } else if (typeof codes === 'object') { // 如果props.codes是一个json
          const _language = getLanguage(codes.language)
          const language = _language === 'javascript' ? getLanguage(props.language) : _language
          const showingLanguage = getShowingLanguage(language)
          const key = getKey()
          setCore(coreObjJson, key)
          codeList.value = [
            {
              key,
              language,
              showingLanguage,
              code: codes.code || '',
              processedCode: window.Prism.highlight(codes.code || '', window.Prism.languages[language], language),
            }
          ]
        } else if (typeof codes === 'string') { // 如果props.codes是一个字符串
          const language = getLanguage(props.language)
          const showingLanguage = getShowingLanguage(language)
          const key = getKey()
          setCore(coreObjJson, key)
          codeList.value = [
            {
              key,
              language,
              showingLanguage,
              code: codes || '',
              processedCode: window.Prism.highlight(codes || '', window.Prism.languages[language], language),
            }
          ]
        } else {
          throw `The prop 'codes' must be an array or object or a string!`
        }
        coreObj = coreObjJson
        contentChange.value = false

        nextTick(() => {
          add.value = false
          remove.value = false
          submit.value = false
          setContainerHeight()
        })
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
          alert('不支持粘贴, 请手动输入.')
          return
        }
      } else if (isPaste) { // input事件(粘贴时会触发input事件, 这里要拦截)
        isPaste = false
        return
      }

      targetObj.getFrontOffset(targetObj.root, targetObj.container, targetObj.inset, (totalOffset, textContent) => {
        const realContent = window.Prism.highlight(textContent, window.Prism.languages[item.language], item.language)
        // 当realContent === item.processedCode时, 不会触发页面更新, 须手动更新
        // 适用于当全选内容并粘贴的情况
        if (realContent === item.processedCode) {
          targetObj.root.innerHTML = realContent
        } else {
          // 这里的item对象就是codeList.value[当前索引], 利用引用型对象浅拷贝的特性, 直接操作item
          item.processedCode = realContent
          contentChange.value = true
          nextTick(() => {
            if (props.height === 'auto') setContainerHeight()
          })
        }
        item.code = textContent
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

    const add = ref(false)
    const edit = ref(false)
    const remove = ref(false)
    const submit = ref(false)
    const addIndex = ref(null)
    const removeIndex = ref(null)
    let codeTagEl = null
    let codeTagHeightOrigin = null

    const _u_resetStyle = () => {
      if (codeTagEl) {
        codeTagEl.style.height = `${codeTagHeightOrigin}px`
        if (props.height === 'auto') {
          setContainerHeight()
        }
        codeTagEl = null
        codeTagHeightOrigin = null
      }
    }

    const next_add = () => {
      add.value = true
    }
    const next_edit = () => {
      edit.value = true
    }
    const next_remove = () => {
      remove.value = true
    }
    const next_submit = () => {
      submit.value = true
    }
    const close = () => {
      add.value = false
      edit.value = false
      remove.value = false
      submit.value = false
    }
    const toAdd = (index, elementKey) => {
      remove.value = false
      submit.value = false
      if (UM_NOTE_CONFIG.addConfigure) {
        if (add.value || (addIndex.value !== null && addIndex.value !== index)) {
          add.value = false
          _u_resetStyle()
        } else {
          UM_NOTE_CONFIG.addConfigure(next_add)
        }
      } else {
        if (addIndex.value === index) {
          add.value = !add.value
          if (!add.value) _u_resetStyle()
        } else {
          add.value = true
        }
      }
      addIndex.value = index
      if (add.value) {
        nextTick(() => {
          const selectEl = document.querySelector(`#${elementKey}_selectBox`)
          const _codeTagEl = document.querySelector(`#${elementKey}_codeBox`)
          if (selectEl.offsetHeight > _codeTagEl.offsetHeight + _codeTagEl.offsetTop - 11) {
            codeTagEl = _codeTagEl
            codeTagHeightOrigin = codeTagEl.offsetHeight
            codeTagEl.style.height = `${selectEl.offsetHeight - 3}px`
          }
          if (props.height === 'auto') setContainerHeight()
        })
      }
    }
    const toHandleAdd = (val, index) => {
      const key = getKey()
      codeList.value.splice(index + 1, 0, {
        key,
        language: val.fnKey,
        showingLanguage: val.value,
        code: '',
        processedCode: '',
      })
      setCore(coreObj, key)
      contentChange.value = true
      nextTick(() => {
        if (props.height === 'auto') setContainerHeight()
      })
    }
    const toEdit = () => {
      if (UM_NOTE_CONFIG.editConfigure) {
        if (edit.value) {
          edit.value = false
        } else {
          UM_NOTE_CONFIG.editConfigure(next_edit)
        }
      } else {
        edit.value = !edit.value
      }
    }
    const toSubmit = () => {
      add.value = false
      remove.value = false
      if (UM_NOTE_CONFIG.submitConfigure) {
        if (submit.value) {
          submit.value = false
        } else {
          UM_NOTE_CONFIG.submitConfigure(next_submit)
        }
      } else {
        submit.value = !submit.value
      }
    }
    const toHandleSubmit = () => {
      const data = codeList.value.map(item => {
        const json = { ...item }
        Reflect.deleteProperty(json, 'key')
        return json
      })
      emit('submit', { data, close })
    }
    const toRemove = (index) => {
      add.value = false
      submit.value = false
      _u_resetStyle()
      if (UM_NOTE_CONFIG.removeConfigure) {
        if (remove.value || (removeIndex.value !== null && removeIndex.value !== index)) {
          remove.value = false
        } else {
          UM_NOTE_CONFIG.removeConfigure(next_remove)
        }
      } else {
        if (removeIndex.value === index) {
          remove.value = !remove.value
        } else {
          remove.value = true
        }
      }
      removeIndex.value = index
    }
    const toHandleRemove = (val, key, index) => {
      if (val === 1) {
        codeList.value.splice(index, 1)
        Reflect.deleteProperty(coreObj, key)
        contentChange.value = true
        nextTick(() => {
          setContainerHeight()
        })
      }
    }
    watch(
      () => edit.value,
      bl => {
        if (bl) {
          dashedStyle.value.width = 'calc(100% - 47px)'
        } else {
          dashedStyle.value.width = 'calc(100% - 1em)'
        }
      }
    )

    domClick = () => {
      add.value = false
      _u_resetStyle()
      remove.value = false
      submit.value = false
    }
    _BD(document, 'click', domClick)
    onBeforeUnmount(() => {
      _unBD(document, 'click', domClick)
    })

    return {
      deleteObj,
      showing,
      add,
      edit,
      remove,
      submit,
      addIndex,
      removeIndex,
      containerStyle,
      preRef,
      lanStyle,
      addStyle,
      minusStyle,
      dashedStyle,
      selectStyle,
      confirmStyle,
      headBoxStyle,
      confirmBackground,
      confirmMessageColor,
      unfoldColor,
      arrowColor,
      codeList,
      contentChange,
      languageList,
      handleInput,
      limitInput,
      handleScroll,
      toAdd,
      toHandleAdd,
      toHandleRemove,
      toHandleSubmit,
      toEdit,
      toRemove,
      toSubmit,
      toFoldOrUnfold,
    }
  },
})
</script>
