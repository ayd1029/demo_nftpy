<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_start_airdrop') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_start_airdrop_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- 1. 대상 토큰 -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">1. {{ $t('airdrop_token') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12 q-pb-xs">
        <q-select
          v-model="targetToken"
          :options="targetOptions"
          color="primary"
          use-input
          input-debounce="0"
          @filter="targetFilterFn"
          filled
          clearable
          options-selected-class="text-deep-orange"
          tabindex="1"
          readonly
          @update:model-value="onChangeTargetToken"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-avatar>
                  <img v-if="scope.opt.logo_image" :src="scope.opt.logo_image" width="30" />
                  <q-icon v-else name="generating_tokens" size="md" />
                </q-avatar>
              </q-item-section>
              <q-item-section style="word-break: break-all;">
                <q-item-label class="text-bold">{{ scope.opt.symbol }}</q-item-label>
                <q-item-label class="">{{ scope.opt.name }}</q-item-label>
                <q-item-label class="text-caption">{{ scope.opt.contract_address }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <!-- 1. 토큰 Contract Address -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">2. {{ $t('airdrop_token_contract_address') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
          <q-input v-model="tokenContractAddress" ref="tokenContractAddress" :rules="[required]" clearable standout readonly tabindex="2" />
      </div>
    </div>

    <!-- 2. Pool Contract Address -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">3. {{ $t('airdrop_pool_contract_address') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
          <q-input v-model="poolContractAddress" ref="poolContractAddress" :rules="[required]" clearable standout readonly tabindex="3" />
      </div>
    </div>

    <!-- 3. 에어드랍 토큰 갯수 -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">4. {{ $t('airdrop_total_amount') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp;(e.g. 1000000)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="totalAmount" ref="totalAmount" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 999999999999999999999999999999999999999999999999999999999999999999999)]" clearable standout readonly tabindex="4" />
      </div>
    </div>

    <!-- 4. 블록당 에어드랍 토큰 갯수 -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">5. {{ $t('airdrop_block_amount') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp;(e.g. 1000)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="blockAmount" ref="blockAmount" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 999999999999999999999999999999999999999999999999999999999999999999999)]" clearable standout tabindex="5" />
      </div>
    </div>

    <!-- 5. 시작 블록 번호 -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">6. {{ $t('airdrop_start_block') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp;(e.g. 86085646)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="startBlock" ref="startBlock" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 86085555), val => maxValue(val, 9999999999999)]" clearable standout tabindex="6" />
      </div>
    </div>

    <!-- 6. 시작일 -->
    <!-- <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">7. {{ $t('airdrop_start_date') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp;(e.g. 20220403)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="startDate" ref="startDate" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 20220101), val => maxValue(val, 30000000)]" clearable standout tabindex="7" />
      </div>
    </div> -->

    <!-- 7. 종료일 -->
    <!-- <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">8. {{ $t('airdrop_end_date') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp;(e.g. 20220411)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="endDate" ref="endDate" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 20220101), val => maxValue(val, 30000000)]" clearable standout tabindex="8" />
      </div>
    </div> -->

    <!-- 8. 에어드랍 토큰 전송 TX HASH -->
    <!-- <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">8. {{ $t('airdrop_txid_airdrop_token') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
          <q-input v-model="txidAirdropToken" ref="txidAirdropToken" :rules="[required]" clearable standout tabindex="9" />
      </div>
    </div> -->

    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="11">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="startAirdrop" tabindex="10">
          <b>{{ $t('start') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue';
import { ref } from 'vue'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'

export default defineComponent({
  name: 'StartAirdrop',
  data () {
    return {
      systemWalletAddress: '',
      targetToken: {},
      targetTokenList: [], // 에어드랍 토큰 리스트
      targetOptions: [], // 토큰 리스트 - 검색용
      tokenSeq: '',
      tokenName: '',
      tokenSymbol: '',
      tokenDecimals: '',
      tokenTotalSupply: '',
      tokenLogoImage: '',
      tokenContractAddress: '',
      poolContractAddress: '',
      totalAmount: '',
      blockAmount: '',
      startBlock: '',
      startDate: '',
      endDate: '',
      txidAirdropToken: '',
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
    this.systemWalletAddress = this.$systemWalletAddress

    // 에어드랍 대상 토큰 리스트 조회
    this.selectAirdropTokenList()

    // 에어드랍 조회
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

      // target token list
      const targetTokenResponse = await this.$axios.get('/api/airdrop/selectAirdropTokenList', { params: { ...param } })
      this.targetOptions = ref(targetTokenResponse.data)
      this.targetTokenList = targetTokenResponse.data
      this.targetToken = this.targetTokenList.filter(item => (item.contract_address === result.data.token_contract_address))[0]

      if (result.data) {
        // 항목 설정
        this.tokenSeq = result.data.token_seq
        this.tokenName = result.data.token_name
        this.tokenSymbol = result.data.token_symbol
        this.tokenDecimals = result.data.token_decimals
        this.tokenTotalSupply = result.data.token_total_supply
        this.tokenLogoImage = result.data.token_logo_image
        this.tokenContractAddress = result.data.token_contract_address
        this.poolContractAddress = result.data.pool_contract_address
        this.totalAmount = result.data.total_amount
        this.blockAmount = result.data.block_amount
        this.startBlock = result.data.start_block
        this.startDate = result.data.start_date
        this.endDate = result.data.end_date
        this.txidAirdropToken = result.data.txid_airdrop_token
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    onChangeTargetToken(selectedToken) {
      if (selectedToken) {
        this.tokenContractAddress = selectedToken.contract_address
      } else {
        this.tokenContractAddress = ''
      }
    },
    async selectAirdropTokenList() {
      const param = {
        uid: this.getUid,
      }
      const result = await this.$axios.get('/api/airdrop/selectAirdropTokenList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.targetTokenList = result.data
        this.targetToken = this.targetTokenList[0]
        this.targetOptions = ref(this.targetTokenList) // 검색용 리스트 설정
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    targetFilterFn (val, update, abort) {
      // this.options = ref(this.pairTokenList)
      update(() => {
        const keyword = val.toLowerCase()
        // console.log('keyword: ' + keyword)
        this.targetOptions = this.targetTokenList.filter(
          item => (item.name && item.name.toLowerCase().indexOf(keyword) > -1)
            || (item.symbol && item.symbol.toLowerCase().indexOf(keyword) > -1)
            || (item.contract_address && item.contract_address.toLowerCase().indexOf(keyword) > -1))
      })
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
      // if (!this.$refs.tokenContractAddress.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_token_contract_address'))
      //   result = false
      // }
      // if (!this.$refs.poolContractAddress.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_pool_contract_address'))
      //   result = false
      // }
      // if (!this.$refs.totalAmount.validate() || String(this.totalAmount).indexOf('.') > -1 || String(this.totalAmount).indexOf(',') > -1) {
      //   this.$noti(this.$q, this.$t('validation_failed_total_amount'))
      //   result = false
      // }
      if (!this.$refs.blockAmount.validate() || String(this.blockAmount).indexOf('.') > -1 || String(this.blockAmount).indexOf(',') > -1) {
        this.$noti(this.$q, this.$t('validation_failed_block_amount'))
        result = false
      }
      if (!this.$refs.startBlock.validate() || String(this.startBlock).indexOf('.') > -1 || String(this.startBlock).indexOf(',') > -1) {
        this.$noti(this.$q, this.$t('validation_failed_start_block'))
        result = false
      }
      // if (!this.$refs.startDate.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_start_date'))
      //   result = false
      // }
      // if (!this.$refs.endDate.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_end_date'))
      //   result = false
      // }
      // if (!this.$refs.txidAirdropToken.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_txid_airdrop_token'))
      //   result = false
      // }
      return result
    },
    // 에어드랍 시작
    startAirdrop() {
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

      // 에어드랍 수정 & 시작
      const param = {
        uid: this.getUid,
        seq: this.airdropSeq,
        token_seq: this.targetToken.seq,
        token_name: this.targetToken.name,
        token_symbol: this.targetToken.symbol,
        token_decimals: this.targetToken.decimals,
        token_total_supply: this.targetToken.initial_supply,
        token_logo_image: this.targetToken.logo_image,
        token_contract_address: this.targetToken.contract_address,
        pool_contract_address: this.poolContractAddress,
        total_amount: this.totalAmount,
        block_amount: this.blockAmount,
        start_block: this.startBlock,
        start_date: this.startDate,
        end_date: this.endDate,
        txid_airdrop_token: this.txidAirdropToken,
      }
      this.$axios.post('/api/airdrop/start', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('start_airdrop_success'))

            // 2. 페이지 이동 - 에어드랍 생성 리스트 화면
            this.$router.push('/airdrop')
          } else {
            // this.$noti(this.$q, this.$t('start_airdrop_failed'))
            this.$noti(this.$q, result.data.resultMsg)
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
    openUrl(url) {
      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = url
        this.$refs.refIframeModal.show()
      } else {
        window.open(url)
      }
    },

  }
})
</script>

<style scoped>
</style>
