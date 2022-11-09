<template>
  <q-layout view="lHh Lpr lFf" class="">
    <!-- <q-header elevated> -->
    <!-- <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// import { useStore } from 'vuex'

export default defineComponent({
  name: 'EmptyLayout',

  components: {
    // EssentialLink,
    // LoginModal,
  },
  data () {
    return {
      // loginModal: false,
    }
  },
  mounted: function() {
    // this.$refs.refLoginModal.show()
  },

  setup () {
    // const $store = useStore()
    // const loginModalFlag = computed({
    //   get: () => $store.state.common.loginModalFlag,
    //   set: val => {
    //     $store.commit('common/updateLoginModalFlag', val)
    //   }
    // })

    // const leftDrawerOpen = ref(false)
    // const { locale } = useI18n({ useScope: 'global' })

    return {
      // essentialLinks: linksList,
      // leftDrawerOpen,
      // toggleLeftDrawer () {
      //   leftDrawerOpen.value = !leftDrawerOpen.value
      // },
      // locale,
      // localeOptions: [
      //   { value: 'en-US', label: 'EN' },
      //   { value: 'ko-KR', label: 'KO' },
      // ],
      // msgBox: ref(false),

      // loginModalFlag,
    }
  },

  // created: function() {
  //   locale = 'ko-KR'
  // },

  methods: {
    login() {
      this.$refs.refLoginModal.show()
      // console.log(this.$store.state.loginModal)
      // this.$store.commit('SET_LOGIN_MODAL_FLAG', true)
      // console.log(this.$store.state.loginModal)

      // console.log(111)
      // console.log(this.$store.state.loginModalFlag)
      // this.$store.commit('SET_LOGIN_MODAL_FLAG', true)
      // console.log(this.$store.state.loginModalFlag)
      // this.$store.dispatch('test', false)
      // console.log(this.$store.state.loginModalFlag)

      // console.log($store)
      // console.log(this.$store.common.loginModalFlag)
      // console.log(this.$store.common.loginModalFlag)
      // console.log(this.$store.common.loginModalFlag)
      // this.loginModal = true
      // this.msgBox = true
    },
  },
})
</script>

<style lang="sass">
</style>