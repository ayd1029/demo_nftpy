<template>
  <!-- <q-dialog v-model="loginModal" style="min-width: 365px; min-height: 365px; max-width: 500px;"> -->
  <!-- <q-dialog v-model="loginModal" persistent style="background-image: url(images/star1.jpg)" transition-hide="rotate"> -->
  <q-dialog v-model="loginModal" persistent>
    <q-card style="width: 100%;">
      <q-toolbar>
        <!-- <q-avatar>
          <q-img src="images/logo-128x128.png" style="width: 24px;" />
        </q-avatar> -->
        <q-toolbar-title><span class="text-weight-bold text-center"></span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup icon-right="true" @click="close" />
      </q-toolbar>

      <br />

      <table border="0" width="75%" align="center">
        <tr>
          <td colspan="3">
            <div class="col-12 text-center">
              <div class="">
                <img src="logo/logo_nftpy.png" style="width: 90px;" />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 text-center">
              <div class="">
                <font size="5" class="text-grey-7"><b>KLAYSTAR</b></font>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
      </table>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <!-- loginCd === 1 : 로그인 화면 -->
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <table v-if="loginCd === 1" border="0" width="75%" align="center">
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="userVo.uid" hide-bottom-space standout :placeholder="$t('id_email')" style="height: 56px;" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="userVo.pwd" hide-bottom-space standout type="password" :placeholder="$t('pwd_upper')" style="height: 56px;" @keyup="keyup" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <q-btn color="primary" text-color="black" style="width: 100%; height: 56px; min-width: 30px;" @click="doLogin">
              <table border="0" width="100%" align="center">
                <tr>
                  <td>
                    <b>{{ $t('login') }}</b>
                  </td>
                </tr>
              </table>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3">
            <!-- TODO: 되돌리기1 -->
            <!-- <q-btn color="secondary" text-color="black" style="width: 100%; height: 56px;" @click="doLoginKakaoStart">
              <table border="0" width="100%" align="center">
                <tr>
                  <td width="30px">
                    <img src="logo/kakao_logo.png" style="width: 30px; margin-top: 7px;" />
                  </td>
                  <td>
                    <b>{{ $t('login_kakao') }}</b>
                  </td>
                </tr>
              </table>
            </q-btn> -->
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              <br />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(2)"><font size="2" color="grey">{{ $t('signup') }}</font></a>
          </td>
          <td class="text-center" width="10%">
            |
          </td>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(4)"><font size="2" color="grey">{{ $t('change_pwd') }}</font></a>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              &nbsp;
            </div>
          </td>
        </tr>
      </table>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <!-- loginCd === 2 : 회원가입 화면 -->
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <table v-if="loginCd === 2" border="0" width="75%" align="center">
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="userVo.uid" hide-bottom-space standout :placeholder="$t('id_email')" style="height: 56px;" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="userVo.pwd" hide-bottom-space standout type="password" :placeholder="$t('pwd_upper')" style="height: 56px;" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="pwdCheck" hide-bottom-space standout type="password" :placeholder="$t('pwd_check_upper')" style="height: 56px;" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <a style="cursor: pointer;" @click="showTerms"><font size="2" color="grey">{{ $t('show_terms') }}</font></a>
            &nbsp;&nbsp;
            <a style="cursor: pointer;" @click="showPrivacy"><font size="2" color="grey">{{ $t('show_privacy') }}</font></a>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <q-btn :loading="loading" color="primary" text-color="black" style="width: 100%; height: 56px; min-width: 30px;" @click="goCheckEmailCode">
              <table border="0" width="100%" align="center">
                <tr>
                  <td>
                    <b>{{ $t('agree_and_signup') }}</b>
                  </td>
                </tr>
              </table>
              <span v-if="loading">
                <q-spinner-oval class="" />
              </span>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              <br />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(1)"><font size="2" color="grey">{{ $t('go_back') }}</font></a>
          </td>
          <td class="text-center" width="10%">
            |
          </td>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(4)"><font size="2" color="grey">{{ $t('change_pwd') }}</font></a>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              &nbsp;
            </div>
          </td>
        </tr>
      </table>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <!-- loginCd === 3 : 회원가입 이메일 코드 확인 화면 -->
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <table v-if="loginCd === 3" border="0" width="75%" align="center">
        <tr>
          <td colspan="3">
            <div class="col-12 text-center" style="height: 56px;">
              {{ $t('enter_email_code') }}
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="userVo.code" hide-bottom-space standout type="number" min="100000" max="999999" placeholder="EMAIL CODE" style="height: 56px;" @keyup="onKeyUpEmailCode" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12" style="height: 56px;">
            <q-btn :loading="loading" color="primary" text-color="black" outline style="width: 100%; height: 56px; min-width: 30px;" @click="sendMailCode(userVo.uid)">
              <span v-if="loading">
                <q-spinner-oval class="" />
              </span>
              <table border="0" width="100%" align="center">
                <tr>
                  <td>
                    <b>{{ $t('resend') }}</b>
                  </td>
                </tr>
              </table>
            </q-btn>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3">
            <q-btn :loading="loading" color="primary" text-color="black" style="width: 100%; height: 56px; min-width: 30px;" @click="checkEmailCode">
              <span v-if="loading">
                <q-spinner-oval class="" />
              </span>
              <table border="0" width="100%" align="center">
                <tr>
                  <td>
                    <b>{{ $t('confirm') }}</b>
                  </td>
                </tr>
              </table>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              <br />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(1)"><font size="2" color="grey">{{ $t('go_back') }}</font></a>
          </td>
          <td class="text-center" width="10%">
            |
          </td>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(4)"><font size="2" color="grey">{{ $t('change_pwd') }}</font></a>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              &nbsp;
            </div>
          </td>
        </tr>
      </table>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <!-- loginCd === 4 : 비밀번호 변경 화면 -->
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <table v-if="loginCd === 4" border="0" width="75%" align="center">
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="userVo.uid" hide-bottom-space standout :placeholder="$t('id_email')" style="height: 56px;" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="userVo.pwd" hide-bottom-space standout type="password" :placeholder="$t('pwd_upper')" style="height: 56px;" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="pwdCheck" hide-bottom-space standout type="password" :placeholder="$t('pwd_check_upper')" style="height: 56px;" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <q-btn :loading="loading" color="primary" text-color="black" style="width: 100%; height: 56px; min-width: 30px;" @click="goCheckEmailCodeChangePwd">
              <table border="0" width="100%" align="center">
                <tr>
                  <td>
                    <b>{{ $t('change_pwd') }}</b>
                  </td>
                </tr>
              </table>
              <span v-if="loading">
                <q-spinner-oval class="" />
              </span>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              <br />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(2)"><font size="2" color="grey">{{ $t('signup') }}</font></a>
          </td>
          <td class="text-center" width="10%">
            |
          </td>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(1)"><font size="2" color="grey">{{ $t('go_back') }}</font></a>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              &nbsp;
            </div>
          </td>
        </tr>
      </table>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <!-- loginCd === 5 : 비밀번호 변경 이메일 코드 확인 화면 -->
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <table v-if="loginCd === 5" border="0" width="75%" align="center">
        <tr>
          <td colspan="3">
            <div class="col-12 text-center" style="height: 56px;">
              {{ $t('enter_email_code') }}
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12">
              <q-input v-model="userVo.code" hide-bottom-space standout type="number" min="100000" max="999999" placeholder="EMAIL CODE" style="height: 56px;" @keyup="onKeyUpEmailCodeChangePwd" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12" style="height: 56px;">
            <q-btn :loading="loading" color="primary" text-color="black" outline style="width: 100%; height: 56px; min-width: 30px;" @click="sendMailCode(userVo.uid)">
              <span v-if="loading">
                <q-spinner-oval class="" />
              </span>
              <table border="0" width="100%" align="center">
                <tr>
                  <td>
                    <b>{{ $t('resend') }}</b>
                  </td>
                </tr>
              </table>
            </q-btn>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3">
            <q-btn :loading="loading" color="primary" text-color="black" style="width: 100%; height: 56px; min-width: 30px;" @click="checkEmailCodeChangePwd">
              <span v-if="loading">
                <q-spinner-oval class="" />
              </span>
              <table border="0" width="100%" align="center">
                <tr>
                  <td>
                    <b>{{ $t('confirm') }}</b>
                  </td>
                </tr>
              </table>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              <br />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(2)"><font size="2" color="grey">{{ $t('signup') }}</font></a>
          </td>
          <td class="text-center" width="10%">
            |
          </td>
          <td class="text-center" width="45%">
            <a style="cursor: pointer;" @click="setLoginCode(1)"><font size="2" color="grey">{{ $t('go_back') }}</font></a>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="col-12 q-pa-md text-center">
              &nbsp;
            </div>
          </td>
        </tr>
      </table>

    </q-card>
  </q-dialog>
  <TermsModal ref="refTermsModal" />
  <PrivacyModal ref="refPrivacyModal" />
</template>

<style>
.text-kakao {
  color: #ffffff;
}
.bg-kakao {
  background: #ffeb00;
}
</style>

<script>
// import { Cookies } from 'quasar'
import { sha512 } from 'js-sha512'
// import { KakaoCordovaSDK } from 'kakao-sdk'

export default {
  // name: 'mystore',
  data () {
    return {
      // loginModal: $store.state.loginModal,
      loginModal: false,
      loggingInFlag: false,
      loginCd: 1, // 1: 로그인
      loading: false,
      percentage: 100,
      layoutWidth: 800,
      userVo: {
        // uid: 'ayd1029@gmail.com',
        // pwd: 'ayd801029',
        uid: '',
        pwd: '',
        pwd2: '',
        code: '',
        ucode: '1', // 1:일반회원, 2:카카오회원
      },
      // pwdCheck: 'ayd801029',
      pwdCheck: '',
      kakaoAccessToken: '',
      // emailCode: '',
    }
  },
  // created: function () {
  //   if (this.$store.state.device === 'P') {
  //     this.layoutWidth = '280px'
  //   }
  // },
  methods: {
    async show () {
      this.loading = false
      this.loginModal = true
    },
    async goCheckEmailCode() {
      // 1. 필드 체크
      if(!this.checkField()) {
        return
      }

      // 2. 아이디 중복 체크
      const result = await this.checkIdDuplicate(this.userVo.uid)
      if (result === false) {
        return
      }

      // 3. 이메일 확인 코드 전송
      await this.sendMailCode(this.userVo.uid)
      // 회원가입 이메일코드 입력 화면으로 설정
      this.loginCd = 3
    },

    async goCheckEmailCodeChangePwd() {
      // 1. 필드 체크
      if(!this.checkField()) {
        return
      }

      // 2. 아이디 존재유무 체크
      const result = await this.checkIdExist(this.userVo.uid)
      if (result === false) {
        return
      }

      // 3. 이메일 확인 코드 전송
      await this.sendMailCode(this.userVo.uid)
      // 비밀번호 변경 이메일코드 입력 화면으로 설정
      this.loginCd = 5
    },

    checkField() {
      // ID 항목 체크
      // if (!this.checkInput(this.userVo.uid, 'ID')) {
      //   return false
      // }
      if (!this.checkInputLength(this.userVo.uid, this.$t('ID'), 50, 'long')) {
        return false
      }

      // ID 이메일 형식 체크
      if (!this.checkEmail(this.userVo.uid)) {
        this.$noti(this.$q, this.$t('id_must_be_email'))
        return false
      }
      // // 비밀번호 항목 체크
      // if (!this.checkInput(this.userVo.pwd, this.$t('pwd_upper'))) {
      //   return false
      // }
      // // 비밀번호 확인 항목 체크
      // if (!this.checkInput(this.pwdCheck, this.$t('pwd_check_upper'))) {
      //   return false
      // }
      // 비밀번호 항목 자릿수 체크
      if (!this.checkInputLength(this.userVo.pwd, this.$t('pwd_upper'), 6, 'short')) {
        return false
      }
      // 비밀번호 확인 항목 자릿수 체크
      if (!this.checkInputLength(this.pwdCheck, this.$t('pwd_check_upper'), 6, 'short')) {
        return false
      }
      // 비밀번호 일치 확인
      if (this.userVo.pwd !== this.pwdCheck) {
        this.$noti(this.$q, this.$t('pwd_not_match'))
        return false
      }
      return true
    },

    // 아이디 중복 체크
    checkIdDuplicate(emailAddress) {
      const vo = {
        uid: emailAddress
      }
      this.loading = true
      this.$axios.post('/api/login/checkIdDuplicate', vo)
        .then((result) => {
          this.loading = false
          if (result.data && result.data.resultCd === 'SUCCESS') {
            return true
          } else if (result.data.resultCd === 'FAIL') {
            this.$noti(this.$q, this.$t('id_already_in_use'))
            return false            
          } else {
            this.$noti(this.$q, result.data.status + ' : ' +result.data.resultMsg)
            return false
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    // 아이디 존재 체크
    checkIdExist(emailAddress) {
      const vo = {
        uid: emailAddress
      }
      this.loading = true
      this.$axios.post('/api/login/checkIdExist', vo)
        .then((result) => {
          this.loading = false
          if (result.data && result.data.resultCd === 'SUCCESS') {
            return true
          } else if (result.data.resultCd === 'FAIL') {
            this.$noti(this.$q, this.$t('not_exist_id'))
            return false            
          } else {
            this.$noti(this.$q, result.data.status + ' : ' +result.data.resultMsg)
            return false
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    // 메일 보내기
    sendMailCode(emailAddress) {
      const vo = {
        uid: emailAddress
      }
      this.loading = true
      this.$axios.post('/api/login/sendMailCode', vo)
        .then((result) => {
          this.loading = false
          // console.log(JSON.stringify(result.data))
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 메일전송 성공 메세지
            this.$noti(this.$q, this.$t('mail_sent'))
          } else {
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    checkInput(field, fieldName) {
      if (!field) {
        this.$noti(this.$q, fieldName + this.$t('is_required'))
        return false
      } else {
        return true
      }
    },
    checkInputLength(field, fieldName, length, compareCd) {
      if (!field) {
        this.$noti(this.$q, fieldName + this.$t('is_required'))
        return false
      } else {
        if (compareCd === 'short') {
          if (field.length < length) {
            this.$noti(this.$q, fieldName + this.$t('must_be_longer_than') + ' ' + length)
            return false
          }
        } else if (compareCd === 'long') {
          if (field.length > length) {
            this.$noti(this.$q, fieldName + this.$t('must_be_shorter_than') + ' ' + length)
            return false
          }
        } else if (compareCd === 'equal') {
          if (field.length !== length) {
            this.$noti(this.$q, fieldName + this.$t('must_be_equal') + ' ' + length)
            return false
          }
        }
        return true
      }
    },
    checkEmail(param) {
      let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,10}$/
      return regEmail.test(param)
    },

    checkEmailCode() {
      // 이메일 코드 항목 체크
      // if (!this.checkInput(this.userVo.code, this.$t('email_code'))) {
      //   return
      // }
      if (!this.checkInputLength(this.userVo.code, this.$t('email_code'), 6, 'equal')) {
        return
      }
      // 1. 이메일 코드 체크
      const userTempVo = {
        uid: this.userVo.uid,
        code: this.userVo.code,
      }
      this.loading = true
      this.$axios.post('/api/login/checkEmailCode', userTempVo)
        .then((result) => {
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 2. 비밀번호 암호화
            this.userVo.pwd2 = sha512(this.userVo.pwd)
            this.userVo.pwd = ''
            this.userVo.ucode = '1'

            // 3. 회원가입
            this.doJoin()
          } else {
            this.loading = false
            // 실패 메세지
            // this.$noti(this.$q, result.data.resultMsg)
            this.$noti(this.$q, this.$t('email_code_verification_failed'))
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    doJoin() {
      this.$axios.post('/api/user/insertUser', this.userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.loading = false
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 성공 메세지
            this.$noti(this.$q, this.$t('registration_completed'))
            // 필드 초기화
            this.clearField()
            // 로그인 화면으로 설정
            this.loginCd = 1
          } else {
            // 실패 메세지
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    checkEmailCodeChangePwd() {
      // 이메일 코드 항목 체크
      // if (!this.checkInput(this.userVo.code, this.$t('email_code'))) {
      //   return
      // }
      if (!this.checkInputLength(this.userVo.code, this.$t('email_code'), 6, 'equal')) {
        return
      }
      // 1. 이메일 코드 체크
      const userTempVo = {
        uid: this.userVo.uid,
        code: this.userVo.code,
      }
      this.loading = true
      this.$axios.post('/api/login/checkEmailCode', userTempVo)
        .then((result) => {
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 2. 비밀번호 암호화
            this.userVo.pwd2 = sha512(this.userVo.pwd)
            this.userVo.pwd = ''

            // 3. 비밀번호 변경
            this.doChangePwd()
          } else {
            this.loading = false
            // 실패 메세지
            // this.$noti(this.$q, result.data.resultMsg)
            this.$noti(this.$q, this.$t('email_code_verification_failed'))
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    doChangePwd() {
      this.$axios.post('/api/user/updateUserPwd', this.userVo)
        .then((result) => {
          this.loading = false
          // console.log(JSON.stringify(result.data))
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 성공 메세지
            this.$noti(this.$q, this.$t('pwd_changed'))
            // 필드 초기화
            this.clearField()
            // 로그인 화면으로 설정
            this.loginCd = 1
          } else {
            // 실패 메세지
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    clearField() {
      // 필드 초기화
      this.pwdCheck = ''
      this.userVo.code = ''
      this.userVo.pwd = ''
      this.userVo.pwd2 = ''
    },


    // 1. 카카오 로그인
    doLoginKakaoStart () {
      this.loggingInFlag = true
      // console.log(this.$q.platform.is)
      // alert(JSON.stringify(this.$q.platform.is))

      // alert('call web kakao login')
      // this.doLoginKakaoStartWeb()

      // APP 테스트 전용
      // this.doLoginKakaoStartApp()

      if (this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit'
        // && this.$q.platform.is.mobile === true && (this.$q.platform.is.platform === 'andriod' || this.$q.platform.is.platform === 'ios')
      ) {
        // APP인 경우
        console.log('doLoginKakaoStartApp')
        this.doLoginKakaoStartApp()
      } else { // PC WEB or Mobile WEB인 경우
        console.log('doLoginKakaoStartWeb')
        // alert('doLoginKakaoStartWeb')
        // WEB인 경우
        this.doLoginKakaoStartWeb()
      }
    },
    // 카카오 로그인 앱버전
    doLoginKakaoStartApp () {
      // alert('doLoginKakaoStartApp start')
      // alert(`cookie.get('LOCALE')` + this.$cookie.get('LOCALE'))
      // 1. 현재 페이지 설정
      let currentLocale = this.$cookie.get('LOCALE')
      if (!currentLocale) {
        currentLocale = localStorage.getItem('LOCALE')
      }
      if (!currentLocale) {
        currentLocale = 'ko-KR'
      }
      let adcd = this.$cookie.get('ADCD')
      if (!adcd) {
        currentLocale = localStorage.getItem('ADCD')
      }
      const stateParam = this.$route.path + '|' + currentLocale + '|' + adcd
      
      const kakaoLoginRedirectUriCordova = this.$frontDomain + '/api/login/kakaoLoginCallbackApp'
      // const kakaoLoginRedirectUriCordova = 'http://172.30.1.100:8888' + '/api/login/kakaoLoginCallbackApp'
      try {
        // alert(JSON.stringify(this.$Kakao.Auth))
        // alert('stateParam: ' + stateParam)
        this.$Kakao.Auth.authorize({
          redirectUri: kakaoLoginRedirectUriCordova,
          state: stateParam,
          throughTalk: false,
        })
      } catch(error) {
        console.log(error)
        this.$noti(this.$q, error)
      }

      // // this.loading = true // 로딩표시 시작
      // let loginOptions = {}
      // /*
      // KAKAO_TALK 0 kakaotalk으로 login을 하고 싶을때 지정.
      // KAKAO_STORY 1 kakaostory으로 login을 하고 싶을때 지정.
      // KAKAO_ACCOUNT 2 웹뷰 Dialog를 통해 카카오 계정연결을 제공하고 싶을경우 지정.
      // KAKAO_TALK_EXCLUDE_NATIVE_LOGIN 3 카카오톡으로만 로그인을 유도하고 싶으면서 계정이 없을때 계정생성을 위한 버튼도 같이 제공을 하고 싶다면 지정.
      // KAKAO_TALK과 중복 지정불가.
      // KAKAO_LOGIN_ALL 4 모든 로그인방식을 사용하고 싶을때 지정.

      // ★ 플러그인은 하기와 같이 정의되어 있음!!! ★
      // AuthTypeTalk: 1,
      // AuthTypeStory: 2,
      // AuthTypeAccount: 3
      // */
      // loginOptions['authTypes'] = [1] // 카카오톡 계정으로 로그인 - 카카오스토리, 카카오계정은 뺐음. 테스트 시간이 있으면 추후 추가.
      // // KakaoCordovaSDK.login(loginOptions, this.successCallbackApp, this.errorCallbackApp)

      // // console.log(JSON.stringify(KakaoCordovaSDK))
      // // alert(JSON.stringify(KakaoCordovaSDK))

      // // KakaoCordovaSDK.login(loginOptions).then((res) => {
      // //   console.log(res)
      // //   console.log(JSON.stringify(result.data))
      // //   alert(res)
      // // })
      // // .catch((err) => {
      // //   console.log(err)
      // //   alert(err)
      // // })

      // // alert(window.location.host)
      
      // KakaoCordovaSDK.login(loginOptions, this.successCallbackApp, this.errorCallbackApp)
    },
    // [APP] 카카오 로그인 성공시
    successCallbackApp (authObj) {
      console.log(JSON.stringify(authObj))
      // alert('success')

      // alert(authObj.kakao_account.email)
      // alert(authObj.accessToken)

      this.doLoginKakaoApp(authObj)
    },
    // [APP] 카카오 로그인 실패시
    errorCallbackApp (error) {
      // alert('error')
      console.log(JSON.stringify(error))
      this.loading = false // 로딩표시 종료
      this.$noti(this.$q, error.errorMessage)
    },
    // [APP] 2. 카카오로 회원가입 and 로그인
    async doLoginKakaoApp (authObj) {
      // 회원여부확인/회원가입
      const params = {
        uid: authObj.kakao_account.email,
        pwd2: authObj.accessToken,
        ucode: "2",
      }
      this.doLoginKakao(params)

      // 부모창의 콜백함수 호출
      // this.$emit('callback-login', result.data.uid, result.data.auth_key)
    },
    // // 쿠키에 로그인 정보 저장
    // setLoginInfoToCookie(uid, authKey) {
    //   this.$cookie.set('UID', uid)
    //   this.$cookie.set('AUTH_KEY', authKey)
    // },

    // [WEB] 1. 카카오 WEB 로그인
    doLoginKakaoStartWeb () {
      this.$Kakao.Auth.login({
        success: this.successTokenCallbackWeb,
        fail: this.errorTokenCallbackWeb,
      })
    },

    // [WEB] 카카오 로그인 성공시
    successTokenCallbackWeb (authObj) {
      console.log(JSON.stringify(authObj))
      console.log('access_token: ' + authObj.access_token)

      // 카카오 액세스 토큰 설정
      this.kakaoAccessToken = authObj.access_token

      // console.log('start Kakao.API.request')

      this.$Kakao.API.request({
        url: '/v2/user/me',
        success: this.successUserInfoCallbackWeb,
        fail: this.errorUerInfoCallbackWeb,
      })
    },
    // [WEB] 카카오 로그인 실패시
    errorTokenCallbackWeb (error) {
      // alert('error')
      console.log(JSON.stringify(error))
      this.loading = false // 로딩표시 종료
      this.$noti(this.$q, error.errorMessage)
    },
    // [WEB] 카카오 유저정보 조회 성공시
    successUserInfoCallbackWeb(userObj) {
      // 회원여부확인/회원가입
      const params = {
        uid: userObj.kakao_account.email,
        pwd2: this.kakaoAccessToken,
        ucode: "2",
      }
      this.doLoginKakao(params)
    },
    // [WEB] 카카오 유저정보 조회 실패시
    errorUerInfoCallbackWeb(error) {
      // alert('error')
      console.log(JSON.stringify(error))
      this.loading = false // 로딩표시 종료
      this.$noti(this.$q, error.errorMessage)
    },

    // 카카오로 회원가입 and 로그인
    doLoginKakao (params) {
      this.loading = true
      this.$axios.post('/api/login/insertSelectUser', params)
        .then((result) => {
          this.loading = false
          if (result.data && result.data.resultCd === 'SUCCESS') { // 카카오 로그인 성공시
            // this.doLogin(result.data)
            // console.log(result.data)

            // 로그인 정보 쿠키에 저장
            this.$store.dispatch('setUid', result.data.uid)
            this.$store.dispatch('setAdcd', result.data.adcd)
            this.$cookie.set('UID', result.data.uid, 365)
            this.$cookie.set('AUTH_KEY', result.data.auth_key, 365)
            this.$cookie.set('ADCD', result.data.adcd, 365)
            localStorage.setItem('UID', result.data.uid, 365)
            localStorage.setItem('AUTH_KEY', result.data.auth_key, 365)
            localStorage.setItem('ADCD', result.data.adcd, 365)

            // 부모창의 콜백함수 호출
            this.$emit('callback-login', result.data)

            // 닫기
            this.close()
          } else {
            this.$noti(this.$q, this.$t('registration_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })




    },
    // [WEB] 3. 로그인
    async doLogin () {
      // ID 항목 체크
      if (!this.checkInput(this.userVo.uid, 'ID')) {
        return false
      }
      // ID 이메일 형식 체크
      if (!this.checkEmail(this.userVo.uid)) {
        this.$noti(this.$q, this.$t('id_must_be_email'))
        return false
      }
      // // 비밀번호 항목 체크
      // if (!this.checkInput(this.userVo.pwd, this.$t('pwd_upper'))) {
      //   return false
      // }
      // 비밀번호 항목 자릿수 체크
      if (!this.checkInputLength(this.userVo.pwd, this.$t('pwd_upper'), 6, 'short')) {
        return false
      }

      this.userVo.pwd2 = sha512(this.userVo.pwd)

      // 로그인 처리
      this.loading = true
      this.$axios.post('/api/login/doLogin', this.userVo)
        .then((result) => {
          this.loading = false
          if (result.data && result.data.resultCd === 'SUCCESS') { // 카카오 로그인 실패시
            // this.doLogin(result.data)
            // console.log(result.data)
            // this.$noti(this.$q, this.$t('로그인 성공'))

            // 로그인 정보 쿠키에 저장
            this.$store.dispatch('setUid', result.data.uid)
            this.$store.dispatch('setAdcd', result.data.adcd)
            this.$cookie.set('UID', result.data.uid, 365)
            this.$cookie.set('AUTH_KEY', result.data.auth_key, 365)
            this.$cookie.set('ADCD', result.data.adcd, 365)
            localStorage.setItem('UID', result.data.uid, 365)
            localStorage.setItem('AUTH_KEY', result.data.auth_key, 365)
            localStorage.setItem('ADCD', result.data.adcd, 365)

            // 부모창의 콜백함수 호출
            this.$emit('callback-login', result.data)
            
            // 팝업 닫기
            this.close()
          } else if (result.data.resultCd === 'NO_ID') {
            this.$noti(this.$q, this.$t('not_exist_id'))
          } else if (result.data.resultCd === 'WRONG_PWD') {
            this.$noti(this.$q, this.$t('pwd_incorrect'))
          } else {
            this.$noti(this.$q, this.$t('login_failed'))
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$noti(this.$q, err)
        })


    },
    onKeyUpEmailCode() {
      if (this.userVo.code && this.userVo.code.length == 6) {
        this.checkEmailCode()
      }
    },
    onKeyUpEmailCodeChangePwd() {
      if (this.userVo.code && this.userVo.code.length == 6) {
        this.checkEmailCodeChangePwd()
      }
    },
    // 로그인 코드 설정
    setLoginCode (code) {
      this.loginCd = code
    },
    // 비밀번호 입력창 키업 이벤트
    keyup (event) {
      if (event.key === 'Enter') { // 엔터일 경우 로그인
        this.doLogin()
      }
    },
    // 이용약관 모달 표시
    showTerms() {
      this.$refs.refTermsModal.show()
    },
    // 개인정보처리방침 모달 표시
    showPrivacy() {
      this.$refs.refPrivacyModal.show()
    },
    close () {
      this.loginModal = false
      this.clearField()
      this.loginCd = 1 // 로그인 코드 초기화
    }
  }
}
</script>
