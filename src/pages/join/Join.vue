<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_join') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_join_description') }}
      </div>
    </div>

    <!-- wallet_address -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('user_wallet_address') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="getWalletAddress" ref="wallet_address" :rules="[required, val => minLength(val, 6), val => maxLength(val, 50)]" standout tabindex="1" />
      </div>
    </div>

    <!-- email(uid) -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('email') }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-6 q-pr-sm">
        <q-input v-model="uid" ref="uid" :rules="[required, val => minLength(val, 6), val => maxLength(val, 50)]" @keyup="emailKeyup" standout tabindex="2" />
      </div>
      <div class="col">
        <q-btn class="" color="secondary" text-color="black" size="lg" style="width: 160px;" @click="sendMailCode" tabindex="3">
          <b>{{ $t('send_email_code') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- email check -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('enter_email_code') }}</span>
      </div>
    </div>
    <div class="row justify-left">
      <div class="col-6 q-pr-sm">
        <q-input v-model="code" ref="code" :rules="[val => minLength(val, 6), val => maxLength(val, 6)]" standout tabindex="4" />
      </div>
      <div class="">
        <q-btn class="" color="secondary" text-color="black" size="lg" style="width: 160px;" @click="checkEmailCode" tabindex="5">
          <b>{{ $t('verification') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- pwd -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('user_pwd') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="pwd" ref="pwd" type="password" :rules="[required, val => minLength(val, 6), val => maxLength(val, 30)]" clearable standout tabindex="6" />
      </div>
    </div>

    <!-- pwdCheck -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('user_pwd_check') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="pwdCheck" ref="pwdCheck" type="password" :rules="[required, val => minLength(val, 6), val => maxLength(val, 30)]" clearable standout tabindex="7" />
      </div>
    </div>

    <div class="row justify-center q-pb-lg">
    </div>

    <!-- Buttons -->
    <div class="row justify-center q-pt-md">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="9">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="registerUser" tabindex="8">
          <b>{{ $t('register') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { sha512 } from 'js-sha512'
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'Join',
  data () {
    return {
      uid: '',
      code: '',
      pwd: '',
      pwdCheck: '',
      emailVerified: false,
      // auth_key: '',
      // nickname: '',
      // profile_image: '',
      // reg_name: '',
      // name: '',
      // mobile_no: '',
      // ucode: '',
      // birth: '',
      // gender: '',
      // nation: '',
      // tel_no: '',
      // thumbnail: '',
      // introduce: '',
      // push_agree_yn: '',
      // adcd: '',
      // id_card_image: '',
      // home_address: '',
      // home_address_image: '',
      // business_registration_no: '',
      // business_license_image: '',
      // company_address: '',
      // company_address_image: '',
      // company_tel_no: '',
      // reg_id: '',
      // reg_time: '',
      // mod_id: '',
      // mod_time: '',
      // del_id: '',
      // del_time: '',
      confirmGoBack: false, // goBack 확인창
    }
  },
  components: {
  },
  computed: {
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    // getUid () {
    //   return this.$store.getters.getUid
    // }
  },
  created: function () {},
  mounted: function () {},
  methods: {
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
    checkEmail(param) {
      let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,10}$/
      return regEmail.test(param)
    },
    validate() {
      let result = true
      if (!this.$refs.wallet_address.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_wallet_address'))
        result = false
      }
      // ID 이메일 형식 체크
      if (!this.checkEmail(this.uid)) {
        this.$noti(this.$q, this.$t('email_must_be_email'))
        result = false
      }
      if (!this.$refs.uid.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_uid'))
        result = false
      }
      if (!this.$refs.pwd.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_pwd'))
        result = false
      }
      if (!this.$refs.pwdCheck.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_pwd_check'))
        result = false
      }
      // 비밀번호 일치 확인
      if (this.pwd !== this.pwdCheck) {
        this.$noti(this.$q, this.$t('pwd_not_match'))
        result = false
      }
      // 이메일 확인 여부
      if (!this.emailVerified) {
        this.$noti(this.$q, this.$t('email_not_verified'))
        result = false
      }
      return result
    },

    // 확인코드 메일 보내기
    sendMailCode() {
      if (!this.checkEmail(this.uid)) {
        this.$noti(this.$q, this.$t('email_must_be_email'))
        return
      }
      const vo = {
        uid: this.uid
      }
      this.$q.loading.show()
      this.$axios.post('/api/login/sendMailCode', vo)
        .then((result) => {
          this.$q.loading.hide()
          // console.log(JSON.stringify(result.data))
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 메일전송 성공 메세지
            this.$noti(this.$q, this.$t('mail_sent'))
          } else {
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide()
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    // 이메일 keyup 이벤트 - 수정시 emailVerified = false 로 설정
    emailKeyup (event) {
      this.emailVerified = false
    },

    checkEmailCode() {
      if (!this.checkEmail(this.uid)) {
        this.$noti(this.$q, this.$t('email_must_be_email'))
        return
      }
      // 이메일 코드 항목 체크
      if (!this.code) {
        this.$noti(this.$q, this.$t('enter_email_verification_code'))
        return
      }
      if (!this.$refs.code.validate()) {
        this.$noti(this.$q, this.$t('check_email_verification_code'))
        return
      }

      // 1. 이메일 코드 체크
      const userTempVo = {
        uid: this.uid,
        code: this.code,
      }
      this.$q.loading.show()
      this.$axios.post('/api/login/checkEmailCode', userTempVo)
        .then((result) => {
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$q.loading.hide()
            this.$noti(this.$q, this.$t('email_code_verification_success'))
            this.emailVerified = true
          } else {
            this.$q.loading.hide()
            // 실패 메세지
            this.$noti(this.$q, this.$t('email_code_verification_failed'))
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    // 회원정보 등록 처리 시작
    async registerUser() {
      // Field validation check
      if(!this.validate()) {
        // this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 회원정보 등록
      this.doRegisterUser()
    },
    // 회원정보 등록
    async doRegisterUser() {
      // 1. 회원정보 등록 처리
      let encPwd = ''
      if (this.pwd) {
        encPwd = sha512(this.pwd)
      } else {
        encPwd = null
      }
      const params = {
        wallet_address: this.getWalletAddress,
        wallet_type: this.getWalletType,
        uid: this.uid,
        pwd: encPwd,
      }

      this.$q.loading.show() // 로딩 표시 시작

      this.$axios.post('/api/user/insertUser', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_user_success'))
            this.$router.push('/')
          } else {
            this.$noti(this.$q, this.$t('register_user_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
    }
  }
})
</script>

<style scoped>
</style>
