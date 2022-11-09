<template>
  <!-- <q-page class="justify justify-center"> -->
    <div style="max-width: 420px;">

      <div class="">
        <!-- 1. KSTAR SWAP -->
        <q-card class="q-ma-sm">
          <div class="q-pa-md">
            <table border="0" cellpadding="0" cellspacing="5" width="100%">
              <!-- ///////////////////////////////////// FROM ///////////////////////////////////////// -->
              <tr class="text-bold text-center">
                <td colspan="1">
                  {{ $t('swap_from') }}&nbsp;&nbsp;
                </td>
                <td colspan="1"></td>
                <td colspan="1" class="text-right"><q-btn flat round dense icon="insert_chart" size="md" color="black" @click="openUrl('https://dexata.kr/?tokenA=' + fromTokenObj.contract_address)" /></td>
              </tr>
              <tr>
                <td width="50" class="flex flex-center">
                  <!-- 1.1 fromTokenLogoImage -->
                  <img :src="fromTokenLogoImage" width="40" />
                  &nbsp;&nbsp;
                </td>
                <td width="110">
                  <!-- 1.2 fromTokenObj -->
                  <q-select
                    v-model="fromTokenObj"
                    :options="fromTokenOptions"
                    dense
                    standout
                    style="width: 100px;"
                    @update:model-value="onChangeFromToken"
                  />
                </td>
                <td>
                  <!-- 1.3 fromTokenAmount -->
                  <q-input
                    v-model="fromTokenAmount"
                    ref="fromTokenAmount"
                    type="number"
                    thousands-separator=","
                    mask="currency"
                    decimal-point="."
                    width="100%"
                    standout
                    dense
                    hide-bottom-space
                    @keyup="onKeyupFromToken"
                    tabindex="1"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td colspan="3"></td>
              </tr>
              <tr class="text-right">
                <!-- 1.4 fromTokenPrice -->
                <td colspan="1"></td>
                <td colspan="1">{{ $t('total_value') }} ≈</td>
                <td colspan="1">{{ fromTokenTotalValue }}&nbsp;$</td>
              </tr>
              <tr class="text-right">
                <!-- 1.5 fromTokenTotalValue -->
                <td colspan="2">1 {{ fromTokenObj.label }} ≈</td>
                <td colspan="1">{{ fromTokenPrice }}&nbsp;$</td>
              </tr>
              <!-- ///////////////////////////////////// TO ///////////////////////////////////////// -->
              <tr>
                <td colspan="3">
                  <q-separator spaced="" />
                </td>
              </tr>
              <tr class="text-bold text-center">
                <td colspan="1">
                  {{ $t('swap_to') }}&nbsp;&nbsp;
                </td>  
                <td colspan="1"></td>
                <td colspan="1" class="text-right"><q-btn flat round dense icon="insert_chart" size="md" color="black" @click="openUrl('https://dexata.kr/?tokenA=' + toTokenObj.contract_address)" /></td>
              </tr>
              <tr>
                <td class="flex flex-center">
                  <!-- 2.1 toTokenLogoImage -->
                  <img :src="toTokenLogoImage" width="40" />
                  &nbsp;&nbsp;
                </td>
                <td>
                  <!-- 2.2 toTokenObj -->
                  <q-select
                    v-model="toTokenObj"
                    :options="toTokenOptions"
                    dense
                    standout
                    style="width: 100px;"
                    @update:model-value="onChangeToToken"
                  />
                </td>
                <td>
                  <!-- 2.3 toTokenAmount -->
                  <q-input
                    v-model="toTokenAmount"
                    ref="toTokenAmount"
                    type="number"
                    thousands-separator=","
                    mask="currency"
                    decimal-point="."
                    width="100%"
                    standout
                    dense
                    @keyup="onKeyupToToken"
                    tabindex="2"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td colspan="3"></td>
              </tr>
              <tr class="text-right">
                <!-- 2.4 toTokenPrice -->
                <td colspan="1"></td>
                <td colspan="1">{{ $t('total_value') }} ≈</td>
                <td colspan="1">{{ toTokenTotalValue }}&nbsp;$</td>
              </tr>
              <tr class="text-right">
                <!-- 2.5 fromTokenPrice -->
                <td colspan="2">1 {{ toTokenObj.label }} ≈</td>
                <td colspan="1">{{ toTokenPrice }}&nbsp;$</td>
              </tr>
              <tr>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td colspan="3">
                  <q-btn :loading="loading" color="secondary" text-color="black" size="lg" style="width: 100%; height: 50px" no-caps @click="swapToKstar" tabindex="3">
                    <b v-if="!loading">{{ $t('swap') }}</b>
                    <span v-if="loading">
                      <q-spinner-oval size="sm" />
                    </span>
                  </q-btn>
                </td>
              </tr>
            </table>
          </div>
        </q-card>
      </div>

    </div>

  <!-- </q-page> -->

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
import _ from 'lodash'

export default defineComponent({
  name: 'SwapToKstar',
  data () {
    return {
      // msgBox: false,
      loading: false, // 토큰 시세 정보 조회시 로딩 표시용
      fromTokenAmount: 1,
      fromTokenPrice: 0,
      fromTokenTotalValue: 0,
      fromTokenLogoImage: '',
      fromTokenObj: {
        label: '',
        contract_address: '',
      },
      fromTokenOptions: [
        {
          contract_address: '0x0000000000000000000000000000000000000000',
          label: 'KLAY',
          // value: '0x0000000000000000000000000000000000000000',
          token_name: 'KLAY',
          token_symbol: 'KLAY',
          token_logo_image: 'https://nftpy.io/uploaded/logo/klay.svg',
          // name: 'KLAY',
        },
        {
          contract_address: '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
          label: 'oUSDT',
          // value: '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
          token_name: 'Orbit Bridge Klaytn USD Tether',
          token_symbol: 'oUSDT',
          token_logo_image: 'https://nftpy.io/uploaded/logo/kusdt.svg',
        },
      ],
      toTokenAmount: 0,
      toTokenPrice: 0,
      toTokenTotalValue: 0,
      toTokenLogoImage: '',
      toTokenObj: {
        label: '',
        contract_address: '',
      },
      toTokenOptions: [
        {
          contract_address: '0x07ffbdba745f3a98ec462385aedcdcd973021671',
          label: 'KSTAR',
          // value: '0x0000000000000000000000000000000000000000',
          token_name: 'KlayStar',
          token_symbol: 'KSTAR',
          token_logo_image: 'https://nftpy.io/logo/logo_nftpy.png',
          // name: 'KLAY',
        },
        {
          contract_address: '0xca923a4074c35c996dbc2003a214c0540146333c',
          label: 'STAR',
          // value: '0x0000000000000000000000000000000000000000',
          token_name: 'Shopping Star',
          token_symbol: 'STAR',
          token_logo_image: 'https://nftpy.io/logo/logo_star.png',
          // name: 'KLAY',
        },
      ],
    }
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  components: {
  },
  created: function () {
    // this.selectMyTargetTokenList()
    this.fromTokenObj = this.fromTokenOptions[1]
    this.fromTokenLogoImage = this.fromTokenObj.token_logo_image
    this.toTokenObj = this.toTokenOptions[0]
    this.toTokenLogoImage = this.toTokenObj.token_logo_image

    this.onKeyupFromToken()
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    async swapToKstar() {
      await this.onKeyupFromToken()

      // 스왑 실행
      
    },
    checkKeyCodeIsNumber(e) {
      if (!e) {
        // from 토큰 셀렉트박스 이벤트일 경우
        return true
      }
      if (!(e.keyCode >= 48 && e.keyCode <= 57) && !(e.keyCode >= 96 && e.keyCode <= 105) && e.keyCode !== 8 && e.keyCode !== 46) {
        return false
      } else {
        return true
      }
    },
    onChangeFromToken(v) {
      // console.log(v)
      this.fromTokenLogoImage = this.fromTokenObj.token_logo_image
      this.onKeyupFromToken()
    },
    onChangeToToken(v) {
      // console.log(v)
      this.toTokenLogoImage = this.toTokenObj.token_logo_image
      this.onKeyupToToken()
    },
    // debounce : 0.7초 기다렸다가 이벤트 함수 실행
    onKeyupFromToken: _.debounce(function(e) {
      if (!this.fromTokenAmount || this.fromTokenAmount <= 0) {
        this.fromTokenAmount = 0
        // this.fromTokenPrice = 0
        this.fromTokenTotalValue = 0
        this.toTokenAmount = 0
        // this.toTokenPrice = 0
        this.toTokenTotalValue = 0
        return
      }
      this.fromTokenAmount = this.fromTokenAmount / 1

      // console.log(e.keyCode)
      // return
      // 48~57(키보드 위), 96~105(우측 숫자판)
      if (!this.checkKeyCodeIsNumber(e)) {
        return
      }
      // console.log(e.keyCode)
      // return

      // from, to 기준만 설정하고 동일한 API 사용함
      const param = {
        uid: this.getUid,
        fromTokenContractAddress: this.fromTokenObj.contract_address,
        fromTokenAmount: this.fromTokenAmount,
        toTokenContractAddress: this.toTokenObj.contract_address,
      }
      // console.log(param)

      // 클레이스왑 토큰 가격 정보 조회
      this.loading = true
      this.$axios.get('/api/klayswap/getTokenPricePair', { params: { ...param }})
        .then((result) => {
          this.loading = false
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.fromTokenPrice = result.data.fromPrice
            this.fromTokenTotalValue = result.data.fromTotalValue
            this.toTokenAmount = result.data.toAmount
            this.toTokenPrice = result.data.toPrice
            this.toTokenTotalValue = result.data.toTotalValue
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    }, 500),
    // debounce : 0.7초 기다렸다가 이벤트 함수 실행
    onKeyupToToken: _.debounce(function(e) {
      if (!this.toTokenAmount || this.toTokenAmount <= 0) {
        this.toTokenAmount = 0
        // this.toTokenPrice = 0
        this.toTokenTotalValue = 0
        this.fromTokenAmount = 0
        // this.fromTokenPrice = 0
        this.fromTokenTotalValue = 0
        return
      }
      this.toTokenAmount = this.toTokenAmount / 1

      // console.log(e.keyCode)
      // return
      // 48~57(키보드 위), 96~105(우측 숫자판)
      if (!this.checkKeyCodeIsNumber(e)) {
        return
      }
      // console.log(e.keyCode)
      // return

      // from, to 기준만 설정하고 동일한 API 사용함
      const param = {
        uid: this.getUid,
        fromTokenContractAddress: this.toTokenObj.contract_address,
        fromTokenAmount: this.toTokenAmount,
        toTokenContractAddress: this.fromTokenObj.contract_address,
      }
      // console.log(param)

      // 클레이스왑 토큰 가격 정보 조회
      this.loading = true
      this.$axios.get('/api/klayswap/getTokenPricePair', { params: { ...param }})
        .then((result) => {
          this.loading = false
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.toTokenPrice = result.data.fromPrice
            this.toTokenTotalValue = result.data.fromTotalValue
            this.fromTokenAmount = result.data.toAmount
            this.fromTokenPrice = result.data.toPrice
            this.fromTokenTotalValue = result.data.toTotalValue
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    }, 500),
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
    openUrl(url) {
      // console.log(url)
      // openURL(url)
      // window.open(url, '_system', 'location=yes,footer=yes')

      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = url
        this.$refs.refIframeModal.show()
      } else {
        window.open(url, '_system')
      }
    },
  }
})
</script>
