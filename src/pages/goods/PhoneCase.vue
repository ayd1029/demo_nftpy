<template>
  <q-page class="q-pa-md page-1200">

    <div class="row flex flex-center">
      <div style="width: 100%; max-width: 550px">
        <div class="row flex flex-center">
          <video v-if="isVideoNft" :src="nft_image" controls autoplay loop muted style="width: 100%; max-width: 512px;"></video>
          <img v-else :src="nft_image" style="width: 100%; max-width: 512px" />
        </div>
      </div>
      <div class="q-pt-md" style="width: 100%; max-width: 600px">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td colspan="3">
              <div class="col-12 doc-heading text-h5 text-bold text-left" style="max-width: 600px;">
                <span v-if="locale === 'ko-KR'">{{ title_ko }}</span>
                <span v-else>{{ title }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="col-12 q-pt-md">
                <q-separator style="height: 3px;" />
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div class="col-12 q-pt-md">
                {{ $t('block_current') }}
              </div>
            </td>
            <td align="center">
              <div class="col-12 q-pt-md">
                {{ $t('block_start') }}
              </div>
            </td>
            <td align="center">
              <div class="col-12 q-pt-md">
                <div v-if="!isStarted">
                  {{ $t('minting_time_to_start') }}
                </div>
                <div v-else>
                  {{ $t('minting_time_to_end') }}
                </div>
                <div>
                  {{ $t('minting_remain_time') }}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div class="col-12 q-pt-sm q-pb-md">
                <VueCountdown :time="currentBlock * 1000" :interval="1000">
                  <template v-slot="props"># {{ currentBlock + (currentBlock - props.totalSeconds) }}</template>
                </VueCountdown>
              </div>
            </td>
            <td align="center">
              <div class="col-12 q-pt-sm q-pb-md">
                # {{ mint_start_block_number }}
              </div>
            </td>
            <td align="center">
              <div class="col-12 q-pt-sm q-pb-md">
                <VueCountdown :time="remain_time" :interval="1000" @end="onCountdownEnd">
                  <!-- <template v-slot="props">{{ props.days }} Days {{ zerofill(props.hours + (props.days * 24)) }} : {{ zerofill(props.minutes) }} : {{ zerofill(props.seconds) }}</template> -->
                  <template v-slot="props">{{ zerofill(props.hours + (props.days * 24)) }} : {{ zerofill(props.minutes) }} : {{ zerofill(props.seconds) }}</template>
                </VueCountdown>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="col-12">
                <q-separator style="height: 3px;" />
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div class="col-12 q-pt-md">
                {{ $t('minting_max_sale_amount') }}
              </div>
            </td>
            <td align="center">
              <div class="col-12 q-pt-md">
                {{ $t('minting_mint_limit_per_block_infomation1') }}<br />
                {{ $t('minting_mint_limit_per_block_infomation2') }}
              </div>
            </td>
            <td align="center">
              <div class="col-12 q-pt-md">
                {{ $t('minting_mint_limit_per_sale_infomation1') }}<br />
                {{ $t('minting_mint_limit_per_sale_infomation2') }}
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div class="col-12 q-pt-sm q-pb-md">
                {{ amount_sold }} / {{ max_sale_amount }}
              </div>
            </td>
            <td align="center">
              <div class="col-12 q-pt-sm q-pb-md">
                {{ mint_limit_per_block }}
              </div>
            </td>
            <td align="center">
              <div class="col-12 q-pt-sm q-pb-md">
                {{ myMintingCount }} / {{ mint_limit_per_sale }}
              </div>
            </td>
          </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td colspan="3">
              <div class="col-12">
                <q-separator style="height: 3px;" />
              </div>
            </td>
          </tr>
          <tr v-if="!option_field && !option_field_ko">
            <td colspan="3">
              <div class="col-12 q-pt-md">
                ※ {{ $t('block_infomation') }} :
                <a @click="openUrl('https://scope.klaytn.com/')" style="cursor: pointer;" class="text-blue">klaytnscope</a>
                ,
                <a @click="openUrl('https://klayswap.com')" style="cursor: pointer;" class="text-blue">Klayswap</a>
              </div>
            </td>
          </tr>
          <tr v-if="!option_field && !option_field_ko">
            <td colspan="3">
              <div class="col-12 q-pt-sm">
              </div>
            </td>
          </tr>
          <tr v-if="option_field || option_field_ko">
            <td colspan="3">
              <div class="col-12 q-pt-md">
                <!-- option_field -->
                <div class="row justify-center">
                  <div class="col-12">
                    <span v-if="locale === 'ko-KR'" class="text-subtitle1">{{ option_field_ko }}</span>
                    <span v-else class="text-subtitle1">{{ option_field }}</span>
                  </div>
                </div>
                <div class="row justify-center">
                  <div class="col-12">
                    <q-input v-model="option_field_value" ref="option_field_value" :rules="[required, val => minLength(val, 1), val => maxLength(val, 4000)]" clearable standout dense tabindex="1" />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="35" align="center">
              <div class="q-pt-md">
                <img :src="pay_token_logo_image" style="width: 25px; margin-top: 6px;" />
              </div>
            </td>
            <td width="200" align="left">
              <div class="q-pt-md">
                <span class="text-h5 text-bold">
                  {{ totalPrice }} {{ pay_token_symbol }}
                </span>
              </div>
            </td>
            <td align="right">
              <div class="q-pt-md">
                <q-rating
                  v-model="mintAmount"
                  size="md"
                  :max="mint_limit_per_block"
                  color="red"
                  :icon="icons"
                />
              </div>
            </td>
          </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              <div v-if="!isStarted" class="col-12 q-pt-md q-pb-sm">
                <q-btn class="btn" color="grey-5" size="lg" style="width: 100%;" disable tabindex="2">
                  <b>{{ $t('minting_sale_waiting') }}</b>
                </q-btn>
              </div>
              <div v-else-if="applyTimeOver" class="col-12 q-pt-md q-pb-sm">
                <q-btn class="btn" color="grey-5" size="lg" style="width: 100%;" disable tabindex="2">
                  <b>{{ $t('minting_sale_ended') }}</b>
                </q-btn>
              </div>
              <div v-else class="col-12 q-pt-md q-pb-sm">
                <q-btn class="btn" color="primary" size="lg" style="width: 100%;" @click="buy" tabindex="2">
                  <b>{{ $t('buy') }}</b>
                </q-btn>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div v-if="collection_uri" class="col-12 text-right">
                <!-- <a @click="openUrl(collection_uri)" style="cursor: pointer;">
                  <span>{{ $t('minting_view_collection') }}</span>
                  <q-icon name="double_arrow" size="md" />
                </a> -->
                <q-btn @click="openUrl(collection_uri)" flat size="md" dense tabindex="3">
                  <span class="text-bold text-grey-7">{{ $t('minting_view_collection') }}</span>
                  &nbsp;&nbsp;
                  <q-icon name="double_arrow" size="md" color="grey-6" />
                </q-btn>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- share, project info, minting history list button -->
    <div class="row justify-center q-pt-lg q-pb-xl">
      <!-- 프로젝트 -->
      <div v-if="project_seq" class="q-pl-xs q-pr-xs q-pt-md">
        <q-btn class="btn" color="primary" size="md" style="width: 116px;" outline @click="showProject" no-caps tabindex="5">
          <b>{{ $t('project') }}</b>
        </q-btn>
      </div>
      <!-- 화이트리스트 -->
      <div v-if="whitelist_seq" class="q-pl-xs q-pr-xs q-pt-md">
        <q-btn class="btn" color="primary" size="md" style="width: 116px;" outline @click="showWhitelist" no-caps tabindex="7">
          <b>{{ $t('whitelist') }}</b>
        </q-btn>
      </div>
      <!-- 민팅내역 -->
      <div class="q-pl-xs q-pr-xs q-pt-md">
        <q-btn class="btn" color="primary" size="md" style="width: 116px;" outline @click="goMintingHistoryList" no-caps tabindex="6">
          <b>{{ $t('minting_history_list') }}</b>
        </q-btn>
      </div>
      <!-- 공유하기 -->
      <div class="q-pl-xs q-pr-xs q-pt-md">
        <q-btn class="btn" color="primary" size="md" style="width: 116px;" outline @click="shareUrlCopy" no-caps tabindex="4">
          <b>{{ $t('share') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- <q-separator color="primary" style="height: 1px;" /> -->

    <!-- contents -->
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <div v-if="locale === 'ko-KR'" class="col-12" v-html="contents_ko"></div>
        <div v-else class="col-12" v-html="contents"></div>
      </div>
    </div>

    <!-- <q-separator color="primary" style="height: 3px;" /> -->
    
    <div class="row justify-center q-pb-xl"></div>

    <!-- buttons -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="8">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <!-- <LoginModal ref="refLoginModal" @callback-login="callbackLogin" /> -->
  <WalletModal ref="refWalletModal" @callback-wallet="callbackWallet" />
  <KlipQRCodeModal ref="refKlipQRCodeModal" @callback-qr="callbackQRCode" />
  <TokenDetailModal ref="refTokenDetailModal"/>
  <WhitelistModal ref="refWhitelistModal"/>
  <!-- <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

</template>

<script>
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
import { useI18n } from 'vue-i18n'
// import _ from 'lodash'
import { date } from 'quasar'
import { QSpinnerGears } from 'quasar'
import { prepare, request, getResult, getCardList } from 'klip-sdk'
import QRCode from 'qrcode'

export default defineComponent({
  name: 'MintingDetail',
  data () {
    return {
      klipTimer: 300, // 클립 QR코드 유효시간
      interval: '', // 클립 인증 반복확인용
      currentBlock: 0, // 현재 블록
      isStarted: false, // 민팅 시작 여부
      seq_minting_apply: '', // 신청완료시 seq
      isApplied: false,
      isVideoNft: false, // NFT 대표 이미지(nft_image) 비디오 타입 여부
      total_applied: 0,
      remain_time: 86400000, // default 1 day -> 0 으로 설정하면 @end="onCountdownEnd" 가 실행되면서 로직 꼬임!!!
      applyTimeOver: false, // 신청 종료 여부
      totalPrice: '1', // 구매 총액
      mintAmount: 1, // 구매 갯수
      options: '', // 옵션
      seq: '',
      start_time: '',
      end_time: '',
      title: '',
      title_ko: '',
      contents: '',
      contents_ko: '',
      project_seq: '',
      whitelist_seq: '',
      main_image: '',
      nft_image: '',
      collection_uri: '',
			use_reveal_yn: '',
			base_uri: '',
      unrevealed_image_uri: '',
      base_uri_unrevealed: '',
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
      amount_sold: '0',
      amount_remain: '0',
      option_field: '', // 옵션 항목 레이블 표시용 (English)
      option_field_ko: '', // 옵션 항목 레이블 표시용 (Korean)
      option_field_value: '', // 옵션 항목 입력값
      icons: [
        'looks_one',
        'looks_two',
        'looks_3',
        'looks_4',
        'looks_5',
        'looks_6',
        'image', // 나머지는 마지막 아이콘으로 표시됨
      ],
      reveal_time: '',
      contract_address: '', // 민팅 계약 주소
      progress_status: '',
      txidMinting: '', // 민팅 트랜잭션 해시
      myMintingCount: 0, // 사용자 총 구매 수
      confirmGoBack: false,
    }
  },
  components: {
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  watch: {
    getUid (newValue) {
      // NFT 민팅 입력항목 및 액션항목 조회 + 신청합계 조회 및 설정
      // this.selectMintingFieldAndActionList()
    },
    getWalletAddress () {
      // 사용자 총 구매 수 조회
      this.selectMintingHistoryUserMintedAmount()
    },
    mintAmount (newValue, oldValue) {
      // console.log('oldValue: : ' + oldValue)
      // console.log('newValue: : ' + newValue)
      // 같은 숫자를 다시 선택하면 이전 숫자를 유지하게 설정
      if (newValue === 0) {
        this.mintAmount = oldValue
      } else {
        this.totalPrice = Number(Number(this.mint_price * newValue).toFixed(6))
      }
    },
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
    // qDate() {
    //   return date
    // },
  },
  created: function () {
    // 키 설정
    this.seq = this.$route.query.seq

    // locale 파라미터 존재시, 해당 locale 설정
    if (this.$route.query.l === 'ko') {
      this.locale = 'ko-KR'
    } else if (this.$route.query.l === 'en') {
      this.locale = 'en-US'
    } else {
      // klaystar default locale is... ko?
    }

    // NFT 민팅 조회
    this.selectMinting()
  },
  mounted: function () {
    // 사용자 총 구매 수 조회
    this.selectMintingHistoryUserMintedAmount()
  },
  methods: {
    zerofill (value) {
      if (!value) return '00'
      value = value.toString()
      return (value < 10 && value > -1 ? "0" : "") + value
    },
    // onChangeMintNumber(event) {
    //   console.log(event)
    //   // console.log(this.mintAmount)
    //   // if (this.mintAmount === 0) {
    //   //   this.mintAmount = 1
    //   // }
    // },
    async onCountdownEnd() {
      // 타이머 끝나면 시작 전이나 후나 remain_time 실행
      if (!this.isStarted) { // 시작 전 이었으면
        // console.log('시작 전')
        this.isStarted = true
      } else { // 시작 후 였으면
        // console.log('시작 후')
        this.applyTimeOver = true
      }
      this.setRemainTime(this.end_time)
    },
    // async selectMintingFieldAndActionList() {

    //   // 신청합계 조회 및 설정
    //   this.selectMintingApplyTotal()

    //   if (this.getUid) {
    //     // 로그인 유저인 경우
    //     // 신청여부 조회 -> minting_apply의 seq 조회
    //     this.seq_minting_apply = await this.selectMintingApplySeq()
    //     if (this.seq_minting_apply) {
    //       this.isApplied = true
    //       // 신청 완료인 경우, 입력항목 결과 리스트 조회
    //       this.selectMintingFieldWithResultList()
    //       // // 신청 완료인 경우, 액션항목 결과 리스트 조회
    //       // this.selectMintingActionWithResultList()
    //     } else {
    //       this.isApplied = false
    //       // 신청 미완료인 경우, 입력항목 리스트 조회
    //       this.selectMintingFieldList()
    //       // // 신청 미완료인 경우, 액션항목 리스트 조회
    //       // this.selectMintingActionList()
    //     }

    //   } else {
    //     // 비로그인시, 입력항목 리스트 조회
    //     this.selectMintingFieldList()
    //     // 비로그인시, 액션항목 리스트 조회
    //     this.selectMintingActionList()
    //   }
    // },
    // 기본정보 조회
    async selectMinting() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMinting', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)

        // 1. 항목 설정
        // this.seq = result.data.seq
        this.start_time = result.data.start_time
        this.end_time = result.data.end_time
        this.title = result.data.title
        this.contents = result.data.contents
        this.title_ko = result.data.title_ko
        this.contents_ko = result.data.contents_ko
        this.project_seq = result.data.project_seq
        this.whitelist_seq = result.data.whitelist_seq
        this.main_image = result.data.main_image
        this.nft_image = result.data.nft_image
        this.collection_uri = result.data.collection_uri
        this.use_reveal_yn = result.data.use_reveal_yn
        this.base_uri = result.data.base_uri
        this.unrevealed_image_uri = result.data.unrevealed_image_uri
        this.base_uri_unrevealed = result.data.base_uri_unrevealed
        this.anti_bot_interval = result.data.anti_bot_interval
        this.mint_limit_per_block = result.data.mint_limit_per_block
        this.mint_limit_per_sale = result.data.mint_limit_per_sale
        this.mint_start_block_number = result.data.mint_start_block_number
        this.mint_index_for_sale = result.data.mint_index_for_sale
        this.max_sale_amount = result.data.max_sale_amount
        this.mint_price = result.data.mint_price
        this.pay_token_name = result.data.pay_token_name
        this.pay_token_symbol = result.data.pay_token_symbol
        this.pay_token_decimals = result.data.pay_token_decimals
        this.pay_token_contract_address = result.data.pay_token_contract_address
        this.pay_token_logo_image = result.data.pay_token_logo_image
        this.amount_sold = result.data.amount_sold
        this.amount_remain = result.data.amount_remain
        this.option_field = result.data.option_field
        this.option_field_ko = result.data.option_field_ko

        this.contract_address = result.data.contract_address
        this.reveal_time = result.data.reveal_time

        this.progress_status = result.data.progress_status

        this.totalPrice = result.data.mint_price // 구매 총액 초기 설정 - 1개 가격

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

        // 2. 남은 시간 계산
        // console.log('this.currentBlock: ' + this.currentBlock)
        // console.log('this.mint_start_block_number: ' + this.mint_start_block_number)
        // this.setRemainTime(this.end_time)

        // 현재 블록 조회 후 남은 시간 재계산
        // caver.klay.getBlockNumber()
        //   // .then(console.log)
        //   .then((result) => {
        //     console.log(result)
        //     this.currentBlock = result
        //     if (!this.mint_start_block_number) { // 시작블록이 NULL 인 경우 - 민팅 등록 직후
        //       this.setRemainTime(this.start_time)
        //     } else if (this.currentBlock < this.mint_start_block_number) { // 시작 전
        //       console.log('this.currentBlock < mint_start_block_number')
        //       // if (this.progress_status === 'WAITING') {
        //       //   this.setRemainTime(this.start_time)  
        //       // } else {
        //         this.setRemainTimeByBlock((this.mint_start_block_number - this.currentBlock) * 1000)
        //       // }
        //     } else { // 시작 후
        //       // console.log('시작 후')
        //       // console.log(this.end_time)
        //       this.isStarted = true
        //       this.setRemainTime(this.end_time)
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //     this.setRemainTime(this.end_time)
        //   })
        
        // 2. 남은 시간 계산
        // api 호출 방식으로 수정 - 모바일에서 카이카스 지갑 사용 못함 = caver 객체 사용 못함
        const param = {
          uid: this.getUid,
        }
        this.$axios.get('/api/klay/getBlockNumber', { params: { ...param } })
          .then((result) => {
            // console.log(result.data)
            this.currentBlock = result.data
            if (!this.mint_start_block_number) { // 시작블록이 NULL 인 경우 - 민팅 등록 직후
              this.setRemainTime(this.start_time)
            } else if (this.currentBlock < this.mint_start_block_number) { // 시작 전
              // console.log('this.currentBlock < mint_start_block_number')
              // if (this.progress_status === 'WAITING') {
              //   this.setRemainTime(this.start_time)  
              // } else {
                this.setRemainTimeByBlock((this.mint_start_block_number - this.currentBlock) * 1000)
              // }
            } else { // 시작 후
              // console.log('시작 후')
              // console.log(this.end_time)
              this.isStarted = true
              this.setRemainTime(this.end_time)
            }
          })
          .catch((err) => {
            console.log(err)
            this.setRemainTime(this.end_time)
          })
          
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 신청합계 조회
    async selectMintingApplyTotal() {
      const param = {
        uid: this.getUid,
        seq_minting: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMintingApplyTotal', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.total_applied = result.data
      } else {
        this.total_applied = 0
      }
    },
    // 남은시간 설정
    async setRemainTime(targetTime) {
      // const today = this.now
      const param = {
        uid: this.getUid,
      }
      const { data: now } = await this.$axios.get('/api/common/getNow', { params: { ...param }})
      // const targetDate = new Date(targetTime)
      // const targetDate = targetTime
      // console.log('now: ' + now)
      // console.log('targetTime: ' + targetTime)
      const diff = date.getDateDiff(targetTime, now, 'seconds')
      // console.log('diff: ' + diff)
      if (diff < 0) {
        this.remain_time = 0
        this.applyTimeOver = true
      } else {
        this.remain_time = diff * 1000
      }
    },
    setRemainTimeByBlock(remainBlock) {
      this.remain_time = remainBlock
    },
    // 신청여부 조회 -> minting_apply의 seq 조회, 반환
    async selectMintingApplySeq() {
      const param = {
        uid: this.getUid,
        seq_minting: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMintingApplySeq', { params: { ...param } })
      if (result.data && result.data.seq) {
        // console.log(result.data)
        return result.data.seq
      } else {
        return null
      }
    },
    // 입력항목 리스트 조회
    async selectMintingFieldList() {
      const param = {
        uid: this.getUid,
        seqMinting: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMintingFieldList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data

        // set login user wallet address
        if (this.getUid) {
          this.rows[0].value = this.getUid
        }
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 입력항목 결과 리스트 조회
    async selectMintingFieldWithResultList() {
      const param = {
        uid: this.getUid,
        seqMinting: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMintingFieldWithResultList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data
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

      if (this.option_field || this.option_field_ko) {
        if (!this.$refs.option_field_value.validate()) {
          this.$noti(this.$q, this.$t('validation_failed_minting_option_field_value'))
          result = false
        }
      }

      return result
    },
    openUrl(url) {
      window.open(url)
    },
    shareUrlCopy() {
      // API 서버로 보내서 og 정보 달고 다시 frontPath로 넘어옴. path: https://nftpy.io/#/winfo?seq=999&locale=XXX
      const host = location.protocol + '//' + location.host
      const url = host + '/m?s=' + this.seq + '&l=' + this.locale.substring(0, 2) // seq, locale

      // 클립보드로 복사하기
      this.$copyText(url).then(this.copyValueSuccess, this.copyValueFail)
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
    showProject() {
      // 프로젝트 정보 모달 표시
      this.$refs.refTokenDetailModal.tokenSeq = this.project_seq
      this.$refs.refTokenDetailModal.show()
    },
    goMintingHistoryList() {
      // NFT 민팅 내역 화면으로 이동
      this.$router.push({ path: '/minting/mintingHistoryList', query: { seq: this.seq }})
    },
    showWhitelist() {
      // 화이트리스트 모달 표시
      this.$refs.refWhitelistModal.whitelistSeqArray = this.whitelist_seq
      this.$refs.refWhitelistModal.show()
    },
    // 구매 처리
    async buy() {
      // Field validation check
      if (!this.validate()) {
        return
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // 1. 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid || !this.getWalletType || !this.getWalletAddress) {
        // console.log('this.getWalletType: ' + this.getWalletType)
        // console.log('this.getWalletAddress: ' + this.getWalletAddress)
        this.$refs.refWalletModal.show()
        return
      }

      // 2. 화이트리스트 사용일 경우, 대상자 여부 체크
      const isEligible = await this.checkWhitelist()
      if (!isEligible) {
        // 화이트리스트 대상이 아닙니다. You are not on the whitelist.
        this.$noti(this.$q, this.$t('not_on_the_whitelist'))
        return
      }

      // 3. 지갑당 최대 구매 수 체크
      const myAmount = this.myMintingCount + this.mintAmount
      if (myAmount > this.mint_limit_per_sale) {
        this.$noti(this.$q, this.$t('maximum_number_of_purchases_exceeded'))
        return
      }

      // 4. 매진 체크
      await this.selectMintingAmountSold()
      const amountRemainServer = this.max_sale_amount - this.amount_sold
      if (amountRemainServer === 0) {
        this.$noti(this.$q, this.$t('sold_out')) // It's sold out.
        this.applyTimeOver = true
        return
      }

      // 5. 남은 물량 수 오버 체크
      // NFT 민팅 정보 조회 - 민팅 후 화면 리프레시용 - 총 판매 수
      if (this.mintAmount > amountRemainServer) { // 구매수 가 (총판매수 - 판매수) 보다 큰 경우
        this.$noti(this.$q, this.$t('the_remaining_quantity_is_insufficient')) // The remaining quantity is insufficient.
        return
      }

      // 6. 지갑 잠김 체크
      let currentWalletAddress = ''
      // console.log(this.getWalletType)
      if (this.getWalletType === 'kaikas') {
        const accounts = await klaytn.enable()
        currentWalletAddress = accounts[0]

        // 메인넷 체크
        if (klaytn.networkVersion !== 8217) {
            this.$noti(this.$q, this.$t('set_to_the_mainnet')) // 네트워크를 메인넷(Klaytn Cypress)으로 설정해주세요.
            return
        }
      } else if (this.getWalletType === 'metamask') {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        currentWalletAddress = accounts[0]

        // 메인넷 체크
        const chainId = await ethereum.request({ method: 'eth_chainId' })
        if (chainId !== '0x2019') {
            this.$noti(this.$q, this.$t('set_to_the_mainnet')) // 네트워크를 메인넷(Klaytn Cypress)으로 설정해주세요.
            return
        }
      } else if (this.getWalletType === 'klip') {
        currentWalletAddress = this.getWalletAddress
      } else {
        // 지갑 해당 없을 경우
        this.$noti(this.$q, this.$t('this_wallet_is_not_currently_supported')) // 현재 지원되지 않는 지갑입니다.
        return
      }
      // console.log('currentWalletAddress: ' + currentWalletAddress)
      if (currentWalletAddress !== this.getWalletAddress) {
        this.$noti(this.$q, this.$t('wallet_addresses_are_different')) // 지갑 주소가 서로 다릅니다.
        this.$refs.refWalletModal.show()
        return
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // this.$q.loading.show() // 로딩 표시 시작
      // 로딩 표시 시작
      // console.log('로딩 표시 시작')
      this.$q.loading.show({
        spinner: QSpinnerGears,
        message: this.$t('loading_message_minting'),
      })
      // console.log('로딩 표시 시작 end')
      try {
        // 4. 민팅 총 비용 계산 후 16진수로 설정
        let totalAmount = this.totalPrice
        // console.log('totalAmount: ' + totalAmount)
        // console.log('this.pay_token_decimals: ' + this.pay_token_decimals)
        for (let i = 0; i < this.pay_token_decimals; i++) {
          totalAmount = totalAmount * 10
        }
        // console.log('totalAmount: ' + totalAmount)
        const totalAmountHex = '0x' + Number(totalAmount).toString(16)
        // console.log('hexDepositTokenAmount: ' + amount)

        // 5. 화이트리스트 사용 여부 설정 - 화이트리스트 민팅 or 퍼블릭 민팅
        let isWhitelistMinting = false
        if (this.whitelist_seq) {
          isWhitelistMinting = true
        }

        // 6. 구매(민팅) 처리
        if (this.getWalletType === 'kaikas') {
          // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 1. kaikas
          // 1. kaikas
          // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 1. kaikas
          const abiJson = JSON.parse('[{"constant":false,"inputs":[{"name":"requestedCount","type":"uint256"},{"name":"isWhitelistMinting","type":"bool"}],"name":"doMint","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]')
          const mintingContract = new caver.klay.Contract(abiJson, this.contract_address)
          // console.log(mintingContract)

          // // 가스비 측정
          // const gasAmount = await mintingContract.methods.publicMint(this.mintAmount).estimateGas({
          //     from: this.getWalletAddress,
          //     gas: 6000000,
          //     value: totalAmountHex,
          // })

          // 민팅
          mintingContract.methods.doMint(this.mintAmount, isWhitelistMinting).send({
              from: this.getWalletAddress,
              gas: 1500000,
              value: totalAmountHex,
          })
            .then((result) => {
              this.$q.loading.hide() // 로딩 표시 종료
              // console.log(result)
              // console.log('result.transactionHash: ' + result.transactionHash)

              // 민팅 트랜잭션 해시 설정
              this.txidMinting = result.transactionHash

              // 후속처리 - 거래내역 등록
              this.insertMintingHistory()
            })
            .catch((err) => {
              this.$q.loading.hide() // 로딩 표시 종료
              this.$noti(this.$q, err.message)
              this.$noti(this.$q, this.$t('minting_minting_failed')) // 민팅 실패
              console.log(err)
              return
            })
            
        } else if (this.getWalletType === 'metamask') {
          // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 2. metamask
          // 2. metamask
          // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 2. metamask
          // this.$q.loading.hide() // 로딩 표시 종료

          // const tokenContract = ethereum.Contract(abiJson, this.contract_address)

          // console.log('this.mintAmount: ' + this.mintAmount)
          // console.log('isWhitelistMinting: ' + isWhitelistMinting)

          const encData = caver.abi.encodeFunctionCall({
            name: 'doMint',
            type: 'function',
            inputs: [
              {
                type: 'uint256',
                name: 'requestedCount',
              },
              {
                type: 'bool',
                name: 'isWhitelistMinting',
              }
            ]
          }, [
            this.mintAmount,
            isWhitelistMinting,
          ])

          // console.log(ethereum.send)
          // console.log(ethereum.request)
          // const tokenContract = new caver.klay.Contract(abiJson, this.contract_address)
          // console.log(tokenContract)
          // ethereum.send(tokenContract)
          // console.log(encData)

          const transactionParameters = {
            // nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x3a35294400', // customizable by user during MetaMask confirmation.
            gas: '0x16e360', // 1,500,000 customizable by user during MetaMask confirmation.
            from: ethereum.selectedAddress, // Required except during contract publications.
            to: this.contract_address, // must match user's active address.
            value: totalAmountHex, // Only required to send ether to the recipient from the initiating external account.
            // data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            data: encData,
            // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
          }

          ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
            })
            .then((result) => {
              // console.log(result)

              // 민팅 트랜잭션 해시 설정
              this.txidMinting = result

              // 후속처리 - 거래내역 등록
              this.insertMintingHistory()
            })
            .catch((err) => {
              // Some unexpected error.
              // For backwards compatibility reasons, if no accounts are available,
              // eth_accounts will return an empty array.
              this.$q.loading.hide() // 로딩 표시 종료
              this.$noti(this.$q, err.message)
              this.$noti(this.$q, this.$t('minting_minting_failed')) // 민팅 실패
              console.log(err)
              return
              // console.error(err)
              // this.$noti(this.$q, this.$t('minting_claim_failed'))
            })

          // console.log('txidClaimed: ' + txidClaimed)

          // 후속처리
          // this.updateMintingHistory(txidClaimed)

        } else if (this.getWalletType === 'klip') {
          this.$q.loading.hide() // 로딩 표시 종료 -> 클립은 화면에 QR코드 찍어야 해서 로딩 종료.
          // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3 klip
          // 3 klip
          // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3 klip
          // PC와 모바일 분기
          const abiKlip = '{"constant":false,"inputs":[{"name":"requestedCount","type":"uint256"},{"name":"isWhitelistMinting","type":"bool"}],"name":"doMint","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}'

          const param = {
            bapp: {
              name: 'KLAYSTAR',
            },
            type: 'execute_contract',
            transaction: {
              // from: this.getWalletAddress,
              // to: this.$systemWalletAddress,
              to: this.contract_address,
              value: String(totalAmount), // peb 단위의 String 형 이어야 함. 아니면 에러남.
              abi: abiKlip,
              params: '["' + this.mintAmount +  '",' + isWhitelistMinting + ']',
            },
          }
          // let res = null
          // res = await this.$axios.post('https://a2a-api.klipwallet.com/v2/a2a/prepare', param)
          // prepare.sendKLAY
          this.$axios.post('https://a2a-api.klipwallet.com/v2/a2a/prepare', param)
            .then((result) => {
              // console.log(JSON.stringify(result.data))
              // console.log(result.data)
              if (result.data) {
                const requestKey = result.data.request_key

                if (!requestKey) {
                  this.$q.loading.hide() // 로딩 표시 종료
                  this.$noti(this.$q, 'Klip request_key failed.')
                  return
                }

                if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
                  // 1. 모바일인 경우
                  try {
                    request(requestKey, () => alert('Run in a mobile.'))

                    // 요청 후 1초 간격으로 승인 여부 확인
                    this.checkKlipAuthResult(requestKey)
                  } catch (error) {
                    this.$q.loading.hide() // 로딩 표시 종료
                    console.log(error)
                    this.$noti(this.$q, error.message)
                    return
                  }
                } else {
                  // alert('PC')
                  // 2. PC인 경우 - QR코드 생성
                  // QR코드 생성
                  QRCode.toDataURL('https://klipwallet.com/?target=/a2a?request_key=' + requestKey)
                    .then(data => {
                      // console.log(data)
                      this.$refs.refKlipQRCodeModal.url = data
                      this.$refs.refKlipQRCodeModal.show()

                      // 요청 후 1초 간격으로 승인 여부 확인
                      this.checkKlipAuthResult(requestKey)
                    })
                    .catch(err => {
                      this.$q.loading.hide() // 로딩 표시 종료
                      console.error(err)
                      return
                    })
                }
              } else {
                this.$q.loading.hide() // 로딩 표시 종료
                this.$noti(this.$q, 'Klip request failed.')
                return
              }
            })
            .catch((err) => {
              this.$q.loading.hide() // 로딩 표시 종료
              this.$noti(this.$q, this.$t('minting_insufficient_funds'))
              console.log(err)
              return
            })
        } else {
          // 지갑 해당 없을 경우
          this.$q.loading.hide() // 로딩 표시 종료
          this.$noti(this.$q, this.$t('this_wallet_is_not_currently_supported'))
          return
        }

      } catch (err) {
        // 민팅 처리 실패인 경우
        this.$q.loading.hide() // 로딩 표시 종료
        this.$noti(this.$q, err)
        this.$noti(this.$q, this.$t('minting_minting_error')) // 민팅 에러
        console.log(err)
        return
      }
    },

    // 거래내역 등록
    async insertMintingHistory() {

      if(!this.txidMinting) {
        this.$noti(this.$q, this.$t('minting_txid_is_null'))
        return
      }
      
      // this.$q.loading.show() // 로딩 표시 시작

      // 거래내역 등록 처리
      const param = {
        uid: this.getUid,
        seq_minting: this.seq,
        pay_token_contract_address: this.pay_token_contract_address,
        pay_token_symbol: this.pay_token_symbol,
        pay_token_amount: this.totalPrice,
        pay_token_total_usd: null,
        pay_token_logo_image: this.pay_token_logo_image,
        amount: this.mintAmount,
        option_field_value: this.option_field_value,
        wallet_address: this.getWalletAddress,
        wallet_type: this.getWalletType,
        txid_minting: this.txidMinting,
      }
      this.$axios.post('/api/minting/insertMintingHistory', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('minting_minting_success'))

            // NFT 민팅 정보 조회 - 민팅 후 화면 리프레시용 - 총 판매 수
            this.selectMintingAmountSold()
            // 사용자 총 구매 수 조회
            this.selectMintingHistoryUserMintedAmount()
          } else {
            this.$noti(this.$q, this.$t('minting_minting_failed'))
            return
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
          return
        })
    },
    // NFT 민팅 정보 조회 - 민팅 후 화면 리프레시용 - 총 판매 수
    async selectMintingAmountSold() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMintingAmountSold', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // 1. 항목 설정
        this.amount_sold = result.data
      }
    },
    // 사용자 총 구매 수 조회
    async selectMintingHistoryUserMintedAmount() {
      // console.log('this.getWalletAddress: ' + this.getWalletAddress)
      if (!this.getWalletAddress) {
        return
      }
      const param = {
        uid: this.getUid,
        seq_minting: this.seq,
        wallet_address: this.getWalletAddress,
      }
      const result = await this.$axios.get('/api/minting/selectMintingHistoryUserMintedAmount', { params: { ...param } })
      // console.log(result)
      // 1. 항목 설정
      if (result && result.data) {
        this.myMintingCount = result.data
      } else {
        this.myMintingCount = 0
      }
    },
    callbackQRCode(resultObj) {
      this.clearKlipTimer()
    },
    clearKlipTimer() {
      clearInterval(this.interval)
      this.klipTimer = 300
    },
    checkKlipAuthResult(requestKey) {
      // 1초 간격으로 반복
      this.interval = setInterval(() => {
        this.klipTimer-- // 1초씩 감소

        // auth result 체크
        this.$axios.get('https://a2a-api.klipwallet.com/v2/a2a/result', {params: {request_key: requestKey}})
          .then((result) => {
            // console.log(JSON.stringify(result.data))

            if (result.data && result.data.status === 'completed') {

              // 반복 해제
              this.clearKlipTimer()

              this.txidMinting = result.data.result.tx_hash
              // 거래내역 등록 - klip 은 checkKlipAuthResult 에서 처리 성공 확인시 호출
              this.insertMintingHistory()

              try {
                // 모바일에서는 필요없는 처리
                this.$refs.refKlipQRCodeModal.close()
              } catch(e) {
                console.log(e)
              }

            }
          })
          .catch((err) => {
            console.log(err)
          })

        if (this.klipTimer <= 0) {
          // 반복 해제
          this.clearKlipTimer()
        }
      }, 1000)
      /*
      // https://a2a-api.klipwallet.com/v2/a2a/result?request_key=139ce76b-fc97-403a-be1e-4cd0288154db
      this.$axios.get('https://a2a-api.klipwallet.com/v2/a2a/result', {params: {request_key: requestKey}})
        .then((result) => {
          console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
      */
    },
    // 화이트리스트 대상 확인
    async checkWhitelist() {
      if (!this.whitelist_seq) {
        // 화이트리스트를 사용하지 않는 경우, 통과
        return true
      } else {
        // 화이트리스트를 사용하는 경우
        const param = {
          uid: this.getUid,
          whitelistSeqArray: this.whitelist_seq,
          wallet_address: this.getWalletAddress,
        }
        const result = await this.$axios.get('/api/whitelist/selectWhitelistApplyResultByWalletAddress', { params: { ...param } })
        if (result && result.data && result.data.resultCd === 'SUCCESS') {
          return true
        } else {
          return false
        }
      }
    },
    goBack() {
      // goBack 확인창 표시
      // this.confirmGoBack = true
      this.$router.go(-1)
    },
    // doGoBack() {
    //   this.$router.go(-1)
    //   // this.$router.push('/minting/myMintingList')
    // }
  }
})
</script>

<style scoped>
</style>
