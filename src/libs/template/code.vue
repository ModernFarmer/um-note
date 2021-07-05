<template>
  <pre>
    <code :class="`language-${language}`">{{language}}</code>
  </pre>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { lhjsLanguage } from '../../assets/js/map'

export default defineComponent({
  setup() {
    const language = ref(lhjsLanguage('html'))

    return {
      language,
    }
  },
})
</script>

<style scoped>

</style>
