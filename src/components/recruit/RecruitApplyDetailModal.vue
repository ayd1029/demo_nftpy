<template>

  <q-dialog v-model="recruitApplyDetailModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
      <q-header class="bg-white">
        <q-toolbar>
          <q-icon name="assignment_ind" size="md" color="primary" />
          <q-toolbar-title class="text-body2 text-black">
            {{ email }}
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
      </q-header>
      <br />

      <q-card style="word-break: break-word;" class="q-pt-md">
        <q-card-section>
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
                <div class="row justify-center">
                  <div class="col-12">
                    <q-input v-model="item.value" clearable standout :tabindex="index + 1" class="q-pb-md" readonly />
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
                    <q-input v-model="item.value" clearable standout :tabindex="index + 1" class="q-pb-lg" readonly />
                  </div>
                </div>
              </div>

            </div>
            <!-- ■ input field list END -->
          </q-list>

          <div class="row justify-center q-pb-md"></div>

          <!-- STATUS -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('status') }}</span>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <q-select
                filled
                v-model="statusObj"
                :options="statusOptions"
                style="width: 100%"
                color="black"
                behavior="menu"
                tabindex="2"
                @update:model-value="changeStatusCd"
              />
            </div>
          </div>

          <!-- status_comment -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('status_comment') }}</span>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <q-input v-model="status_comment" ref="title" :rules="[val => maxLength(val, 1000)]" clearable standout tabindex="3" />
            </div>
          </div>

          <div class="row justify-center q-pb-xl"></div>

          <div class="row justify-center q-pt-lg q-pb-xl">
            <div class="col-6 text-left">
              <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="close" tabindex="5">
                <b>{{ $t('close') }}</b>
              </q-btn>
            </div>
            <div class="col-6 text-right">
              <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="updateRecruitApplyStatusCd" tabindex="4">
                <b>{{ $t('modify') }}</b>
              </q-btn>
            </div>
          </div>

        </q-card-section>
        <br />
      </q-card>

    </q-layout>
  </q-dialog>

  
  <!-- <q-dialog v-model="confirmDelete">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteNotice" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

</template>

<script>
import { useI18n } from 'vue-i18n'
import { date } from 'quasar'
import _ from 'lodash'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default {
  name: 'RecruitApplyDetailModal',
  data () {
    return {
      recruitApplyDetailModal: false,
      maximized: false,
      select_type: '',
      seq: '',
      seq_recruit: '',
      status_cd: '',
      statusObj: {},
      email: '',
      total_score: '',
      status_comment: '',
      reg_id: '',
      reg_time: '',
      rows: [],
      statusOptions: [
        { value: '10', label: 'APPLIED : 지원완료' },
        // { value: '20', label: 'ACCEPTED : 당첨' },
        { value: '99', label: 'REJECTED : 탈락' },
      ],
      // confirmDelete: false, // 삭제 확인창
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
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
    qDate() {
      return date
    },
  },
  methods: {
    async show () {
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
        // 디바이스가 모바일인 경우
        this.maximized = true
      } else {
        // 디바이스가 데스크탑인 경우
        this.maximized = false
      }
      // this.maximized = true

      this.rows = []
      this.actionRows = []
      this.comment = ''

      this.recruitApplyDetailModal = true

      // 채용 신청정보 조회
      await this.selectRecruitApplyBySeq()

      // 입력항목 결과 리스트 조회
      this.selectRecruitFieldWithResultList()
      // 액션항목 결과 리스트 조회
      this.selectRecruitActionWithResultList()
    },
    // 채용 신청정보 조회
    async selectRecruitApplyBySeq() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruitApplyBySeq', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // this.seq = result.data.seq
        this.seq_recruit = result.data.seq_recruit
        this.status_cd = result.data.status_cd
        this.statusObj = _.find(this.statusOptions, {value: this.status_cd})
        this.email = result.data.email
        this.total_score = result.data.total_score
        this.status_comment = result.data.status_comment
        this.reg_id = result.data.reg_id
        this.reg_time = result.data.reg_time
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 입력항목 결과 리스트 조회
    async selectRecruitFieldWithResultList() {
      const param = {
        uid: this.reg_id,
        seqRecruit: this.seq_recruit,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruitFieldWithResultList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 액션항목 결과 리스트 조회
    async selectRecruitActionWithResultList() {
      const param = {
        uid: this.reg_id,
        seqRecruit: this.seq_recruit,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruitActionWithResultList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.actionRows = result.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    changeStatusCd() {
      this.status_cd = this.statusObj.value
    },
    ///////////////////////////////////////////////////////////////////////////
    // validation
    ///////////////////////////////////////////////////////////////////////////
    maxLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length);
    },
    ///////////////////////////////////////////////////////////////////////////
    updateRecruitApplyStatusCd() {
      // 채용 신청 상태 수정 처리
      const param = {
        uid: this.getUid,
        seq: this.seq,
        status_cd: this.status_cd,
        status_comment: this.status_comment,
        total_score: this.total_score,
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/recruit/updateRecruitApplyStatusCd', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
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
    close () {
      this.recruitApplyDetailModal = false
    }
  }
}
</script>
