<template>
  <q-page>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {}
  },
  components: {},
  created: function () {
    // CORDOVA APP인 경우, /app/loginApp.vue 화면으로 이동
    if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && location.origin !== this.$frontDomain) {
      this.$router.push('/app')
    } else {
      this.$router.push('/web')
    }
  },
  mounted: function () {},
  methods: {
    // WEB으로 이동
    moveToWeb () {
      //
    },
  }
})
</script>
