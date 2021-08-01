<template>
  <div id="app">
    <um-note
      ref="abc"
      :width="width"
      language="javascript"
      editable
      :unfold="true"
      :codes="code"
      @submit="submit"
    />
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const abc = ref()
    const width = ref('500px')
    const code = ref([{
      language: 'html',
      code: `<div class="my-class" style="position: relative; left: 30px; top: 10%">hello word</div>`
    }, {
      language: 'javascript',
      code: `function bbc () { console.log('bbc') }`
    }, {
      language: 'html',
      code: `<div>hello word</div>
      <span>This is a span tag</span>
      `
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

    const submit = (data) => {
      console.log(data)
    }

    onMounted(() => {
      // console.log(abc.value.submit)
    })

    return {
      abc,
      code,
      width,
      submit,
    }
  },
})
</script>

<style>
#app { width: 100%; height: 100%; overflow: hidden; position: relative; }
/* .code-outsize { margin-left: 30%; margin-top: 10px; } */
</style>
