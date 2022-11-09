<template>
  <q-page class="page-default">
    <div class="row q-pt-md q-pl-md justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_cart_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row q-pl-md row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_cart_list_description') }}
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="q-pt-sm q-pb-md q-pl-md row">
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- 공지사항 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <div v-for="item in inquiryList" :key="item.seq">
          <q-separator />
          <q-expansion-item group="actionGroup">
            <template v-slot:header>
              <q-item-section>
                <div>
                  <q-checkbox v-model="item.check" />
                  <span>{{ item.title }}</span>&nbsp;&nbsp;
                </div>
              </q-item-section>
            </template>
            <q-card>
              <q-separator color="grey-3" />
              <q-card-section>
                <div>
                  <div class="q-pb-sm">
                    {{ $t('inquiry_contents') }}
                    &nbsp;
                    <span class="text-grey-5">{{ qDate.formatDate(item.reg_time, 'YYYY-MM-DD HH:mm') }}</span>
                  </div>
                  <div>
                    <q-input
                      v-model="item.contents"
                      type="textarea"
                      autogrow
                      outlined
                      readonly
                    />
                  </div>
                </div>
                <br />
                <div>
                  <div class="q-pb-sm">
                    {{ $t('inquiry_answer') }}
                    &nbsp;
                    <span class="text-grey-5">{{ qDate.formatDate(item.answer_time, 'YYYY-MM-DD HH:mm') }}</span>
                  </div>
                  <div v-if="isAdmin">
                    <q-input
                      v-model="item.answer"
                      type="textarea"
                      autogrow
                      outlined
                    />
                    <br />
                    <q-btn class="btn" color="secondary" text-color="black" size="md" style="width: 100px;" @click="updateInquiryAnswer(item)" dense>
                      <b>{{ $t('register') }}</b>
                    </q-btn>
                  </div>
                  <div v-else>
                    <q-input
                      v-model="item.answer"
                      type="textarea"
                      autogrow
                      outlined
                      readonly
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
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

    <div v-else class="q-pl-md text-center">
      <q-btn @click="goRegister" color="primary" size="lg" style="width: 120px;">
        {{ $t('buy') }}
      </q-btn>
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
  name: 'InquiryList',
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
      inquiryList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
      showAllYn: 'Y',
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
    // 전체 문의 표시 or 나의 문의 표시
    showAllYn (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.search()
      }
    }
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
    showDetail(seq) {
      // 상세 화면으로 이동
      // this.$router.push({ path: '/token/detail', query: { seq: seq }})
      this.$refs.refInquiryDetailModal.seq = seq
      this.$refs.refInquiryDetailModal.show()
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.inquiryList = []
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
    // 공지사항 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }

      // 나의 문의 파라미터
      let regId = this.getUid
      if (this.showAllYn === 'Y') {
        regId = ''
      }

      this.$axios.get('/api/inquiry/selectInquiryListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword, reg_id: regId}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 공지사항 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }

      // 나의 문의 파라미터
      let regId = this.getUid
      if (this.showAllYn === 'Y') {
        regId = ''
      }

      this.$axios.get('/api/inquiry/selectInquiryList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, reg_id: regId}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.inquiryList = [] // 리스트 초기화
          }
          this.inquiryList = this.inquiryList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.inquiryList || this.inquiryList.length < 1) {
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
    goRegister() {
      // 공지사항 등록 화면으로 이동
      this.$router.push('/inquiry/register')
    },
    updateInquiryAnswer(item) {
      this.$q.loading.show() // 로딩 표시 시작

      // 문의사항 등록 처리
      const param = {
        uid: this.getUid,
        seq: item.seq,
        answer: item.answer,
        answer_id: this.getUid,
      }
      this.$axios.post('/api/inquiry/updateInquiryAnswer', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
  },
})
</script>

<style scoped>
</style>
