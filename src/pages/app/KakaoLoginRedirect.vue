<template>
  <q-page>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      // locale,
    }
  },
  components: {},
  created: function () {
    // alert(JSON.stringify(this.$route.query))
    const email = this.$route.query.email
    const authKey = this.$route.query.authKey
    const frontPath = this.$route.query.frontPath
    const frontLocale = this.$route.query.frontLocale
    const adcd = this.$route.query.adcd

    // 로그인 정보 쿠키에 저장
    this.$store.dispatch('setUid', email)
    this.$store.dispatch('setAdcd', adcd)
    this.$cookie.set('UID', email, 365)
    this.$cookie.set('AUTH_KEY', authKey, 365)
    this.$cookie.set('LOCALE', frontLocale)
    this.$cookie.set('ADCD', adcd, 365)
    // APP용
    localStorage.setItem('UID', email, 365)
    localStorage.setItem('AUTH_KEY', authKey, 365)
    localStorage.setItem('LOCALE', frontLocale, 365)
    localStorage.setItem('ADCD', adcd, 365)

    // 언어 설정
    if (frontLocale && frontLocale !== 'null') {
      this.locale = frontLocale
    }

    // 로그인 이전 화면으로 이동
    this.$router.replace(frontPath)
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  methods: {
    // WEB으로 이동
    moveToWeb () {
      //
    },
  }
})
</script>
