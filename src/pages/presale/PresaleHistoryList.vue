<template>
  <q-page class="page-default">
    <div class="row q-pt-md q-pl-md justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_presale_history_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row q-pl-md row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_presale_history_list_description') }}
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
      <!-- &nbsp;&nbsp;
      <q-btn @click="goRegisterPresaleHistory" icon="add" color="primary" size="lg" style="width: 80px;" /> -->
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- 사전판매 거래내역 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <div v-for="item in presaleHistoryList" :key="item.seq">
          <q-separator />
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img v-if="item.deposit_token_logo_image" :src="item.deposit_token_logo_image">
                <q-icon v-else name="generating_tokens" size="md" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="row">
                <q-item-label class="col-12 text-weight-bold">
                  <span class="">{{ item.deposit_token_amount }}</span>
                  &nbsp;<span class="">{{ item.deposit_token_symbol }}</span>
                  &nbsp;<span class="">({{ Number(item.deposit_token_total_usd) }} USD)</span>
                </q-item-label>
                <q-item-label class="col-12">{{ item.wallet_address }} - {{ item.wallet_type }}</q-item-label>
                <q-item-label class="col-12"><a @click="openUrl('https://scope.klaytn.com/tx/' + item.txid_deposit)" style="cursor: pointer;z-index: 1;"><b>{{ item.txid_deposit }}</b></a></q-item-label>
                <q-item-label v-if="item.amount" class="col-12 text-red-5 text-weight-bold">{{ Number(item.amount).toFixed(6) }} {{ item.to_token_symbol }}</q-item-label>
                <q-item-label v-else class="col-12 text-red-5 text-weight-bold">{{ $t('presale_waiting_for_completion') }}</q-item-label>
                <q-item-label v-if="item.txid_claimed" class="col-12"><a @click="openUrl('https://scope.klaytn.com/tx/' + item.txid_claimed)" style="cursor: pointer;z-index: 1;"><b>{{ item.txid_claimed }}</b></a></q-item-label>
              </div>
            </q-item-section>
          </q-item>

          <!-- 관리자 수정용 -->
          <!-- <div v-if="isAdmin" class="text-right">
            <q-btn @click="goSetDescription(item.seq)" size="sm" label="Modify" />
          </div> -->

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

</template>

<script>
import { defineComponent } from 'vue';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PresaleHistoryList',
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
      presaleHistoryList: [],
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
    // 키 설정
    this.seq = this.$route.query.seq

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
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.presaleHistoryList = []
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
    // 사전판매 거래내역 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/presale/selectPresaleHistoryListLastPageNum',
        {params: {uid: this.getUid, seq_presale: this.seq, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 사전판매 거래내역 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/presale/selectPresaleHistoryList',
        {params: {uid: this.getUid, seq_presale: this.seq, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.presaleHistoryList = [] // 리스트 초기화
          }
          this.presaleHistoryList = this.presaleHistoryList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.presaleHistoryList || this.presaleHistoryList.length < 1) {
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
    openUrl(url) {
      // openURL(url)
      // window.open(url, '_system', 'location=yes,footer=yes')

      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = url
        this.$refs.refIframeModal.show()
      } else {
        window.open(url, '_system')
      }
    },
    goBack() {
      this.$router.go(-1)
    },
  },
})
</script>

<style scoped>
</style>
