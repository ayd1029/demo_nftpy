<template>
  <!-- <q-page class="justify justify-center" style="background-image: url(images/star1.jpg)"> -->
  <q-page class="justify justify-center">
    <div class="page-default" style="word-break: keep-all;">

      <!-- 플랫폼 설명 -->
      <div class="text-center text-body q-pl-md q-pr-md" style="word-break: keep-all;">
        <br />
        <br />
        <br />
        <div class="text-h3 text-bold">
          NFTPY
          <br />
        </div>
        <div class="text-h5 text-bold q-pt-md">
          [ Prove Yourself ]
          <br />
          <br />
          <br />
        </div>
        <q-img src="images/platform.png" style="max-width: 600px;" />
        <div>
          <br />
          <br />
          {{ $t('main_info_1_1') }}<br />
          {{ $t('main_info_1_2') }}<br />
          {{ $t('main_info_1_3') }}<br />
          {{ $t('main_info_1_4') }}<br />
          <br />
          <br />
          <br />
        </div>
      </div>

    </div>

    <br />
    <br />

    <!-- links -->
    <!-- <div class="text-caption text-white flex flex-center" style="background: rgb(29, 29, 29);">
      <div class="row flex flex-center q-pt-md">
        <div class="q-pl-md q-pr-md q-pb-sm flex flex-center">
          <img src="logo/icons-social-gitbook.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://docs.nftpy.io')" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="logo/icons-social-telegram.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://t.me/klaystar')" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="logo/icons-social-twitter.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://twitter.com/klaystar_offici')" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="logo/icons-social-medium.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://klaystar.medium.com')" />
        </div>
      </div>
    </div> -->

  </q-page>

  <TermsModal ref="refTermsModal" />
  <PrivacyModal ref="refPrivacyModal" />
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      // msgBox: false,
    }
  },
  components: {
  },
  created: function () {
    // console.log(this.$q.platform.is.mobile)

    // CORDOVA APP인 경우, /app/loginApp 화면으로 이동
    if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && location.origin !== this.$frontDomain
      // && this.$q.platform.is.mobile === true && (this.$q.platform.is.platform === 'andriod' || this.$q.platform.is.platform === 'ios')
    ) {
      this.$router.push('/app/loginApp')
      // https://nftpy.io WEB으로 이동
      // alert('move to https://nftpy.io')
      // if (location.origin !== this.$domain) {
      //   location.href = this.$domain
      // }
    }

  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // // WEB으로 이동
    // moveToWeb () {
    //   // let targetPath = this.$cookie.get('LOGIN_REDIRECT_URL')
    //   // // APP이면 WEB으로 이동, WEB이면 Push
    //   // if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') { // APP인 경우 - 푸시 토큰 저장
    //   //   location.href = this.$store.state.DOMAIN + '/#' + targetPath + '?uid=' + uid + '&auth_key=' + authKey
    //   // } else {
    //   //   this.$router.push(targetPath)
    //   // }
    //   location.href = this.$domain
    // },
    // 토큰 등록으로 이동
    goRegisterToken() {
      this.$router.push('/token/register')
    },
    // 이용약관 모달 표시
    showTerms() {
      this.$refs.refTermsModal.show()
    },
    // 개인정보처리방침 모달 표시
    showPrivacy() {
      this.$refs.refPrivacyModal.show()
    },
    openUrl(url) {
      // cordova인 경우 IframeModal 표시
      // if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
      //   this.$refs.refIframeModal.url = url
      //   this.$refs.refIframeModal.show()
      // } else {
        window.open(url, '_system')
      // }
    },
    showConstructionMessage() {
      this.$noti(this.$q, this.$t('coming_soon'))
    },
    downloadIpa() {
      window.open('https://nftpy.io/files/ipa/klaystar.ipa')
    }
  }
})
</script>
