<template>
  <q-page class="page-default">
    <div class="row q-pt-md q-pl-md justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_whitelist_apply_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row q-pl-md row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        <span v-if="locale === 'ko-KR'">{{ title_ko }}</span>
        <span v-else>{{ title }}</span>
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="q-pt-sm q-pb-md q-pl-md row">
      <q-btn @click="goBack" icon="arrow_back" color="primary" size="lg" style="width: 80px;" outline />
      &nbsp;&nbsp;
      <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outline />
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- 화이트리스트 신청목록 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <div v-for="(item, index) in applyList" :key="item.seq" @click="showDetail(item.seq)" style="cursor: pointer;z-index: 1;">
          <q-separator />
          <q-item clickable>
            <q-item-section>
              <div class="">
                <q-item-label class="col-12 text-left text-weight-bold">{{ index + 1 }}. {{ item.wallet_address }}</q-item-label>
                <q-item-label class="col-12 text-right">
                  <span v-if="select_type === 'SCORE'" class="text-weight-bold">{{ $t('score') }} : {{ item.total_score }} | </span>
                  {{ $t('apply_date') }} : {{ qDate.formatDate(item.reg_time, 'YYYY-MM-DD HH:mm') }}
                </q-item-label>
              </div>
            </q-item-section>
          </q-item>
        </div>
        <q-separator />

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
  <WhitelistApplyDetailModal ref="refWhitelistApplyDetailModal" />
</template>

<script>
import { defineComponent } from 'vue';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'WhitelistApplyList',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      refresherDone: '',
      pageSize: 100,
      lastPageNum: 1, // 마지막 페이지
      applyList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드

      seq: '',
      start_time: '',
      end_time: '',
      title: '',
      title_ko: '',
      contents: '',
      contents_ko: '',
      select_type: 'LINEUP',
      max_select: '0',
      token_contract_address: '',
      main_image: '',
      // rows: [],
      // actionRows: [],
      // imageFieldIndex: '', // 이미지 파일 추가시 항목 인덱스 설정, 업로드 완료시 해당 인덱스의 value로 이미지URL을 설정
      confirmGoBack: false,
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
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
    qDate() {
      return date
    },
  },
  created: function () {
    // 키 설정
    this.seq = this.$route.query.seq
    // 화이트리스트 조회
    this.selectWhitelist()

    this.selectListMax()
  },
  mounted: function () {
  },
  methods: {
    // 기본정보 조회
    async selectWhitelist() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelist', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // this.seq = result.data.seq
        this.start_time = result.data.start_time
        this.end_time = result.data.end_time
        this.title = result.data.title
        this.contents = result.data.contents
        this.title_ko = result.data.title_ko
        this.contents_ko = result.data.contents_ko
        this.select_type = result.data.select_type
        this.max_select = result.data.max_select
        this.token_contract_address = result.data.token_contract_address
        this.main_image = result.data.main_image
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
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
    showDetail(seq_whitelist_apply) {
      // 상세 화면으로 이동
      // this.$router.push({ path: '/token/detail', query: { seq: seq }})
      this.$refs.refWhitelistApplyDetailModal.seq = seq_whitelist_apply
      this.$refs.refWhitelistApplyDetailModal.seq_whitelist = this.seq
      this.$refs.refWhitelistApplyDetailModal.select_type = this.select_type // 타입
      this.$refs.refWhitelistApplyDetailModal.show()
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.applyList = []
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
    // 화이트리스트 신청목록 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/whitelist/selectWhitelistApplyListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword, seq_whitelist: this.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 화이트리스트 신청목록 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/whitelist/selectWhitelistApplyList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, seq_whitelist: this.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.applyList = [] // 리스트 초기화
          }
          this.applyList = this.applyList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.applyList || this.applyList.length < 1) {
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
    goBack() {
      this.$router.go(-1)
    },
  },
})
</script>

<style scoped>
</style>
