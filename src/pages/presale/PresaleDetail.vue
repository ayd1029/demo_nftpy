<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading text-h5 text-bold text-center">
        <span v-if="locale === 'ko-KR'">{{ title_ko }}</span>
        <span v-else>{{ title }}</span>
      </div>
    </div>

    <!-- 상단 버튼 -->
    <div class="row justify-center q-pb-md">
      <!-- 프로젝트 -->
      <div v-if="token_seq" class="q-pl-xs q-pr-xs q-pt-md">
        <q-btn class="btn" color="primary" size="md" style="width: 116px;" outline @click="showProject" no-caps tabindex="2">
          <b>{{ $t('project') }}</b>
        </q-btn>
      </div>
      <!-- 화이트리스트 -->
      <div v-if="whitelist_seq" class="q-pl-xs q-pr-xs q-pt-md">
        <q-btn class="btn" color="primary" size="md" style="width: 116px;" outline @click="showWhitelist" no-caps tabindex="7">
          <b>{{ $t('whitelist') }}</b>
        </q-btn>
      </div>
      <!-- 거래내역 -->
      <div class="q-pl-xs q-pr-xs q-pt-md">
        <q-btn class="btn" color="primary" size="md" style="width: 116px;" outline @click="goPresaleHistoryList" no-caps tabindex="2">
          <b>{{ $t('presale_history_list') }}</b>
        </q-btn>
      </div>
      <!-- 공유하기 -->
      <div class="q-pl-xs q-pr-xs q-pt-md">
        <q-btn class="btn" color="primary" size="md" style="width: 116px;" outline @click="shareUrlCopy" no-caps tabindex="1">
          <b>{{ $t('share') }}</b>
        </q-btn>
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- 남은시간 -->
    <div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td colspan="3">
            <div class="q-pt-sm"></div>
          </td>
        </tr>
        <tr>
          <td width="33%" align="center">
            <!-- {{ progress_status }} / {{ start_time }} / {{ end_time }} / {{ now }} -->
            <span v-if="progress_status === 'CREATED'" class="">{{ $t('presale_time_not_confirmed') }}</span>
            <span v-else-if="progress_status === 'WAITING'" class="">{{ $t('presale_time_to_start') }}</span>
            <span v-else-if="progress_status === 'STARTED'" class="">{{ $t('presale_time_to_end') }}</span>
            <span v-else class="">{{ $t('presale_time_ended') }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <div class="q-pt-sm"></div>
            <q-separator color="primary" />
            <div class="q-pt-sm"></div>
          </td>
        </tr>
        <!-- <tr>
          <td align="center">
            {{ remain_time }}
            {{ $t('presale_remain_hour') }}
          </td>
        </tr> -->
        <tr>
          <td align="center" class="text-h4">
            <!-- remain_time: {{ remain_time }} //  -->
            <VueCountdown :time="remain_time" :interval="1000" @end="onCountdownEnd">
              <!-- <template v-slot="props">{{ props.days }} Days {{ zerofill(props.hours + (props.days * 24)) }} : {{ zerofill(props.minutes) }} : {{ zerofill(props.seconds) }}</template> -->
              <template v-slot="props">{{ zerofill(props.hours + (props.days * 24)) }} : {{ zerofill(props.minutes) }} : {{ zerofill(props.seconds) }}</template>
            </VueCountdown>
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <div class="q-pt-sm"></div>
          </td>
        </tr>
      </table>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- 판매율 -->
    <div v-if="type === 'FIXED'" class="row justify-center q-pt-lg">
      <div class="col-9 text-center">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_progress') }}</span>
      </div>
    </div>
    <div v-if="type === 'FIXED'" class="row justify-center">
      <div class="col-9">
        <q-linear-progress size="40px" :value="progress" color="primary" stripe rounded>
          <div class="absolute-full flex flex-center">
            <q-badge color="white" text-color="black">
              {{ progressLabel }} %
            </q-badge>
          </div>
        </q-linear-progress>
      </div>
      <div class="col-9">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="35%"></td>
            <td width="30%" class="text-center">{{ Number(amount_sold).toLocaleString() }}<br />{{ token_symbol }}</td>
            <td width="35%" class="text-right">{{ Number(amount).toLocaleString() }}<br />{{ token_symbol }}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- 신청 컴포넌트 -->
    <div class="row justify justify-center q-pt-lg q-pb-lg">
        <SwapPresale ref="refSwapPresale" :presaleSeq="seq" :type="type" :progressStatus="progress_status" @applyPresale="applyPresale" @callback-wallet-from-swap-presale="callbackWallet" />
    </div>

    <!-- 유저 하드캡 표시 -->
    <div class="row justify justify-center q-pb-lg">
      <div class="text-center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="141" class="text-left">{{ $t('presale_user_apply_total_usd') }} (USD)</td>
            <td width="20" class="text-center">:</td>
            <td width="" class="text-right">{{ userDepositTokenUsd }}</td>
          </tr>
          <tr>
            <td class="text-left">{{ $t('presale_user_remain_total_usd') }} (USD)</td>
            <td class="text-center">:</td>
            <td v-if="user_hardcap === '0'" class="text-right">{{ $t('presale_no_limit') }}</td>
            <td v-else class="text-right">{{ userRemainTokenUsd }}</td>
          </tr>
        </table>
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- 메인 이미지 -->
    <div v-if="main_image" class="row justify-center q-pt-lg">
      <div class="col-12">
        <img :src="main_image" style="width: 100%;">
      </div>
    </div>

    <!-- <q-separator color="primary" style="height: 1px;" /> -->

    <!-- contents -->
    <div class="row justify-center q-pt-md q-pb-md">
      <div class="col-12">
        <div v-if="locale === 'ko-KR'" class="col-12" v-html="contents_ko"></div>
        <div v-else class="col-12" v-html="contents"></div>
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- presale base info -->
    <div class="q-pt-md q-pb-md">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td colspan="3"><span class="">■ {{ $t('presale_base_information') }} ■</span></td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="q-pt-sm"></div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img v-if="token_logo_image" :src="token_logo_image">
                  <q-icon v-else name="generating_tokens" size="md" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="row">
                  <q-item-label class="col-12">{{ token_name }}</q-item-label>
                  <q-item-label class="col-12 text-weight-bold">{{ token_symbol }}</q-item-label>
                </div>
              </q-item-section>
            </q-item>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="q-pt-sm"></div>
          </td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_team_name') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="locale === 'ko-KR'"><span class="">{{ team_name_ko }}</span></td>
          <td v-else><span class="">{{ team_name }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_pre_value') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="locale === 'ko-KR'"><span class="">{{ Number(pre_value_krw).toLocaleString() }} 원</span></td>
          <td v-else><span class="">$ {{ Number(pre_value).toLocaleString() }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_official_website') }}</span></td>
          <td><span class="">:</span></td>
          <td><a @click="openUrl(official_website)" class="text-weight-bold" style="cursor: pointer;"><span class="">{{ official_website }}</span></a></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_official_email') }}</span></td>
          <td><span class="">:</span></td>
          <td><span class="">{{ official_email }}</span></td>
        </tr>
        <!-- 토큰 정보 -->
        <tr>
          <td><span class="">{{ $t('presale_token_name') }}</span></td>
          <td><span class="">:</span></td>
          <td><span class="">{{ token_name }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_token_symbol') }}</span></td>
          <td><span class="">:</span></td>
          <td><span class="">{{ token_symbol }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_token_total_supply') }}</span></td>
          <td><span class="">:</span></td>
          <td><span class="">{{ Number(token_total_supply).toLocaleString() }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_token_contract_address') }}</span></td>
          <td><span class="">:</span></td>
          <td><a @click="openUrl('https://scope.klaytn.com/account/' + token_contract_address)" class="text-weight-bold" style="cursor: pointer;"><span class="">{{ token_contract_address }}</span></a></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_whitepaper') }}</span></td>
          <td><span class="">:</span></td>
          <td><a @click="openUrl(whitepaper)" class="text-weight-bold" style="cursor: pointer;"><span class="">{{ whitepaper }}</span></a></td>
        </tr>
        <!-- 사전판매 정보 -->
        <tr>
          <td width="150"><span class="">{{ $t('presale_type') }}</span></td>
          <td width="10"><span class="">:</span></td>
          <td width="">
            <span v-if="type === 'FIXED'">{{ $t('presale_type_fixed_price') }}</span>
            <span v-else-if="type === 'AUCTION'">{{ $t('presale_type_auction_swap') }}</span>
          </td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_start_time') }}</span></td>
          <td><span class="">:</span></td>
          <td><span class="">{{ start_time }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_end_time') }}</span></td>
          <td><span class="">:</span></td>
          <td><span class="">{{ end_time }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_claim_time') }}</span></td>
          <td><span class="">:</span></td>
          <td><span class="">{{ claim_time }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('whitelist_seq') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="!whitelist_seq"><span class="">{{ $t('presale_no_limit') }}</span></td>
          <td v-else><span class="">{{ whitelist_seq }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_price') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="type === 'AUCTION'"><span class="">{{ $t('presale_type_auction') }}</span></td>
          <td v-else><span class="">$ {{ Number(price).toLocaleString() }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_listing_price') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="!listing_price || listing_price == '0'"><span class="">{{ $t('presale_listing_price_undetermined') }}</span></td>
          <td v-else><span class="">$ {{ Number(listing_price).toLocaleString() }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_amount') }}</span></td>
          <td><span class="">:</span></td>
          <td><span class="">{{ Number(amount).toLocaleString() }} {{ token_symbol }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_softcap') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="softcap == '0'"><span class="">{{ $t('presale_no_limit') }}</span></td>
          <td v-else><span class="">$ {{ Number(softcap).toFixed(0).toLocaleString() }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_hardcap') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="hardcap == '0'"><span class="">{{ $t('presale_no_limit') }}</span></td>
          <td v-else><span class="">$ {{ Number(hardcap).toFixed(0).toLocaleString() }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_user_softcap') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="user_softcap == '0'"><span class="">{{ $t('presale_no_limit') }}</span></td>
          <td v-else><span class="">$ {{ Number(user_softcap).toFixed(0).toLocaleString() }}</span></td>
        </tr>
        <tr>
          <td><span class="">{{ $t('presale_user_hardcap') }}</span></td>
          <td><span class="">:</span></td>
          <td v-if="user_hardcap == '0'"><span class="">{{ $t('presale_no_limit') }}</span></td>
          <td v-else><span class="">$ {{ Number(user_hardcap).toFixed(0).toLocaleString() }}</span></td>
        </tr>
      </table>
    </div>

    <q-separator color="primary" style="height: 3px;" />
    
    <div class="q-pt-lg"></div>

    <!-- buttons -->
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="32">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">

        <div v-if="!isClaimable">
          <q-btn class="btn" color="grey-5" text-color="black" size="lg" style="width: 98%;" disable tabindex="31">
            <b>{{ $t('presale_claim') }}</b>
          </q-btn>
        </div>
        <div v-else>
          <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="claimToken" tabindex="31">
            <b>{{ $t('presale_claim') }}</b>
          </q-btn>
        </div>

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

</template>

<script>
import { defineComponent } from 'vue';
// import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
import { useI18n } from 'vue-i18n'
// import _ from 'lodash'
import { date } from 'quasar'
import { prepare, request, getResult, getCardList } from 'klip-sdk'
import QRCode from 'qrcode'
// import BigNumber from 'big-number'

export default defineComponent({
  name: 'PresaleDetail',
  data () {
    return {
      txidDeposit: '', // transaction hash - 토큰 전송 트랜잭션 해시
      paramTokenObj: {}, // 제공(send) 토큰 정보 - from 컴포넌트
      userDepositTokenUsd: '0', // 사용자 구매 토큰 USD
      userRemainTokenUsd: '', // 사용자 구매가능 토큰 USD
      klipTimer: 300, // 클립 QR코드 유효시간
      interval: '', // 클립 인증 반복확인용
      // seq_presale_apply: '', // 신청완료시 seq
      isApplied: false,
      isClaimable: false,
      // total_applied: 0,
      remain_time: 86400000, // default 1 day -> 0 으로 설정하면 @end="onCountdownEnd" 가 실행되면서 로직 꼬임!!!
      presaleTimeOver: false, // 판매 종료 여부
      progress: 0,
      progressLabel: '',
      seq: '',
      token_seq: '',
      token_contract_address: '', // 대상 토큰 계약 주소
      token_name: '', // 대상 토큰 이름
      token_symbol: '', // 대상 토큰 심볼
      token_total_supply: '', // 대상 토큰 총 발행량
      token_logo_image: '', // 대상 토큰 로고 이미지 URL
      official_website: '', // 공식 웹사이트
      official_email: '', // 공식 이메일
      whitepaper: '', // 백서 URL
      // targetWhitelist: {},
      // targetWhitelistList: [], // 대상 화이트리스트 리스트
      // targetWhitelistOptions: [], // 화이트리스트 리스트 - 검색용
      whitelist_seq: '',
      start_time: '',
      end_time: '',
      claim_time: '',
      title: '',
      title_ko: '',
      team_name: '',
      team_name_ko: '',
      pre_value: '',
      pre_value_krw: '',
      contents: '',
      contents_ko: '',
      type: 'FIXED',
      price: '0',
      listing_price: '0',
      amount: '0',
      softcap: '0',
      hardcap: '0',
      user_softcap: '0',
      user_hardcap: '0',
      amount_sold: '',
      amount_remain: '',
      main_image: '',
      // now: '',
      progress_status: '', // 진행 상태 (하기 쿼리 참고)
      // /////////////////////////////////////////////////////////
      //   , CASE
      // 	WHEN (STATUS_CD = '10') THEN 'CREATED'
      // 	WHEN (STATUS_CD = '40') THEN 'COMPLETED'
      //       WHEN (STATUS_CD = '30' AND END_TIME < NOW()) THEN 'ENDED'
      //       WHEN (STATUS_CD = '30' AND NOW() BETWEEN START_TIME AND END_TIME) THEN 'STARTED'
      //       ELSE 'WAITING'
      // END AS PROGRESS_STATUS
      // /////////////////////////////////////////////////////////
      confirmGoBack: false,
    }
  },
  components: {
  },
  watch: {
    getWalletAddress (newValue) {
      // console.log('newValue: : ' + newValue)
      // 사용자 구매이력 조회
      if (newValue) {
        this.selectPresaleHistoryUserDepositTokenTotalUsd()
      }
    },
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

    // 사전판매 조회
    this.selectPresale()

    // 사용자 구매이력 조회
    if (this.getWalletAddress) {
      this.selectPresaleHistoryUserDepositTokenTotalUsd()
    }
  },
  mounted: function () {},
  methods: {
    zerofill (value) {
      if (!value) return '00'
      value = value.toString()
      return (value < 10 && value > -1 ? "0" : "") + value
    },
    async selectPresaleHistoryUserDepositTokenTotalUsd() {
      // 사용자 구매이력 조회
      const param = {
        uid: this.getUid,
        seq_presale: this.seq,
        wallet_address: this.getWalletAddress,
      }
      this.$axios.get('/api/presale/selectPresaleHistoryUserDepositTokenTotalUsd', { params: { ...param } })
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.userDepositTokenUsd = result.data // 사용자 총 구매 USD
          if (this.user_hardcap === '0') {
            this.userRemainTokenUsd = 1000000000000000 // this.$t('presale_no_limit')
          } else {
            this.userRemainTokenUsd = this.user_hardcap - this.userDepositTokenUsd // 사용자 구매가능 토큰 USD
          }

          // 토큰 수령 가능한지 체크
          this.setClaimable()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 사전판매 조회
    async selectPresale() {
      // 사전판매 정보 조회
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/presale/selectPresale', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)

        // 1. 항목 설정
        // this.seq = result.data.seq
        this.token_seq = result.data.token_seq // sub-query로 조회
        this.token_contract_address = result.data.token_contract_address
        this.token_name = result.data.token_name
        this.token_symbol = result.data.token_symbol
        this.token_total_supply = result.data.token_total_supply
        this.token_logo_image = result.data.token_logo_image
        this.official_website = result.data.official_website
        this.official_email = result.data.official_email
        this.whitepaper = result.data.whitepaper
        this.whitelist_seq = result.data.whitelist_seq
        this.title = result.data.title
        this.title_ko = result.data.title_ko
        this.team_name = result.data.team_name
        this.team_name_ko = result.data.team_name_ko
        this.pre_value = result.data.pre_value
        this.pre_value_krw = result.data.pre_value_krw
        this.main_image = result.data.main_image
        this.contents = result.data.contents
        this.contents_ko = result.data.contents_ko
        this.start_time = result.data.start_time
        this.end_time = result.data.end_time
        this.claim_time = result.data.claim_time
        this.type = result.data.type
        this.price = result.data.price
        this.listing_price = result.data.listing_price
        this.amount = result.data.amount
        this.softcap = result.data.softcap
        this.hardcap = result.data.hardcap
        this.user_softcap = result.data.user_softcap
        this.user_hardcap = result.data.user_hardcap
        this.amount_sold = result.data.amount_sold
        this.amount_remain = result.data.amount_remain

        this.progressLabel = (this.amount_sold / this.amount_remain * 100).toFixed(2)
        this.progress = this.amount_sold / this.amount_remain

        this.userRemainTokenUsd = result.data.user_hardcap // 잔여 한도

        // this.now = result.data.now // 서버 시간(DB)
        this.progress_status = result.data.progress_status // 진행 상태

        if (this.type === 'FIXED') {
          // 판매방식이 고정가격인 경우
          // 판매 대상 토큰 정보 설정
          // this.$refs.refSwapPresale.presaleSeq = this.seq
          const tokenOptions = {
            contract_address: this.token_contract_address,
            label: this.token_symbol,
            token_name: this.token_name,
            token_symbol: this.token_symbol,
            token_logo_image: this.token_logo_image === '' ? this.token_logo_image : 'https://nftpy.io/logo/logo_star.png',
          }
          this.$refs.refSwapPresale.toTokenObj = tokenOptions
          this.$refs.refSwapPresale.toTokenLogoImage = this.token_logo_image
        }

        // 2. 남은 시간 계산
        // console.log('this.progress_status: ' + this.progress_status)
        if (this.progress_status === 'WAITING') {
          await this.setRemainTime(this.start_time)
        } else if (this.progress_status === 'ENDED' || this.progress_status === 'COMPLETED') {
          this.remain_time = 0
        } else {
          await this.setRemainTime(this.end_time)
        }

        // 3. 토큰 수령 가능한지 체크
        await this.setClaimable()

      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 기본정보 조회 - 신청 후 화면 리프레시용
    async selectPresaleForRefresh() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/presale/selectPresale', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)

        // 1. 항목 설정
        this.amount_sold = result.data.amount_sold
        this.amount_remain = result.data.amount_remain

        this.progressLabel = (this.amount_sold / this.amount_remain * 100).toFixed(2)
        this.progress = this.amount_sold / this.amount_remain

        // this.now = result.data.now // 서버 시간(DB)
        this.progress_status = result.data.progress_status // 진행 상태

        // 2. 남은 시간 계산
        if (this.progress_status === 'WAITING') {
          await this.setRemainTime(this.start_time)
        } else {
          await this.setRemainTime(this.end_time)
        }

        // 사용자 구매이력 조회
        if (this.getWalletAddress) {
          this.selectPresaleHistoryUserDepositTokenTotalUsd()
        }

        // 토큰 수령 가능한지 체크
        await this.setClaimable()

      } else {
        // this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 남은시간 설정
    // 1. 시간
    // setRemainTime(endTime) {
    //   const today = new Date()
    //   const endDate = new Date(endTime)
    //   const unit = 'minutes'
    //   // console.log('today: ' + today)
    //   // console.log('endDate: ' + endDate)
    //   const diff = date.getDateDiff(endDate, today, unit)
    //   // console.log('diff: ' + diff)
    //   if (diff < 0) {
    //     this.remain_time = 0
    //     this.presaleTimeOver = true // 사전판매 종료 여부
    //   } else {
    //     this.remain_time = Number((diff / 60).toFixed(1))
    //   }
    // },
    // 2. 초 6.3
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
        // 사전판매 종료 여부
        if (this.type === 'AUCTION') {
          // 옥션스왑인 경우 마감처리가 완료되어야 수령 가능 (마감처리에서 분배 갯수가 정해짐)
          if (this.progress_status === 'COMPLETED') {
            this.presaleTimeOver = true
          }
        } else {
          if (this.progress_status === 'ENDED' || this.progress_status === 'COMPLETED') {
            this.presaleTimeOver = true
          }
        }
      } else {
        this.remain_time = diff * 1000
      }
    },
    async onCountdownEnd() {
      // console.log('onCountdownEnd onCountdownEnd onCountdownEnd onCountdownEnd onCountdownEnd')
      // console.log(this.progress_status)
      // console.log('onCountdownEnd onCountdownEnd onCountdownEnd onCountdownEnd onCountdownEnd')
      if (this.progress_status === 'WAITING') {
        // 사전판매 상태가 '대기중' 인 경우 -> '진행중' 으로 수정하고, 종료까지 남은시간으로 카운터 시작.
        this.progress_status = 'STARTED'
        await this.setRemainTime(this.end_time) // 종료까지 남은시간 계산 및 설정
        this.$noti(this.$q, this.$t('presale_alert_started'))
      } else if (this.progress_status === 'STARTED') {
        // 사전판매 상태가 '진행중' 인 경우 -> '진행완료' 로 수정
        this.progress_status = 'ENDED'
        this.remain_time = 0
        this.$noti(this.$q, this.$t('presale_alert_ended'))

        // 토큰 수령 가능한지 체크
        await this.setClaimable()
      }
    },
    async setClaimable() {
      // 사전판매 상태가 종료 및 완료, 토큰 수령 일시 이후, 참여 USD가 0 이상일 경우에 [수령] 버튼 활성화
      const param = {
        uid: this.getUid,
      }
      const { data: now } = await this.$axios.get('/api/common/getNow', { params: { ...param }})
      const diff = date.getDateDiff(this.claim_time, now, 'seconds')

      // console.log(this.presaleTimeOver)
      // console.log(diff)
      // console.log(this.userDepositTokenUsd)

      if (this.presaleTimeOver && diff < 0 && this.userDepositTokenUsd > 0) {
        // 토큰 수령 가능
        // console.log('isClaimable true')
        this.isClaimable = true
      } else {
        // 토큰 수령 불가
        // console.log('isClaimable false')
        this.isClaimable = false
      }
    },
    // 신청 처리
    async applyPresale(paramTokenObj) {

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

      // 3. 지갑 잠김 체크
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

      // 1. user cap 체크
      // 최소참여금액/최대참여금액/개인잔여참여금액 체크
      // console.log('paramTokenObj.depositTokenTotalUsd:' + paramTokenObj.depositTokenTotalUsd)
      // console.log('this.user_softcap:' + this.user_softcap)
      // console.log('this.user_hardcap:' + this.user_hardcap)
      // console.log('this.userRemainTokenUsd:' + this.userRemainTokenUsd)
      if (Number(paramTokenObj.depositTokenTotalUsd) < Number(this.user_softcap)) {
        // 최소 참여금액 미만입니다.
        this.$noti(this.$q, this.$t('presale_user_softcap_failed'))
        return
      }
      if (this.user_hardcap !== '0' &&
        (Number(paramTokenObj.depositTokenTotalUsd) > Number(this.user_hardcap) ||
        Number(paramTokenObj.depositTokenTotalUsd) > Number(this.userRemainTokenUsd))
        ) {
        // 최대 참여금액 초과입니다.
        this.$noti(this.$q, this.$t('presale_user_hardcap_failed'))
        return
      }

      // 전역으로 설정
      this.paramTokenObj = paramTokenObj
      
      // console.log(paramTokenObj)

      // this.$q.loading.show() // 로딩 표시 시작
      // 거부 등 예외처리 대응 후 표시할 수 있음.

      // 파라미터 항목
      // paramTokenObj.depositTokenContractAddress
      // paramTokenObj.depositTokenSymbol
      // paramTokenObj.depositTokenDecimals
      // paramTokenObj.depositTokenAmount
      // paramTokenObj.depositTokenTotalUsd
      // paramTokenObj.depositTokenLogoImage

      // // 2. 화이트리스트 대상 확인
      // const isEligible = await this.checkWhitelist()
      // if (!isEligible) {
      //   // 화이트리스트 대상이 아닙니다. You are not on the whitelist.
      //   this.$noti(this.$q, this.$t('not_on_the_whitelist'))
      //   return
      // }

      // 3. fromToken 전송
      let decimals = ''
      if (paramTokenObj.token_decimals === 6) {
        decimals = '1000000'
      } else {
        decimals = '1000000000000000000'
      }
      console.log('paramTokenObj.depositTokenAmount: ' + paramTokenObj.depositTokenAmount)
      // const depositTokenAmountWithDecimals = BigNumber(Number(paramTokenObj.depositTokenAmount)).multiply(decimals)
      const depositTokenAmountWithDecimals = paramTokenObj.depositTokenAmount * decimals
      console.log('depositTokenAmountWithDecimals: ' + depositTokenAmountWithDecimals)
      const hexDepositTokenAmount = '0x' + Number(depositTokenAmountWithDecimals).toString(16)
      console.log('hexDepositTokenAmount: ' + hexDepositTokenAmount)
      
      const walletType = this.getWalletType
      if (walletType === 'kaikas') {
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.1 kaikas
        // 3.1 kaikas
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.1 kaikas
        // const transactionParameters = {
        //   // gas: '0x2710',
        //   to: this.$systemWalletAddress,
        //   from: klaytn.selectedAddress,
        //   value: hexDepositTokenAmount
        // }
        // klaytn.sendAsync(
        //   {
        //     method: 'klay_sendTransaction',
        //     params: [transactionParameters],
        //     from: klaytn.selectedAddress
        //   },
        //   this.transactionCallbackKaikas
        // )

        await caver.klay.sendTransaction({
            type: 'VALUE_TRANSFER',
            from: currentWalletAddress,
            to: this.$systemWalletAddress,
            // value: caver.utils.toPeb('1', 'KLAY'),
            value: hexDepositTokenAmount,
            gas: 8000000,
          })
          .once('transactionHash', transactionHash => {
            console.log('txHash', transactionHash)
            // this.txidDeposit = receipt.transactionHash // 트랜잭션 해시 설정
          })
          .once('receipt', receipt => {
            console.log('receipt', receipt)
            this.txidDeposit = receipt.transactionHash // 트랜잭션 해시 설정
          })
          .once('error', error => {
            console.log('error', error)
            // console.log(error)
            this.$noti(this.$q, this.$t('apply_failed'))
            return
          })
        console.log('txHash(kaikas): ' + this.txidDeposit)

        if (!this.txidDeposit) {
          return
        }

      } else if (walletType === 'metamask') {
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.2 metamask
        // 3.2 metamask
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.2 metamask
        const transactionParameters = {
          // nonce: '0x00', // ignored by MetaMask
          gasPrice: '0x3a35294400', // customizable by user during MetaMask confirmation.
          gas: '0x5208', // customizable by user during MetaMask confirmation.
          to: this.$systemWalletAddress, // Required except during contract publications.
          from: currentWalletAddress, // must match user's active address.
          value: hexDepositTokenAmount, // Only required to send ether to the recipient from the initiating external account.
          // data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
          // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        }

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        this.txidDeposit = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        })
          .catch((err) => {
            // this.$noti(this.$q, err)
            this.$noti(this.$q, this.$t('apply_failed'))
            console.log(err)
            return
          })
        console.log('txHash(metamask): ' + this.txidDeposit)

        if (!this.txidDeposit) {
          return
        }
          
      } else if (walletType === 'klip') {
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.3 klip
        // 3.3 klip
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.3 klip
        // PC와 모바일 분기
        const param = {
          bapp: {
            name: 'KLAYSTAR',
          },
          type: 'send_klay',
          transaction: {
            from: currentWalletAddress,
            to: this.$systemWalletAddress,
            amount: paramTokenObj.depositTokenAmount.toString(),
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
                this.$noti(this.$q, 'Klip request_key failed.')
                return
              }

              if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
                // 1. 모바일인 경우
                try {
                  request(requestKey, () => alert('Run in a mobile.'))

                  // 요청 후 1초 간격으로 승인 여부 확인
                  this.checkKlipAuthResult(requestKey, 'DEPOSIT')
                } catch (error) {
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
                    this.checkKlipAuthResult(requestKey, 'DEPOSIT')
                  })
                  .catch(err => {
                    console.error(err)
                    return
                  })
              }
            } else {
              this.$noti(this.$q, 'Klip request failed.')
              return
            }
          })
          .catch((err) => {
            // 잔액 부족시
            this.$noti(this.$q, this.$t('presale_insufficient_funds'))
            console.log(err)
            return
          })
      }

      // 사전판매 거래내역 등록 - klip 은 checkKlipAuthResult 에서 처리 성공 확인시 호출
      if (walletType !== 'klip') {
        this.insertPresaleHistory()
      }
    },
    // 사전판매 거래내역 등록
    async insertPresaleHistory() {

      if (!this.txidDeposit) {
        this.$noti(this.$q, this.$t('presale_txid_is_null'))
        return
      }
      
      this.$q.loading.show() // 로딩 표시 시작

      // 4. 사전판매 타입 분기
      let toTokenAmount = null
      if (this.type === 'FIXED') {
        // 4.1 고정가격인 경우
        const param = {
          uid: this.getUid,
          fromTokenContractAddress: this.paramTokenObj.depositTokenContractAddress,
          fromTokenAmount: this.paramTokenObj.depositTokenAmount,
          toTokenContractAddress: this.token_contract_address,
          presaleSeq: this.seq,
          newTokenPosition: 'TO',
        }
        const result = await this.$axios.get('/api/klayswap/getTokenPricePairPresale', { params: { ...param }})
        if (result && result.data && result.data.resultCd === 'SUCCESS') {
          toTokenAmount = result.data.toAmount
        } else {
          // 토큰 수량 조회 실패
          this.$q.loading.hide() // 로딩 표시 종료
          this.$noti(this.$q, this.$t('request_data_failed'))
          return
        }
      } else if (this.type === 'AUCTION') {
        // 4.2 옥션스왑인 경우

      }

      // 5. 사전판매 거래내역 등록 처리
      const param = {
        uid: this.getUid,
        seq_presale: this.seq,
        deposit_token_contract_address: this.paramTokenObj.depositTokenContractAddress,
        deposit_token_symbol: this.paramTokenObj.depositTokenSymbol,
        deposit_token_amount: this.paramTokenObj.depositTokenAmount,
        deposit_token_total_usd: this.paramTokenObj.depositTokenTotalUsd,
        deposit_token_logo_image: this.paramTokenObj.depositTokenLogoImage,
        amount: toTokenAmount,
        wallet_address: this.getWalletAddress,
        wallet_type: this.getWalletType,
        txid_deposit: this.txidDeposit,
        claim_time: this.claim_time,
        type: this.type,
      }
      this.$axios.post('/api/presale/insertPresaleHistory', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('apply_success'))

            // 사전판매 정보 조회 - 신청 후 화면 리프레시용
            this.selectPresaleForRefresh()
          } else {
            this.$noti(this.$q, this.$t('apply_failed'))
            return
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
          return
        })

      // 모달 화면 닫기
      this.$refs.refSwapPresale.confirmApply = false
    },
    // transactionCallbackKaikas(result) {
    //   console.log(result)
    //   // this.$noti(this.$q, result)
    // },
    callbackQRCode(resultObj) {
      this.clearKlipTimer()
    },
    clearKlipTimer() {
      clearInterval(this.interval)
      this.klipTimer = 300
    },
    checkKlipAuthResult(requestKey, requestType) {
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

              if (requestType === 'DEPOSIT') { // 입금(구매)인 경우
                this.txidDeposit = result.data.result.tx_hash
                // 사전판매 거래내역 등록 - klip 은 checkKlipAuthResult 에서 처리 성공 확인시 호출
                this.insertPresaleHistory()
              } else if (requestType === 'CLAIM') { // 출금(수령)인 경우
                // 사전판매 수정 - claimed_time, txid_claimed 수정
                this.updatePresaleHistory(result.data.result.tx_hash)
              }

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
    // 토큰 수령
    async claimToken() {

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // 1. 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid || !this.getWalletType || !this.getWalletAddress) {
        // console.log('this.getWalletType: ' + this.getWalletType)
        // console.log('this.getWalletAddress: ' + this.getWalletAddress)
        this.$refs.refWalletModal.show()
        return
      }

      // // 2. 화이트리스트 사용일 경우, 대상자 여부 체크
      // const isEligible = await this.checkWhitelist()
      // if (!isEligible) {
      //   // 화이트리스트 대상이 아닙니다. You are not on the whitelist.
      //   this.$noti(this.$q, this.$t('not_on_the_whitelist'))
      //   return
      // }

      // 3. 지갑 잠김 체크
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
      // } else if (this.getWalletType === 'klip') {
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

      // const abiJson = JSON.parse('[{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"safeTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"data","type":"bytes"}],"name":"safeTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"initialSupply","type":"uint256"},{"name":"recipient","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]')
      const abiJson = JSON.parse('[{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]')

      this.$q.loading.show() // 로딩 표시 시작

      try {
        const param = {
          uid: this.getUid,
          seq_presale: this.seq,
          wallet_address: currentWalletAddress,
        }
        const result = await this.$axios.post('/api/presale/selectPresaleHistoryApproveClaim', param)
        if (result && result.data && result.data.resultCd === 'SUCCESS') {

          const totalAmount = result.data.total_amount
          console.log('totalAmount: ' + totalAmount)

          const hexDepositTokenAmount = '0x' + Number(totalAmount).toString(16)
          console.log('hexDepositTokenAmount: ' + hexDepositTokenAmount)

          const owner = this.$systemWalletAddress // '0x16F5dF3C8dD43166492b867079f48DB746107CFE'
          const receiver = currentWalletAddress
          const amount = hexDepositTokenAmount

          // console.log('sender: ' + owner)
          // console.log('receiver: ' + receiver)
          // console.log('amount: ' + amount)

          // 전송 처리 - 확인창 띄움
          if (this.getWalletType === 'kaikas') {
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 1. kaikas
            // 1. kaikas
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 1. kaikas
            const tokenContract = new caver.klay.Contract(abiJson, this.token_contract_address)
            // console.log(tokenContract)
            tokenContract.methods.transferFrom(owner, receiver, amount).send({ from: receiver, gas: 8000000 })
              .then((result) => {
                console.log(result)
                console.log('result.transactionHash: ' + result.transactionHash)

                // Claim 후속처리
                this.updatePresaleHistory(result.transactionHash)
              })
              .catch((err) => {
                this.$q.loading.hide() // 로딩 표시 종료
                this.$noti(this.$q, this.$t('presale_claim_failed'))
                console.log(err)
              })
              
          } else if (this.getWalletType === 'metamask') {
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 2. metamask
            // 2. metamask
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 2. metamask
            // this.$q.loading.hide() // 로딩 표시 종료

            // const tokenContract = ethereum.Contract(abiJson, this.token_contract_address)
            // const abiMetamask = '{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}'

            // console.log(ethereum.send)
            // console.log(ethereum.request)
            // const tokenContract = new caver.klay.Contract(abiJson, this.token_contract_address)
            // console.log(tokenContract)
            // ethereum.send(tokenContract)

            const encData = caver.abi.encodeFunctionCall({
                name: 'transferFrom',
                type: 'function',
                inputs: [
                  {
                    type: 'address',
                    name: 'sender'
                  },
                  {
                    type: 'address',
                    name: 'recipient'
                  },
                  {
                    type: 'uint256',
                    name: 'amount'
                  }
                ]
              }, [
                owner,
                receiver,
                totalAmount,
              ])

            // console.log(encData)

            const transactionParameters = {
              // nonce: '0x00', // ignored by MetaMask
              gasPrice: '0x3a35294400', // customizable by user during MetaMask confirmation.
              gas: '0x249f0', // customizable by user during MetaMask confirmation.
              from: ethereum.selectedAddress, // Required except during contract publications.
              to: this.token_contract_address, // must match user's active address.
              value: '0x00', // Only required to send ether to the recipient from the initiating external account.
              // data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
              data: encData,
              // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            }
            const txidClaimed = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
              })
              .catch((err) => {
                // Some unexpected error.
                // For backwards compatibility reasons, if no accounts are available,
                // eth_accounts will return an empty array.
                this.$q.loading.hide() // 로딩 표시 종료
                this.$noti(this.$q, err.message)
                console.log(err)
                return
                // console.error(err)
                // this.$noti(this.$q, this.$t('presale_claim_failed'))
              })

            console.log('txidClaimed: ' + txidClaimed)

            // Claim 후속처리
            this.updatePresaleHistory(txidClaimed)

          } else if (this.getWalletType === 'klip') {
            this.$q.loading.hide() // 로딩 표시 종료 -> 클립은 화면에 QR코드 찍어야 해서 로딩 종료.
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3 klip
            // 3 klip
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3 klip
            // PC와 모바일 분기
            const abiKlip = '{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}'
            const param = {
              bapp: {
                name: 'KLAYSTAR',
              },
              type: 'execute_contract',
              transaction: {
                // from: this.getWalletAddress,
                // to: this.$systemWalletAddress,
                to: this.token_contract_address,
                value: "0",
                abi: abiKlip,
                params: '["' + this.$systemWalletAddress +  '","' + receiver + '","' + totalAmount + '"]',
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
                      this.checkKlipAuthResult(requestKey, 'CLAIM')
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
                        this.checkKlipAuthResult(requestKey, 'CLAIM')
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
                this.$noti(this.$q, this.$t('presale_insufficient_funds'))
                console.log(err)
                return
              })
          } else {
            // 지갑 해당 없을 경우
            this.$q.loading.hide() // 로딩 표시 종료
            this.$noti(this.$q, this.$t('presale_claim_failed'))
            return
          }
        } else {
          // result 값이 없을 경우
          this.$q.loading.hide() // 로딩 표시 종료
          this.$noti(this.$q, this.$t('presale_claim_failed'))
          return
        }
      } catch (err) {
        // approve 실패인 경우
        this.$q.loading.hide() // 로딩 표시 종료
        this.$noti(this.$q, this.$t('presale_claim_error'))
        console.log(err)
        return
      }

    },
    // Claim 후속처리 - presale_history 테이블의 claimed_time, txid_claimed 항목 수정
    updatePresaleHistory(txidClaimed) {

      if (!txidClaimed) {
        this.$q.loading.hide() // 로딩 표시 종료
        this.$noti(this.$q, this.$t('presale_claim_txid_not_exist'))
        return
      }

      const param = {
        uid: this.getUid,
        seq_presale: this.seq,
        wallet_address: this.getWalletAddress,
        txid_claimed: txidClaimed,
      }
      this.$axios.post('/api/presale/updatePresaleHistory', param)
        .then((result) => {
          if (result && result.data && result.data.resultCd === 'SUCCESS') {
            console.log(result.data)
            // 화면정보 refresh
            this.selectPresaleHistoryUserDepositTokenTotalUsd()

            this.$q.loading.hide() // 로딩 표시 종료
            this.$noti(this.$q, this.$t('presale_claim_success'))
          } else {
            this.$q.loading.hide() // 로딩 표시 종료
            this.$noti(this.$q, this.$t('presale_claim_failed'))
            return
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          this.$noti(this.$q, this.$t('presale_claim_error'))
          console.log(err)
          return
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
    showProject() {
      // 프로젝트 정보 모달 표시
      this.$refs.refTokenDetailModal.tokenSeq = this.token_seq
      this.$refs.refTokenDetailModal.show()
    },
    openUrl(url) {
      window.open(url)
    },
    shareUrlCopy() {
      // API 서버로 보내서 og 정보 달고 다시 frontPath로 넘어옴. path: https://nftpy.io/#/winfo?seq=999&locale=XXX
      const host = location.protocol + '//' + location.host
      const url = host + '/p?s=' + this.seq + '&l=' + this.locale.substring(0, 2) // seq, locale

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
      // console.log('callbackWallet!!!')
      // this.$store.dispatch('setWalletAddress', walletVo.wallet_address)
    },
    goPresaleHistoryList() {
      // 사전판매 신청 결과 목록 화면으로 이동
      this.$router.push({ path: '/presale/presaleHistoryList', query: { seq: this.seq }})
    },
    showWhitelist() {
      // 화이트리스트 모달 표시
      this.$refs.refWhitelistModal.whitelistSeqArray = this.whitelist_seq
      this.$refs.refWhitelistModal.show()
    },
    goBack() {
      this.$router.go(-1)
    },
  }
})
</script>

<style scoped>
</style>
