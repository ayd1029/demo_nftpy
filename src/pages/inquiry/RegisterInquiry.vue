<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_inquiry_register') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_inquiry_register_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- title -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('inquiry_title') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="title" ref="refTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="1" />
      </div>
    </div>

    <!-- contents -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('inquiry_contents') }}<span class="text-red"> *</span></span>
        &nbsp;&nbsp;&nbsp;{{ contentsLength }} / 1000
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input
          v-model="contents"
          ref="refContents"
          type="textarea"
          @keyup="countContentsLength"
          :rules="[required, val => minLength(val, 1), val => maxLength(val, 1000)]"
          outlined
          autogrow
          tabindex="2"
        />
      </div>
    </div>

    <!-- use_reveal_yn -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('inquiry_private_yn') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="q-gutter-xl">
          <q-radio v-model="private_yn" val="N" tabindex="3">{{ $t('inquiry_private_yn_n') }}</q-radio>
          <q-radio v-model="private_yn" val="Y" tabindex="4">{{ $t('inquiry_private_yn_y') }}</q-radio>
        </div>
      </div>
    </div>

    <br />

    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="registerContact" tabindex="3">
          <b>{{ $t('register') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
  <WalletModal ref="refWalletModal" @callback-wallet="callbackWallet" />
</template>

<script>
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'

export default defineComponent({
  name: 'RegisterContact',
  data () {
    return {
      title: '',
      contents: '',
      private_yn: 'N',
      answer: '',
      contentsLength: 0,
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {},
  mounted: function () {},
  methods: {
    countContentsLength() {
      this.contentsLength = this.contents.length
    },
    callbackLogin(userVo) {
      // console.log('callbackLogin!!!')
      this.$store.dispatch('setUid', userVo.uid)
      this.$store.dispatch('setAdcd', userVo.adcd)
      this.$store.dispatch('setName', userVo.name)
      this.$store.dispatch('setNickname', userVo.nickname)
      this.$store.dispatch('setProfileImage', userVo.profile_image)
      this.$store.dispatch('setWalletType', userVo.wallet_type)
      this.$store.dispatch('setWalletAddress', userVo.wallet_address)
      this.$store.dispatch('setMobileNo', userVo.mobile_no)
    },
    ///////////////////////////////////////////////////////////////////////////
    // validation
    ///////////////////////////////////////////////////////////////////////////
    required(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    requiredNumber(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    minLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_min_length') + ': ' + length
      return minLength(val, message, length);
    },
    maxLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length);
    },
    minValue(val, value) {
      const message = this.$t('validation_min_value') + ': ' + value
      return minValue(val, message, value);
    },
    maxValue(val, value) {
      const message = this.$t('validation_max_value') + ': ' + value
      return maxValue(val, message, value);
    },
    ///////////////////////////////////////////////////////////////////////////
    validate() {
      let result = true
      if (!this.$refs.refTitle.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_inquiry_title'))
        result = false
      }
      if (!this.$refs.refContents.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_inquiry_contents'))
        result = false
      }
      if (this.contentsLength > 1000) {
        this.$noti(this.$q, this.$t('validation_failed_inquiry_contents_length'))
        result = false
      }
      return result
    },
    // 문의사항 등록
    registerContact() {
      // Field validation check
      if(!this.validate()) {
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // 문의사항 등록 처리
      const param = {
        uid: this.getUid,
        title: this.title,
        contents: this.contents,
        private_yn: this.private_yn,
      }
      this.$axios.post('/api/inquiry/insertInquiry', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
          }

          // 2. 페이지 이동 - 문의사항 리스트 화면
          this.$router.push('/inquiry')
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    callbackWallet(walletVo) {
      // console.log('callbackWallet in MainLayout')
      // this.$store.dispatch('setWalletAddress', walletVo.wallet_address)
    },
    goBack() {
      this.$router.go(-1)
      // this.$router.push('/notice')
    },
  }
})
</script>

<style scoped>
</style>
