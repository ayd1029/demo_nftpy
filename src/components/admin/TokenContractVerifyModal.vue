<template>
  
  <q-dialog v-model="tokenContractVerifyModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white">
      <q-header elevated>

        <q-toolbar class="bg-white">
          <q-avatar>
            <img v-if="tokenContractVerifyVo.token_logo_image" :src="tokenContractVerifyVo.token_logo_image">
            <q-icon v-else name="generating_tokens" size="md" />
          </q-avatar>
          <q-toolbar-title class="text-black">
            <strong>{{ tokenContractVerifyVo.token_name }}</strong> {{ tokenContractVerifyVo.symbol }}
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" tabindex="101" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding style="word-break: break-all;">
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              SEQ: {{ tokenContractVerifyVo.seq }} | TOKEN_SEQ: {{ tokenContractVerifyVo.token_seq }}
            </div>
          </div>

          <!-- reg_time -->
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.reg_time }} - REG_TIME
            </div>
            <div class="col-12">
              {{ tokenContractVerifyVo.mod_time }} - MOD_TIME
            </div>
          </div>

          <!-- Open scope.klaytn.com -->
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="openUrl(scopeDomainKlaytn + tokenContractVerifyVo.contract_address)" no-caps style="width: 100%" tabindex="1">
                <b>Open scope.klaytn.com</b>
              </q-btn>
            </div>
          </div>

          <!-- Open Submission URL -->
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="openUrl(getSubmissionUrl)" no-caps style="width: 100%" tabindex="1">
                <b>Open Submission URL</b>
              </q-btn>
            </div>
          </div>

          <!-- STATUS -->
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-select
                filled
                v-model="tokenContractVerifyVo.status_cd"
                label="Change Status"
                :options="statusOptions"
                style="width: 100%"
                color="black"
                behavior="menu"
                standout
                tabindex="2"
                @update:model-value="updateAdminTokenContractVerifyStatusCd"
              />
            </div>
          </div>

          <!-- STATUS COMMENT -->
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="tokenContractVerifyVo.status_comment" ref="tokenName" stack-label label="Status Comment" clearable standout tabindex="2" />
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="updateAdminTokenContractVerifyStatusComment" style="width: 100%" no-caps tabindex="3">
                <b>Update Status Comment</b>
              </q-btn>
            </div>
          </div>

          <q-separator class="" style="height: 10px;" />
          
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">email<span class="text-red"> *</span></span>
              &nbsp;&nbsp;<q-btn @click="copyValue(email)" size="md" color="black" style="height: 24px;" outline dense tabindex="4">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ email }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">1. Contract Creator Signature<span class="text-red"> *</span></span>
              &nbsp;&nbsp;<q-btn @click="copyValue(getTodayYYYYMMDD() + tokenContractVerifyVo.contract_address)" size="md" color="black" style="height: 24px;" outline dense tabindex="5">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ getTodayYYYYMMDD() }}{{ tokenContractVerifyVo.contract_address }}
              <br />
              <div class="col-12 text-grey">
                <br />① Connect to 'My Ether Wallet' site
                <!-- <br /><a @click="openUrl('https://www.myetherwallet.com')">https://www.myetherwallet.com</a> -->
                <br /><q-btn @click="openUrl('https://www.myetherwallet.com')" size="sm" color="grey-8" style="height: 24px;" outline dense tabindex="6">https://www.myetherwallet.com</q-btn>
                <br />
                <br />② Log-in using Contract Creator account's private key
                <br />
                <br />② [Message] - [Sign Message] - Sign Message
                <br />Enter Value
              </div>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">2. Contract Address<span class="text-red"> *</span></span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.contract_address)" size="md" color="black" style="height: 24px;" outline dense tabindex="7">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.contract_address }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">3. Compiler version<span class="text-red"> *</span></span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.compiler_version)" size="md" color="black" style="height: 24px;" outline dense tabindex="8">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.compiler_version }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">4. Open Source License Type<span class="text-red"> *</span></span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.open_source_license_type)" size="md" color="black" style="height: 24px;" outline dense tabindex="9">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.open_source_license_type }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">5. Optimization<span class="text-red"> *</span></span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.optimization)" size="md" color="black" style="height: 24px;" outline dense tabindex="10">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.optimization }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">6. Optimization Runs</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.optimization_runs)" size="md" color="black" style="height: 24px;" outline dense tabindex="11">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.optimization_runs }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">-Source Code(Solidity File)<span class="text-red"> *</span></span>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl('https://nftpy.io/files/contract_klaytn_new.sol')" style="cursor: pointer;" tabindex="12">Download</a>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">- Raw ABI Code(truncated)<span class="text-red"> *</span></span>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl('https://nftpy.io/files/abi_code_new.json.file')" style="cursor: pointer;" tabindex="13">Download</a>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">7. EVM version</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.evm_version)" size="md" color="black" style="height: 24px;" outline dense tabindex="15">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.evm_version }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">8. Token Name</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.token_name)" size="md" color="black" style="height: 24px;" outline dense tabindex="16">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.token_name }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">9. Symbol</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.symbol)" size="md" color="black" style="height: 24px;" outline dense tabindex="17">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.symbol }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">10. Decimal</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.decimals)" size="md" color="black" style="height: 24px;" outline dense tabindex="18">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.decimals }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">11. Official Website</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.official_website)" size="md" color="black" style="height: 24px;" outline dense tabindex="19">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.official_website }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">12. Official E-mail</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.official_email)" size="md" color="black" style="height: 24px;" outline dense tabindex="20">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.official_email }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">- Token logo image</span>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenContractVerifyVo.token_logo_image)" style="cursor: pointer;" tabindex="21">Download</a>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">13. Comment</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(tokenContractVerifyVo.comment)" size="md" color="black" style="height: 24px;" outline dense tabindex="22">COPY</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              {{ tokenContractVerifyVo.comment }}
            </div>
          </div>

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br />

        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { useI18n } from 'vue-i18n'
import { date } from 'quasar'
// import { openURL } from 'quasar'

export default {
  name: 'TokenContractVerifyModal',
  data () {
    return {
      tokenContractVerifyModal: false,
      maximized: false,
      scopeSubmissionUrl: '',
      email: 'nftpy.contact@gmail.com',
      abiCode: '',
      scopeDomainKlaytn: this.$scopeDomainKlaytn + 'token/', // https://scope.klaytn.com/
      tokenContractVerifyVo: {
        seq: '',
        token_seq: '',
        status_cd: '',
        status_comment: '', // 사용자에게 표시할 계약검증 상태 메시지
        status_name: '',
        contract_creator_signature: '',
        contract_address: '',
        compiler_version: '',
        open_source_license_type: '',
        optimization: '',
        optimization_runs: '',
        source_code: '',
        abi_code: '',
        evm_version: '',
        token_name: '',
        symbol: '',
        decimals: '',
        official_website: '',
        official_email: '',
        token_logo_image: '',
        comment: '',
        reg_time: '',
        mod_time: '',
      },
      statusOptions: [
        { value: '30', label: '30 PAID : 결제완료' },
        { value: '32', label: '32 USER_REQUESTED : 사용자 요청완료' },
        { value: '34', label: '34 ACCEPTED : 접수완료' },
        { value: '36', label: '36 SUBMITTED : 제출완료' },
        { value: '40', label: '40 SUCCESS : 계약검증 성공' },
        { value: '90', label: '90 REJECTED : 사용자 요청 반려' },
        { value: '99', label: '99 FAILED : 계약검증 실패' },
      ],
    }
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getSubmissionUrl () {
      return this.$scopeSubmissionUrl
    },
    qDate() {
      return date
    },
  },
  methods: {
    async show () {
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
        // 디바이스가 모바일인 경우
        this.maximized = true
      } else {
        // 디바이스가 데스크탑인 경우
        this.maximized = false
      }
      this.tokenContractVerifyModal = true

      // 토큰 정보 조회
      this.selectTokenContractVerify()
    },
    // 토큰 조회
    selectTokenContractVerify() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }

      // 토큰 조회
      this.$axios.get('/api/admin/selectAdminTokenContractVerify', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (result.data) {
            // console.log(result.data)

            // 데이터 설정
            this.tokenContractVerifyVo = result.data
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateAdminTokenContractVerifyStatusCd() {
      // 계약 검증 상태 수정 처리
      const param = {
        uid: this.getUid,
        seq: this.tokenContractVerifyVo.seq,
        token_seq: this.tokenContractVerifyVo.token_seq,
        status_cd: this.tokenContractVerifyVo.status_cd.value,
      }
      this.$axios.post('/api/admin/updateAdminTokenContractVerifyStatusCd', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    openUrl(url) {
      window.open(url)
    },
    copyValue(value) {
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      // 클립보드로 복사하기
      this.$copyText(String(value)).then(this.copyValueSuccess, this.copyValueFail)
    },
    copyValueSuccess(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_success'))
    },
    copyValueFail(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_failed'))
    },
    getTodayYYYYMMDD() {
      // const today = new Date();
      // const year = today.getFullYear();
      // const month = ('0' + (today.getMonth() + 1)).slice(-2);
      // const day = ('0' + today.getDate()).slice(-2);
      // return year + month + day;

      // 등록일 기준
      // return this.qDate.formatDate(this.tokenContractVerifyVo.reg_time, 'YYYYMMDD')

      // 제출일 기준
      const timeStamp = Date.now()
      return this.qDate.formatDate(timeStamp, 'YYYYMMDD')
    },
    // 사용자에게 표시할 계약검증 상태 메시지
    updateAdminTokenContractVerifyStatusComment() {
      const param = {
        uid: this.getUid,
        seq: this.tokenContractVerifyVo.seq,
        // token_seq: this.tokenContractVerifyVo.token_seq,
        status_comment: this.tokenContractVerifyVo.status_comment,
      }
      this.$axios.post('/api/admin/updateAdminTokenContractVerifyStatusComment', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    close () {
      this.tokenContractVerifyModal = false
    }
  }
}
</script>
