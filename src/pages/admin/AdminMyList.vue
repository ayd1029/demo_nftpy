<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        [A] {{ $t('menu_my_token_list') }}
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

        <q-card class="my-card q-mb-xs" v-for="item in tokenList" :key="item.seq">

          <div class="text-body" style="word-break: break-word;" @click="goSetDescription(item.seq)">
            <div class="row">
              <div class="col-12">
                
                <q-item clickable>

                  <!-- <q-item-section avatar>
                    <q-avatar>
                      <img v-if="item.logo_image" :src="item.logo_image">
                      <q-icon v-else name="generating_tokens" size="md" />
                    </q-avatar>
                  </q-item-section> -->

                  <q-item-section>
                    <div class="row">
                      <q-item-label class="col-12">{{ item.seq }} | {{ item.name }} ({{ item.symbol }})</q-item-label>
                      <!-- <q-item-label class="col-12"><span v-if="item.official_website">{{ item.official_website }} ■■■■■■■</span></q-item-label> -->
                    </div>
                  </q-item-section>

                </q-item>

              </div>
              <!-- <div class="col-2 text-right">
                <q-btn flat icon="edit" dense size="lg" />
              </div> -->
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
  <IframeModal ref="refIframeModal" />
</template>

<script>
import { defineComponent } from 'vue';
// import { openURL } from 'quasar'

export default defineComponent({
  name: 'AdminMyList',
  data () {
    return {
      refresherDone: '',
      pageSize: 200,
      lastPageNum: 1, // 마지막 페이지
      tokenList: [],
      noDataFlag: false,
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
      // this.$router.push({ path: '/token/description', query: { seq: seq }})
      this.$router.push({ path: '/token/description', query: { seq: seq, fromAdmin: 'Y' }})
    },
    async goPayment(item) {
      // 계약 검증 필수정보 등록 여부 확인
      // if (!item.official_website) {
      //   this.$noti(this.$q, this.$t('contract_required_field_official_website'))
      //   return
      // }
      if (!item.official_email) {
        this.$noti(this.$q, this.$t('contract_required_field_official_email'))
        return
      }
      if (!item.logo_image) {
        this.$noti(this.$q, this.$t('contract_required_field_logo_image'))
        return
      }

      // 1. 해당 토큰이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: item.seq,
      }
      const result = await this.$axios.post('/api/token/checkTokenContractStatusCdPaid', params)
      // console.log(result.data)
      if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
        this.$router.push({ path: '/token/requestVerification', query: { key: item.seq }}) // 계약 검증 사용자 신청 화면으로 이동
      } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + ' ' + this.$t('contract_verify')
        const goodName = item.name
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
        const key = item.seq
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
      this.$axios.get('/api/admin/selectAdminMyTokenListLastPageNum',
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
      this.$axios.get('/api/admin/selectAdminMyTokenList',
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
