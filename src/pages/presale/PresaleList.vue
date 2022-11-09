<template>
  <q-page class="page-default">
    <div class="row q-pt-md q-pl-md justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_presale_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row q-pl-md row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_presale_list_description') }}
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="q-pt-sm q-pb-md q-pl-md row">
      <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outline />
      &nbsp;&nbsp;
      <q-btn @click="goRegisterPresale" icon="add" color="primary" size="lg" style="width: 80px;" />
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- 사전판매 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <!-- <div v-for="item in presaleList" :key="item.seq"> -->
        <q-card class="my-card q-pt-sm q-mb-lg q-ml-sm q-mr-sm" v-for="item in presaleList" :key="item.seq" @click="goPresaleDetail(item.seq)" style="cursor: pointer; z-index: 1;">

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img v-if="item.token_logo_image" :src="item.token_logo_image">
                <q-icon v-else name="generating_tokens" size="md" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="" class="text-weight-bold text-left">{{ item.token_name }}</td>
                  <td width="" class="text-right">{{ $t('presale_total_usd') }}</td>
                </tr>
                <tr>
                  <td class="text-weight-bold text-left">{{ item.token_symbol }}</td>
                  <td class="text-right">{{ item.usd_total }} USD</td>
                </tr>
              </table>
            </q-item-section>
          </q-item>

          <q-img :src="item.main_image ? item.main_image : 'images/og_image.png'">
            <!-- 진행상태 표시 -->
            <div class="text-subtitle2 absolute-top text-center">
              <span v-if="item.progress_status === 'COMPLETED'">{{ $t('presale_status_completed') }}</span>
              <span v-else-if="item.progress_status === 'ENDED'">{{ $t('presale_status_ended') }}</span>
              <span v-else-if="item.progress_status === 'STARTED'">{{ $t('presale_status_started') }}</span>
              <span v-else>{{ $t('presale_status_waiting') }}</span>
            </div>
          </q-img>

          <q-card-section>
            <div v-if="locale === 'ko-KR'" class="text-h6 text-weight-bold">{{ item.title_ko }}</div>
            <div v-else class="text-h6 text-weight-bold">{{ item.title }}</div>
            <!-- <div v-if="locale === 'ko-KR'" class="text-subtitle1 text-weight-bold q-pt-xs">{{ item.team_name_ko }}</div>
            <div v-else class="text-subtitle1 text-weight-bold q-pt-xs">{{ item.team_name }}</div> -->
            <div class="q-pt-sm">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="" class="text-left">
                    {{ $t('presale_team') }} :
                    <span v-if="locale === 'ko-KR'">{{ item.team_name_ko }}</span>
                    <span v-else>{{ item.team_name }}</span>
                  </td>
                  <td width="" class="text-right">
                    {{ $t('start') }} : {{ item.start_time }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left">
                    {{ $t('presale_type') }} :
                    <span v-if="item.type === 'FIXED'">{{ $t('presale_type_fixed_price') }}</span>
                    <span v-else-if="item.type === 'AUCTION'">{{ $t('presale_type_auction_swap') }}</span>
                  </td>
                  <td class="text-right">
                    {{ $t('end') }} : {{ item.end_time }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left">
                    {{ $t('presale_amount') }} : {{ Number(item.amount).toLocaleString() }} {{ item.token_symbol }}
                  </td>
                  <td class="text-right">
                    {{ $t('presale_claim') }} : {{ item.claim_time }}
                  </td>
                </tr>
              </table>
            </div>
          </q-card-section>

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

</template>

<script>
import { defineComponent } from 'vue';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PresaleList',
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
      presaleList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
      confirmDelete: false,
      confirmCloseOff: false,
      closeOffTargetItem: {},
      // closeOffSeq: '', // presale 의 seq
      // maxSelect: '', // presale 의 max_select
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
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
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
    deletePresale(seq) {
      this.deleteTargetSeq = seq
      // 삭제 확인창 표시
      this.confirmDelete = true
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    doDeletePresale() {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.deleteTargetSeq,
      }
      this.$axios.post('/api/presale/deletePresale', param)
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
    goPresaleDetail(seq) {
      // 사전판매 상세 화면으로 이동
      this.$router.push({ path: '/presale/presaleDetail', query: { seq: seq }})
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.presaleList = []
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
    // 사전판매 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/presale/selectPresaleListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 사전판매 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/presale/selectPresaleList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.presaleList = [] // 리스트 초기화
          }
          this.presaleList = this.presaleList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.presaleList || this.presaleList.length < 1) {
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
    goRegisterPresale() {
      // 사전판매 등록 화면으로 이동
      this.$router.push('/presale/registerPresale')
    },
  },
})
</script>

<style scoped>
</style>
