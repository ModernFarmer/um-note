<template>
  <div id="app">
    <button class="btn1" @click="toLogin">Log In</button>
    <button class="btn2" @click="toLogout">Log Out</button><br>
    <um-note
      class="code-outsize1"
      :width="width"
      height="300px"
      language="javascript"
      editable
      :foldable="true"
      :unfold="true"
      :codes="code1"
      @submit="submit1"
    />
    <um-note
      class="code-outsize2"
      :width="width"
      language="javascript"
      editable
      :foldable="true"
      :unfold="false"
      :codes="code2"
      @submit="submit2"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const dispatch = useStore().dispatch
    const width = ref('40%')
    const code1 = ref([])
    const code2 = ref([])

    dispatch('getCode1').then(res => { // 模拟接口-获取code1数据
      console.log(res)
      code1.value = res
    })

    dispatch('getCode2').then(res => { // 模拟接口-获取code2数据
      code2.value = res
    })

    const toLogin = () => {
      dispatch('toLogin', true).then(res => { // 模拟接口-登录
        alert('You are now logged in!')
      })
    }
    const toLogout = () => { // 模拟接口-登出
      dispatch('toLogin', false).then(res => {
        alert('You are now logged out!')
      })
    }

    const submit1 = ({data, close}) => {
      console.log('submitData1', data)
      dispatch('submit_code1', data).then(() => {
        close()
        dispatch('getCode1').then(res => {
          code1.value = res
        })
      }).catch(err => {
        console.error(err)
      })
    }

    const submit2 = ({data, close}) => {
      console.log('submitData2', data)
      dispatch('submit_code2', data).then(() => {
        close()
        dispatch('getCode2').then(res => {
          code2.value = res
        })
      }).catch(err => {
        console.error(err)
      })
    }

    return {
      code1,
      code2,
      width,
      toLogin,
      toLogout,
      submit1,
      submit2,
    }
  },
})
</script>

<style>
#app { width: 100%; overflow: hidden; position: relative; }
.btn1 { margin-left: 10%; margin-top: 20px; }
.btn2 { margin-left: 20px; margin-top: 20px; }
.code-outsize1 { margin-left: 10%; margin-top: 20px; margin-bottom: 50px; float: left; }
.code-outsize2 { margin-left: 20px; margin-top: 20px; margin-bottom: 50px; float: left; }
</style>
