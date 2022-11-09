<template>
  <q-page class="page-default">
    <div class="row q-pt-md q-pl-md justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_holder_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row q-pl-md row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_holder_list_description') }}
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="row justify justify-between q-pb-sm q-pl-md">
      <div class="row q-pt-sm q-pb-sm">
        <!-- <q-btn @click="goBack" icon="arrow_back" color="primary" size="lg" style="width: 80px;" outline />
        &nbsp;&nbsp; -->
        <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
        &nbsp;&nbsp;
        <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outline />
        &nbsp;&nbsp;
        <q-btn @click="exportTable" icon="download" color="primary" size="lg" style="width: 80px;" outline />
      </div>
      <!-- <div class="row q-pt-sm q-pb-sm">
        <q-btn @click="exportTable" color="primary" size="sm" style="width: 125px; height: 30px;" no-caps outline>
          <q-icon name="download" />
          &nbsp;
          CSV {{ $t('download') }}
        </q-btn>
      </div> -->
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- 홀더리스트 신청 결과 목록 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <div v-for="item in holderList" :key="item.seq" style="cursor: pointer;z-index: 1;">
          <q-separator />
          <q-item clickable>
            <q-item-section>
              <div class="">
                <q-item-label class="col-12 text-left text-weight-bold">{{ item.ranking }}. {{ item.wallet_address }}</q-item-label>
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
</template>

<script>
import { defineComponent } from 'vue';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n'
import { exportFile } from 'quasar'

export default defineComponent({
  name: 'HolderlistApplyResultList',
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

      contractAddress: '',

      holderList: [],
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
    // this.seq = this.$route.query.seq
    this.contractAddress = '0x07ffbdba745f3a98ec462385aedcdcd973021671'

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
      this.holderList = []
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
    // 홀더리스트 신청 결과 목록 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/holder/selectHolderlistLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword, contractAddress: this.contractAddress}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 홀더리스트 신청 결과 목록 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/holder/selectHolderlist',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, contractAddress: this.contractAddress}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.holderList = [] // 리스트 초기화
          }
          this.holderList = this.holderList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.holderList || this.holderList.length < 1) {
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
    wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0
        ? formatFn(val, row) : val
      formatted = formatted === void 0 || formatted === null
        ? '' : String(formatted)
      formatted = formatted.split('"').join('""')
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
    },
    // CSV 파일로 다운로드
    async exportTable() {
      this.$q.loading.show() // 로딩 표시 시작
      try {
        let columns = [] // CSV 항목
        let rows = [] // 데이터 리스트

        // 1. 전체 리스트 데이터 조회
        const param = {
          uid: this.getUid,
          seq: this.seq,
        }
        // const result = await this.$axios.get('/api/whitelist/selectHolderlistApplyBySeq', { params: { ...param } })
        const result = await this.$axios.get('/api/holder/selectHolderlistForDownload', {params: {uid: this.getUid, contractAddress: this.contractAddress}})
        const holderList = result.data
        console.log(holderList)

        // 2. 홀더리스트 입력항목 조회
        // const fieldList = await this.selectHolderlistFieldList(this.seq)

        // 3. CSV 항목 설정
        // 3.1 항목 설정
        if (fieldList) {
          for (let i = 0; i < fieldList.length; i++) {
            const fieldObj = fieldList[i]
            let columnObj = {}

            if (i === 0) {
              // 제일 앞에 랭킹 항목 추가
              columnObj = {
                name: 'Rank',
                field: 'Rank',
                label: 'Rank',
              }
              columns.push(columnObj)
            }

            columnObj = {
              name: fieldObj.name,
              field: i,
              label: fieldObj.name,
            }
            columns.push(columnObj)

            if (i === fieldList.length - 1 && this.select_type === 'SCORE') {
              // 경쟁타입인 경우, 마지막에 총점수 항목 추가
              columnObj = {
                name: 'Score',
                field: 'Score',
                label: 'Score',
              }
              columns.push(columnObj)
            }
          }
        }

        // 3.2 데이터 설정
        if (holderList) {
          for (let i = 0; i < holderList.length; i++) {
            const dataObj = holderList[i]
            const fieldValuesArray = dataObj.field_values.split('|')
            let rowString = ''
            for (let j = 0; j < fieldValuesArray.length; j++) {
              if (j === 0) {
                rowString = '{"Rank":"' + dataObj.ranking + '",'
              } else {
                rowString += ','
              }
              // rowString += '"' + fieldList[j].name + '" : "' + fieldValuesArray[j] + '"'
              rowString += '"' + j + '" : "' + fieldValuesArray[j] + '"'
              if (j === fieldValuesArray.length - 1) {
                if (this.select_type === 'SCORE') {
                  // 경쟁타입인 경우, 마지막에 총점수 항목 추가
                  rowString += ',"Score" : "' + dataObj.total_score + '"'
                }
                rowString += '}'
              }
            }
            // console.log('rowString:')
            // console.log(rowString)
            let rowObj = JSON.parse(rowString)
            rows.push(rowObj)
          }
        }
        // console.log('columns:')
        // console.log(columns)
        // console.log('rows:')
        // console.log(rows)

        // 4. 파일 다운로드
        // naive encoding to csv format
        const content = [columns.map(col => this.wrapCsvValue(col.label))].concat(
          rows.map(row => columns.map(col => this.wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile (
          'whitelist.csv',
          content,
          'text/csv'
        )

        this.$q.loading.hide() // 로딩 표시 종료

        if (status !== true) {
          this.$q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      } catch(err) {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
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
