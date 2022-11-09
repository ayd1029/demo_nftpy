<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_minting_setting') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        <span v-if="locale === 'ko-KR'">{{ title_ko }}</span>
        <span v-else>{{ title }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- 화이트리스트 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist') }}</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('whitelist_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12 q-pb-xs">
        <q-select
          v-model="targetWhitelist"
          :options="targetWhitelistOptions"
          color="primary"
          use-input
          input-debounce="0"
          @filter="targetWhitelistFilterFn"
          filled
          clearable
          options-selected-class="text-deep-orange"
          tabindex="1"
          @update:model-value="onChangeTargetWhitelist"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-avatar>
                  <img v-if="scope.opt.logo_image" :src="scope.opt.logo_image" width="30" />
                  <q-icon v-else name="list_alt" size="md" />
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

    <!-- 화이트리스트 SEQ -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist_seq') }}</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('whitelist_seq_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-lg">
      <div class="col-12">
        <q-input v-model="whitelist_seq" ref="whitelist_seq" :rules="[]" clearable standout tabindex="2" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- token(NFT) name -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_name') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_name_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="name" ref="name" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="3" />
      </div>
    </div>

    <!-- token(NFT) symbol -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_symbol') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_symbol_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="symbol" ref="symbol" :rules="[required, val => minLength(val, 1), val => maxLength(val, 30)]" clearable standout tabindex="4" />
      </div>
    </div>

    <!-- use_reveal_yn -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_use_reveal_yn') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_use_reveal_yn_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <div class="q-gutter-xl">
          <q-radio v-model="use_reveal_yn" val="N" tabindex="5">{{ $t('minting_use_reveal_n') }}</q-radio>
          <q-radio v-model="use_reveal_yn" val="Y" tabindex="6">{{ $t('minting_use_reveal_y') }}</q-radio>
        </div>
      </div>
    </div>

    <!-- unrevealed_image_uri -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_unrevealed_image_uri') }}<span v-if="use_reveal_yn === 'Y'" class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_unrevealed_image_uri_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="unrevealed_image_uri" ref="unrevealed_image_uri" :rules="[required, val => minLength(val, 1), val => maxLength(val, 200)]" clearable standout :disable="use_reveal_yn === 'N'" tabindex="7" />
      </div>
    </div>

    <!-- reveal 미사용일 경우 입력창 공간 동일하게 확보하기 위한 div -->
    <div v-if="use_reveal_yn === 'N'" class="q-pt-md">
      <div class="q-pt-xs"></div>
    </div>

    <!-- base_uri_unrevealed -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_base_uri_unrevealed') }}<span v-if="use_reveal_yn === 'Y'" class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_base_uri_unrevealed_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="base_uri_unrevealed" ref="base_uri_unrevealed" :rules="[required, val => minLength(val, 1), val => maxLength(val, 200)]" clearable standout :disable="use_reveal_yn === 'N'" tabindex="8" />
      </div>
    </div>

    <!-- reveal 미사용일 경우 입력창 공간 동일하게 확보하기 위한 div -->
    <div v-if="use_reveal_yn === 'N'" class="q-pt-md">
      <div class="q-pt-xs"></div>
    </div>

    <!-- base_uri -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_base_uri') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_base_uri_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="base_uri" ref="base_uri" :rules="[required, val => minLength(val, 1), val => maxLength(val, 200)]" clearable standout tabindex="9" />
      </div>
    </div>

    <!-- anti_bot_interval -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_anti_bot_interval') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_anti_bot_interval_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="anti_bot_interval" ref="anti_bot_interval" type="number" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="10" />
      </div>
    </div>

    <!-- mint_limit_per_block -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_limit_per_block') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_mint_limit_per_block_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_limit_per_block" ref="mint_limit_per_block" type="number" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="11" />
      </div>
    </div>

    <!-- mint_limit_per_sale -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_limit_per_sale') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_mint_limit_per_sale_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_limit_per_sale" ref="mint_limit_per_sale" type="number" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="12" />
      </div>
    </div>

    <!-- mint_start_block_number -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_start_block_number') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_mint_start_block_number_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_start_block_number" ref="mint_start_block_number" type="number" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="13" />
      </div>
    </div>

    <!-- mint_index_for_sale -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_index_for_sale') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_mint_index_for_sale_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_index_for_sale" ref="mint_index_for_sale" type="number" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="14" />
      </div>
    </div>

    <!-- max_sale_amount -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_max_sale_amount') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_max_sale_amount_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="max_sale_amount" ref="max_sale_amount" type="number" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="15" />
      </div>
    </div>

    <!-- mint_price -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_price') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_mint_price_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_price" ref="mint_price" type="number" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="16" />
      </div>
    </div>

    <!-- admin_wallet_address -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_admin_wallet_address') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_admin_wallet_address_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="admin_wallet_address" ref="admin_wallet_address" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="17" />
      </div>
    </div>

    <!-- 지갑 주소 오기입 유의 -->
    <div class="row justify-center q-pb-md">
      <div class="col-12 text-grey">
        <div class="row text-caption text-red">
          {{ $t('token_guide_1') }}
        </div>
        <div class="row text-caption text-red">
          {{ $t('token_guide_1_1') }}
        </div>
      </div>
    </div>

    <!-- option_field -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_option_field') }} (English)</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_option_field_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="option_field" ref="option_field" :rules="[val => minLength(val, 0), val => maxLength(val, 500)]" clearable standout tabindex="18" />
      </div>
    </div>

    <!-- option_field_ko -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_option_field') }} (Korean)</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_option_field_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="option_field_ko" ref="option_field_ko" :rules="[val => minLength(val, 0), val => maxLength(val, 500)]" clearable standout tabindex="19" />
      </div>
    </div>


    <!-- buttons -->
    <div class="row justify-center q-pt-xl">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="21">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="updateMintingSetting" tabindex="20">
          <b>{{ $t('setting') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
  <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
import _ from 'lodash'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

export default defineComponent({
  name: 'SetMinting',
  data () {
    return {
      seq: '',
      title: '',
      title_ko: '',
      whitelist_seq: '',
      name: '',
      symbol: '',
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
      admin_wallet_address: '',
      option_field: '',
      option_field_ko: '',
      targetWhitelist: {},
      targetWhitelistList: [], // 대상 화이트리스트 리스트
      targetWhitelistOptions: [], // 화이트리스트 리스트 - 검색용
      confirmGoBack: false,
    }
  },
  components: {
  },
  watch: {
    // use_reveal_yn (newValue, oldValue) {
    //   // console.log('oldValue: : ' + oldValue)
    //   // console.log('newValue: : ' + newValue)
    //   if (newValue === 'N') {
    //     this.unrevealed_image_uri = ''
    //   }
    // },
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
  },
  created: function () {
    // 키 설정
    this.seq = this.$route.query.seq

    // NFT 민팅 조회
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
    // 기본정보 조회
    async selectMinting() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMinting', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // this.seq = result.data.seq
        this.title = result.data.title
        this.title_ko = result.data.title_ko
        this.whitelist_seq = result.data.whitelist_seq
        this.name = result.data.name
        this.symbol = result.data.symbol
        this.use_reveal_yn = result.data.use_reveal_yn
        this.unrevealed_image_uri = result.data.unrevealed_image_uri
        this.base_uri_unrevealed = result.data.base_uri_unrevealed
        this.base_uri = result.data.base_uri
        this.anti_bot_interval = result.data.anti_bot_interval
        this.mint_limit_per_block = result.data.mint_limit_per_block
        this.mint_limit_per_sale = result.data.mint_limit_per_sale
        this.mint_start_block_number = result.data.mint_start_block_number
        this.mint_index_for_sale = result.data.mint_index_for_sale
        this.max_sale_amount = result.data.max_sale_amount
        this.mint_price = result.data.mint_price
        this.admin_wallet_address = result.data.admin_wallet_address
        if (!this.admin_wallet_address) {
          // 지갑주소 디폴트 설정
          this.admin_wallet_address = this.getWalletAddress
        }
        this.option_field = result.data.option_field
        this.option_field_ko = result.data.option_field_ko
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }

      // whitelist list
      const targetWhitelistResponse = await this.$axios.get('/api/whitelist/selectMyWhitelistComboList', { params: { ...param } })
      this.targetWhitelistOptions = ref(targetWhitelistResponse.data)
      this.targetWhitelistList = targetWhitelistResponse.data
      // this.targetWhitelist = this.targetWhitelistList.filter(item => (item.contract_address === result.data.pair_token_contract_address))[0]
      this.targetWhitelist = []
    },
    onChangeTargetWhitelist(selectedWhitelist) {
      if (selectedWhitelist) {
        if (this.whitelist_seq) {
          // 이미 추가한 항목인지 체크
          const seqList = this.whitelist_seq.toString().split(',')
          let isExist = false
          for (let i = 0; i < seqList.length; i++) {
            // console.log('selectedWhitelist.seq: ' + selectedWhitelist.seq + ' seqList[i]: ' + seqList[i])
            if (selectedWhitelist.seq == seqList[i]) {
              isExist = true
              break;
            }
          }
          // console.log('isExist: ' + isExist)
          if (!isExist) {
            this.whitelist_seq += ',' + selectedWhitelist.seq
          }
        } else {
          this.whitelist_seq = selectedWhitelist.seq
        }
      } else {
        this.whitelist_seq = ''
      }
    },
    targetWhitelistFilterFn (val, update, abort) {
      // this.options = ref(this.pairTokenList)
      update(() => {
        const keyword = val.toLowerCase()
        // console.log('keyword: ' + keyword)
        this.targetWhitelistOptions = this.targetWhitelistList.filter(
          item => (item.name && item.name.toLowerCase().indexOf(keyword) > -1)
        )
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
      if (!this.$refs.name.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_name'))
        result = false
      }
      if (!this.$refs.symbol.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_symbol'))
        result = false
      }
      if (this.use_reveal_yn === 'Y') {
        if (!this.$refs.unrevealed_image_uri.validate()) {
          this.$noti(this.$q, this.$t('validation_failed_minting_unrevealed_image_uri'))
          result = false
        }
        if (!this.$refs.base_uri_unrevealed.validate()) {
          this.$noti(this.$q, this.$t('validation_failed_minting_base_uri_unrevealed'))
          result = false
        }
      }
      if (!this.$refs.base_uri.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_base_uri'))
        result = false
      }
      if (!this.$refs.anti_bot_interval.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_anti_bot_interval'))
        result = false
      }
      if (!this.$refs.mint_limit_per_block.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_mint_limit_per_block'))
        result = false
      }
      if (!this.$refs.mint_limit_per_sale.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_mint_limit_per_sale'))
        result = false
      }
      if (!this.$refs.mint_start_block_number.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_mint_start_block_number'))
        result = false
      }
      if (!this.$refs.mint_index_for_sale.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_mint_index_for_sale'))
        result = false
      }
      if (!this.$refs.max_sale_amount.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_max_sale_amount'))
        result = false
      }
      if (!this.$refs.mint_price.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_mint_price'))
        result = false
      }
      if (!this.$refs.admin_wallet_address.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_admin_wallet_address'))
        result = false
      }
      if (!this.$refs.option_field.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_option_field'))
        result = false
      }
      if (!this.$refs.option_field_ko.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_option_field_ko'))
        result = false
      }
      return result
    },
    // NFT 민팅 설정
    updateMintingSetting() {
      // Field validation check
      if(!this.validate()) {
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // NFT 민팅 수정 처리
      const param = {
        uid: this.getUid,
        seq: this.seq,
        whitelist_seq: this.whitelist_seq,
        name: this.name,
        symbol: this.symbol,
        use_reveal_yn: this.use_reveal_yn,
        // unrevealed_image_uri: this.use_reveal_yn === 'Y' ? this.unrevealed_image_uri : null,
        // base_uri_unrevealed: this.use_reveal_yn === 'Y' ? this.base_uri_unrevealed : null,
        unrevealed_image_uri: this.unrevealed_image_uri,
        base_uri_unrevealed: this.base_uri_unrevealed,
        base_uri: this.base_uri,
        anti_bot_interval: this.anti_bot_interval,
        mint_limit_per_block: this.mint_limit_per_block,
        mint_limit_per_sale: this.mint_limit_per_sale,
        mint_start_block_number: this.mint_start_block_number,
        mint_index_for_sale: this.mint_index_for_sale,
        max_sale_amount: this.max_sale_amount,
        mint_price: this.mint_price,
        admin_wallet_address: this.admin_wallet_address,
        option_field: this.option_field,
        option_field_ko: this.option_field_ko,
      }
      this.$axios.post('/api/minting/updateMintingSetting', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_success'))

            // 2. 페이지 이동 - NFT 민팅 관리 화면
            // this.$router.push('/minting/myMintingList')
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
      // this.$router.push('/minting/myMintingList')
    }
  }
})
</script>

<style scoped>
</style>
