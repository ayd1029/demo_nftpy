<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 10vh">
        404
      </div>

      <div class="text-h2 text-black" style="opacity:.7">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="grey-4"
        text-color="black"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>
