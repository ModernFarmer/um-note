<template>
  <div id="app">
    <um-code :width="width" language="javascript" :codes="code" edit></um-code>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, ref, } from 'vue'

export default defineComponent({
  setup() {
    const width = ref('300px')
    const code = ref(`
  console.log(123)
    `)

    /* setTimeout(() => {
      code.value = {
        language: 'javascript',
        code: `function bbc () { console.log('bbc') }`
      }
      width.value = '400px'
    }, 2000) */

    return {
      code,
      width,
    }
  },
  mounted () {
    
  },
})
</script>

<style>
#app { width: 100%; height: 100%; overflow: hidden; position: relative; }
</style>
