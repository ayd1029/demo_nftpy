<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_modify_token') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_modify_token_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_name') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('token_name_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenName" ref="tokenName" :rules="[required, val => minLength(val, 3), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_symbol') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('token_symbol_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenSymbol" ref="tokenSymbol" :rules="[required, val => minLength(val, 2), val => maxLength(val, 30)]" clearable standout tabindex="2" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_decimals') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('token_decimals_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenDecimals" ref="tokenDecimals" type="number" :rules="[val => minValue(val, 0), val => maxValue(val, 18)]" standout tabindex="3" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_initial_supply') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('token_initial_supply_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenInitialSupply" ref="tokenInitialSupply" type="number" thousands-separator="," mask="currency" decimal-point="."
          :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 999999999999999999999999999999999999999999999999999999999999999999999)]" clearable standout tabindex="4" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('wallet_address') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('wallet_address_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-input v-model="walletAddress" ref="walletAddress" :rules="[required]" clearable standout tabindex="5" />
      </div>
    </div>

    <!-- <q-separator spaced /> -->
    <div class="row justify-center q-pb-md">
      <div class="col-12 text-grey">
        <div class="row text-caption text-red">
          {{ $t('token_guide_1') }}
        </div>
        <div class="row text-caption text-red">
          {{ $t('token_guide_1_1') }}
        </div>
        <!-- <br />
        <div class="row text-caption">
          {{ $t('token_guide_2') }}
        </div>
        <div class="row text-caption">
          {{ $t('token_guide_2_1') }}
        </div>
        <div class="row text-caption">
          {{ $t('token_guide_2_2') }}
        </div>
        <div class="row text-caption">
          {{ $t('token_guide_2_2') }}
        </div> -->
      </div>
    </div>
    <q-separator spaced />

    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="modifyToken" tabindex="6">
          <b>{{ $t('modify_token') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- ?????? ?????? ?????? -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
</template>

<script>
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'

export default defineComponent({
  name: 'Registration',
  data () {
    return {
      tokenSeq: '', // route parameter seq
      tokenName: '',
      tokenSymbol: '',
      tokenDecimals: 0,
      tokenInitialSupply: 10000000000,
      walletAddress: '',
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
    // ??? ??????
    this.tokenSeq = this.$route.query.seq
    // ?????? ?????? ??????
    this.selectToken()
  },
  mounted: function () {},
  methods: {
    async selectToken() {
      const param = {
        uid: this.getUid,
        seq: this.tokenSeq,
      }
      const result = await this.$axios.get('/api/token/selectNotCreatedToken', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.tokenName = result.data.name
        this.tokenSymbol = result.data.symbol
        this.tokenDecimals = result.data.decimals

        let tokenInitialSupplyTemp = result.data.initial_supply
        const substringIndex = tokenInitialSupplyTemp.length - this.tokenDecimals
        tokenInitialSupplyTemp = tokenInitialSupplyTemp.substring(0, substringIndex)
        this.tokenInitialSupply = tokenInitialSupplyTemp
        // this.tokenInitialSupply = result.data.initial_supply / Math.pow(10, this.tokenDecimals)

        this.walletAddress = result.data.wallet_address
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
      if (!this.$refs.tokenName.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_token_name'))
        result = false
      }
      if (!this.$refs.tokenSymbol.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_token_symbol'))
        result = false
      }
      if (!this.$refs.tokenDecimals.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_token_decimals'))
        result = false
      }
      if (!this.$refs.tokenInitialSupply.validate() || String(this.tokenInitialSupply).indexOf('.') > -1) {
        this.$noti(this.$q, this.$t('validation_failed_initial_supply'))
        result = false
      }
      if (!this.$refs.walletAddress.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_wallet_address'))
        result = false
      }
      // ???????????? ????????? ??????
      if (!this.checkAddress(this.walletAddress)) {
        this.$noti(this.$q, this.$t('validation_failed_check_wallet_address'))
        result = false
      }
      return result
    },
    // ?????? ??????
    modifyToken() {
      // Field validation check
      if(!this.validate()) {
        // this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // ????????? ?????? ??????, ????????? ?????? ??????
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      this.$q.loading.show() // ?????? ?????? ??????

      // decimals ?????? ??????
      let tokenInitialSupplyDecimalsPlus = this.tokenInitialSupply
      for (let i = 0; i < this.tokenDecimals; i++) {
        tokenInitialSupplyDecimalsPlus += "0"
      }
      // console.log(tokenInitialSupplyDecimalsPlus)
      // console.log(123)

      // ?????? ?????? ??????
      const param = {
        uid: this.getUid,
        seq: this.tokenSeq,
        name: this.tokenName,
        symbol: this.tokenSymbol,
        decimals: this.tokenDecimals,
        // initial_supply: String(this.tokenInitialSupply * Math.pow(10, this.tokenDecimals)),
        initial_supply: tokenInitialSupplyDecimalsPlus,
        wallet_address: this.walletAddress,
        // type: 'KIP-7',
      }
      this.$axios.post('/api/token/updateTokenNotCreated', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // ?????? ?????? ??????
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_token_success'))

            // 2. ????????? ?????? - ?????? ?????? ????????? ??????
            this.$router.push('/token/createList')
          } else {
            this.$noti(this.$q, this.$t('modify_token_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // ?????? ?????? ??????
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    goBack() {
      // this.$router.go(-1)
      this.$router.push('/token/createList')
    },

    // ???????????? ????????? ??????
    /**
     * Checks if the given string is an address
     *
     * @method isAddress
     * @param {String} address the given HEX address
     * @return {Boolean}
     */
    checkAddress(address) {
      if (address.length === 42) {
        return true
      } else {
        return false
      }
      // // check if it has the basic requirements of an address
      // if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      //   return false
      //     // If it's ALL lowercase or ALL upppercase
      // }
      // if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
      //   // return true
      //   // Otherwise check each case
      //   return this.checkAddressChecksum(address)
      // } else {
      //   return false
      // }
    },

    // /**
    //  * Checks if the given string is a checksummed address
    //  *
    //  * @method checkAddressChecksum
    //  * @param {String} address the given HEX address
    //  * @return {Boolean}
    //  */
    // checkAddressChecksum(address) {
    //   try {
    //     // Check each case
    //     address = address.replace(/^0x/i, '')
    //     const addressHash = SHA3(address.toLowerCase()).replace(/^0x/i, '')
    //     // console.log(addressHash)

    //     for (let i = 0; i < 40; i++) {
    //       // the nth letter should be uppercase if the nth digit of casemap is 1
    //       if (
    //         (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
    //         (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
    //       ) {
    //         return false
    //       }
    //     }
    //     return true
    //   } catch (e) {
    //     console.log(e)
    //     return false
    //   }
    // },

  }
})
</script>

<style scoped>
</style>
