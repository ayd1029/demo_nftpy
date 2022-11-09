<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_minting_information') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_minting_information_description') }}
      </div>
    </div>

    <!-- title -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_title') }} (English)</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="title" ref="title" readonly standout tabindex="1" />
      </div>
    </div>

    <!-- title_ko -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_title') }} (Korean)</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="title_ko" ref="title_ko" readonly standout tabindex="2" />
      </div>
    </div>

    <!-- nft_image -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_nft_image') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="nft_image" ref="nft_image" readonly standout tabindex="3" />
      </div>
    </div>

    <!-- nft_image preview -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('minting_preview_nft_image') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div v-if="nft_image">
          <video v-if="isVideoNft" :src="nft_image" controls autoplay loop muted style="width: 100%; max-width: 512px;"></video>
          <img v-else :src="nft_image" style="width: 100%; max-width: 512px" />
        </div>
        <div v-else>
          <span>{{ $t('no_image') }}</span>
        </div>
      </div>
    </div>

    <!-- main_image -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_main_image') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="main_image" ref="main_image" readonly standout tabindex="4" />
      </div>
    </div>

    <!-- main_image preview -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('minting_preview_main_image') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <img v-if="main_image" :src="main_image" style="width: 100%;">
        <span v-else>{{ $t('no_image') }}</span>
      </div>
    </div>

    <!-- contents -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_contents') }} (English)</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="col-12" v-html="contents" tabindex="5"></div>
      </div>
    </div>

    <!-- contents_ko -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_contents') }} (Korean)</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="col-12" v-html="contents" tabindex="6"></div>
      </div>
    </div>

    <!-- start_time -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('start_time') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="start_time" ref="start_time" outlined readonly tabindex="7">
            <!-- <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="start_time" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="start_time" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template> -->
          </q-input>
        </div>
      </div>
    </div>

    <!-- end_time -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('end_time') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="end_time" ref="end_time" outlined readonly tabindex="8">
            <!-- <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="end_time" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="end_time" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template> -->
          </q-input>
        </div>
      </div>
    </div>

    <!-- project seq -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_project_seq') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="project_seq" ref="project_seq" type="number" readonly standout tabindex="9" />
      </div>
    </div>

    <!-- collection_uri -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_collection_uri') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="collection_uri" ref="collection_uri" readonly standout tabindex="10" />
      </div>
    </div>

    <!-- 화이트리스트 SEQ -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist_seq') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="whitelist_seq" ref="whitelist_seq" :rules="[]" readonly standout tabindex="11" />
      </div>
    </div>

    <!-- token(NFT) name -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_name') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="name" ref="name" readonly standout tabindex="12" />
      </div>
    </div>

    <!-- token(NFT) symbol -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_symbol') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="symbol" ref="symbol" readonly standout tabindex="13" />
      </div>
    </div>

    <!-- use_reveal_yn -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_use_reveal_yn') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="q-gutter-xl">
          <q-radio v-model="use_reveal_yn" val="N" disable tabindex="14">{{ $t('minting_use_reveal_n') }}</q-radio>
          <q-radio v-model="use_reveal_yn" val="Y" disable tabindex="15">{{ $t('minting_use_reveal_y') }}</q-radio>
        </div>
      </div>
    </div>

    <!-- unrevealed_image_uri -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_unrevealed_image_uri') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="unrevealed_image_uri" ref="unrevealed_image_uri" readonly standout tabindex="16" />
      </div>
    </div>

    <!-- base_uri_unrevealed -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_base_uri_unrevealed') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="base_uri_unrevealed" ref="base_uri_unrevealed" readonly standout tabindex="16" />
      </div>
    </div>

    <!-- base_uri -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_base_uri') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="base_uri" ref="base_uri" readonly standout tabindex="17" />
      </div>
    </div>

    <!-- anti_bot_interval -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_anti_bot_interval') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="anti_bot_interval" ref="anti_bot_interval" type="number" readonly standout tabindex="18" />
      </div>
    </div>

    <!-- mint_limit_per_block -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_limit_per_block') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_limit_per_block" ref="mint_limit_per_block" type="number" readonly standout tabindex="19" />
      </div>
    </div>

    <!-- mint_limit_per_sale -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_limit_per_sale') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_limit_per_sale" ref="mint_limit_per_sale" type="number" readonly standout tabindex="20" />
      </div>
    </div>

    <!-- mint_start_block_number -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_start_block_number') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_start_block_number" ref="mint_start_block_number" type="number" readonly standout tabindex="21" />
      </div>
    </div>

    <!-- mint_index_for_sale -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_index_for_sale') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_index_for_sale" ref="mint_index_for_sale" type="number" readonly standout tabindex="22" />
      </div>
    </div>

    <!-- max_sale_amount -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_max_sale_amount') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="max_sale_amount" ref="max_sale_amount" type="number" readonly standout tabindex="23" />
      </div>
    </div>

    <!-- mint_price -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_mint_price') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="mint_price" ref="mint_price" type="number" readonly standout tabindex="24" />
      </div>
    </div>

    <!-- contract_address -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_contract_address') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="contract_address" ref="contract_address" readonly standout tabindex="25" />
      </div>
    </div>


    <!-- buttons -->
    <div class="row justify-center q-pt-xl">
      <div class="col-12 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="26">
          <b>{{ $t('go_back') }}</b>
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
import { defineComponent } from 'vue';
// import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
// import _ from 'lodash'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

export default defineComponent({
  name: 'SetMinting',
  data () {
    return {
      isVideoNft: false,
      seq: '',
      start_time: '',
      end_time: '',
      title: '',
      title_ko: '',
      contents: '',
      contents_ko: '',
      project_seq: '',
      main_image: '',
      nft_image: '',
      collection_uri: '',
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
      contract_address: '',
    }
  },
  components: {
  },
  watch: {
    use_reveal_yn (newValue, oldValue) {
      // console.log('oldValue: : ' + oldValue)
      // console.log('newValue: : ' + newValue)
      if (newValue === 'N') {
        this.unrevealed_image_uri = ''
      }
    },
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
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
        this.start_time = result.data.start_time
        this.end_time = result.data.end_time
        this.title = result.data.title
        this.contents = result.data.contents
        this.title_ko = result.data.title_ko
        this.contents_ko = result.data.contents_ko
        this.project_seq = result.data.project_seq
        this.main_image = result.data.main_image
        this.nft_image = result.data.nft_image
        this.collection_uri = result.data.collection_uri

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

        this.contract_address = result.data.contract_address
        

        // nft_image가 동영상인지 체크
        if (
          this.nft_image.indexOf('.mp4') > -1
          || this.nft_image.indexOf('.avi') > -1
          || this.nft_image.indexOf('.wmv') > -1
          || this.nft_image.indexOf('.mpg') > -1
          || this.nft_image.indexOf('.mpeg') > -1
          || this.nft_image.indexOf('.mov') > -1
          || this.nft_image.indexOf('.m4v') > -1
          || this.nft_image.indexOf('.avif') > -1
          || this.nft_image.indexOf('.ogm') > -1
          || this.nft_image.indexOf('.webm') > -1
          || this.nft_image.indexOf('.ogv') > -1
          || this.nft_image.indexOf('.asx') > -1
        ) {
          this.isVideoNft = true
        }
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
    goBack() {
      this.$router.go(-1)
    },
  }
})
</script>

<style scoped>
</style>
