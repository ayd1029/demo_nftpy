<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_deposit_airdrop') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12" style="word-break: break-word;">
        {{ $t('menu_deposit_airdrop_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- KR -->
    <div v-if="locale === 'ko-KR'" class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- Airdrop -->
        <div class="row text-bold">
          참고 사항
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-md">
          · 에어드랍 토큰을 에어드랍 계약 주소로 전송해주세요.
        </div>
        <q-separator />
        <div class="row q-pt-md q-pl-xs">
          에어드랍 계약 주소
        </div>
        <div class="row q-pt-sm q-pl-xs q-pb-sm">
          {{ airdropContractAddress }}
        </div>
      </div>
    </div>

    <!-- EN -->
    <div v-else class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- Airdrop -->
        <div class="row text-bold">
          Notes
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-md">
          · Please send the Airdrop token to Airdrop Contract Address.
        </div>
        <q-separator />
        <div class="row q-pt-md q-pl-xs">
          Airdrop Contract Address
        </div>
        <div class="row q-pt-sm q-pl-xs q-pb-sm">
          {{ airdropContractAddress }}
        </div>
      </div>
    </div>

    <q-separator spaced />

    <!-- 에어드랍 토큰 충전 갯수 -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('airdrop_deposit_amount') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp;(e.g. 1000000)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="depositAmount" ref="depositAmount" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 999999999999999999999999999999999999999999999999999999999999999999999)]" clearable standout tabindex="2" />
      </div>
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="9">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="deposit" tabindex="8">
          <b>{{ $t('deposit') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />

</template>

<script>
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue';
import { ref } from 'vue'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'

export default defineComponent({
  name: 'AirdropDeposit',
  data () {
    return {
      // systemWalletAddress: '',
      airdropContractAddress: '',
      airdropSeq: '',
      depositAmount: '',
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {
    // 키 설정
    this.airdropSeq = this.$route.query.seq

    // 시스템 지갑 주소
    // this.systemWalletAddress = this.$systemWalletAddress
    this.selectAirdrop()
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    async selectAirdrop() {
      const param = {
        uid: this.getUid,
        seq: this.airdropSeq,
      }
      // airdrop
      const result = await this.$axios.get('/api/airdrop/selectAirdrop', { params: { ...param } })
      if (result.data) {
        // 항목 설정
        this.airdropContractAddress = result.data.contract_address
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
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
      if (!this.$refs.depositAmount.validate() || String(this.depositAmount).indexOf('.') > -1 || String(this.depositAmount).indexOf(',') > -1) {
        this.$noti(this.$q, this.$t('validation_failed_deposit_amount'))
        result = false
      }
      return result
    },
    // 에어드랍 토큰 충전
    deposit() {
      // Field validation check
      if(!this.validate()) {
        // this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // 에어드랍 토큰 충전
      const param = {
        uid: this.getUid,
        seq: this.airdropSeq,
        deposit_amount: this.depositAmount,
      }
      this.$axios.post('/api/airdrop/deposit', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('deposit_airdrop_success'))

            // 2. 페이지 이동 - 에어드랍 생성 리스트 화면
            this.$router.push('/airdrop')
          } else {
            this.$noti(this.$q, this.$t('deposit_airdrop_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    goBack() {
      // this.$router.go(-1)
      this.$router.push('/airdrop')
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
  }
})
</script>

<style scoped>
</style>
