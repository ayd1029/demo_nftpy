<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_register_pool') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_register_pool_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- KR -->
    <div v-if="locale === 'ko-KR'" class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- 준비 사항 -->
        <div class="row text-bold">
          준비 사항
        </div>
        <div class="row q-pt-xs q-pl-xs">
          클레이스타 지갑으로 다음 토큰을 전송 후 TX HASH를 등록해 주세요.
        </div>
        <div class="row q-pt-xs q-pl-sm text-red">
          1. 상장 대상 토큰
        </div>
        <div class="row q-pt-xs q-pl-sm text-red">
          2. 유동성 페어 토큰
        </div>
        <div class="row q-pt-xs q-pl-sm text-red">
          3. 100 KSP (KlaySwap Protocol)
        </div>
        <!-- 참고 사항 -->
        <div class="row text-bold q-pt-md">
          참고 사항
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · 대상 토큰 및 페어 토큰은 유동성 풀에 등록할 개수만큼 전송하시면 됩니다.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · 대상 토큰의 가격은 페어 토큰의 가치에 따라 정해집니다.
        </div>
        <div class="row q-pt-xs q-pl-md">
          대상 토큰 1개와 1 KLAY로 유동성 풀 생성 -> 대상 토큰 1개 가격은 1 KLAY
        </div>
        <div class="row q-pt-xs q-pl-md">
          대상 토큰 10개와 1 KLAY로 유동성 풀 생성 -> 대상 토큰 1개 가격은 0.1 KLAY
        </div>
        <div class="row q-pt-xs q-pl-md">
          대상 토큰 100개와 1 KLAY로 유동성 풀 생성 -> 대상 토큰 1개 가격은 0.01 KLAY
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · 100 KSP는 유동성 풀 생성시 필요한 Klayswap의 createFee입니다.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · 상기 사항은 Klayswap(Ozys)의 상장 필수 준비 사항입니다.
        </div>
        <!-- TX HASH 조회 -->
        <div class="row text-bold q-pt-md">
          TX HASH 조회
        </div>
        <div class="row q-pt-xs q-pl-xs">
          ① https://scope.klaytn.com 접속
          &nbsp;&nbsp;<q-btn icon="content_copy" color="primary" size="sm" flat @click="copyValue('https://klayswap.com')" dense>&nbsp;{{ $t('copy') }}</q-btn>
        </div>
        <div class="row q-pt-xs q-pl-xs">
          ② 검색창에 토큰을 전송한 지갑주소 입력 후 검색
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-md">
          ③ 해당 전송건의 TX HASH 복사 후 해당 항목에 붙여넣기
        </div>
      </div>
    </div>

    <!-- EN -->
    <div v-else class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- 준비 사항 -->
        <div class="row text-bold">
          Prepare
        </div>
        <div class="row q-pt-xs q-pl-xs">
          Please send the Tokens to Klaystar wallet and register TX HASH.
        </div>
        <div class="row q-pt-xs q-pl-sm text-red">
          1. IDO Target Token
        </div>
        <div class="row q-pt-xs q-pl-sm text-red">
          2. Liquidity Pair Token
        </div>
        <div class="row q-pt-xs q-pl-sm text-red">
          3. 100 KSP (KlaySwap Protocol)
        </div>
        <!-- 참고 사항 -->
        <div class="row text-bold q-pt-md">
          Precautions
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · Send as many target tokens and pair tokens as you want to register for the liquidity pool.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · The price of the target token is determined by the value of the pair token.
        </div>
        <div class="row q-pt-xs q-pl-md">
          Create a liquidity pool with 1 target token and 1 KLAY -> The price of 1 target token is 1 KLAY.
        </div>
        <div class="row q-pt-xs q-pl-md">
          Create a liquidity pool with 10 target tokens and 1 KLAY -> The price of 1 target token is 0.1 KLAY.
        </div>
        <div class="row q-pt-xs q-pl-md">
          Create a liquidity pool with 100 target tokens and 1 KLAY -> The price of 1 target token is 0.01 KLAY.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · 100 KSP is Klayswap's createFee required to create a liquidity pool.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · The above is a mandatory preparation for the listing of Klayswap (Ozys).
        </div>
        <!-- TX HASH 조회 -->
        <div class="row text-bold q-pt-md">
          Search TX HASH
        </div>
        <div class="row q-pt-xs q-pl-xs">
          ① Access https://scope.klaytn.com
          &nbsp;&nbsp;<q-btn icon="content_copy" color="primary" size="sm" flat @click="copyValue('https://klayswap.com')" dense>&nbsp;{{ $t('copy') }}</q-btn>
        </div>
        <div class="row q-pt-xs q-pl-xs">
          ② Enter the wallet address that sent the token in the search box and search.
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-md">
          ③ Copy the TX HASH of the transaction and paste it into the corresponding item.
        </div>
      </div>
    </div>

    <q-separator spaced />

    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('system_wallet_address') }}</span>
        &nbsp;&nbsp;<q-btn icon="content_copy" color="primary" size="sm" flat @click="copyValue(walletAddress)" dense>&nbsp;{{ $t('copy') }}</q-btn>
      </div>
    </div>
    <div class="row justify-center q-pt-sm q-pb-md">
      <div class="col-12">
        {{ walletAddress }}
      </div>
    </div>

    <!-- 반환 안내 -->
    <div v-if="locale === 'ko-KR'" class="row justify-center q-pt-sm q-pb-md">
      <div class="col-12 text-red text-bold">
        · 유동성 풀이 생성되면 대상 토큰의 상장처리가 완료됩니다.
        <br />
        <!-- · 토큰은 유동성 풀 생성 이후 전송해주신 지갑으로 반환됩니다.
        <br />
        &nbsp;&nbsp;(Ozys 수수료 100 KSP 및 반환 전송 수수료 제외)
        <br /> -->
        · 유동성 풀 생성시에는 비율에 맞춰서 생성에 필요한 최소 갯수만 전송해주세요.
        <br />
        &nbsp;&nbsp;&nbsp;e.g. 1 KLAY + 10 NewToken
        <br />
        &nbsp;&nbsp;&nbsp;(대상 토큰 1개 가격이 0.1 KLAY 일 경우)
      </div>
    </div>
    <div v-else class="row justify-center q-pt-sm q-pb-md">
      <div class="col-12 text-red text-bold">
        · Once the liquidity pool is created, the listing process of the target token is completed.
        <br />
        <!-- · The token will be returned to the wallet you sent after the creation of the liquidity pool.
        <br />
        &nbsp;&nbsp;(The Ozys fee of 100 KSP and the return transfer fee are excluded.)
        <br /> -->
        · When creating a flow pool, please send only the minimum number required for creation according to the ratio.
        <br />
        &nbsp;&nbsp;&nbsp;e.g. 1 KLAY + 10 NewToken
        <br />
        &nbsp;&nbsp;&nbsp;(If the price of one token is 0.1 KLAY)
      </div>
    </div>

    <!-- <q-separator spaced />

    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1 text-red">■ {{ $t('pool_if_pair_token_is_klay') }}</span>
      </div>
      <div class="col-12">
        <span class="text-weight-bold text-body text-red">{{ $t('pool_if_pair_token_is_klay_description') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('system_wallet_address_for_klay') }}</span>
        &nbsp;&nbsp;<q-btn icon="content_copy" color="primary" size="sm" flat @click="copyValue(walletAddressKlay)" dense>&nbsp;{{ $t('copy') }}</q-btn>
      </div>
    </div>
    <div class="row justify-center q-pt-sm q-pb-md">
      <div class="col-12">
        {{ walletAddressKlay }}
      </div>
    </div> -->

    <q-separator spaced />

    <!-- 1. 상장 대상 토큰 -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">1. {{ $t('pool_target_token') }}<span class="text-red"> *</span></span>
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

    <!-- 2. 상장 대상 토큰 갯수 -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">2. {{ $t('pool_target_token_total_supply') }}<span class="text-red"> *</span></span>
        <!-- <span class="text-grey">&nbsp;&nbsp; {{ $t('pool_target_token_total_supply_hint') }}</span> -->
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="targetTokenTotalSupply" ref="targetTokenTotalSupply" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 999999999999999999999999999999999999999999999999999999999999999999999)]" clearable standout tabindex="2" />
      </div>
    </div>

    <!-- 3. 유동성 페어 토큰 -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">3. {{ $t('pool_pair_token') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12 q-pb-xs">
        <q-select
          v-model="pairToken"
          :options="pairOptions"
          color="primary"
          use-input
          input-debounce="0"
          @filter="pairFilterFn"
          filled
          clearable
          options-selected-class="text-deep-orange"
          tabindex="3"
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

    <!-- 4. 유동성 페어 토큰 갯수 -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">4. {{ $t('pool_pair_token_total_supply') }}<span class="text-red"> *</span></span>
        <!-- <span class="text-grey">&nbsp;&nbsp; {{ $t('pool_pair_token_total_supply_hint') }}</span> -->
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="pairTokenTotalSupply" ref="pairTokenTotalSupply" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 999999999999999999999999999999999999999999999999999999999999999999999)]" clearable standout tabindex="4" />
      </div>
    </div>

    <!-- 5. TX HASH - 상장 대상 토큰 -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">5. {{ $t('pool_target_token_tx_hash') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="txIdTargetToken" ref="txIdTargetToken" :rules="[required, val => minLength(val, 66), val => maxLength(val, 66)]" clearable standout tabindex="5" />
      </div>
    </div>

    <!-- 6. TX HASH - 유동성 페어 토큰 -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">6. {{ $t('pool_pair_token_tx_hash') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="txIdPairToken" ref="txIdPairToken" :rules="[required, val => minLength(val, 66), val => maxLength(val, 66)]" clearable standout tabindex="6" />
      </div>
    </div>

    <!-- 7. TX HASH - KSP -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">7. {{ $t('pool_ksp_token_tx_hash') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="txIdCreateFee" ref="txIdCreateFee" :rules="[required, val => minLength(val, 66), val => maxLength(val, 66)]" clearable standout tabindex="7" />
      </div>
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="9">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="registerPool" tabindex="8">
          <b>{{ $t('register') }}</b>
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
  name: 'RegisterPool',
  data () {
    return {
      walletAddress: '', // 클레이스타 시스템 지갑 주소
      walletAddressKlay: '', // 클레이스타 시스템 지갑 주소 for KLAY
      targetToken: {},
      targetTokenList: [], // 유동성 페어 토큰 리스트
      targetOptions: [], // 토큰 리스트 - 검색용
      pairToken: {},
      pairTokenList: [], // 유동성 페어 토큰 리스트
      pairOptions: [], // 토큰 리스트 - 검색용
      targetTokenTotalSupply: '',
      pairTokenTotalSupply: '',
      txIdTargetToken: '',
      txIdPairToken: '',
      txIdCreateFee: '',
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
    // 대상 토큰 리스트 조회
    this.selectMyTargetTokenList()

    // 유동성 페어 토큰 리스트 조회
    this.selectPairTokenList()

    // 유동성 풀 생성용 시스템 지갑 주소
    this.walletAddress = this.$systemWalletAddress
    // this.walletAddressKlay = this.$systemWalletAddressKlay
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    async selectMyTargetTokenList() {
      const param = {
        uid: this.getUid,
      }
      const result = await this.$axios.get('/api/pool/selectMyTargetTokenList', { params: { ...param } })
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
    async selectPairTokenList() {
      const param = {
        uid: this.getUid,
      }
      const result = await this.$axios.get('/api/pool/selectPairTokenList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.pairTokenList = result.data
        this.pairToken = this.pairTokenList[0]
        this.pairOptions = ref(this.pairTokenList) // 검색용 리스트 설정
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    pairFilterFn (val, update, abort) {
      // this.options = ref(this.pairTokenList)
      update(() => {
        const keyword = val.toLowerCase()
        // console.log('keyword: ' + keyword)
        this.pairOptions = this.pairTokenList.filter(
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
      if (!this.targetToken) {
        this.$noti(this.$q, this.$t('validation_failed_target_token'))
        result = false
      }
      if (!this.pairToken) {
        this.$noti(this.$q, this.$t('validation_failed_pair_token'))
        result = false
      }
      if (!this.$refs.txIdTargetToken.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_txid_target_token'))
        result = false
      }
      if (!this.$refs.txIdPairToken.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_txid_pair_token'))
        result = false
      }
      if (!this.$refs.txIdCreateFee.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_txid_create_fee'))
        result = false
      }
      if (!this.$refs.targetTokenTotalSupply.validate() || String(this.targetTokenTotalSupply).indexOf('.') > -1) {
        this.$noti(this.$q, this.$t('validation_failed_target_token_total_supply'))
        result = false
      }
      if (!this.$refs.pairTokenTotalSupply.validate() || String(this.pairTokenTotalSupply).indexOf('.') > -1) {
        this.$noti(this.$q, this.$t('validation_failed_pair_token_total_supply'))
        result = false
      }
      return result
    },
    // 유동성 풀 등록
    registerPool() {
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

      // 유동성 풀 등록
      const param = {
        uid: this.getUid,
        target_token_seq: this.targetToken.seq,
        target_token_name: this.targetToken.name,
        target_token_symbol: this.targetToken.symbol,
        target_token_decimals: this.targetToken.decimals,
        target_token_contract_address: this.targetToken.contract_address,
        target_token_total_supply: this.targetTokenTotalSupply,
        target_token_logo_image: this.targetToken.logo_image,
        pair_token_seq: this.pairToken.seq,
        pair_token_name: this.pairToken.name,
        pair_token_symbol: this.pairToken.symbol,
        pair_token_decimals: this.pairToken.decimals,
        pair_token_contract_address: this.pairToken.contract_address,
        pair_token_total_supply: this.pairTokenTotalSupply,
        pair_token_logo_image: this.pairToken.logo_image,
        txid_target_token: this.txIdTargetToken,
        txid_pair_token: this.txIdPairToken,
        txid_create_fee: this.txIdCreateFee,
      }
      this.$axios.post('/api/pool/insertPool', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('register_pool_success'))

            // 2. 페이지 이동 - 유동성 풀 생성 리스트 화면
            this.$router.push('/pool')
          } else {
            this.$noti(this.$q, this.$t('register_pool_failed'))
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
      this.$router.push('/pool')
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


    // copyValue(value) {
    //   let tempElem = document.createElement('textarea')
    //   tempElem.value = value
    //   document.body.appendChild(tempElem)

    //   tempElem.select()
    //   document.execCommand('copy')
    //   document.body.removeChild(tempElem)
    //   document.execCommand('copy')
    // },

  }
})
</script>

<style scoped>
</style>
