<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_payment') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_payment_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('buyer_name') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="paymentVo.buyername" ref="refBuyerName" :rules="[required, val => minLength(val, 2), val => maxLength(val, 30)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('buyer_tel') }}</span>
        <span class="text-grey">&nbsp;&nbsp;e.g. 01012345678</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="paymentVo.buyertel" ref="refBuyerTel" type="number" :rules="[required, val => minLength(val, 9), val => maxLength(val, 15)]" clearable standout tabindex="2" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('buyer_email') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="paymentVo.buyeremail" ref="refBuyerEmail" standout readonly />
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        &nbsp;
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="doPayment" tabindex="3">
          <b>{{ $t('do_payment') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

    <!-- PC용 결제폼 -->
    <form id="SendPayForm_id">
      <input type="hidden" name="version" v-model="paymentVo.version">
      <input type="hidden" name="mid" v-model="paymentVo.mid">
      <input type="hidden" name="goodname" v-model="paymentVo.goodname">
      <input type="hidden" name="oid" v-model="paymentVo.oid">
      <input type="hidden" name="price" v-model="paymentVo.price">
      <input type="hidden" name="currency" v-model="paymentVo.currency">
      <input type="hidden" name="buyername" v-model="paymentVo.buyername">
      <input type="hidden" name="buyertel" v-model="paymentVo.buyertel">
      <input type="hidden" name="buyeremail" v-model="paymentVo.buyeremail">
      <input type="hidden" name="timestamp" v-model="paymentVo.timestamp">
      <input type="hidden" name="signature" v-model="paymentVo.signature">
      <input type="hidden" name="returnUrl" v-model="paymentVo.returnUrl">
      <input type="hidden" name="mKey" v-model="paymentVo.mKey">
      <input type="hidden" name="gopaymethod" v-model="paymentVo.gopaymethod" >
      <input type="hidden" name="offerPeriod" value="" >
      <input type="hidden" name="acceptmethod" value="below1000" >
      <input type="hidden" name="languageView" value="" >
      <input type="hidden" name="charset" value="" >
      <input type="hidden" name="payViewType" value="" >
      <input type="hidden" name="closeUrl" v-model="paymentVo.closeUrl" >
      <input type="hidden" name="popupUrl" value="" >
      <input type="hidden" name="quotabase" v-model="paymentVo.cardQuotaBase" >
      <input type="hidden" name="ini_onlycardcode" value="" >
      <input type="hidden" name="ini_cardcode" value="" >
      <input type="hidden" name="ansim_quota" value="" >
      <input type="hidden" name="vbankRegNo" value="" >
      <input type="hidden" name="merchantData" v-model="customData"><!-- 상점 자유 데이터 -->
      <input type="hidden" name="logo_url" value="">
      <input type="hidden" name="logo_2nd" value="https://nftpy.io/logo/pay_logo_64x13.png"><!-- 서브로고 삽입 [size: 64*13] -->
    </form>

  </q-page>
  <!-- <LoginModal ref="refLoginModal" @callback-login="callbackLogin" /> -->
</template>

<script>
import { defineComponent } from 'vue';
import { required, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'Payment',
  data () {
    return {
      device: 'P', // 디바이스 - P: 데스크탑, M: 모바일웹, android: 안드로이드 앱, ios: 아이폰 앱
      customData: '', // 가맹점 파라미터 - 되돌아오기에 사용할 파라미터 (2000byte)
      paymentVo: {
        payCode: '', // 결제 코드
        goodname: '',
        buyername: '',
        buyertel: '',
        buyeremail: '',
        price: '',
        mid: '',
        gopaymethod: 'Card', // PC: Card, Mobile: CARD
        mKey: '',
        signature: '',
        oid: '',
        timestamp: '',
        version: '',
        currency: '',
        acceptmethod: '',
        returnUrl: '',
        closeUrl: '',
        cardQuotaBase: '2:3:4:5:6:11:12', // 할부개월수 노출옵션 [할부개월:할부개월]
        mobileNextUrl: '',
        mobileReturnUrl: '',
        androidNextUrl: '',
        androidReturnUrl: '',
        iosNextUrl: '',
        iosReturnUrl: '',
        notiUrl: '',
      },
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    // getUserName () {
    //   return this.$store.getters.getUserName
    // },
    // getUserMobileNo () {
    //   return this.$store.getters.getUserMobileNo
    // },
    getPaymentGoodName () {
      return this.$store.getters.getPaymentGoodName
    },
    getPaymentPayCode () {
      return this.$store.getters.getPaymentPayCode
    },
  },
  created: function () {
    this.paymentVo.uid = this.getUid
    // this.paymentVo.buyername = this.getUserName
    // this.paymentVo.buyertel = this.getUserMobileNo
    this.paymentVo.buyeremail = this.getUid
    this.paymentVo.goodname = this.getPaymentGoodName
    this.paymentVo.payCode = this.getPaymentPayCode
    this.customData = this.getPaymentCustomData

    // 설정된 결제정보 맵핑
    // customData
    if (!this.customData) {
      this.customData = localStorage.getItem('CUSTOM_DATA')
      if (!this.customData) {
        this.customData = this.$cookie.get('CUSTOM_DATA')
      }
    }
    // payCode
    if (!this.paymentVo.payCode) {
      this.paymentVo.payCode = localStorage.getItem('PAY_CODE')
      if (!this.paymentVo.payCode) {
        this.paymentVo.payCode = this.$cookie.get('PAY_CODE')
      }
    }
    // goodname
    if (!this.paymentVo.goodname) {
      this.paymentVo.goodname = localStorage.getItem('GOOD_NAME')
      if (!this.paymentVo.goodname) {
        this.paymentVo.goodname = this.$cookie.get('GOOD_NAME')
      }
    }
    // buyername
    if (!this.paymentVo.buyername) {
      this.paymentVo.buyername = localStorage.getItem('BUYER_NAME')
      if (!this.paymentVo.buyername) {
        this.paymentVo.buyername = this.$cookie.get('BUYER_NAME')
      }
    }
    // buyertel
    if (!this.paymentVo.buyertel) {
      this.paymentVo.buyertel = localStorage.getItem('BUYER_TEL')
      if (!this.paymentVo.buyertel) {
        this.paymentVo.buyertel = this.$cookie.get('BUYER_TEL')
      }
    }

    // 결제에 필요한 정보를 API 서버에 요청
    this.setPayBaseInfo()
  },
  mounted: function () {
  },
  methods: {
    required(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    minLength(val, length) {
      const message = this.$t('validation_min_length') + ': ' + length
      return minLength(val, message, length);
    },
    maxLength(val, length) {
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length);
    },
    // 결제에 필요한 정보를 API 서버에 요청
    async setPayBaseInfo() {
      const param = {
        ...this.paymentVo
      }
      const result = await this.$axios.post('/api/payment/selectPayBaseInfo', param)
      // const result = await this.$axios.get('/api/payment/selectPayBaseInfo', {params: {uid: this.getUid}})
      // console.log(result.data)
      if (result.data && result.data.resultCd === 'SUCCESS') {
        this.paymentVo.price = result.data.price
        this.paymentVo.mid = result.data.mid
        this.paymentVo.mKey = result.data.mkeyNew // mKey가 front에서 mkey로 소문자로 오는 현상 때문에 mKeyNew 항목 추가 (lombok 버그)
        this.paymentVo.oid = result.data.oid
        this.paymentVo.timestamp = result.data.timestamp
        this.paymentVo.signature = result.data.signature
        this.paymentVo.version = result.data.version
        this.paymentVo.currency = result.data.currency
        this.paymentVo.acceptmethod = result.data.acceptmethod
        this.paymentVo.returnUrl = result.data.returnUrl
        this.paymentVo.closeUrl = result.data.closeUrl
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    doPayment() {
      // Field validation check
      if(!this.validate()) {
        this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 결제 로그 등록
      this.insertPayLog()

      // 결제 정보 설정
      this.$cookie.set('BUYER_NAME', this.paymentVo.buyername)
      this.$cookie.set('BUYER_TEL', this.paymentVo.buyertel)
      localStorage.setItem('BUYER_NAME', this.paymentVo.buyername)
      localStorage.setItem('BUYER_TEL', this.paymentVo.buyertel)

      // 결제 요청
      this.$INIStdPay.pay('SendPayForm_id')
    },
    // 결제 로그 등록
    insertPayLog() {
      const payLogVo = {
        pc1_version: this.paymentVo.version,
        pc1_gopaymethod: this.paymentVo.gopaymethod,
        pc1_mid: this.paymentVo.mid,
        pc1_oid: this.paymentVo.oid,
        pc1_price: this.paymentVo.price,
        pc1_timestamp: this.paymentVo.timestamp,
        pc1_signature: this.paymentVo.signature,
        pc1_mkey: this.paymentVo.mKey,
        pc1_currency: this.paymentVo.currency,
        pc1_goodname: this.paymentVo.goodname,
        pc1_buyername: this.paymentVo.buyername,
        pc1_buyertel: this.paymentVo.buyertel,
        pc1_buyeremail: this.paymentVo.buyeremail,
        pc1_returnurl: this.paymentVo.returnUrl,
        pc1_closeurl: this.paymentVo.closeUrl,
        pc1_quotabase: this.paymentVo.quotabase,
        pc1_nointerest: this.paymentVo.nointerest,
        pc1_tax: this.paymentVo.tax,
        pc1_taxfree: this.paymentVo.taxfree,
        pc1_charset: this.paymentVo.charset,
        pc1_offerperiod: this.paymentVo.offerPeriod,
        pc1_payviewtype: this.paymentVo.payViewType,
        pc1_languageview: this.paymentVo.languageView,
        pc1_logo_url: this.paymentVo.logo_url,
        pc1_logo_2nd: this.paymentVo.logo_2nd,
        pc1_popupurl: this.paymentVo.popupUrl,
        pc1_parentemail: this.paymentVo.parentemail,
        pc1_ini_ssgpay_mdn: this.paymentVo.ini_ssgpay_mdn,
        pc1_merchantdata: this.paymentVo.merchantData,
        pc1_acceptmethod: this.paymentVo.acceptmethod,
        mo1_p_ini_payment: this.paymentVo.P_INI_PAYMENT,
        mo1_p_mid: this.paymentVo.P_MID,
        mo1_p_oid: this.paymentVo.P_OID,
        mo1_p_amt: this.paymentVo.P_AMT,
        mo1_p_goods: this.paymentVo.P_GOODS,
        mo1_p_uname: this.paymentVo.P_UNAME,
        mo1_p_next_url: this.paymentVo.P_NEXT_URL,
        mo1_p_noti_url: this.paymentVo.P_NOTI_URL,
        mo1_p_hpp_method: this.paymentVo.P_HPP_METHOD,
        mo1_p_mobile: this.paymentVo.P_MOBILE,
        mo1_p_email: this.paymentVo.P_EMAIL,
        mo1_p_mname: this.paymentVo.P_MNAME,
        mo1_p_charset: this.paymentVo.P_CHARSET,
        mo1_p_offer_period: this.paymentVo.P_OFFER_PERIOD,
        mo1_p_quotabase: this.paymentVo.P_QUOTABASE,
        mo1_p_tax: this.paymentVo.P_TAX,
        mo1_p_taxfree: this.paymentVo.P_TAXFREE,
        mo1_p_card_option: this.paymentVo.P_CARD_OPTION,
        mo1_p_only_cardcode: this.paymentVo.P_ONLY_CARDCODE,
        mo1_p_vbank_dt: this.paymentVo.P_VBANK_DT,
        mo1_p_vbank_tm: this.paymentVo.P_VBANK_TM,
        mo1_p_noti: this.paymentVo.P_NOTI,
        mo1_p_reserved: this.paymentVo.P_RESERVED,
        reg_id: this.getUid,
      }
      this.$axios.post('/api/payment/insertPayLogAuthReq', payLogVo)
    },
    validate() {
      let result = true
      if (!this.$refs.refBuyerName.validate()) {
        result = false
      }
      if (!this.$refs.refBuyerTel.validate()) {
        result = false
      }
      return result
    },
    goBack() {
      this.$router.go(-1)
    },
  }
})
</script>

<style scoped>
</style>
