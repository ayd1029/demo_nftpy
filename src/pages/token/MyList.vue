<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_my_token_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_my_token_list_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- 생성 완료 토큰 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <q-card class="my-card q-mb-lg" v-for="item in tokenList" :key="item.seq">

          <q-img src="images/token_temp_image.png">
            <div class="absolute-top">
              <div class="text-h6" style="word-break: break-all;">
                <q-avatar v-if="item.logo_image" size="md">
                  <img :src="item.logo_image">
                </q-avatar>
                <q-icon v-else name="generating_tokens" size="md" />
                &nbsp;{{ item.name }} ({{ item.symbol }})
              </div>
            </div>
            <div class="absolute-bottom">
              <div class="text-subtitle2">{{ $t('project_seq') }} [ {{ item.seq }} ]</div>
              <div class="text-subtitle2">{{ $t('token_decimals') }} : {{ item.decimals }}</div>
              <div class="text-subtitle2" style="word-break: break-all;">{{ $t('token_total_supply') }} : {{ (item.initial_supply / Math.pow(10, item.decimals)).toLocaleString() }}</div>
              <div class="text-subtitle2" style="word-break: break-all;">{{ $t('wallet_address') }} : <font size="3">{{ item.wallet_address }}</font></div>
            </div>
          </q-img>

          <div class="q-pt-md q-pr-md q-pl-md">
            <div class="text-subtitle2 q-pt-sm">
              {{ $t('contract_address') }}
              <q-btn icon="content_copy" color="black" size="md" flat @click="copyAddress(item.contract_address)">&nbsp;{{ $t('copy') }}</q-btn>
            </div>
            <div class="text-subtitle2 q-pb-sm" style="word-break: break-all;">
              <font size="3">{{ item.contract_address }}</font>
            </div>
            <q-separator spaced />
            <div class="text-left q-pt-sm">
              <q-btn size="sm" color="black" style="height: 36px;background-color: rgb(49, 53, 87);" @click="openUrl(item.contract_address, 'tokenHolder')">
                <img src="logo/klaytnscope-logo.svg" />
              </q-btn>
            </div>
            <div class="text-left q-pt-md q-pb-md">
              <q-btn size="md" color="black" style="height: 36px;" @click="openUrl(item.contract_address, 'internalTx')" outline>{{ $t('contract_transaxtion') }}</q-btn>
              &nbsp;
              <q-btn size="md" color="black" style="height: 36px;" @click="openUrl(item.contract_address, 'tokenTransfer')" outline>{{ $t('contract_transfer') }}</q-btn>
              &nbsp;
              <q-btn size="md" color="black" style="height: 36px;" @click="openUrl(item.contract_address, 'tokenHolder')" outline>{{ $t('contract_holder') }}</q-btn>
            </div>
            <q-separator />
          </div>

          <!-- Action Button -->
          <q-card-actions align="around">

            <div>
              <!-- set description -->
              <q-btn flat @click="goSetDescription(item.seq)">
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="settings" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-black">{{ $t('set_description')}}</span></td>
                  </tr>
                </table>
              </q-btn>
            </div>

            <div>
              <!-- Verify Contract & IDO -->
              <!-- 32: 사용자 요청 완료 -->
              <q-btn v-if="item.contract_status_cd === '32'" flat disable>
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="policy" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-weight-bold">{{ $t('contract_verify_user_requested') }}</span></td>
                  </tr>
                </table>
              </q-btn>
              <!-- 34: 접수완료 -->
              <q-btn v-else-if="item.contract_status_cd === '34'" flat disable>
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="policy" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-weight-bold">{{ $t('contract_verify_accepted') }}</span></td>
                  </tr>
                </table>
              </q-btn>
              <!-- 36: 제출 완료 -->
              <q-btn v-else-if="item.contract_status_cd === '36'" flat disable>
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="policy" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-weight-bold">{{ $t('contract_verify_submitted') }}</span></td>
                  </tr>
                </table>
              </q-btn>
              <!-- 40: 검증 완료 -->
              <q-btn v-else-if="item.contract_status_cd === '40'" flat @click="goIdo(item)">
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="rocket_launch" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-weight-bold">{{ $t('contract_verify_success_ido') }}</span></td>
                  </tr>
                </table>
              </q-btn>
              <!-- 50: IDO 완료 -->
              <q-btn v-else-if="item.contract_status_cd === '50'" flat disable>
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="verified" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-weight-bold">{{ $t('ido_success') }}</span></td>
                  </tr>
                </table>
              </q-btn>
              <!-- 90: 사용자 요청 반려 -->
              <q-btn v-else-if="item.contract_status_cd === '90'" flat @click="confirmVerifyContract(item)">
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="policy" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-weight-bold">{{ $t('contract_verify_rejected') }}</span></td>
                  </tr>
                </table>
              </q-btn>
              <!-- 99: 계약 검증 실패 -->
              <q-btn v-else-if="item.contract_status_cd === '99'" flat @click="confirmVerifyContract(item)">
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="policy" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-weight-bold">{{ $t('contract_verify_failed') }}</span></td>
                  </tr>
                </table>
              </q-btn>

              <!-- ELSE NULL: 결제 미완료, 30: 결제 완료 상태는 [계약 검증] 버튼 표시 -->
              <q-btn v-else flat @click="confirmVerifyContract(item)">
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="policy" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-weight-bold">{{ $t('contract_verify_user_request') }}</span></td>
                  </tr>
                </table>
              </q-btn>
            </div>

            <div>
              <!-- add total supply -->
              <q-btn flat @click="tokenMint(item)">
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="add_circle" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-black">{{ $t('mint_token')}}</span></td>
                  </tr>
                </table>
              </q-btn>
            </div>

            <div>
              <!-- burn -->
              <q-btn flat @click="tokenBurn(item)">
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td><q-icon name="local_fire_department" /></td>
                  </tr>
                  <tr>
                    <td><span class="text-black">{{ $t('burn_token')}}</span></td>
                  </tr>
                </table>
              </q-btn>
            </div>

          </q-card-actions>

          <!-- Admin Comment (for Contract Verification) -->
          <div v-if="item.status_comment && (item.contract_status_cd === '90' || item.contract_status_cd === '99')">
            <q-separator />
            <div class="text-body2 text-red text-center q-pt-md q-pl-md q-pr-md">
              <q-icon name="info" size="sm" /> Admin Comment
            </div>
            <div class="text-body2 text-red text-center q-pa-md">
              {{ item.status_comment }}
            </div>
          </div>

        </q-card>

        <br>
        <br>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>

    <div v-if="noDataFlag" class="row justify-center">
      <img src="images/sorry-no-data.png" style="width: 50%;" />
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <q-dialog v-model="confirmTokenVerifyContract">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 300px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_token_verify_contract') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('request_token_verify_contract')" color="black" v-close-popup @click="goPayment" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <TokenMintlModal ref="refTokenMintlModal" />
  <TokenBurnlModal ref="refTokenBurnlModal" />
  <IframeModal ref="refIframeModal" />
</template>

<script>
import { defineComponent } from 'vue';
// import { openURL } from 'quasar'

export default defineComponent({
  name: 'MyList',
  data () {
    return {
      refresherDone: '',
      pageSize: 100,
      lastPageNum: 1, // 마지막 페이지
      tokenList: [],
      noDataFlag: false,
      confirmTokenVerifyContract: false,
      item: {},
    }
  },
  components: {
  },
  watch: {
    getUid (newValue) {
      // console.log('newValue: : ' + newValue)
      // this.loadMore(1, null)
      this.refresher(null)
      // if (!newValue) {
      //   this.$router.push('/')
      // } else {
      //   this.loadMore(1, null)
      // }
    },
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
  },
  created: function () {
    this.selectListMax()
  },
  mounted: function () {
  },
  methods: {
    // 토큰 추가 발행
    tokenMint(item) {
      this.$refs.refTokenMintlModal.amount = ''
      this.$refs.refTokenMintlModal.item = item
      this.$refs.refTokenMintlModal.show()
    },
    // 토큰 소각
    tokenBurn(item) {
      this.$refs.refTokenBurnlModal.amount = ''
      this.$refs.refTokenBurnlModal.item = item
      this.$refs.refTokenBurnlModal.show()
    },
    openUrl(contractAddress, typeCode) {
      // 계약 정보
      // https://baobab.scope.klaytn.com/account/0x6f1f57d187f433ffdbbe21721736edcdd2ea9600?tabId=internalTx
      // 토큰 전송 정보
      // https://baobab.scope.klaytn.com/token/0x6f1f57d187f433ffdbbe21721736edcdd2ea9600?tabId=tokenTransfer
      // 토큰 홀더 정보
      // https://baobab.scope.klaytn.com/token/0x6f1f57d187f433ffdbbe21721736edcdd2ea9600?tabId=tokenHolder


      // const baseUrl = 'https://baobab.scope.klaytn.com/'
      const baseUrl = this.$scopeDomainKlaytn
      let url = ''
      // const url = 'https://baobab.scope.klaytn.com/token/0x6f1f57d187f433ffdbbe21721736edcdd2ea9600?tabId=tokenHolder
      if (typeCode === 'tokenHolder') {
        url = 'token/' + contractAddress + '?tabId=tokenHolder'
      } else if (typeCode === 'tokenTransfer') {
        url = 'token/' + contractAddress + '?tabId=tokenTransfer'
      } else if (typeCode === 'internalTx') {
        url = 'account/' + contractAddress + '?tabId=internalTx'
      }
      // openURL(baseUrl + url)
      // window.open(baseUrl + url, '_system')

      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = baseUrl + url
        this.$refs.refIframeModal.show()
      } else {
        window.open(baseUrl + url, '_system')
      }
    },
    // 상세 설정으로 이동
    goSetDescription(seq) {
      this.$router.push({ path: '/token/description', query: { seq: seq }})
    },
    confirmVerifyContract(item) {
      this.item = item
      this.confirmTokenVerifyContract = true
    },
    // 계약 검증 - 결제
    async goPayment() {
      // 계약 검증 필수정보 등록 여부 확인
      // if (!item.official_website) {
      //   this.$noti(this.$q, this.$t('contract_required_field_official_website'))
      //   return
      // }
      if (!this.item.official_email) {
        this.$noti(this.$q, this.$t('contract_required_field_official_email'))
        return
      }
      if (!this.item.logo_image) {
        this.$noti(this.$q, this.$t('contract_required_field_logo_image'))
        return
      }

      // 1. 해당 토큰이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: this.item.seq,
      }
      const result = await this.$axios.post('/api/token/checkTokenContractStatusCdPaid', params)
      // console.log(result.data)
      if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
        this.$router.push({ path: '/token/requestVerification', query: { key: this.item.seq }}) // 계약 검증 사용자 신청 화면으로 이동
      } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + ' ' + this.$t('contract_verify')
        const goodName = this.item.name
        const payCode = this.$PAY_CODE_CONTRACT_VERIFY // 결제코드: CONTRACT_VERIFY(계약 검증)

        this.$store.dispatch('setPaymentGoodsName', goodName)
        this.$store.dispatch('setPaymentPayCode', payCode)

        // 상점 파라미터(customData) 설정
        // [0]: payCode | [1]: paySuccessUrl | [2]: payFailUrl | [3]: key
        const paySuccessUrl = '/token/requestVerification'
        let payFailUrl = '/payment' // 디바이스가 데스크탑인 경우
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          payFailUrl = '/paymentMobile' // 디바이스가 모바일인 경우
        }
        const key = this.item.seq
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
    // IDO 화면으로 이동
    async goIdo(item) {
      // this.$router.push({ path: '/ido', query: { seq: item.seq }})
      this.$router.push('/pool')
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.tokenList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMore(1, done)
    },
    loadMore(index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // console.log('index: ' + index)
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        // alert(index)
        // console.log('loadMore called index: ' + index)
        if (index <= this.lastPageNum) {
          this.selectList(index, done)
          if (index === this.lastPageNum) {
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 나의 토큰 리스트 마지막 페이지 조회
    selectListMax() {
      this.$axios.get('/api/token/selectCreatedTokenListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 나의 토큰 리스트 조회
    selectList(idx, done) {
      this.$axios.get('/api/token/selectCreatedTokenList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.tokenList = [] // 리스트 초기화
          }
          this.tokenList = this.tokenList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.tokenList || this.tokenList.length < 1) {
            this.noDataFlag = true
          } else {
            this.noDataFlag = false
          }
          if (done) {
            done()
          }
        })
        .catch((err) => {
          console.log(err)
          if (done) {
            done()
          }
        })
    },
    copyAddress(address) {
      // console.log('copyAddress function called!')
      // 클립보드로 복사하기
      this.$copyText(address).then(this.copyAddressSuccess, this.copyAddressFail)
    },
    copyAddressSuccess(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_success'))
    },
    copyAddressFail(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_failed'))
    },
  },
})
</script>

<style scoped>
</style>
