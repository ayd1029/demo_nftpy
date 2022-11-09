<template>
  <q-page v-if="!autoLoginFlag" class="flex flex-center">
    <q-toolbar>
      <!-- <q-avatar>
        <q-img src="images/logo-128x128.png" style="width: 24px;" />
      </q-avatar> -->
      <q-toolbar-title><span class="text-weight-bold text-center"></span></q-toolbar-title>

      <q-select
        v-model="locale"
        :options="localeOptions"
        dense
        borderless
        emit-value
        map-options
        style="width: 85px"
        @update:model-value="onChangeLocale"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

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
          <q-btn color="secondary" text-color="black" style="width: 100%; height: 56px;" @click="doLoginKakaoStart">
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
            <q-input v-model="userVo.code" hide-bottom-space standout type="number" min="100000" max="999999" placeholder="EMAIL CODE" style="height: 56px;" />
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
            <q-input v-model="userVo.code" hide-bottom-space standout type="number" min="100000" max="999999" placeholder="EMAIL CODE" style="height: 56px;" />
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

  </q-page>


  <!-- 오토로그인 처리시 잠시 보이는 화면 -->
  <q-page v-else class="flex flex-center">
    <table border="0" width="75%" align="center">
      <tr>
        <td colspan="3">
          <div class="col-12 text-center">
            <div class="">
              <img src="images/logo-128x128.png" style="width: 90px;" />
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
  </q-page>
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
import { useI18n } from 'vue-i18n'
// import { KakaoCordovaSDK } from 'kakao-sdk'

export default {
  // name: 'mystore',
  data () {
    return {
      autoLoginFlag: true,
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
  created: function () {
    this.loading = false

    //////////////////////////////////////////////////////////
    // local storage에 저장된 로케일 불러오기
    //////////////////////////////////////////////////////////
    const savedLocale = localStorage.getItem('LOCALE')
    // console.log('■■■■■■■■■■■■■■■■ localStorage LOCALE: ' + localStorage.getItem('LOCALE'))
    // // 쿠키 로케일 설정
    if (savedLocale) {
      this.locale = savedLocale
    }
    //////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////
    // APP -> local storage에 UID, AUTH_KEY가 있으면 자동 로그인 처리
    //////////////////////////////////////////////////////////
    const savedUid = localStorage.getItem('UID')
    const savedAuthKey = localStorage.getItem('AUTH_KEY')
    const savedAdcd = localStorage.getItem('ADCD')
    // console.log('■■■■■■■■■■■■■■■■ localStorage UID: ' + localStorage.getItem('UID'))
    // console.log('■■■■■■■■■■■■■■■■ localStorage AUTH_KEY: ' + localStorage.getItem('AUTH_KEY'))
    // alert(savedUid)
    // alert(savedAuthKey)
    if (savedUid && savedAuthKey) {
      // alert('moveToWeb!')
      // MainLayout.vue 에서 로그인 처리 함!!!
      // this.doAutoLogin(savedUid, savedAuthKey)
      this.moveToWeb(savedUid, savedAuthKey, savedAdcd)
    } else {
      // 자동로그인 미사용시 로그인 화면 표시
      this.autoLoginFlag = false
    }
    //////////////////////////////////////////////////////////
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'ko-KR', label: 'Korean' },
      ],
    }
  },
  methods: {
    // locale 쿠키에 설정 - APP에서 WEB의 카카오 로그인시 redirect에서 필요
    onChangeLocale() {
      localStorage.setItem('LOCALE', this.locale, 365)
    },

    // MainLayout.vue 에서 로그인 처리 함. 
    // // [APP] 자동로그인
    // async doAutoLogin (savedUid, savedAuthKey) {
    //   // 회원여부확인/회원가입
    //   const params = {
    //     uid: savedUid,
    //     auth_key: savedAuthKey,
    //   }
    //   const result = await this.$axios.post(this.$apiServer + '/api/login/autoLogin', params)
    //   if (result.data && result.data.resultCd === 'SUCCESS') {
    //     console.log(result.data)
    //     // https://nftpy.io WEB으로 이동
    //     this.moveToWeb(result.data.uid, result.data.auth_key)
    //   } else {
    //     // 자동로그인 실패시 로그인 화면 표시
    //     this.autoLoginFlag = false

    //     this.$noti(this.$q, this.$t('login_failed ') + result.data.resultMsg)
    //   }
    // },
    
    // https://nftpy.io WEB으로 이동
    moveToWeb(uid, authKey, adcd) {

      // 로그인 정보 저장
      this.$store.dispatch('setUid', uid)
      this.$store.dispatch('setAdcd', adcd)
      localStorage.setItem('UID', uid, 365)
      localStorage.setItem('AUTH_KEY', authKey, 365)
      localStorage.setItem('LOCALE', this.locale, 365)
      localStorage.setItem('ADCD', adcd, 365)

      const moveUrl = this.$frontDomain + '/#/web?uid=' + uid + '&authKey=' + authKey + '&locale=' + this.locale + '&adcd=' + adcd
      // alert(moveUrl)
      location.href = moveUrl
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
      // 비밀번호 확인
      if (this.userVo.pwd !== this.pwdCheck) {
        this.$noti(this.$q, this.$t('pwd_not_match'))
        return false
      }
      return true
    },

    // 아이디 중복 체크
    async checkIdDuplicate(emailAddress) {
      const vo = {
        uid: emailAddress
      }
      this.loading = true
      const result = await this.$axios.post(this.$apiServer + '/api/login/checkIdDuplicate', vo)
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
    },

    // 아이디 존재 체크
    async checkIdExist(emailAddress) {
      const vo = {
        uid: emailAddress
      }
      this.loading = true
      const result = await this.$axios.post(this.$apiServer + '/api/login/checkIdExist', vo)
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
    },

    // 메일 보내기
    async sendMailCode(emailAddress) {
      const vo = {
        uid: emailAddress
      }
      this.loading = true
      const result = await this.$axios.post(this.$apiServer + '/api/login/sendMailCode', vo)
      this.loading = false
      // console.log(JSON.stringify(result.data))
      if (result.data && result.data.resultCd === 'SUCCESS') {
        // 메일전송 성공 메세지
        this.$noti(this.$q, this.$t('mail_sent'))
      } else {
        this.$noti(this.$q, result.data.resultMsg)
      }
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

    async checkEmailCode() {
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
      const result = await this.$axios.post(this.$apiServer + '/api/login/checkEmailCode', userTempVo)
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
    },
    async doJoin() {
      const result = await this.$axios.post(this.$apiServer + '/api/user/insertUser', this.userVo)
      this.loading = false
      // console.log(JSON.stringify(result.data))
      if (result.data && result.data.resultCd === 'SUCCESS') {
        // 성공 메세지
        this.$noti(this.$q, this.$t('registration_completed'))
        // 로그인 화면으로 설정
        this.loginCd = 1
      } else {
        // 실패 메세지
        this.$noti(this.$q, result.data.resultMsg)
      }

      // 필드 초기화
      this.clearField()
    },

    async checkEmailCodeChangePwd() {
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
      const result = await this.$axios.post(this.$apiServer + '/api/login/checkEmailCode', userTempVo)
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
    },
    async doChangePwd() {
      const result = await this.$axios.post(this.$apiServer + '/api/user/updateUserPwd', this.userVo)
      this.loading = false
      // console.log(JSON.stringify(result.data))
      if (result.data && result.data.resultCd === 'SUCCESS') {
        // 성공 메세지
        this.$noti(this.$q, this.$t('pwd_changed'))
        // 로그인 화면으로 설정
        this.loginCd = 1
      } else {
        // 실패 메세지
        this.$noti(this.$q, result.data.resultMsg)
      }

      // 필드 초기화
      this.clearField()
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

      // APP인 경우
      console.log('doLoginKakaoStartApp')
      this.doLoginKakaoStartApp()
    },
    // 카카오 로그인 앱버전
    doLoginKakaoStartApp () {
      // this.loading = true // 로딩표시 시작
      let loginOptions = {}
      /*
      KAKAO_TALK 0 kakaotalk으로 login을 하고 싶을때 지정.
      KAKAO_STORY 1 kakaostory으로 login을 하고 싶을때 지정.
      KAKAO_ACCOUNT 2 웹뷰 Dialog를 통해 카카오 계정연결을 제공하고 싶을경우 지정.
      KAKAO_TALK_EXCLUDE_NATIVE_LOGIN 3 카카오톡으로만 로그인을 유도하고 싶으면서 계정이 없을때 계정생성을 위한 버튼도 같이 제공을 하고 싶다면 지정.
      KAKAO_TALK과 중복 지정불가.
      KAKAO_LOGIN_ALL 4 모든 로그인방식을 사용하고 싶을때 지정.

      ★ 플러그인은 하기와 같이 정의되어 있음!!! ★
      AuthTypeTalk: 1,
      AuthTypeStory: 2,
      AuthTypeAccount: 3
      */
      loginOptions['authTypes'] = [1] // 카카오톡 계정으로 로그인 - 카카오스토리, 카카오계정은 뺐음. 테스트 시간이 있으면 추후 추가.
      // KakaoCordovaSDK.login(loginOptions, this.successCallbackApp, this.errorCallbackApp)

      // console.log(JSON.stringify(KakaoCordovaSDK))
      // alert(JSON.stringify(KakaoCordovaSDK))

      // KakaoCordovaSDK.login(loginOptions).then((res) => {
      //   console.log(res)
      //   console.log(JSON.stringify(result.data))
      //   alert(res)
      // })
      // .catch((err) => {
      //   console.log(err)
      //   alert(err)
      // })

      // alert(window.location.host)
      
      KakaoCordovaSDK.login(loginOptions, this.successCallbackApp, this.errorCallbackApp)
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
      alert('error')
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
    },
    
    // 카카오로 회원가입 and 로그인
    async doLoginKakao (params) {
      // alert('insertSelectUser start')
      // alert('/api/login/insertSelectUser')
      const result = await this.$axios.post(this.$apiServer + '/api/login/insertSelectUser', params)
      // alert('insertSelectUser end')
      // alert(JSON.stringify(result))
      if (result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        
        // alert('카카오 회원가입 완료')

        // https://nftpy.io WEB으로 이동
        this.moveToWeb(result.data.uid, result.data.auth_key, result.data.adcd)
      } else {
        this.$noti(this.$q, this.$t('registration_failed'))
        this.$noti(this.$q, result.data.resultMsg)
      }
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
      // 비밀번호 항목 자릿수 체크
      if (!this.checkInputLength(this.userVo.pwd, this.$t('pwd_upper'), 6, 'short')) {
        return false
      }
      // // 비밀번호 항목 체크
      // if (!this.checkInput(this.userVo.pwd, this.$t('pwd_upper'))) {
      //   return false
      // }

      this.userVo.pwd2 = sha512(this.userVo.pwd)

      // 로그인 처리
      const result = await this.$axios.post(this.$apiServer + '/api/login/doLogin', this.userVo)
      if (result.data && result.data.resultCd === 'SUCCESS') {
        // this.doLogin(result.data)
        // console.log(result.data)
        // this.$noti(this.$q, this.$t('로그인 성공'))

        // 부모창의 콜백함수 호출
        // this.$emit('callback-login', result.data)

        // https://nftpy.io WEB으로 이동
        this.moveToWeb(result.data.uid, result.data.auth_key, result.data.adcd)

      } else if (result.data.resultCd === 'NO_ID') {
        this.$noti(this.$q, this.$t('not_exist_id'))
      } else if (result.data.resultCd === 'WRONG_PWD') {
        this.$noti(this.$q, this.$t('pwd_incorrect'))
      } else {
        this.$noti(this.$q, this.$t('login_failed'))
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
    showTerms() {
      console.log('약관 모달 표시')
    },
  }
}
</script>