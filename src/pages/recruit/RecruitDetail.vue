<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading text-h6 q-pb-md text-center">
        <span v-if="locale === 'ko-KR'">{{ title_ko }}</span>
        <span v-else>{{ title }}</span>
      </div>
    </div>

    <!-- view recruit apply list -->
    <div class="row justify-center q-pb-md">
      <!-- <div class="text-left">
        <q-btn class="btn" color="primary" size="md" style="width: 130px;" outline @click="goRecruitApplyList" tabindex="0">
          <b>{{ $t('view_apply_list') }}</b>
        </q-btn>
      </div>
      &nbsp;&nbsp;&nbsp; -->
      <div class="text-left">
        <q-btn class="btn" color="primary" size="md" style="width: 130px;" outline @click="shareUrlCopy" no-caps tabindex="1">
          <b>{{ $t('share') }}</b>
        </q-btn>
      </div>
      &nbsp;&nbsp;&nbsp;
      <div v-if="project_seq" class="text-right">
        <q-btn class="btn" color="primary" size="md" style="width: 130px;" outline @click="showProject" no-caps tabindex="2">
          <b>{{ $t('recruit_project_information') }}</b>
        </q-btn>
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td colspan="3">
            <div class="q-pt-sm"></div>
          </td>
        </tr>
        <tr>
          <td width="33%" align="center"><span class="">{{ $t('recruit_applied_yn') }}</span></td>
          <td width="33%" align="center"><span class="">{{ $t('recruit_total_applied') }}</span></td>
          <td width="33%" align="center"><span class="">{{ $t('recruit_remain_time') }}</span></td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="q-pt-sm"></div>
            <q-separator color="primary" />
            <div class="q-pt-sm"></div>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-icon v-if="isApplied" name="check" color="green" size="sm" />
            <q-icon v-else name="close" color="black" size="sm" />
          </td>
          <td align="center">{{ total_applied }}</td>
          <!-- <td align="center">
            {{ remain_time }}
            {{ $t('recruit_remain_hour') }}
          </td> -->
          <td align="center">
            <VueCountdown :time="remain_time" :interval="1000" @end="onCountdownEnd">
              <!-- <template v-slot="props">{{ props.days }} Days {{ zerofill(props.hours + (props.days * 24)) }} : {{ zerofill(props.minutes) }} : {{ zerofill(props.seconds) }}</template> -->
              <template v-slot="props">{{ zerofill(props.hours + (props.days * 24)) }} : {{ zerofill(props.minutes) }} : {{ zerofill(props.seconds) }}</template>
            </VueCountdown>
          </td>


        </tr>
        <tr>
          <td colspan="3">
            <div class="q-pt-sm"></div>
          </td>
        </tr>
      </table>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <div v-if="main_image" class="row justify-center q-pt-md">
      <div class="col-12">
        <img :src="main_image" style="width: 100%;">
      </div>
    </div>

    <!-- <q-separator color="primary" style="height: 1px;" /> -->

    <!-- contents -->
    <div class="row justify-center q-pt-md q-pb-md">
      <div class="col-12">
        <div v-if="locale === 'ko-KR'" class="col-12" v-html="contents_ko"></div>
        <div v-else class="col-12" v-html="contents"></div>
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />
    
    <div class="q-pt-lg"></div>

    <q-toolbar class="bg-primary text-left">
      <q-icon name="edit" size="sm" color="white" />
      <q-toolbar-title class="text-white text-subtitle1">
        <strong>{{ $t('input_field') }}</strong>
      </q-toolbar-title>
    </q-toolbar>
    <q-list bordered class="q-pa-md">
      <!-- ■ input field list START -->
      <div v-for="(item, index) in rows" :key="item.seq">
        <div class="row justify-center q-pt-md">
          <div class="col-12">
            <span v-if="locale === 'ko-KR'" class="text-weight-bold text-subtitle1">{{ index + 1 }}. {{ item.name_ko }}<span v-if="item.required === 'Y'" class="text-red"> *</span></span>
            <span v-else class="text-weight-bold text-subtitle1">{{ index + 1 }}. {{ item.name }}<span v-if="item.required === 'Y'" class="text-red"> *</span></span>
          </div>
        </div>
        <!-- if - FILE TYPE -->
        <div v-if="item.type === 'FILE'">
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-uploader
                field-name="file"
                ref="uploaderObj"
                url="/api/common/uploadImage"
                hide-upload-btn
                color="grey-3"
                text-color="black"
                :multiple="false"
                accept="*"
                :filter="filterFiles"
                max-files="1"
                :auto-upload="true"
                :tabindex="index + 3"
                @added="fileAdded(index)"
                @uploaded="fileUploaded"
              />
            </div>
          </div>
          <!-- FILE TYPE uploaded -->
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <div v-if="item.value">
                <a @click="openUrl(item.value)" style="cursor: pointer;">
                  <q-icon name="file_download" size="sm" color="black" />
                  {{ $t('file_download') }}
                </a>
              </div>
              <div v-else>{{ $t('no_file') }}</div>
            </div>
          </div>
        </div>

        <!-- else - TEXT TYPE -->
        <div v-else>
          <div class="row justify-center">
            <div class="col-12">
              <q-input v-model="item.value" v-if="item.required === 'Y'" :rules="[required]" clearable standout :tabindex="index + 3" :readonly="applyTimeOver" />
              <q-input v-model="item.value" v-else clearable standout :tabindex="index + 3" class="q-pb-lg" :readonly="applyTimeOver" />
            </div>
          </div>
        </div>

      </div>
      <!-- ■ input field list END -->
    </q-list>

    <div class="row justify-center q-pb-xl"></div>

    <!-- buttons -->
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="32">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">

        <div v-if="applyTimeOver">
          <q-btn v-if="!isApplied" class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" disable tabindex="31">
            <b>{{ $t('recruit_apply') }}</b>
          </q-btn>
          <q-btn v-else class="btn" color="primary" text-color="black" size="lg" style="width: 98%;" disable tabindex="31">
            <b>{{ $t('modify') }}</b>
          </q-btn>
        </div>

        <div v-else>
          <q-btn v-if="!isApplied" class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="insertRecruitApply" tabindex="31">
            <b>{{ $t('recruit_apply') }}</b>
          </q-btn>
          <q-btn v-else class="btn" color="primary" text-color="black" size="lg" style="width: 98%;" @click="updateRecruitApply" tabindex="31">
            <b>{{ $t('modify') }}</b>
          </q-btn>
        </div>

      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <!-- <LoginModal ref="refLoginModal" @callback-login="callbackLogin" /> -->
  <WalletModal ref="refWalletModal" @callback-wallet="callbackWallet" />
  <TokenDetailModal ref="refTokenDetailModal"/>
  <!-- <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

</template>

<script>
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
import { useI18n } from 'vue-i18n'
// import _ from 'lodash'
import { date } from 'quasar'

export default defineComponent({
  name: 'RecruitDetail',
  data () {
    return {
      seq_recruit_apply: '', // 신청완료시 seq
      isApplied: false,
      total_applied: 0,
      remain_time: 86400000, // default 1 day -> 0 으로 설정하면 @end="onCountdownEnd" 가 실행되면서 로직 꼬임!!!
      applyTimeOver: false, // 신청 종료 여부
      seq: '',
      start_time: '',
      end_time: '',
      title: '',
      title_ko: '',
      contents: '',
      contents_ko: '',
      project_seq: '',
      main_image: '',
      rows: [],
      imageFieldIndex: '', // 이미지 파일 추가시 항목 인덱스 설정, 업로드 완료시 해당 인덱스의 value로 이미지URL을 설정
      confirmGoBack: false,
    }
  },
  components: {
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  watch: {
    getUid (newValue) {
      // 채용 입력항목 및 액션항목 조회 + 신청합계 조회 및 설정
      this.selectRecruitFieldAndActionList()
    },
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    // qDate() {
    //   return date
    // },
  },
  created: function () {
    // 키 설정
    this.seq = this.$route.query.seq

    // locale 파라미터 존재시, 해당 locale 설정
    if (this.$route.query.l === 'ko') {
      this.locale = 'ko-KR'
    } else if (this.$route.query.l === 'en') {
      this.locale = 'en-US'
    } else {
      // klaystar default locale is... ko?
    }

    // 채용 조회
    this.selectRecruit()

    // 채용 입력항목 및 액션항목 조회 + 신청합계 조회 및 설정
    this.selectRecruitFieldAndActionList()
  },
  mounted: function () {},
  methods: {
    zerofill (value) {
      if (!value) return '00'
      value = value.toString()
      return (value < 10 && value > -1 ? "0" : "") + value
    },
    async onCountdownEnd() {
      this.applyTimeOver = true
    },
    async selectRecruitFieldAndActionList() {

      // 신청합계 조회 및 설정
      this.selectRecruitApplyTotal()

      if (this.getUid) {
        // 로그인 유저인 경우
        // 신청여부 조회 -> recruit_apply의 seq 조회
        this.seq_recruit_apply = await this.selectRecruitApplySeq()
        if (this.seq_recruit_apply) {
          this.isApplied = true
          // 신청 완료인 경우, 입력항목 결과 리스트 조회
          this.selectRecruitFieldWithResultList()
          // // 신청 완료인 경우, 액션항목 결과 리스트 조회
          // this.selectRecruitActionWithResultList()
        } else {
          this.isApplied = false
          // 신청 미완료인 경우, 입력항목 리스트 조회
          this.selectRecruitFieldList()
          // // 신청 미완료인 경우, 액션항목 리스트 조회
          // this.selectRecruitActionList()
        }

      } else {
        // 비로그인시, 입력항목 리스트 조회
        this.selectRecruitFieldList()
        // 비로그인시, 액션항목 리스트 조회
        this.selectRecruitActionList()
      }
    },
    // 기본정보 조회
    async selectRecruit() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruit', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)

        // 1. 항목 설정
        // this.seq = result.data.seq
        this.start_time = result.data.start_time
        this.end_time = result.data.end_time
        this.title = result.data.title
        this.contents = result.data.contents
        this.title_ko = result.data.title_ko
        this.contents_ko = result.data.contents_ko
        this.project_seq = result.data.project_seq
        this.main_image = result.data.main_image

        // 2. 남은 시간 계산
        this.setRemainTime(this.end_time)
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 신청합계 조회
    async selectRecruitApplyTotal() {
      const param = {
        uid: this.getUid,
        seq_recruit: this.seq,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruitApplyTotal', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.total_applied = result.data
      } else {
        this.total_applied = 0
      }
    },
    // 남은시간 설정
    async setRemainTime(targetTime) {
      // const today = this.now
      const param = {
        uid: this.getUid,
      }
      const { data: now } = await this.$axios.get('/api/common/getNow', { params: { ...param }})
      // const targetDate = new Date(targetTime)
      // const targetDate = targetTime
      // console.log('now: ' + now)
      // console.log('targetTime: ' + targetTime)
      const diff = date.getDateDiff(targetTime, now, 'seconds')
      // console.log('diff: ' + diff)
      if (diff < 0) {
        this.remain_time = 0
        this.applyTimeOver = true
      } else {
        this.remain_time = diff * 1000
      }
    },
    // 신청여부 조회 -> recruit_apply의 seq 조회, 반환
    async selectRecruitApplySeq() {
      const param = {
        uid: this.getUid,
        seq_recruit: this.seq,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruitApplySeq', { params: { ...param } })
      if (result.data && result.data.seq) {
        // console.log(result.data)
        return result.data.seq
      } else {
        return null
      }
    },
    // 입력항목 리스트 조회
    async selectRecruitFieldList() {
      const param = {
        uid: this.getUid,
        seqRecruit: this.seq,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruitFieldList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data

        // set login user wallet address
        if (this.getUid) {
          this.rows[0].value = this.getUid
        }
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 입력항목 결과 리스트 조회
    async selectRecruitFieldWithResultList() {
      const param = {
        uid: this.getUid,
        seqRecruit: this.seq,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruitFieldWithResultList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
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
    ///////////////////////////////////////////////////////////////////////////
    // validation
    ///////////////////////////////////////////////////////////////////////////
    required(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    requiredNumber(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    minLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_min_length') + ': ' + length
      return minLength(val, message, length);
    },
    maxLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length);
    },
    minValue(val, value) {
      const message = this.$t('validation_min_value') + ': ' + value
      return minValue(val, message, value);
    },
    maxValue(val, value) {
      const message = this.$t('validation_max_value') + ': ' + value
      return maxValue(val, message, value);
    },
    ///////////////////////////////////////////////////////////////////////////
    validate() {
      let result = true
      // check field value in rows
      for (let i = 0; i < this.rows.length; i++) {
        const fieldObj = this.rows[i]
        if (fieldObj.required === 'Y' && !fieldObj.value) {
          if (this.locale === 'ko-KR') {
            this.$noti(this.$q, this.$t('validation_failed_recruit_field_value') + ' [' + fieldObj.name_ko + ']')
          } else {
            this.$noti(this.$q, this.$t('validation_failed_recruit_field_value') + ' [' + fieldObj.name + ']')
          }
          result = false
          break
        }
      }
      return result
    },

    // 파일 업로드 필터
    filterFiles (files) {
      const MAX_FILE_SIZE = 10 * 1024 * 1024
      // this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$noti(this.$q, this.$t('file_size_exceeded'))

        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    fileAdded(index) {
      // console.log('Index is: ' + index)
      this.imageFieldIndex = index
    },
    // 이미지 업로드가 완료되면 호출되는 메소드
    fileUploaded (file, xhr) {
      // this.business_license_image = file.xhr.responseText
      // console.log('File url is : ' + file.xhr.responseText)
      this.rows[this.imageFieldIndex].value = file.xhr.responseText
    },
    // 채용 신청 등록
    insertRecruitApply() {

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid || !this.getWalletType || !this.getWalletAddress) {
        this.$refs.refWalletModal.show()
        return
      }

      // Field validation check
      if(!this.validate()) {
        return
      }

      // 신청 기한 체크
      if (this.applyTimeOver) {
        this.$noti(this.$q, this.$t('apply_time_over'))
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // ■ rows 의 value 들을 '|'로 구분하여 String values로 설정
      let fieldValues = ''
      for (let i = 0; i < this.rows.length; i++) {
        if (i === 0) {
          fieldValues = fieldValues + (this.rows[i].value ? this.rows[i].value : '')
        } else {
          fieldValues = fieldValues + '|' + (this.rows[i].value ? this.rows[i].value : '')
        }
      }

      // 채용 등록 처리
      const param = {
        uid: this.getUid,
        seq_recruit: this.seq,
        email: this.rows[0].value,
        field_values: fieldValues,
      }
      // console.log(param)
      this.$axios.post('/api/recruit/insertRecruitApply', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('recruit_apply_success'))

            // 신청정보 조회
            this.selectRecruitFieldAndActionList()

            // 신청버튼 disabled
            this.isApplied = true

            // 2. 페이지 이동 - 채용 리스트 화면
            // this.$router.push('/recruit')

          } else {
            this.$noti(this.$q, this.$t('recruit_apply_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 채용 신청 수정
    updateRecruitApply() {

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid || !this.getWalletType || !this.getWalletAddress) {
        this.$refs.refWalletModal.show()
        return
      }
      
      // Field validation check
      if(!this.validate()) {
        return
      }

      // 신청 기한 체크
      if (this.applyTimeOver) {
        this.$noti(this.$q, this.$t('apply_time_over'))
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // ■ rows 의 value 들을 '|'로 구분하여 String values로 설정
      let fieldValues = ''
      for (let i = 0; i < this.rows.length; i++) {
        if (i === 0) {
          fieldValues = fieldValues + (this.rows[i].value ? this.rows[i].value : '')
        } else {
          fieldValues = fieldValues + '|' + (this.rows[i].value ? this.rows[i].value : '')
        }
      }

      // 채용 신청 수정 처리
      const param = {
        // seq_recruit: this.seq,
        uid: this.getUid,
        seq: this.seq_recruit_apply,
        email: this.rows[0].value,
        field_values: fieldValues,
      }
      // console.log(param)
      this.$axios.post('/api/recruit/updateRecruitApply', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    openUrl(url) {
      window.open(url)
    },
    shareUrlCopy() {
      // API 서버로 보내서 og 정보 달고 다시 frontPath로 넘어옴. path: https://nftpy.io/#/winfo?seq=999&locale=XXX
      const host = location.protocol + '//' + location.host
      const url = host + '/r?s=' + this.seq + '&l=' + this.locale.substring(0, 2) // seq, locale

      // 클립보드로 복사하기
      this.$copyText(url).then(this.copyValueSuccess, this.copyValueFail)
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
    callbackWallet(walletVo) {
      // console.log('callbackLogin!!!')
      // this.$store.dispatch('setWalletAddress', walletVo.wallet_address)
    },
    goRecruitApplyList() {
      // 채용 신청 목록 화면으로 이동
      this.$router.push({ path: '/recruit/recruitApplyList', query: { seq: this.seq }})
    },
    showProject() {
      // 프로젝트 정보 모달 표시
      this.$refs.refTokenDetailModal.tokenSeq = this.project_seq
      this.$refs.refTokenDetailModal.show()
    },
    goBack() {
      // goBack 확인창 표시
      // this.confirmGoBack = true
      this.$router.go(-1)
    },
    // doGoBack() {
    //   this.$router.go(-1)
    //   // this.$router.push('/recruit/myRecruitList')
    // }
  }
})
</script>

<style scoped>
</style>
