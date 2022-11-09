<template>
  
  <q-dialog v-model="airdropModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white">
      <q-header elevated>

        <q-toolbar class="bg-white">
          <!-- <q-avatar>
            <img v-if="airdropVo.token_logo_image" :src="airdropVo.token_logo_image">
            <q-icon v-else name="generating_tokens" size="md" />
          </q-avatar> -->
          <q-toolbar-title class="text-black">
            <strong>{{ airdropVo.token_name }} {{ airdropVo.token_symbol }}</strong>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" tabindex="101" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-sm" style="word-break: break-all;">
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              SEQ: {{ airdropVo.seq }} | UPDATED: {{ qDate.formatDate(airdropVo.mod_time, 'YYYY-MM-DD HH:mm:ss') }}
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-select
                filled
                v-model="airdropVo.status_cd"
                label="Change Status"
                :options="statusOptions"
                style="width: 100%"
                color="black"
                behavior="menu"
                standout
                tabindex="1"
                @update:model-value="updateAdminAirdropStatusCd"
              />
            </div>
          </div>

          <!-- STATUS COMMENT -->
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="airdropVo.status_comment" ref="status_comment" stack-label label="Status Comment" clearable standout tabindex="2" />
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="updateAdminAirdropStatusComment" style="width: 100%" no-caps tabindex="3">
                <b>Update Status Comment</b>
              </q-btn>
            </div>
          </div>

          <q-separator class="" style="height: 10px;" />

          <!-- Create Airdrop Button -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12 text-center">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="createAirdrop" tabindex="0">
                <b>{{ $t('create_airdrop') }}</b>
              </q-btn>
            </div>
          </div>



          <!-- TABLE -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">Airdrop Information</span>
              <!-- <q-separator /> -->
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12 text-center">
              <table cellpadding="0" sellspacing="0" width="100%">
                <tr class="text-bold">
                  <td width="60"></td>
                  <td>Target Token</td>
                </tr>
                <tr>
                  <td>SEQ</td>
                  <td>{{ airdropVo.token_seq }}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{{ airdropVo.token_name }}</td>
                </tr>
                <tr>
                  <td>Symbol</td>
                  <td>{{ airdropVo.token_symbol }}</td>
                </tr>
                <tr>
                  <td>Logo</td>
                  <td><img :src="airdropVo.token_logo_image" width="30" /></td>
                </tr>
                <tr>
                  <td>Contract<br />Address</td>
                  <td>{{ airdropVo.token_contract_address }}</td>
                </tr>
                <tr class="text-red">
                  <td>Total<br />Amount</td>
                  <td>{{ Number(airdropVo.total_amount).toLocaleString() }}</td>
                </tr>
                <tr>
                  <td>Airdrop<br />Period</td>
                  <td>{{ airdropVo.start_date }} ~ {{ airdropVo.end_date }}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">txid_airdrop_token</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(airdropVo.txid_airdrop_token)" size="md" color="black" style="height: 24px;" outline dense tabindex="2">COPY</q-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <q-btn @click="openUrl('https://scope.klaytn.com/tx/' + airdropVo.txid_airdrop_token + '?tabId=tokenTransfer')" size="md" color="black" style="height: 24px;" outline dense tabindex="3">VIEW</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pl-xs">
            <div class="col-12">
              {{ airdropVo.txid_airdrop_token }}
            </div>
          </div>

          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">pool_contract_address</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(airdropVo.pool_contract_address)" size="md" color="black" style="height: 24px;" outline dense tabindex="2">COPY</q-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <q-btn @click="openUrl('https://scope.klaytn.com/account/' + airdropVo.pool_contract_address)" size="md" color="black" style="height: 24px;" outline dense tabindex="3">VIEW</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pl-xs">
            <div class="col-12">
              {{ airdropVo.pool_contract_address }}
            </div>
          </div>

          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">create_order_id</span>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pl-xs">
            <div class="col-12">
              {{ airdropVo.create_order_id }}
            </div>
          </div>

          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">contract_address</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(airdropVo.contract_address)" size="md" color="black" style="height: 24px;" outline dense tabindex="2">COPY</q-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <q-btn @click="openUrl('https://scope.klaytn.com/account/' + airdropVo.contract_address)" size="md" color="black" style="height: 24px;" outline dense tabindex="3">VIEW</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pl-xs">
            <div class="col-12">
              {{ airdropVo.contract_address }}
            </div>
          </div>

          <!-- Create Airdrop Button -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12 text-center">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="createAirdrop" tabindex="8">
                <b>{{ $t('create_airdrop') }}</b>
              </q-btn>
            </div>
          </div>

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
  <IframeModal ref="refIframeModal" />

  <q-dialog v-model="confirmCreate">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 300px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_create') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('create')" color="black" v-close-popup @click="doCreateAirdrop" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { useI18n } from 'vue-i18n'
import { date } from 'quasar'
// import { openURL } from 'quasar'

export default {
  name: 'AirdropModal',
  data () {
    return {
      airdropModal: false,
      maximized: false,
      confirmCreate: false,
      scopeSubmissionUrl: '',
      email: 'nftpy.contact@gmail.com',
      airdropVo: {
        seq: '',
        status_cd: '',
        status_name: '',
        status_comment: '',
        contract_address: '',
        token_seq: '',
        token_name: '',
        token_symbol: '',
        token_decimals: '',
        token_contract_address: '',
        pool_contract_address: '',
        total_amount: '',
        start_date: '',
        end_date: '',
        token_total_supply: '',
        token_logo_image: '',
        txid_airdrop_token: '',
        create_order_id: '',
        mod_time: '',
      },
      statusOptions: [
        { value: '30', label: '30 PAID : 결제 완료' },
        { value: '32', label: '32 USER_REQUESTED : 요청 완료' },
        { value: '34', label: '34 ACCEPTED : 접수 완료' },
        { value: '35', label: '35 CREATED : 계약 생성 완료' },
        { value: '40', label: '40 SUCCESS : 처리 완료' },
        { value: '90', label: '90 REJECTED : 요청 반려' },
        { value: '99', label: '99 FAILED : 생성 실패' },
      ],
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
      this.airdropModal = true

      // 에어드랍 정보 조회
      this.selectAirdrop()
    },
    // 에어드랍 정보 조회
    selectAirdrop() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }

      // 토큰 조회
      this.$axios.get('/api/admin/selectAdminAirdrop', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (result.data) {
            // console.log(result.data)

            // 데이터 설정
            this.airdropVo = result.data
            // console.log(this.airdropVo.total_amount)
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateAdminAirdropStatusCd() {
      // 풀 상태 수정 처리
      const param = {
        uid: this.getUid,
        seq: this.airdropVo.seq,
        token_seq: this.airdropVo.token_seq,
        status_cd: this.airdropVo.status_cd.value,
      }
      this.$axios.post('/api/admin/updateAdminAirdropStatusCd', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_token_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_token_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    openUrl(url) {
      window.open(url)
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

    // 에어드랍 생성 확인 모달 표시
    createAirdrop() {
      // 생성 확인창 표시
      this.confirmCreate = true
    },

    // 에어드랍 생성 처리
    doCreateAirdrop() {

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // 에어드랍 생성
      const param = {
        uid: this.getUid,
        seq: this.airdropVo.seq
      }
      this.$axios.post('/api/admin/createAdminAirdrop', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('create_airdrop_success'))
            this.selectAirdrop()
          } else {
            // this.$noti(this.$q, this.$t('register_airdrop_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 사용자에게 표시할 에어드랍 상태 메시지
    updateAdminAirdropStatusComment() {
      const param = {
        uid: this.getUid,
        seq: this.airdropVo.seq,
        // token_seq: this.tokenContractVerifyVo.token_seq,
        status_comment: this.airdropVo.status_comment,
      }
      this.$axios.post('/api/admin/updateAdminAirdropStatusComment', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    close () {
      this.airdropModal = false
    }
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
