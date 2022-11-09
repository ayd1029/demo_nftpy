<template>

  <q-dialog v-model="whitelistApplyResultDetailModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
      <q-header class="bg-white">
        <q-toolbar>
          <q-icon name="account_balance_wallet" size="md" color="primary" />
          <q-toolbar-title class="text-body2 text-black">
            {{ wallet_address }}
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
              <!-- if - IMAGE TYPE -->
              <div v-if="item.type === 'IMAGE'">
                <div class="row justify-center">
                  <div class="col-12">
                    <q-input v-model="item.value" clearable standout :tabindex="index + 1" class="q-pb-lg" readonly />
                  </div>
                </div>
                <!-- IMAGE TYPE preview -->
                <div class="row justify-center">
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
                    <q-input v-model="item.value" clearable standout :tabindex="index + 1" class="q-pb-lg" readonly />
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
                      <q-card-section class="text-right">
                        <q-btn v-if="item.done_yn === 'Y'" color="grey" style="width: 70px;" no-caps>
                          <!-- <span v-if="select_type === 'SCORE'">+ {{ item.score }}</span> -->
                          <span>{{ $t('action_completed') }}</span>
                        </q-btn>
                        <q-btn v-else color="primary" style="width: 70px;" no-caps>
                          <span v-if="select_type === 'SCORE'">+ {{ item.score }}</span>
                          <span v-else>{{ $t('visit') }}</span>
                        </q-btn>
                      </q-card-section>
                    </q-card>
                    
                  </q-expansion-item>
                </div>
              </q-list>
            </div>
          </div>
          <!-- ■ action field list END -->

          <div class="row justify-center q-pb-md"></div>

          <!-- total_score -->
          <div v-if="select_type === 'SCORE'" class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('total_score') }}</span>
            </div>
          </div>
          <div v-if="select_type === 'SCORE'" class="row justify-center">
            <div class="col-12">
              <q-input v-model="total_score" ref="title" type="number" clearable standout tabindex="3" readonly />
            </div>
          </div>

          <!-- STATUS -->
          <!--
          <div v-if="status_cd === '99'" class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('status') }}</span>
            </div>
          </div>
          <div v-if="status_cd === '99'" class="row justify-center">
            <div class="col-12">
              <q-select
                filled
                v-model="statusObj"
                :options="statusOptions"
                style="width: 100%"
                color="black"
                behavior="menu"
                tabindex="1"
                readonly
              />
            </div>
          </div>
          -->

          <!-- status_comment -->
          <!--
          <div class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('status_comment') }}</span>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <q-input v-model="status_comment" ref="title" clearable standout tabindex="2" readonly />
            </div>
          </div>
          -->

          <div class="row justify-center q-pb-xl"></div>

          <div class="row justify-center q-pt-lg q-pb-xl">
            <div class="col-6 text-left">
              <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="close" tabindex="4">
                <b>{{ $t('close') }}</b>
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
// import _ from 'lodash'
// import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default {
  name: 'WhitelistApplyResultDetailModal',
  data () {
    return {
      whitelistApplyResultDetailModal: false,
      maximized: false,
      select_type: '',
      seq: '',
      seq_whitelist: '',
      // status_cd: '',
      // statusObj: {},
      wallet_address: '',
      total_score: '',
      // status_comment: '',
      reg_id: '',
      reg_time: '',
      rows: [],
      actionRows: [],
      // statusOptions: [
      //   { value: '10', label: 'APPLIED : 신청완료' },
      //   // { value: '20', label: 'ACCEPTED : 당첨' },
      //   { value: '99', label: 'REJECTED : 탈락' },
      // ],
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

      this.whitelistApplyResultDetailModal = true

      // 화이트리스트 신청정보 조회
      await this.selectWhitelistApplyResultBySeq()

      // 입력항목 결과 리스트 조회
      this.selectWhitelistFieldResultList()
      // 액션항목 결과 리스트 조회
      this.selectWhitelistActionWithResultList()
    },
    // 화이트리스트 신청정보 조회
    async selectWhitelistApplyResultBySeq() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistApplyResultBySeq', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // this.seq = result.data.seq
        this.seq_whitelist = result.data.seq_whitelist
        // this.status_cd = result.data.status_cd
        // this.statusObj = _.find(this.statusOptions, {value: this.status_cd})
        this.wallet_address = result.data.wallet_address
        this.total_score = result.data.total_score
        // this.status_comment = result.data.status_comment
        this.reg_id = result.data.reg_id
        this.reg_time = result.data.reg_time
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 입력항목 결과 리스트 조회
    async selectWhitelistFieldResultList() {
      const param = {
        uid: this.reg_id,
        seqWhitelist: this.seq_whitelist,
        seqWhitelistApplyResult: this.seq,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistFieldResultList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 액션항목 결과 리스트 조회
    async selectWhitelistActionWithResultList() {
      const param = {
        uid: this.reg_id,
        seqWhitelist: this.seq_whitelist,
      }
      const result = await this.$axios.get('/api/whitelist/selectWhitelistActionWithResultList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.actionRows = result.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    close () {
      this.whitelistApplyResultDetailModal = false
    }
  }
}
</script>
