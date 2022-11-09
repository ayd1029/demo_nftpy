<template>
  
  <q-dialog v-model="iframeModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white">
      <!-- <q-header elevated>
        <q-toolbar class="bg-black">
          <q-toolbar-title class="text-white text-subtitle2">
            {{ url }}
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="white" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
      </q-header> -->

      <q-page-container>
        <q-page>
          <div class="row justify-center">
            <iframe :src="url" style="width: 100%; height: 94vh;" frameborder="0"></iframe>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>

</template>

<script>
export default {
  name: 'IframeModal',
  data () {
    return {
      iframeModal: false,
      maximized: true,
      url: '',
    }
  },
  methods: {
    async show () {
      this.iframeModal = true
    },
    close () {
      this.iframeModal = false
      this.maximized = true
    },
  }
}
</script>
