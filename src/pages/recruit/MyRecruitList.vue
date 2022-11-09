<template>
  <q-page class="page-default">
    <div class="row q-pt-md q-pl-md justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_my_recruit_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row q-pl-md row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_my_recruit_list_description') }}
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="q-pt-sm q-pb-md q-pl-md row">
      <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outline />
      &nbsp;&nbsp;
      <q-btn @click="goRegister" icon="add" color="primary" size="lg" style="width: 80px;" />
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- 채용 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <!-- <div v-for="item in myRecruitList" :key="item.seq"> -->
        <q-card class="my-card q-pt-sm q-mb-lg" v-for="item in myRecruitList" :key="item.seq">

          <q-item>
            <q-item-section avatar>
              <div class="text-center" style="width: 100%">
                [ {{ item.seq }} ]
              </div>
              <q-avatar>
                <img v-if="item.token_logo_image" :src="item.token_logo_image">
                <q-icon v-else name="assignment_ind" size="md" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="row">
                <q-item-label v-if="locale === 'ko-KR'" class="col-12 text-weight-bold">{{ item.title_ko }}</q-item-label>
                <q-item-label v-else class="col-12 text-weight-bold">{{ item.title }}</q-item-label>
                <q-item-label class="col-6 text-left"></q-item-label>
                <q-item-label class="col-6 text-right">{{ $t('start') }} : {{ item.start_time }}</q-item-label>
                <q-item-label class="col-6 text-left"></q-item-label>
                <q-item-label class="col-6 text-right">{{ $t('end') }} : {{ item.end_time }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>

          <q-separator />

          <!-- Action Button -->
          <q-card-actions align="around">
            <!-- delete recruit -->
            <q-btn v-if="item.status_cd === '10'" flat style="width: 23%;" @click="deleteRecruit(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="delete_forever" /></td>
                </tr>
                <tr>
                  <td><span class="text-black text-lowercase">{{ $t('delete') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- modify recruit -->
            <q-btn v-if="item.status_cd >= '30'" flat style="width: 23%;" disable>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="edit" /></td>
                </tr>
                <tr>
                  <td><span class="text-black text-lowercase">{{ $t('modify') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <q-btn v-else flat style="width: 23%;" @click="goModifyRecruit(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="edit" /></td>
                </tr>
                <tr>
                  <td><span class="text-black text-lowercase">{{ $t('modify') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- detail recruit -->
            <q-btn flat style="width: 23%;" @click="goRecruitDetail(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="preview" /></td>
                </tr>
                <tr>
                  <td><span class="text-black text-lowercase">{{ $t('preview') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- confirm recruit -->
            <!-- 30: RECRUIT_STATUS_CD_PAID -->
            <q-btn v-if="item.status_cd >= '30'" flat style="width: 23%;" @click="goRecruitApplyList(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="grading" /></td>
                </tr>
                <tr>
                  <td><span class="text-black text-lowercase">{{ $t('recruit_apply_list') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <q-btn v-else flat style="width: 23%;" @click="goPayment(item)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="double_arrow" /></td>
                </tr>
                <tr>
                  <td><span class="text-black text-lowercase">{{ $t('request_recruit') }}</span></td>
                </tr>
              </table>
            </q-btn>

            <!-- close off recruit -->
            <!-- 30: RECRUIT_STATUS_CD_PAID -->
            <q-btn v-if="item.status_cd === '30'" flat style="width: 23%;" @click="closeOffRecruit(item)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="done_outline" /></td>
                </tr>
                <tr>
                  <td><span class="text-black text-lowercase">{{ $t('recruit_close_off') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- <q-btn v-else-if="item.status_cd >= '30'" flat style="width: 23%;" @click="goRecruitResult(item.seq)"> -->
            <!-- <q-btn v-if="item.status_cd > '30'" flat style="width: 23%;" @click="goRecruitApplyResultList(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="format_list_numbered" /></td>
                </tr>
                <tr>
                  <td><span class="text-black text-lowercase">{{ $t('recruit_result') }}</span></td>
                </tr>
              </table>
            </q-btn> -->
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

  <!-- confirm delete -->
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
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteRecruit" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- confirm close off -->
  <q-dialog v-model="confirmCloseOff">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_close_off') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('yes')" color="black" v-close-popup @click="doCloseOffRecruit" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MyRecruitList',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      refresherDone: '',
      pageSize: 20,
      lastPageNum: 1, // 마지막 페이지
      myRecruitList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
      confirmDelete: false,
      confirmCloseOff: false,
      closeOffTargetItem: {},
      // closeOffSeq: '', // recruit 의 seq
      // maxSelect: '', // recruit 의 max_select
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
    // isAdmin () {
    //   return this.$store.getters.getAdcd === this.$adminCode
    // },
    qDate() {
      return date
    },
  },
  created: function () {
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
      if (event.key === 'Enter') { // 엔터일 경우 검색
        this.search()
      }
    },
    deleteRecruit(seq) {
      this.deleteTargetSeq = seq
      // 삭제 확인창 표시
      this.confirmDelete = true
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    doDeleteRecruit() {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.deleteTargetSeq,
      }
      this.$axios.post('/api/recruit/deleteRecruit', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 리스트 재조회
            this.refresher(null)
            this.$noti(this.$q, this.$t('delete_success'))
          } else {
            this.$noti(this.$q, this.$t('delete_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    goModifyRecruit(seq) {
      // 채용 수정 화면으로 이동
      this.$router.push({ path: '/recruit/modify', query: { seq: seq }})
    },
    goRecruitDetail(seq) {
      // 채용 상세 화면으로 이동
      this.$router.push({ path: '/recruit/detail', query: { seq: seq }})
    },
    // showDetail(seq) {
    //   // 상세 화면으로 이동
    //   // this.$router.push({ path: '/token/detail', query: { seq: seq }})
    //   this.$refs.refNoticeDetailModal.seq = seq
    //   this.$refs.refNoticeDetailModal.show()
    // },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.myRecruitList = []
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
    // 채용 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/recruit/selectMyRecruitListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 채용 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/recruit/selectMyRecruitList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.myRecruitList = [] // 리스트 초기화
          }
          this.myRecruitList = this.myRecruitList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.myRecruitList || this.myRecruitList.length < 1) {
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
    async goPayment(item) {
      // 0. 해당 업무가 유료인지 무료인지 체크 - 무료일 경우 진행
      const priceResult = await this.$axios.get('/api/payment/selectPriceAll', {params: { uid: this.getUid, payCd: this.$PAY_CODE_CREATE_RECRUIT }})
      // console.log(priceResult)
      if (priceResult && priceResult.data.use_yn === 'N') {
        // 결제사용여부 N 이면, 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: item.seq,
          order_id: 'PAY_FREE',
        }
        const result = await this.$axios.post('/api/recruit/updateRecruitStatusCdPaid', params)
        if (result && result.data && result.data.resultCd === 'SUCCESS') {
          // 결제완료 표시
          item.status_cd = '30'
          this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
          return
        } else {
          this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
          return
        }
      }

      // 1. 해당 토큰이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: item.seq,
      }
      const result = await this.$axios.post('/api/recruit/checkRecruitStatusCdPaid', params)
      if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
        this.$router.push({ path: '/recruit/myRecruitList', query: { seq: item.seq }}) // 나의 채용 목록 화면으로 이동
      } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + '(' + item.symbol + ')'
        const goodName = item.title.substr(0, 40) // 상품명 길이 제한

        const payCode = this.$PAY_CODE_CREATE_RECRUIT // 결제코드: CREATE_RECRUIT(채용 생성)

        this.$store.dispatch('setPaymentGoodsName', goodName)
        this.$store.dispatch('setPaymentPayCode', payCode) 

        // 상점 파라미터(customData) 설정
        // [0]: payCode | [1]: paySuccessUrl | [2]: payFailUrl | [3]: key
        const paySuccessUrl = '/recruit/myRecruitList'
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
    // 마감 확인창 표시
    closeOffRecruit(item) {
      this.closeOffTargetItem = item
      // this.closeOffSeq = item.seq // recruit 의 seq
      // this.maxSelect = item.max_select // recruit 의 max_select
      // this.selectType = item.select_type // recruit 의 max_select
      this.confirmCloseOff = true
    },
    // 마감 처리
    async doCloseOffRecruit() {
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.closeOffTargetItem.seq, // recruit 테이블의 seq
        max_select: this.closeOffTargetItem.max_select,
        select_type: this.closeOffTargetItem.select_type,
        same_score_type: this.closeOffTargetItem.same_score_type,
      }
      // console.log(params)
      const result = await this.$axios.post('/api/recruit/closeOffRecruit', params)
      this.$q.loading.hide() // 로딩 표시 종료
      if (result && result.data && result.data.resultCd === 'SUCCESS') {
        this.closeOffTargetItem.status_cd = '40' // 40: 마감 완료
        this.$noti(this.$q, this.$t('recruit_close_off_success')) // '마감 처리 완료'
      } else {
        this.$noti(this.$q, this.$t('recruit_close_off_failed')) // '마감 처리 실패'
      }
    },
    goRegister() {
      // 채용 등록 화면으로 이동
      this.$router.push('/recruit/register')
    },
    goRecruitApplyList(seq) {
      // 채용 신청 목록 화면으로 이동
      this.$router.push({ path: '/recruit/recruitApplyList', query: { seq: seq }})
    },
    goRecruitApplyResultList(seq) {
      // 채용 신청 결과 목록 화면으로 이동
      this.$router.push({ path: '/recruit/recruitApplyResultList', query: { seq: seq }})
    },
  },
})
</script>

<style scoped>
</style>
