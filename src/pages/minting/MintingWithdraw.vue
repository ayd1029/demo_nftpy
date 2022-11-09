<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_minting_withdraw') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_minting_withdraw_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- KR -->
    <div v-if="locale === 'ko-KR'" class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- 유의 사항 -->
        <div class="row text-bold">
          유의 사항
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-sm">
          · 수수료를 제외한 금액이 표시됩니다.
        </div>
      </div>
    </div>

    <!-- EN -->
    <div v-else class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- 유의 사항 -->
        <div class="row text-bold">
          Notes
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-sm">
          · The amount excluding the commission is displayed.
        </div>
      </div>
    </div>

    <!-- <q-separator spaced /> -->

    <!-- KLAY -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ pay_token_symbol }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="fund_remit" input-class="text-right" standout readonly />
      </div>
    </div>

    <!-- withdraw -->
    <div class="row justify-center q-pt-xl">
      <div class="col-12 text-center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="text-h6">
          <tr>
            <td>
              <q-separator spaced />
            </td>
          </tr>
          <tr>
            <td class="text-center">
              <span class="text-weight-bold text-subtitle1">
                {{ $t('minting_withdraw_time') }}
              </span>
            </td>
          </tr>
          <tr>
            <td v-if="withdraw_time" class="text-center">
              <span class="text-weight-bold text-subtitle1">
                {{ qDate.formatDate(withdraw_time, 'YYYY-MM-DD HH:mm:ss') }}
              </span>
            </td>
            <td v-else>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td>
              <q-separator spaced />
            </td>
          </tr>
          <tr>
            <td class="text-center">
              <span class="text-weight-bold text-subtitle1">
                {{ $t('minting_txid_withdraw') }}
              </span>
            </td>
          </tr>
          <tr>
            <td v-if="txid_withdraw" class="text-center text-blue">
              <a @click="openUrl('https://scope.klaytn.com/tx/' + txid_withdraw)" style="cursor: pointer;">
                <span class="text-weight-bold text-subtitle1">
                  {{ txid_withdraw }}
                </span>
              </a>
            </td>
            <td v-else>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td>
              <q-separator spaced />
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-md">
    </div>

    <!-- buttons -->
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="2">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn v-if="!withdraw_time" class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="withdraw" tabindex="1">
          <b>{{ $t('withdraw') }}</b>
        </q-btn>
        <q-btn v-else class="btn" color="grey-5" text-color="black" size="lg" style="width: 98%;" @click="withdraw" disable tabindex="1">
          <b>{{ $t('withdraw') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />

  <!-- confirm delete -->
  <q-dialog v-model="confirmWithdraw">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_request') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('request')" color="black" v-close-popup @click="doWithdraw" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue';
import { date } from 'quasar'
// import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
// import { ref } from 'vue'
// import _ from 'lodash'

export default defineComponent({
  name: 'MintingWithdraw',
  data () {
    return {
      confirmWithdraw: false,
      txid_withdraw: '',
      withdraw_time: '',
      mintingSeq: '',
      pay_token_symbol: '',
      fund_total: '',
      fund_fee: '',
      fund_remit: '',
      // klay_remit: '0',
      // kstar_remit: '0',
      // usdt_remit: '0',
      // usdc_remit: '0',
      // usd_remit: '0',
      // usdToKrw: '',
      // tokenPriceKlay: '0',
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    qDate() {
      return date
    },
  },
  created: function () {
    // 키 설정
    this.mintingSeq = this.$route.query.seq

    // 사전판매 조회
    this.selectMinting()
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // getKlayPrice() {
    //   // 클레이스왑 토큰 가격 정보 조회
    //   const param = {
    //     uid: this.getUid,
    //     tokenContractAddress: '0x0000000000000000000000000000000000000000', // KLAY
    //   }
    //   this.$axios.get('/api/klayswap/getTokenPrice', { params: { ...param }})
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       // console.log(result.data)
    //       if (result.data && result.data.resultCd === 'SUCCESS') {
    //         this.tokenPriceKlay = result.data.price
    //         // console.log('this.tokenPriceKlay: ' + this.tokenPriceKlay)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    
    // selectExchangeRate() {
    //   // 환율 조회
    //   const param = {
    //     uid: this.getUid,
    //   }
    //   this.$axios.get('/api/exchangerate/selectExchangeRate', { params: { ...param }})
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       // console.log(result.data)
    //       if (result.data && result.data.resultCd === 'SUCCESS') {
    //         this.usdToKrw = result.data.deal_bas_r
    //         // console.log('this.usdToKrw: ' + this.usdToKrw)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    async selectMinting() {
      const param = {
        uid: this.getUid,
        seq: this.mintingSeq,
      }
      const result = await this.$axios.get('/api/minting/selectMinting', { params: { ...param } })
      if (result.data) {
        // 항목 설정
        // this.klay_remit = result.data.klay_remit
        // this.kstar_remit = result.data.kstar_remit
        // this.usdt_remit = result.data.usdt_remit
        // this.usdc_remit = result.data.usdc_remit
        // this.usd_remit = result.data.usd_remit
        this.pay_token_symbol = result.data.pay_token_symbol
        this.fund_remit = Number(result.data.fund_remit).toFixed(6)
        this.txid_withdraw = result.data.txid_withdraw
        this.withdraw_time = result.data.withdraw_time
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    withdraw() {
      // 확인창 표시
      this.confirmWithdraw = true
    },
    doWithdraw() {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.mintingSeq,
      }
      this.$axios.post('/api/minting/updateMintingWithdraw', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result && result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('process_success'))
            this.selectMinting()
          } else {
            this.$noti(this.$q, this.$t('process_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    openUrl(url) {
      window.open(url)
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
    goBack() {
      this.$router.go(-1)
    },
  }
})
</script>

<style scoped>
</style>
