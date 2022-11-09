<template>
  
  <q-dialog v-model="whitelistModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
      <q-header class="bg-white" elevated>
        <q-toolbar>
          <q-avatar>
            <q-icon name="list_alt" size="md" color="black" />
          </q-avatar>
          <q-toolbar-title class="text-black">
            {{ $t('whitelist') }}
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding style="word-break: break-all;">

          <div class="row justify justify-between q-pb-sm q-pl-md">
            <div class="row q-pt-sm q-pb-sm">
              <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
              &nbsp;&nbsp;
              <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outline />
            </div>
          </div>

          <!-- 화이트리스트 신청 결과 목록 리스트 -->
          <q-pull-to-refresh @refresh="refresher">
            <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

              <div v-for="(item, index) in applyResultList" :key="item.seq" @click="openUrl(scopeKlaytnUrl + 'account/' + item.wallet_address)" style="cursor: pointer;z-index: 1;">
                <q-separator />
                <q-item clickable>
                  <q-item-section>
                    <div class="">
                      <q-item-label class="col-12 text-left">{{ index + 1 }}. {{ item.wallet_address }}</q-item-label>
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

          <!-- place QPageScroller at end of page -->
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="primary" />
          </q-page-scroller>

        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { useI18n } from 'vue-i18n'
// import { openURL } from 'quasar'

export default {
  name: 'TokenDetailModal',
  data () {
    return {
      whitelistModal: false,
      maximized: false,
      whitelistSeqArray: '',
      refresherDone: '',
      pageSize: 100,
      lastPageNum: 1, // 마지막 페이지
      applyResultList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
      scopeKlaytnUrl: '',
    }
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
  },
  methods: {
    async show () {
      this.scopeKlaytnUrl = this.$scopeDomainKlaytn
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
        // 디바이스가 모바일인 경우
        this.maximized = true
      } else {
        // 디바이스가 데스크탑인 경우
        this.maximized = false
      }
      this.whitelistModal = true

      // 키 설정
      // this.tokenSeq = this.$route.query.seq
      // 화이트리스트 맥스 페이지 조회
      this.selectListMax()
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
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.applyResultList = []
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
    // 화이트리스트 신청 결과 목록 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/whitelist/selectWhitelistApplyResultListByWhitelistSeqArrayLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword, whitelistSeqArray: this.whitelistSeqArray}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 화이트리스트 신청 결과 목록 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/whitelist/selectWhitelistApplyResultListByWhitelistSeqArray',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, whitelistSeqArray: this.whitelistSeqArray}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.applyResultList = [] // 리스트 초기화
          }
          this.applyResultList = this.applyResultList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.applyResultList || this.applyResultList.length < 1) {
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
      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = url
        this.$refs.refIframeModal.show()
      } else {
        window.open(url, '_system')
      }
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
    close () {
      this.whitelistModal = false
    }
  }
}
</script>
