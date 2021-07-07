<template>
  <div id="app">
    <um-code style="margin-left: 30px;" language="javascript" :code="code"></um-code>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, ref, } from 'vue'

export default defineComponent({
  setup() {
    const code = ref(`
function abc (val) {
  console.log(val)
  return val ++ 
}
    `)
    return {
      code
    }
  },
  mounted () {
    
  },
})
</script>

<style>
#app { width: 100%; height: 100%; overflow: hidden; position: relative; }
</style>
