<template>
  
  <q-dialog v-model="withdrawModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white">
      <q-header elevated>

        <q-toolbar class="bg-white">
          <!-- <q-avatar>
            <img v-if="mintingVo.token_logo_image" :src="mintingVo.token_logo_image">
            <q-icon v-else name="generating_tokens" size="md" />
          </q-avatar> -->
          <q-toolbar-title class="text-black">
            <strong>
              <div v-if="locale === 'ko-KR'" class="col-12 text-weight-bold">{{ mintingVo.title_ko }}</div>
              <div v-else class="col-12 text-weight-bold">{{ mintingVo.title }}</div>  
            </strong>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" tabindex="101" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-sm" style="word-break: break-all;">

          <!-- TABLE - base info -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">Minting Information</span>
              <!-- <q-separator /> -->
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12 text-center">
              <table cellpadding="0" sellspacing="0" width="100%">
                <tr class="text-bold">
                  <td width="60"></td>
                  <td>Minting Token</td>
                </tr>
                <tr>
                  <td>Minting<br />SEQ</td>
                  <td>{{ mintingVo.seq }}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{{ mintingVo.name }}</td>
                </tr>
                <tr>
                  <td>Symbol</td>
                  <td>{{ mintingVo.symbol }}</td>
                </tr>
                <tr>
                  <td>Contract<br />Address</td>
                  <td>{{ mintingVo.contract_address }}</td>
                </tr>
                <tr class="">
                  <td>Sale<br />Amount</td>
                  <td>{{ Number(mintingVo.max_sale_amount).toLocaleString() }}</td>
                </tr>
                <tr>
                  <td>Minting<br />Period</td>
                  <td>{{ mintingVo.start_time }} ~ {{ mintingVo.end_time }}</td>
                </tr>
              </table>
            </div>
          </div>


          <!-- TABLE - remit info -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">Withdraw Information</span>
              <!-- <q-separator /> -->
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12 text-center">
              <table cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td width="60">Token</td>
                  <td>{{ mintingVo.pay_token_symbol }}</td>
                </tr>
                <tr>
                  <td width="60">Total</td>
                  <td>{{ Number(mintingVo.fund_total).toFixed(6) }}</td>
                </tr>
                <tr class="text-red">
                  <td width="60">Remit</td>
                  <td>{{ Number(mintingVo.fund_remit).toFixed(6) }}</td>
                </tr>
                <tr>
                  <td width="60">Fee</td>
                  <td>{{ Number(mintingVo.fund_fee).toFixed(6) }}</td>
                </tr>
                <tr>
                  <td>Wallet<br />Address</td>
                  <td>
                    {{ mintingVo.admin_wallet_address }}
                    <br />
                    <a @click="openUrl('https://scope.klaytn.com/account/' + mintingVo.admin_wallet_address)" style="cursor: pointer;">VIEW</a>
                  </td>
                </tr>
                <tr>
                  <td>Withdraw<br />TXID</td>
                  <td>
                    {{ mintingVo.txid_withdraw }}
                    <br />
                    <a @click="openUrl('https://scope.klaytn.com/tx/' + mintingVo.txid_withdraw)" style="cursor: pointer;">VIEW</a>
                  </td>
                </tr>
                <tr class="text-red">
                  <td>Withdraw<br />time</td>
                  <td>{{ qDate.formatDate(mintingVo.withdraw_time, 'YYYY-MM-DD HH:mm:ss') }}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- withdraw button -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12 text-center">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="close" tabindex="2">
                <b>{{ $t('close') }}</b>
              </q-btn>
            </div>
          </div>

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>

</template>

<script>
import { useI18n } from 'vue-i18n'
import { date } from 'quasar'
// import { openURL } from 'quasar'

export default {
  name: 'MintingWithdrawModal',
  data () {
    return {
      withdrawModal: false,
      maximized: false,
      mintingVo: {
        seq: '',
        status_cd: '',
        name: '',
        symbol: '',
        title: '',
        title_ko: '',
        contents: '',
        contents_ko: '',
        start_time: '',
        end_time: '',
        project_seq: '',
        whitelist_seq: '',
        main_image: '',
        nft_image: '',
        collection_uri: '',
        use_reveal_yn: '',
        unrevealed_image_uri: '',
        base_uri_unrevealed: '',
        base_uri: '',
        anti_bot_interval: '',
        mint_limit_per_block: '',
        mint_limit_per_sale: '',
        mint_start_block_number: '',
        mint_index_for_sale: '',
        max_sale_amount: '',
        mint_price: '',
        pay_token_name: '',
        pay_token_symbol: '',
        pay_token_decimals: '',
        pay_token_contract_address: '',
        pay_token_logo_image: '',
        setting_ready_yn: '',
        amount_sold: '',
        amount_remain: '',
        fund_total: '',
        fund_fee: '',
        fund_remit: '',
        close_off_time: '',
        admin_wallet_address: '',
        txid_withdraw: '',
        withdraw_time: '',
        txid_reveal: '',
        reveal_time: '',
        order_id: '',
        contract_address: '',
        reg_id: '',
        reg_time: '',
        mod_id: '',
        mod_time: '',
        del_id: '',
        del_time: '',
      },
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
  methods: {
    async show () {
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
        // 디바이스가 모바일인 경우
        this.maximized = true
      } else {
        // 디바이스가 데스크탑인 경우
        this.maximized = false
      }
      this.withdrawModal = true

      // 에어드랍 정보 조회
      this.selectMinting()
    },
    // 에어드랍 정보 조회
    selectMinting() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      // 토큰 조회
      this.$axios.get('/api/minting/selectMinting', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (result.data) {
            // console.log(result.data)

            // 데이터 설정
            this.mintingVo = result.data
            // console.log(this.mintingVo.total_amount)
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
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
    callbackWallet(walletVo) {
      // console.log('callbackLogin!!!')
      // this.$store.dispatch('setWalletAddress', walletVo.wallet_address)
    },
    close () {
      this.withdrawModal = false
    }
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
