<template>
  <div id="app">
    <um-code style="margin-left: 30px;" language="javascript" :code="code"></um-code>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, ref, } from 'vue'

const _code = [
  {
    language: 'html',
    code: `
<div class="aaaa bbbb">sdfsdfsdf<\/div>
<div style="width: 100%; height: 50%; margin-top: 100px; background: red;">sdfsdfsdf<\/div>
<script>
  function abcde (val) {
    // console.log(val)
    return val.hhh ? val.hhh : 'oh No!'
  }
<\/script>
    `
  },
  {
    language: 'javascript',
    code: `
export default {
  components: {
    Details,
    StationEdit,
  },
  data () {
    return {
      type: 1,
    }
  },

  computed: {
    ...mapGetters(['stationInfo']),
    stationId: function () {
      return this.$route.params.stationId
    },
  },
  methods: {
    toEdit () {
      this.type = 2
    },
    onCancel () {
      this.type = 1
    },
    /* onEditSuccess () {
      this.type = 1
      this.$store.dispatch('QueryStationInfo', this.stationId)
    }, */
  },
}
`
  }
]

export default defineComponent({
  setup() {
    const code = ref(_code)
    return {
      code
    }
  },
})
</script>

<style>
#app { width: 100%; height: 100%; overflow: hidden; position: relative; }
</style>
