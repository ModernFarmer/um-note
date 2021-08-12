<template>
  <div id="app">
    <button @click="toLogin">Log In</button>
    <button @click="toLogout">Log Out</button>
    <um-note
      class="code-outsize"
      :width="width"
      :height="'300px'"
      language="javascript"
      editable
      :foldable="true"
      :unfold="true"
      :codes="code1"
      @submit="submit"
    />
    <!-- <router-view/> -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
const exampleCode = `
/**
 * 节流
 * 
 * @param {Function} fn 需要进行节流的函数 
 * @param {Number} [ms = 500] 节流时间间隔(毫秒) 
 * 
 * @returns {Function} 柯里化处理后的节流函数 
 * 
 * @example 例子在下方 ↓↓↓
 * 
 */
export const _throttle = (fn, ms = 500) => {
  let status = true
  return (...arg) => {
    if (status) {
      status = false
      fn(...arg)
      setTimeout(() => {
        status = true
      }, ms)
    }
  }
}
/**
 * @example 
 * 需要节流处理的函数: 
  const needFn = (a, b) => {
    console.log(a, b)
  }
 * 用法: 
  const antiShake_needFn = _antiShake(needFn, 1000)
 * 调用: 
  antiShake_needFn('aaa', 'bbb') // 打印出: 'aaa', 'bbb'
 * 
 */
`
export default defineComponent({
  setup() {
    const store = useStore()
    const width = ref('500px')
    const code1 = ref([
      {
        language: 'javascript',
        code: exampleCode
      }
    ])

    const toLogin = () => {
      store.commit('toLogin', true)
    }
    const toLogout = () => {
      store.commit('toLogin', false)
    }
    const submit = ({data, close}) => {
      console.log(data)
      close()
    }

    return {
      code1,
      width,
      submit,
      toLogin,
      toLogout,
    }
  },
})
</script>

<style>
#app { width: 100%; height: 100%; overflow: hidden; position: relative; }
.code-outsize { margin-left: 50px; margin-top: 50px; }
</style>
