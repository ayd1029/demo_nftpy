<template>
  
  <q-dialog v-model="withdrawModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white">
      <q-header elevated>

        <q-toolbar class="bg-white">
          <!-- <q-avatar>
            <img v-if="presaleVo.token_logo_image" :src="presaleVo.token_logo_image">
            <q-icon v-else name="generating_tokens" size="md" />
          </q-avatar> -->
          <q-toolbar-title class="text-black">
            <strong>{{ presaleVo.token_name }} {{ presaleVo.token_symbol }}</strong>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" tabindex="101" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-sm" style="word-break: break-all;">

          <!-- TABLE - base info -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">Presale Information</span>
              <!-- <q-separator /> -->
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12 text-center">
              <table cellpadding="0" sellspacing="0" width="100%">
                <tr class="text-bold">
                  <td width="60"></td>
                  <td>Presale Token</td>
                </tr>
                <tr>
                  <td>Presale<br />SEQ</td>
                  <td>{{ presaleVo.seq }}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{{ presaleVo.token_name }}</td>
                </tr>
                <tr>
                  <td>Symbol</td>
                  <td>{{ presaleVo.token_symbol }}</td>
                </tr>
                <tr>
                  <td>Logo</td>
                  <td><img :src="presaleVo.token_logo_image" width="30" /></td>
                </tr>
                <tr>
                  <td>Contract<br />Address</td>
                  <td>{{ presaleVo.token_contract_address }}</td>
                </tr>
                <tr>
                  <td>Sale<br />Type</td>
                  <td>{{ presaleVo.type }}</td>
                </tr>
                <tr class="">
                  <td>Sale<br />Amount</td>
                  <td>{{ Number(presaleVo.amount).toLocaleString() }}</td>
                </tr>
                <tr>
                  <td>Presale<br />Period</td>
                  <td>{{ presaleVo.start_time }} ~ {{ presaleVo.end_time }}</td>
                </tr>
                <tr>
                  <td>Claim<br />time</td>
                  <td>{{ presaleVo.claim_time }}</td>
                </tr>
              </table>
            </div>
          </div>


          <!-- TABLE - remit info -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">Remit Information</span>
              <!-- <q-separator /> -->
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12 text-center">
              <table cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td width="60">KLAY</td>
                  <td>{{ presaleVo.klay_remit }}</td>
                </tr>
                <tr>
                  <td>KSTAR</td>
                  <td>{{ presaleVo.kstar_remit }}</td>
                </tr>
                <tr>
                  <td>USDT</td>
                  <td>{{ presaleVo.usdt_remit }}</td>
                </tr>
                <tr>
                  <td>USDC</td>
                  <td>{{ presaleVo.usdc_remit }}</td>
                </tr>
                <tr>
                  <td>TOTAL</td>
                  <td>{{ presaleVo.usd_remit }} USD</td>
                </tr>
                <tr class="text-red">
                  <td>Wallet<br />Address</td>
                  <td>
                    {{ presaleVo.admin_wallet_address }}
                    <br />
                    <a @click="openUrl('https://scope.klaytn.com/account/' + presaleVo.admin_wallet_address)" style="cursor: pointer;">VIEW</a>
                  </td>
                </tr>
                <tr class="text-red">
                  <td>Withdraw<br />TXID</td>
                  <td>
                    {{ presaleVo.txid_withdraw }}
                    <br />
                    <a @click="openUrl('https://scope.klaytn.com/tx/' + presaleVo.txid_withdraw)" style="cursor: pointer;">VIEW</a>
                  </td>
                </tr>
                <tr class="text-red">
                  <td>withdraw<br />time</td>
                  <td>{{ qDate.formatDate(presaleVo.withdraw_time, 'YYYY-MM-DD HH:mm:ss') }}</td>
                </tr>
              </table>
            </div>
          </div>
          
          <!-- remit completed button -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12 text-center">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="close" tabindex="8">
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
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { useI18n } from 'vue-i18n'
import { date } from 'quasar'
// import { openURL } from 'quasar'

export default {
  name: 'PresaleWithdrawModal',
  data () {
    return {
      withdrawModal: false,
      maximized: false,
      presaleVo: {
        seq: '',
        status_cd: '',
        token_contract_address: '',
        token_name: '',
        token_symbol: '',
        token_decimals: '',
        token_logo_image: '',
        official_website: '',
        official_email: '',
        whitepaper: '',
        whitelist_seq: '',
        title: '',
        title_ko: '',
        team_name: '',
        team_name_ko: '',
        pre_value: '',
        pre_value_krw: '',
        main_image: '',
        contents: '',
        contents_ko: '',
        start_time: '',
        end_time: '',
        claim_time: '',
        type: '',
        price: '',
        listing_price: '',
        amount: '',
        softcap: '',
        hardcap: '',
        user_softcap: '',
        user_hardcap: '',
        admin_wallet_address: '',
        txid_presale_token: '',
        amount_sold: '',
        amount_remain: '',
        klay_total: '',
        kstar_total: '',
        usdt_total: '',
        usdc_total: '',
        usd_total: '',
        klay_fee: '',
        kstar_fee: '',
        usdt_fee: '',
        usdc_fee: '',
        usd_fee: '',
        klay_remit: '',
        kstar_remit: '',
        usdt_remit: '',
        usdc_remit: '',
        usd_remit: '',
        close_off_time: '',
        txid_withdraw: '',
        withdraw_time: '',
        order_id: '',
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
      this.selectPresale()
    },
    // 에어드랍 정보 조회
    selectPresale() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      // 토큰 조회
      this.$axios.get('/api/presale/selectPresale', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (result.data) {
            // console.log(result.data)

            // 데이터 설정
            this.presaleVo = result.data
            // console.log(this.presaleVo.total_amount)
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
