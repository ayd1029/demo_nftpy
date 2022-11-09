<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading text-h5 text-bold text-center q-pb-md">
        <span v-if="locale === 'ko-KR'">{{ title_ko }}</span>
        <span v-else>{{ title }}</span>
      </div>
    </div>

    <!-- view whitelist apply list -->
    <div class="row justify-center q-pb-md">
      <!-- <div class="text-left">
        <q-btn class="btn" color="primary" size="md" style="width: 130px;" outline @click="goWhitelistApplyList" tabindex="0">
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
      <div class="text-right">
        <q-btn class="btn" color="primary" size="md" style="width: 130px;" outline @click="goWhitelistApplyResultList" no-caps tabindex="2">
          <b>{{ $t('whitelist_result') }}</b>
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
          <td width="33%" align="center"><span class="">{{ $t('whitelist_applied_yn') }}</span></td>
          <td width="33%" align="center"><span class="">{{ $t('whitelist_total_applied') }}</span></td>
          <td width="33%" align="center"><span class="">{{ $t('whitelist_remain_time') }}</span></td>
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
            {{ $t('whitelist_remain_hour') }}
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

    <!-- whitelist base info -->
    <div class="q-pt-md q-pb-md">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td colspan="3"><span class="">■ {{ $t('whitelist_base_information') }} ■</span></td>
          <td width="160"><span class="">※&nbsp;&nbsp;{{ $t('based_on_utc') }}</span></td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="q-pt-sm"></div>
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="60"><span class="">{{ $t('select_type') }}</span></td>
          <td width="">
            :
            <span v-if="select_type === 'LINEUP'">{{ $t('select_type_lineup') }}</span>
            <span v-else-if="select_type === 'SCORE'">{{ $t('select_type_score') }}</span>
            <span v-else-if="select_type === 'RANDOM'">{{ $t('select_type_random') }}</span>
          </td>
          <td width="33"><span class="">{{ $t('start') }}</span></td>
          <td width="130"><span class="">: {{ start_time }}</span></td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="q-pt-sm"></div>
          </td>
        </tr>
        <tr>
          <td><span class="">{{ $t('max_select') }}</span></td>
          <td><span class="">: {{ max_select }}</span></td>
          <td><span class="">{{ $t('end') }}</span></td>
          <td><span class="">: {{ end_time }}</span></td>
        </tr>
      </table>
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
        <!-- if - IMAGE TYPE -->
        <div v-if="item.type === 'IMAGE'">
          <div class="row justify-center">
            <div class="col-12">
              <q-uploader
                field-name="file"
                ref="uploaderObj"
                url="/api/common/uploadImage"
                hide-upload-btn
                color="grey-3"
                text-color="black"
                :multiple="false"
                accept="image/*"
                :filter="filterFiles"
                max-files="1"
                :auto-upload="true"
                :tabindex="index + 3"
                @added="fileAdded(index)"
                @uploaded="fileUploaded"
              />
            </div>
          </div>
          <!-- IMAGE TYPE preview -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">※ {{ $t('preview') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <img v-if="item.value" :src="item.value" style="width: 100%;">
              <span v-else>{{ $t('no_image') }}</span>
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

    <!-- ■ action field list START -->
    <div v-if="actionRows && actionRows.length > 0">

      <div class="row justify-center q-pt-lg"></div>

      <div>
        <q-toolbar class="bg-primary text-left">
          <q-icon name="done" size="sm" color="white" />
          <q-toolbar-title class="text-white text-subtitle1">
            <strong>{{ $t('action_field') }}</strong>
          </q-toolbar-title>
        </q-toolbar>
      </div>

      <div>
        <q-list bordered>
          <div v-for="(item, index) in actionRows" :key="item.seq">
            <q-separator v-if="index !== 0" />
            <q-expansion-item group="actionGroup">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon v-if="item.type === 'visit'" name="call_made" size="sm" />
                  <q-icon v-else-if="item.type === 'follow'" name="plus_one" size="sm" />
                  <q-icon v-else-if="item.type === 'retweet'" name="cached" size="sm" />
                  <q-icon v-else-if="item.type === 'participate'" name="accessibility_new" size="sm" />
                  <q-icon v-else-if="item.type === 'subscribe'" name="mark_email_read" size="sm" />
                  <q-icon v-else-if="item.type === 'like'" name="favorite" size="sm" />
                  <q-icon v-else-if="item.type === 'join'" name="person_add" size="sm" />
                  <q-icon v-else-if="item.type === 'share'" name="share" size="sm" />
                </q-item-section>

                <q-item-section>
                  <span v-if="locale === 'ko-KR'">{{ item.name_ko }}</span>
                  <span v-else>{{ item.name }}</span>
                </q-item-section>

                <q-item-section side>
                  <div class="row items-center">
                    <q-btn v-if="item.done_yn === 'Y'" color="grey" style="width: 50px;" outline dense no-caps>
                      <span v-if="select_type === 'SCORE'">+ {{ item.score }}</span>
                      <span v-else>{{ $t('visit') }}</span>
                    </q-btn>
                    <q-btn v-else color="primary" style="width: 50px;" outline dense no-caps>
                      <span v-if="select_type === 'SCORE'">+ {{ item.score }}</span>
                      <span v-else>{{ $t('visit') }}</span>
                    </q-btn>
                  </div>
                </q-item-section>
              </template>

              <q-card>
                <q-card-section>
                  {{ item.url }}

                </q-card-section>
                <q-card-section>
                  <!-- {{item.action_yn}}/{{item.done_yn}} -->
                  <div class="row">
                    <!-- 실행 버튼 -->
                    <q-btn color="primary" style="width: 80px; height: 30px;" @click="doAction(item)" no-caps class="q-mr-sm" :disable="applyTimeOver">
                      <span>{{ $t('action_do') }}</span>
                    </q-btn>

                    <!-- 사용자명 입력창 -->
                    <q-input v-if="item.action_yn === 'Y' && (item.type === 'follow' || item.type === 'retweet' || item.type === 'like' || item.type === 'join' || item.type === 'subscribe' || item.type === 'participate')"
                      v-model="item.action_user_id" placeholder="UserName" clearable standout class="q-pr-sm" style="width: 150px;" dense :readonly="applyTimeOver" />

                    <!-- 확인 버튼 -->
                    <q-btn v-if="item.action_yn === 'Y' && item.done_yn === 'N'" color="primary" style="width: 80px;" @click="doCheck(item)" no-caps :disable="applyTimeOver">
                      <span>{{ $t('action_check') }}</span>
                      <!-- <span v-else>{{ $t('visit') }}</span> -->
                    </q-btn>
                    <q-btn v-else-if="item.action_yn === 'Y' && item.done_yn === 'Y'" color="grey" style="width: 80px;" no-caps disable>
                      <!-- <span v-if="select_type === 'SCORE'">+ {{ item.score }}</span> -->
                      <span>{{ $t('action_completed') }}</span>
                    </q-btn>
                  </div>
                </q-card-section>
              </q-card>
              
            </q-expansion-item>
          </div>
        </q-list>
      </div>
    </div>
    <!-- ■ action field list END -->

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
            <b>{{ $t('apply') }}</b>
          </q-btn>
          <q-btn v-else class="btn" color="primary" text-color="black" size="lg" style="width: 98%;" disable tabindex="31">
            <b>{{ $t('modify') }}</b>
          </q-btn>
        </div>

        <div v-else>
          <q-btn v-if="!isApplied" class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="insertWhitelistApply" tabindex="31">
            <b>{{ $t('apply') }}</b>
          </q-btn>
          <q-btn v-else class="btn" color="primary" text-color="black" size="lg" style="width: 98%;" @click="updateWhitelistApply" tabindex="31">
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
  <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
import { useI18n } from 'vue-i18n'
// import _ from 'lodash'
import { date } from 'quasar'

export default defineComponent({
  name: 'WhitelistDetail',
  data () {
    return {
      seq_whitelist_apply: '', // 신청완료시 seq
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
      select_type: 'LINEUP',
      max_select: '0',
      token_contract_address: '',
      main_image: '',
      rows: [],
      actionRows: [],
      imageFieldIndex: '', // 이미지 파일 추가시 항목 인덱스 설정, 업로드 완료시 해당 인덱스의 value로 이미지URL을 설정
      // userTotalScore: 0, // 액션 토탈 점수 - 신청 등록시 설정
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
      // 화이트리스트 입력항목 및 액션항목 조회 + 신청합계 조회 및 설정
      this.selectWhitelistFieldAndActionList()
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

    // 화이트리스트 조회
    this.selectWhitelist()

    // 화이트리스트 입력항목 및 액션항목 조회 + 신청합계 조회 및 설정
    this.selectWhitelistFieldAndActionList()
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
    async selectWhitelistFieldAndActionList() {

      // 신청합계 조회 및 설정
      this.selectWhitelistApplyTotal()

      if (this.getUid) {
        // 로그인 유저인 경우
        // 신청여부 조회 -> whitelist_apply의 seq 조회
        this.seq_whitelist_apply = await this.selectWhitelistApplySeq()
        if (this.seq_whitelist_apply) {
          this.isApplied = true
          // 신청 완료인 경우, 입력항목 결과 리스트 조회
          this.selectWhitelistFieldWithResultList()
          // // 신청 완료인 경우, 액션항목 결과 리스트 조회
          // this.selectWhitelistActionWithResultList()
        } else {
          this.isApplied = false
          // 신청 미완료인 경우, 입력항목 리스트 조회
          this.selectWhitelistFieldList()
          // // 신청 미완료인 경우, 액션항목 리스트 조회
          // this.selectWhitelistActionList()
        }

        // 신청 완료인 경우, 액션항목 결과 리스트 조회
        this.selectWhitelistActionWithResultList()

      } else {
        // 비로그인시, 입력항목 리스트 조회
        this.selectWhitelistFieldList()
        // 비로그인시, 액션항목 리스트 조회
        this.selectWhitelistActionList()
      }
    },
    // 기본정보 조회
    async selectWhitelist() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelist', { params: { ...param } })
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
        this.select_type = result.data.select_type
        this.max_select = result.data.max_select
        this.token_contract_address = result.data.token_contract_address
        this.main_image = result.data.main_image

        // 2. 남은 시간 계산
        this.setRemainTime(this.end_time)
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 신청합계 조회
    async selectWhitelistApplyTotal() {
      const param = {
        uid: this.getUid,
        seq_whitelist: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistApplyTotal', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.total_applied = result.data
      } else {
        this.total_applied = 0
      }
    },
    // 남은시간 설정
    // setRemainTime(endTime) {
    //   const today = new Date()
    //   const endDate = new Date(endTime)
    //   const unit = 'minutes'
    //   // console.log('today: ' + today)
    //   // console.log('endDate: ' + endDate)
    //   const diff = date.getDateDiff(endDate, today, unit)
    //   // console.log('diff: ' + diff)
    //   if (diff < 0) {
    //     this.remain_time = 0
    //     this.applyTimeOver = true // 신청 종료 여부
    //   } else {
    //     this.remain_time = Number((diff / 60).toFixed(1))
    //   }
    // },
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
    // 신청여부 조회 -> whitelist_apply의 seq 조회, 반환
    async selectWhitelistApplySeq() {
      const param = {
        uid: this.getUid,
        seq_whitelist: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistApplySeq', { params: { ...param } })
      if (result.data && result.data.seq) {
        // console.log(result.data)
        return result.data.seq
      } else {
        return null
      }
    },
    // 입력항목 리스트 조회
    async selectWhitelistFieldList() {
      const param = {
        uid: this.getUid,
        seqWhitelist: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistFieldList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data

        // set login user wallet address
        if (this.getWalletAddress) {
          this.rows[0].value = this.getWalletAddress
        }
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 입력항목 결과 리스트 조회
    async selectWhitelistFieldWithResultList() {
      const param = {
        uid: this.getUid,
        seqWhitelist: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistFieldWithResultList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 액션항목 리스트 조회
    async selectWhitelistActionList() {
      const param = {
        uid: this.getUid,
        seqWhitelist: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistActionList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.actionRows = result.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 액션항목 결과 리스트 조회
    async selectWhitelistActionWithResultList() {
      const param = {
        uid: this.getUid,
        seqWhitelist: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistActionWithResultList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.actionRows = result.data
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
            this.$noti(this.$q, this.$t('validation_failed_whitelist_field_value') + ' [' + fieldObj.name_ko + ']')
          } else {
            this.$noti(this.$q, this.$t('validation_failed_whitelist_field_value') + ' [' + fieldObj.name + ']')
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
    // 화이트리스트 신청 등록
    insertWhitelistApply() {

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

      // 액션항목 완료 체크
      if (!this.checkActionCompleted()) {
        this.$noti(this.$q, this.$t('whitelist_action_not_completed'))
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


      // 점수 계산
      let userTotalScore = 0
      if (this.select_type === 'SCORE') {
        userTotalScore = this.countScore()
      }

      // 화이트리스트 등록 처리
      const param = {
        uid: this.getUid,
        seq_whitelist: this.seq,
        wallet_address: this.rows[0].value,
        field_values: fieldValues,
        total_score: userTotalScore,
      }
      // console.log(param)
      this.$axios.post('/api/whitelist/insertWhitelistApply', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('apply_success'))

            // 신청정보 조회
            this.selectWhitelistFieldAndActionList()

            // 신청버튼 disabled
            this.isApplied = true

            // 2. 페이지 이동 - 화이트리스트 리스트 화면
            // this.$router.push('/whitelist')

          } else {
            this.$noti(this.$q, this.$t('apply_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 화이트리스트 신청 수정
    updateWhitelistApply() {

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

      // 점수 계산
      let userTotalScore = 0
      if (this.select_type === 'SCORE') {
        userTotalScore = this.countScore()
      }

      // 화이트리스트 신청 수정 처리
      const param = {
        // seq_whitelist: this.seq,
        uid: this.getUid,
        seq: this.seq_whitelist_apply,
        wallet_address: this.rows[0].value,
        field_values: fieldValues,
        total_score: userTotalScore,
      }
      // console.log(param)
      this.$axios.post('/api/whitelist/updateWhitelistApply', param)
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
    // 점수 계산
    countScore() {
      let totalScore = 0
      for (let i = 0; i < this.rows.length; i++) {
        // console.log(this.rows[i])
        if (this.rows[i].value) {
          totalScore += this.rows[i].score
        }
      }
      for (let i = 0; i < this.actionRows.length; i++) {
        if (this.actionRows[i].done_yn === 'Y') {
          totalScore += this.actionRows[i].score
        }
      }
      // console.log('totalScore: ' + totalScore)
      return totalScore
    },
    // 액션 전체 완료인지 체크
    checkActionCompleted() {
      for (let i = 0; i < this.actionRows.length; i++) {
        if (this.actionRows[i].done_yn === 'N') {
          return false
        }
      }
      return true
    },
    // 액션 항목 [실행] 버튼 클릭시
    doAction(item) {

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid || !this.getWalletType || !this.getWalletAddress) {
        this.$refs.refWalletModal.show()
        return
      }
      
      item.action_yn = 'Y'
      if (item.type === 'share') {
        // share인 경우, url copy
        this.copyValue(item.url)
      } else {
        // open url
        this.openUrl(item.url)
      }
    },
    // 액션 항목 [완료] 버튼 클릭시
    async doCheck(item) {

      // // 경쟁형이 아닌 경우, 링크 표시후 처리 종료
      // if (this.select_type !== 'SCORE') {
      //   // 링크 오픈
      //   if (item.url) {
      //     this.openUrl(item.url)
      //   }
      //   return
      // }

      // // 신청여부 체크
      // if (!this.isApplied) {
      //   this.$noti(this.$q, this.$t('whitelist_apply_first'))
      //   return
      // }

      // // 이미 완료된 액션인 경우
      // if (item.done_yn === 'Y') {
      //   if (item.type === 'share') {
      //     // 1. share인 경우, url copy
      //     this.copyValue(item.url)
      //   } else {
      //     // 링크 오픈
      //     if (item.url) {
      //       this.openUrl(item.url)
      //     }
      //     // this.$noti(this.$q, this.$t('action_failed_done'))
      //   }
      //   return
      // }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid || !this.getWalletType || !this.getWalletAddress) {
        this.$refs.refWalletModal.show()
        return
      }

      // 타입이 트위터 팔로우/리트윗/좋아요 + 조인/구독 인 경우 처리 <> visit/participate/share는 pass
      if (item.type === 'follow' || item.type === 'retweet' || item.type === 'like' || item.type === 'join' || item.type === 'subscribe' || item.type === 'participate') {
        // 사용자명 입력 체크
        if (!item.action_user_id) {
          this.$noti(this.$q, this.$t('action_enter_action_user_id'))
          return
        }

        let result = false // 체크 결과
        if (item.type === 'follow') { // 1. 팔로우
          result = await this.checkTwitterFollow(item)
        } else if (item.type === 'retweet') { // 2. 리트윗
          result = await this.checkTwitterRetweet(item)
        } else if (item.type === 'like') { // 3. 좋아요
          result = await this.checkTwitterLike(item)
        } else {
          result = true
        }
        if (!result) {
          // 액션 확인 실패
          this.$noti(this.$q, this.$t('action_check_failed'))
          return
        }
      }

      // // 신청 점수 설정
      // this.userTotalScore += item.score

      // 액션 결과 등록
      const param = {
        uid: this.getUid,
        seq_whitelist: this.seq,
        seq_whitelist_action: item.seq,
        action_user_id: item.action_user_id,
      }
      // console.log(param)
      this.$axios.post('/api/whitelist/insertWhitelistActionResult', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)

            // 액션 완료 표시
            item.done_yn = 'Y'

            this.$noti(this.$q, this.$t('action_success'))
            
          } else if (result.data.resultCd === 'DONE') {
            this.$noti(this.$q, this.$t('action_failed_done'))
          } else {
            this.$noti(this.$q, this.$t('action_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 1. 체크 트위터 [팔로우]
    async checkTwitterFollow(item) {
      // item.url
      // e.g. https://twitter.com/intent/follow?screen_name=klaystar_offici

      // 팔로잉 여부
      let followingYn = 'N'

      // 화이트리스트 등록자 트위터 사용자명
      const whitelistAdminTwitterUserName = item.url.split('=')[1]
      console.log('whitelistAdminTwitterUserName: ' + whitelistAdminTwitterUserName)
      // 사용자 트위터 사용자명
      let loginUserTwitterUserName = item.action_user_id.replace('@', '')
      console.log('loginUserTwitterUserName: ' + loginUserTwitterUserName)
      // 사용자 트위터 ID
      let loginUserTwitterUserId = ''

      // // 1. 사용자 아이디 조회
      let param = {
        user_name: loginUserTwitterUserName,
      }
      let result = await this.$axios.get('/api/twitter/getUserIdByUserName', { params: { ...param } })
      if (result && result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        loginUserTwitterUserId = result.data.user_id
        console.log('loginUserTwitterUserId: ' + loginUserTwitterUserId)
      } else {
        console.log('getUserIdByUserName failed')
        return false
      }

      // 2. 팔로잉 체크
      param = {
        user_id: loginUserTwitterUserId,
        check_user_name: whitelistAdminTwitterUserName,
      }
      result = await this.$axios.get('/api/twitter/checkUserFollowing', { params: { ...param } })
      if (result && result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        followingYn = result.data.following_yn
        console.log('result.data.following_yn: ' + result.data.following_yn)
      } else {
        console.log('checkUserFollowing failed')
      }

      // 결과 반환
      if (followingYn === 'Y') {
        return true
      } else {
        return false
      }
    },
    // 2. 체크 트위터 [리트윗]
    async checkTwitterRetweet(item) {
      // item.url
      // e.g.1 https://twitter.com/klaystar_offici/status/1499784273716387842
      // e.g.2 https://twitter.com/klaystar_offici/status/1515220624548933636?s=20&t=Ruw7s9tRjDVosEQjaYwgLA

      // 리트윗 여부
      let retweetedYn = 'N'


      // 사용자 트위터 사용자명
      let loginUserTwitterUserName = item.action_user_id.replace('@', '')
      console.log('loginUserTwitterUserName: ' + loginUserTwitterUserName)

      // 트윗 ID
      let arraySlashSplit = item.url.split('?')[0].split('/')
      let whitelistAdminTweetId = arraySlashSplit[arraySlashSplit.length - 1]
      console.log('whitelistAdminTweetId: ' + whitelistAdminTweetId)

      // 리트윗 체크
      const param = {
        tweet_id: whitelistAdminTweetId,
        check_user_name: loginUserTwitterUserName,
      }
      const result = await this.$axios.get('/api/twitter/checkTweetsRetweetedBy', { params: { ...param } })
      if (result && result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        retweetedYn = result.data.retweeted_yn
        console.log('result.data.retweeted_yn: ' + result.data.retweeted_yn)
      } else {
        console.log('checkTweetsRetweetedBy failed')
      }

      // 결과 반환
      if (retweetedYn === 'Y') {
        return true
      } else {
        return false
      }
    },
    // 3. 체크 트위터 [좋아요]
    async checkTwitterLike(item) {
      // item.url
      // e.g.1 https://twitter.com/klaystar_offici/status/1499784273716387842
      // e.g.2 https://twitter.com/klaystar_offici/status/1515220624548933636?s=20&t=Ruw7s9tRjDVosEQjaYwgLA

      // 좋아요 여부
      let likingYn = 'N'

      // 사용자 트위터 사용자명
      let loginUserTwitterUserName = item.action_user_id.replace('@', '')
      console.log('loginUserTwitterUserName: ' + loginUserTwitterUserName)

      // 트윗 ID
      let arraySlashSplit = item.url.split('?')[0].split('/')
      let whitelistAdminTweetId = arraySlashSplit[arraySlashSplit.length - 1]
      console.log('whitelistAdminTweetId: ' + whitelistAdminTweetId)

      // 좋아요 체크
      const param = {
        tweet_id: whitelistAdminTweetId,
        check_user_name: loginUserTwitterUserName,
      }
      const result = await this.$axios.get('/api/twitter/checkTweetsLikingUsers', { params: { ...param } })
      if (result && result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        likingYn = result.data.liking_yn
        console.log('result.data.liking_yn: ' + result.data.liking_yn)
      } else {
        console.log('checkTweetsLikingUsers failed')
      }

      // 결과 반환
      if (likingYn === 'Y') {
        return true
      } else {
        return false
      }
    },
    openUrl(url) {
      window.open(url)
    },
    shareUrlCopy() {
      // API 서버로 보내서 og 정보 달고 다시 frontPath로 넘어옴. path: https://nftpy.io/#/winfo?seq=999&locale=XXX
      const host = location.protocol + '//' + location.host
      const url = host + '/w?s=' + this.seq + '&l=' + this.locale.substring(0, 2) // seq, locale

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
    goWhitelistApplyList() {
      // 화이트리스트 신청 목록 화면으로 이동
      this.$router.push({ path: '/whitelist/whitelistApplyList', query: { seq: this.seq }})
    },
    goWhitelistApplyResultList() {
      // 화이트리스트 신청 결과 목록 화면으로 이동
      this.$router.push({ path: '/whitelist/whitelistApplyResultList', query: { seq: this.seq }})
    },
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
      // this.$router.push('/whitelist/myWhitelistList')
    }
  }
})
</script>

<style scoped>
</style>
