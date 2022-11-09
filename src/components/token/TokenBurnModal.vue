<template>
  
  <q-dialog v-model="tokenBurnModal" persistent>

    <q-card style="min-width: 350px">
      <q-card-section>
        <div>
          <div class="text-h6" style="word-break: break-all;">
            <q-avatar v-if="item.logo_image" size="md">
              <img v-if="item.logo_image" :src="item.logo_image">
            </q-avatar>
            <q-icon v-else name="generating_tokens" size="md" />
            &nbsp;{{ item.name }} ({{ item.symbol }})
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <!-- KR -->
        <div v-if="locale === 'ko-KR'" class="row justify-center">
          <div class="col-12" style="word-break: break-word;">
            <!-- Airdrop -->
            <div class="row text-bold">
              참고 사항
            </div>
            <div class="row q-pt-xs q-pl-xs q-pb-sm">
              · 소각 물량을 클레이스타 지갑으로 전송 후 실행해 주세요.
            </div>
            <q-separator />
            <div class="row q-pt-sm q-pl-xs">
              클레이스타 지갑 주소
            </div>
            <div class="row q-pt-xs q-pl-xs q-pb-sm">
              {{ systemWalletAddress }}
            </div>
            <q-separator />
          </div>
        </div>

        <!-- EN -->
        <div v-else class="row justify-center">
          <div class="col-12" style="word-break: break-word;">
            <!-- Airdrop -->
            <div class="row text-bold">
              Notes
            </div>
            <div class="row q-pt-xs q-pl-xs q-pb-sm">
              · Please send the amount to be burned to the Klaystar wallet and execute it.
            </div>
            <q-separator />
            <div class="row q-pt-sm q-pl-xs">
              KLAYSTAR wallet address
            </div>
            <div class="row q-pt-xs q-pl-xs q-pb-sm">
              {{ systemWalletAddress }}
            </div>
            <q-separator />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="amount" ref="refAmount" type="number" thousands-separator="," mask="currency" decimal-point="."
          stack-label
          :label="$t('burn_token_amount')"
          :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 999999999999999999999999999999999999999999999999999999999999999999999)]" clearable standout autofocus tabindex="1" />
      </q-card-section>

      <q-card-actions align="around" class="text-primary">
        <q-btn flat icon="cancel" color="black" :label="$t('cancel')" @click="close" tabindex="3" />
        <q-btn flat icon="local_fire_department" color="black" :label="$t('burn_token')" @click="burn" tabindex="2" />
      </q-card-actions>
    </q-card>

  </q-dialog>

  <q-dialog v-model="confirmBurn">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 300px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_burn') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('burn_token')" color="black" v-close-popup @click="doBurn" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { useI18n } from 'vue-i18n'
// import { openURL } from 'quasar'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js'

export default {
  name: 'TokenBurnModal',
  data () {
    return {
      tokenBurnModal: false,
      systemWalletAddress: '',
      confirmBurn: false,
      item: {
        seq: '',
        name: '',
        symbol: '',
        decimals: '',
        logo_image: '',
      },
      amount: '',
      seq: '', // insert의 selectKey
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
  },
  created: function () {
    // 시스템 지갑 주소
    this.systemWalletAddress = this.$systemWalletAddress
  },
  methods: {
    async show () {
      this.tokenBurnModal = true
    },
    requiredNumber(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    minValue(val, value) {
      const message = this.$t('validation_min_value') + ': ' + value
      return minValue(val, message, value);
    },
    maxValue(val, value) {
      const message = this.$t('validation_max_value') + ': ' + value
      return maxValue(val, message, value);
    },
    validate() {
      let result = true
      if (!this.$refs.refAmount.validate() || String(this.amount).indexOf(',') > -1) {
        this.$noti(this.$q, this.$t('validation_failed_burn_amount'))
        result = false
      }
      if (String(this.amount).indexOf('.') > -1) {
        this.$noti(this.$q, this.$t('validation_failed_amount_decimal_only'))
        result = false
      }
      return result
    },
    burn() {
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

      this.confirmBurn = true
    },
    doBurn() {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        token_seq: this.item.seq,
        amount: this.amount,
      }
      this.$axios.post('/api/tokenburn/insertTokenBurn', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // this.$noti(this.$q, this.$t('burn_token_success'))

            // token_burn.seq 설정
            this.seq = result.data.seq

            // 결제 처리
            this.goPayment(this.item)
          } else {
            this.$noti(this.$q, this.$t('burn_token_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 결제
    async goPayment(item) {
      // 1. 해당 건이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.post('/api/tokenburn/checkTokenBurnStatusCdPaid', params)
      if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
        this.$router.push({ path: '/token/burn', query: { key: this.seq }}) // 실행 화면으로 이동
      } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + ' ' + this.$t('contract_verify')
        const goodName = item.name + ' ' + this.$t('burn_token')
        const payCode = this.$PAY_CODE_BURN_TOKEN // 결제코드: BURN_TOKEN(토큰 소각)

        this.$store.dispatch('setPaymentGoodsName', goodName)
        this.$store.dispatch('setPaymentPayCode', payCode)

        // 상점 파라미터(customData) 설정
        // [0]: payCode | [1]: paySuccessUrl | [2]: payFailUrl | [3]: key
        const paySuccessUrl = '/token/burn'
        let payFailUrl = '/payment' // 디바이스가 데스크탑인 경우
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          payFailUrl = '/paymentMobile' // 디바이스가 모바일인 경우
        }
        const key = this.seq // insert로 받아온 seq를 설정 ※ item의 seq는 토큰 seq이고, this.seq는 token_burn 또는 token_mint 테이블에 insert 된 seq 임.
        const customData = payCode + '|' + paySuccessUrl + '|' + payFailUrl + '|' + key
        this.$store.dispatch('setPaymentCustomData', customData) // 상점 파라미터(customData) 설정

        // 결제 정보 설정
        this.$cookie.set('GOOD_NAME', goodName)
        this.$cookie.set('PAY_CODE', payCode)
        this.$cookie.set('CUSTOM_DATA', customData)
        localStorage.setItem('GOOD_NAME', goodName)
        localStorage.setItem('PAY_CODE', payCode)
        localStorage.setItem('CUSTOM_DATA', customData)

        // 결제 화면으로 이동
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          // 디바이스가 모바일인 경우
          this.$router.push('/paymentMobile')
        } else {
          // 디바이스가 데스크탑인 경우
          this.$router.push('/payment')
        }
      }
    },
    close () {
      this.tokenBurnModal = false
    }
  }
}
</script>
