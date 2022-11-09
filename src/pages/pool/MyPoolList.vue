<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_my_pool_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_my_pool_list_description') }}
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="q-pt-sm q-pb-md row">
      <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outline />
      &nbsp;&nbsp;
      <q-btn @click="goRegister" icon="add" color="primary" size="lg" style="width: 80px;" />
    </div>

    <!-- 유동성 풀 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <q-card class="my-card q-mb-lg" v-for="item in poolList" :key="item.seq">

          <div class="bg-black q-pt-md q-pb-md text-white">
            <table border="0" cellpadding="0" sellspacing="0" width="100%" class="text-h6">
              <tr>
                <td width="49%" class="text-center">
                  <q-avatar>
                    <img :src="item.target_token_logo_image" width="50" />
                  </q-avatar>
                </td>
                <td class="text-center">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td width="49%" class="text-center">
                  <q-avatar>
                    <img :src="item.pair_token_logo_image" width="50" />
                  </q-avatar>
                </td>
              </tr>
            </table>

            <table border="0" cellpadding="0" sellspacing="0" width="100%" class="text-h6">
              <tr>
                <td width="49%" class="text-center">{{ item.target_token_symbol }}</td>
                <td class="text-center">+</td>
                <td width="49%" class="text-center">{{ item.pair_token_symbol }}</td>
              </tr>
            </table>

            <table border="0" cellpadding="0" sellspacing="0" width="100%">
              <tr>
                <td colspan="3" align="center">
                  <div class="text-body text-white">
                    &nbsp;
                    <!-- {{ $t('pool_total_supply') }} -->
                  </div>
                </td>
              </tr>
              <tr>
                <td width="49%" class="text-center">{{ Number(item.target_token_total_supply).toLocaleString() }}</td>
                <td class="text-center">:</td>
                <td width="49%" class="text-center">{{ Number(item.pair_token_total_supply).toLocaleString() }}</td>
              </tr>
            </table>
          </div>

          <!-- Action Button -->
          <q-card-actions align="around">
            <!-- delete pool -->
            <q-btn flat style="width: 30%;" @click="deletePool(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="delete_forever" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('delete') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- modify pool -->
            <q-btn v-if="item.status_cd > '30' && item.status_cd < '90'" flat style="width: 30%;" disable>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="edit" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('modify') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <q-btn v-else flat style="width: 30%;" @click="goModifyPool(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="edit" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('modify') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- create pool -->
            <!-- 32: POOL_STATUS_NAME_USER_REQUESTED -->
            <q-btn v-if="item.status_cd === '32'" flat style="width: 30%;" disable>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="join_full" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('pool_status_name_user_requested') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- 34: POOL_STATUS_CD_ACCEPTED -->
            <q-btn v-else-if="item.status_cd === '34'" flat style="width: 30%;" disable>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="join_full" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('pool_status_name_accepted') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- 40: POOL_STATUS_NAME_SUCCESS -->
            <q-btn v-else-if="item.status_cd === '40'" flat style="width: 30%;" disable>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="join_full" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('pool_status_name_success') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- 90: POOL_STATUS_NAME_REJECTED -->
            <q-btn v-else-if="item.status_cd === '90'" flat style="width: 30%;" @click="goPayment(item)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="join_full" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('pool_status_name_rejected') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- 99: POOL_STATUS_NAME_FAILED -->
            <q-btn v-else-if="item.status_cd === '99'" flat style="width: 30%;" @click="goPayment(item)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="join_full" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('pool_status_name_failed') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <q-btn v-else flat style="width: 30%;" @click="goPayment(item)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="join_full" /></td>
                </tr>
                <tr>
                  <td><span class="text-black">{{ $t('create_pool') }}</span></td>
                </tr>
              </table>
            </q-btn>
          </q-card-actions>

          <!-- Admin Comment (for Contract Verification) -->
          <div v-if="item.status_comment && (item.status_cd === '90' || item.status_cd === '99')">
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
  <IframeModal ref="refIframeModal" />
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
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeletePool" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
// import { openURL } from 'quasar'

export default defineComponent({
  name: 'MyPoolList',
  data () {
    return {
      refresherDone: '',
      pageSize: 10,
      lastPageNum: 1, // 마지막 페이지
      poolList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
      confirmDelete: false,
      deleteTargetSeq: '',
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
    getKeyword () {
      return this.$store.getters.getKeyword
    },
  },
  created: function () {
    // 검색 키워드 설정
    this.keyword = this.getKeyword

    this.selectListMax()
  },
  mounted: function () {
  },
  methods: {
    // 검색
    async search() {
      await this.selectListMax()
      await this.refresher(null)
    },
    // 검색어 입력창 키업 이벤트
    onKeyup (event) {
      // 키워드 설정
      this.$store.dispatch('setKeyword', this.keyword)
      
      if (event.key === 'Enter') { // 엔터일 경우 검색
        this.search()
      }
    },
    deletePool(seq) {
      this.deleteTargetSeq = seq
      // 삭제 확인창 표시
      this.confirmDelete = true
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    doDeletePool() {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.deleteTargetSeq,
      }
      this.$axios.post('/api/pool/deletePool', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 리스트 재조회
            this.refresher(null)
            this.$noti(this.$q, this.$t('delete_pool_success'))
          } else {
            this.$noti(this.$q, this.$t('delete_pool_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
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
    // 풀 수정으로 이동
    goModifyPool(seq) {
      this.$router.push({ path: '/pool/modify', query: { seq: seq }})
    },
    // 유동성 풀 생성(IDO) - 결제
    async goPayment(item) {
      // 풀 생성 필수정보 등록 여부 확인
      if (!item.target_token_contract_address) {
        this.$noti(this.$q, this.$t('pool_required_field_target_token_contract_address'))
        return
      }
      if (!item.pair_token_contract_address) {
        this.$noti(this.$q, this.$t('pool_required_field_pair_token_contract_address'))
        return
      }
      if (!item.target_token_total_supply) {
        this.$noti(this.$q, this.$t('pool_required_field_target_token_total_supply'))
        return
      }
      if (!item.pair_token_total_supply) {
        this.$noti(this.$q, this.$t('pool_required_field_pair_token_total_supply'))
        return
      }
      if (!item.txid_target_token) {
        this.$noti(this.$q, this.$t('pool_required_field_txid_target_token'))
        return
      }
      if (!item.txid_pair_token) {
        this.$noti(this.$q, this.$t('pool_required_field_txid_pair_token'))
        return
      }
      if (!item.txid_create_fee) {
        this.$noti(this.$q, this.$t('pool_required_field_txid_create_fee'))
        return
      }

      // 1. 해당 유동성 풀이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: item.seq,
      }
      const result = await this.$axios.post('/api/pool/checkPoolStatusCdPaid', params)
      // console.log(result.data)
      if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
        this.$router.push({ path: '/pool/requestCreatePool', query: { key: item.seq }}) // 풀 생성 사용자 신청 화면으로 이동
      } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + ' ' + this.$t('contract_verify')
        const goodName = item.target_token_symbol + '+' + item.pair_token_symbol
        const payCode = this.$PAY_CODE_CREATE_POOL // 결제코드: CREATE_POOL(유동성 풀 생성)

        this.$store.dispatch('setPaymentGoodsName', goodName)
        this.$store.dispatch('setPaymentPayCode', payCode)

        // 상점 파라미터(customData) 설정
        // [0]: payCode | [1]: paySuccessUrl | [2]: payFailUrl | [3]: key
        const paySuccessUrl = '/pool/requestCreatePool'
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
      this.poolList = []
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
    // 나의 유동성 풀 리스트 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/pool/selectMyPoolListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 나의 유동성 풀 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
        // 키워드 설정
        this.$store.dispatch('setKeyword', this.keyword)
      }
      this.$axios.get('/api/pool/selectMyPoolList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.poolList = [] // 리스트 초기화
          }
          this.poolList = this.poolList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.poolList || this.poolList.length < 1) {
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

    goRegister() {
      // 유동성 풀 등록 화면으로 이동
      this.$router.push('/pool/register')
    },
  },
})
</script>

<style scoped>
.pool-icons {
    width: 80px;
    display: -webkit-box;
    /* display: -ms-flexbox; */
    display: flex;
    padding: 20px 0 20px 20px;
    position: relative;
}
</style>
