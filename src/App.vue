<template>
  <div id="app">
    <um-code class="code-outsize" :width="width" height="400px" language="javascript" :codes="code" edit></um-code>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, ref, } from 'vue'

export default defineComponent({
  setup() {
    const width = ref('500px')
    const code = ref([{
      language: 'html',
      code: `<div>hello word</div>`
    }, {
      language: 'javascript',
      code: `function bbc () { console.log('bbc') }`
    }, {
      language: 'html',
      code: `<div>hello word</div>`
    }])

    /* setTimeout(() => {
      code.value = [{
        language: 'javascript',
        code: `function bbc () { console.log('bbc') }`
      }, {
        language: 'html',
        code: `<div>hello word</div>`
      }]
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
/* .code-outsize { margin-left: 30%; margin-top: 10px; } */
</style>
