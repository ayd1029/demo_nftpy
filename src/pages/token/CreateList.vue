<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        2. {{ $t('menu_create_token_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_create_token_list_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- 생성 대기 토큰 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <q-card class="my-card q-mb-lg" v-for="item in tokenList" :key="item.seq">
          <!--
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Title</q-item-label>
              <q-item-label caption>Subhead</q-item-label>
            </q-item-section>
          </q-item>
          -->

          <q-img src="images/token_temp_image.png">
            <div class="absolute-top">
              <div class="text-h6" style="word-break: break-all;">
                <q-avatar>
                  <q-icon name="generating_tokens" />
                </q-avatar>
                {{ item.name }} ({{ item.symbol }})
              </div>
            </div>
            <div class="absolute-bottom">
              <div class="text-subtitle2">{{ $t('token_decimals') }} : {{ item.decimals }}</div>
              <div class="text-subtitle2" style="word-break: break-all;">{{ $t('token_initial_supply') }} : {{ (item.initial_supply / Math.pow(10, item.decimals)).toLocaleString() }}</div>
              <div class="text-subtitle2" style="word-break: break-all;">{{ $t('wallet_address') }} : <font size="3">{{ item.wallet_address }}</font></div>
            </div>
          </q-img>

          <q-card-actions align="around">
            <q-btn flat style="width: 30%;" @click="deleteToken(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="delete_forever" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('delete') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <q-btn flat style="width: 30%;" @click="goModifyToken(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="edit" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('modify') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <q-btn flat style="width: 30%;" @click="goPayment(item)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="generating_tokens" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('create_now') }}</span></td>
                </tr>
              </table>
            </q-btn>
          </q-card-actions>
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
  
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />

  <q-dialog v-model="confirmDelete">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteToken" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
// import solc from 'solc'
// import fs from 'fs'
// import Caver from 'caver-js';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'Create',
  data () {
    return {
      refresherDone: '',
      pageSize: 10,
      lastPageNum: 1, // 마지막 페이지
      tokenList: [],
      noDataFlag: false,
      confirmDelete: false, // 삭제 확인창
      deleteTargetTokenSeq: '', // 삭제 대상 토큰 SEQ
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
    // 토큰 수정
    goModifyToken(seq) {
      this.$router.push({ path: '/token/modify', query: { seq: seq }})
    },
    deleteToken(seq) {
      this.deleteTargetTokenSeq = seq
      // 삭제 확인창 표시
      this.confirmDelete = true
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    doDeleteToken() {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.deleteTargetTokenSeq,
      }
      this.$axios.post('/api/token/deleteToken', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 리스트 재조회
            this.refresher(null)
            this.$noti(this.$q, this.$t('delete_token_success'))
          } else {
            this.$noti(this.$q, this.$t('delete_token_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    async goPayment(item) {
      // 1. 해당 토큰이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: item.seq,
      }
      const result = await this.$axios.post('/api/token/checkTokenCreateStatusCdPaid', params)
      if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
        this.$router.push({ path: '/token/create', query: { key: item.seq }}) // 토큰 생성 화면으로 이동
      } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + '(' + item.symbol + ')'
        const goodName = item.name
        const payCode = this.$PAY_CODE_CREATE_TOKEN // 결제코드: CREATE_TOKEN(토큰 생성)

        this.$store.dispatch('setPaymentGoodsName', goodName)
        this.$store.dispatch('setPaymentPayCode', payCode) 

        // 상점 파라미터(customData) 설정
        // [0]: payCode | [1]: paySuccessUrl | [2]: payFailUrl | [3]: key
        const paySuccessUrl = '/token/create'
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
    // 생성대기 토큰 리스트 마지막 페이지 조회
    selectListMax() {
      this.$axios.get('/api/token/selectNotCreatedTokenListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 생성대기 토큰 리스트 조회
    selectList(idx, done) {
      this.$axios.get('/api/token/selectNotCreatedTokenList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
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


  },
})
</script>

<style scoped>
</style>
