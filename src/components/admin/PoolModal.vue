<template>
  
  <q-dialog v-model="poolModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white">
      <q-header elevated>

        <q-toolbar class="bg-white">
          <!-- <q-avatar>
            <img v-if="poolVo.token_logo_image" :src="poolVo.token_logo_image">
            <q-icon v-else name="generating_tokens" size="md" />
          </q-avatar> -->
          <q-toolbar-title class="text-black">
            <strong>{{ poolVo.target_token_symbol }} + {{ poolVo.pair_token_symbol }}</strong>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" tabindex="101" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-sm" style="word-break: break-all;">
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              SEQ: {{ poolVo.seq }} | UPDATED: {{ qDate.formatDate(poolVo.mod_time, 'YYYY-MM-DD HH:mm:ss') }}
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-select
                filled
                v-model="poolVo.status_cd"
                label="Change Status"
                :options="statusOptions"
                style="width: 100%"
                color="black"
                behavior="menu"
                standout
                tabindex="1"
                @update:model-value="updateAdminPoolStatusCd"
              />
            </div>
          </div>

          <!-- STATUS COMMENT -->
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="poolVo.status_comment" ref="status_comment" stack-label label="Status Comment" clearable standout tabindex="2" />
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="updateAdminPoolStatusComment" style="width: 100%" no-caps tabindex="3">
                <b>Update Status Comment</b>
              </q-btn>
            </div>
          </div>

          <q-separator class="" style="height: 10px;" />

          <!-- Create Pool Button -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12 text-center">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="createPool" tabindex="0">
                <b>{{ $t('create_pool') }}</b>
              </q-btn>
            </div>
          </div>



          <!-- TABLE -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">Pool Information</span>
              <!-- <q-separator /> -->
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12 text-center">
              <table cellpadding="0" sellspacing="0" width="100%">
                <tr class="text-bold">
                  <td width="60"></td>
                  <td>Target Token</td>
                  <td>Pair Token</td>
                </tr>
                <tr>
                  <td>SEQ</td>
                  <td>{{ poolVo.target_token_seq }}</td>
                  <td>{{ poolVo.pair_token_seq }}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{{ poolVo.target_token_name }}</td>
                  <td>{{ poolVo.pair_token_name }}</td>
                </tr>
                <tr>
                  <td>Symbol</td>
                  <td>{{ poolVo.target_token_symbol }}</td>
                  <td>{{ poolVo.pair_token_symbol }}</td>
                </tr>
                <tr>
                  <td>Logo</td>
                  <td><img :src="poolVo.target_token_logo_image" width="30" /></td>
                  <td><img :src="poolVo.pair_token_logo_image" width="30" /></td>
                </tr>
                <tr>
                  <td>Contract<br />Address</td>
                  <td>{{ poolVo.target_token_contract_address }}</td>
                  <td>{{ poolVo.pair_token_contract_address }}</td>
                </tr>
                <tr class="text-red">
                  <td>Total<br />Supply</td>
                  <td>{{ Number(poolVo.target_token_total_supply).toLocaleString() }}</td>
                  <td>{{ Number(poolVo.pair_token_total_supply).toLocaleString() }}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">txid_target_token</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(poolVo.txid_target_token)" size="md" color="black" style="height: 24px;" outline dense tabindex="2">COPY</q-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <q-btn @click="openUrl('https://scope.klaytn.com/tx/' + poolVo.txid_target_token + '?tabId=tokenTransfer')" size="md" color="black" style="height: 24px;" outline dense tabindex="3">VIEW</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pl-xs">
            <div class="col-12">
              {{ poolVo.txid_target_token }}
            </div>
          </div>
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">txid_pair_token</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(poolVo.txid_pair_token)" size="md" color="black" style="height: 24px;" outline dense tabindex="4">COPY</q-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <q-btn @click="openUrl('https://scope.klaytn.com/tx/' + poolVo.txid_pair_token + '?tabId=tokenTransfer')" size="md" color="black" style="height: 24px;" outline dense tabindex="5">VIEW</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pl-xs">
            <div class="col-12">
              {{ poolVo.txid_pair_token }}
            </div>
          </div>
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">txid_create_fee</span>
              &nbsp;&nbsp;<q-btn @click="copyValue(poolVo.txid_create_fee)" size="md" color="black" style="height: 24px;" outline dense tabindex="6">COPY</q-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <q-btn @click="openUrl('https://scope.klaytn.com/tx/' + poolVo.txid_create_fee + '?tabId=tokenTransfer')" size="md" color="black" style="height: 24px;" outline dense tabindex="7">VIEW</q-btn>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pl-xs q-pb-lg">
            <div class="col-12">
              {{ poolVo.txid_create_fee }}
            </div>
          </div>


          <div v-if="poolVo.pair_token_contract_address === '0x0000000000000000000000000000000000000000'" class="row justify-center q-pt-sm text-red">
            <div class="col-12 text-bold" style="word-break: break-word;">
              <!-- ?????? ?????? -->
              <div class="row">
                ????????????????????? ?????? ??????! ?????????????????????
              </div>
              <div class="row q-pt-xs q-pl-xs">
                ?????? ????????? KLAY ?????????.
              </div>
              <div class="row q-pt-xs q-pl-xs">
                ?????? ?????? ???????????? ??? ?????? ???????????? ????????? ????????? KLAY??? ???????????? ?????????.
              </div>
              <div class="row q-pt-xs q-pl-xs">
                ??? ?????? ????????? ????????? ??? KLAY??? ?????? ?????? ???????????? ????????? ?????????.
              </div>
              <div class="row q-pt-xs q-pl-xs">
                ??? ????????? ?????? ??? ?????? KLAY??? ??????????????? ???????????????.
              </div>
            </div>
          </div>

          <!-- Create Pool Button -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12 text-center">
              <q-btn class="btn" color="secondary" text-color="black" size="md" @click="createPool" tabindex="8">
                <b>{{ $t('create_pool') }}</b>
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
        <q-btn flat style="width: 45%;" :label="$t('create')" color="black" v-close-popup @click="doCreatePool" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { useI18n } from 'vue-i18n'
import { date } from 'quasar'
// import { openURL } from 'quasar'

export default {
  name: 'PoolModal',
  data () {
    return {
      poolModal: false,
      maximized: false,
      confirmCreate: false,
      scopeSubmissionUrl: '',
      email: 'nftpy.contact@gmail.com',
      poolVo: {
        seq: '',
        status_cd: '',
        status_name: '',
        status_comment: '',
        target_token_seq: '',
        target_token_name: '',
        target_token_symbol: '',
        target_token_contract_address: '',
        target_token_total_supply: '',
        target_token_logo_image: '',
        pair_token_seq: '',
        pair_token_name: '',
        pair_token_symbol: '',
        pair_token_contract_address: '',
        pair_token_total_supply: '',
        pair_token_logo_image: '',
        txid_target_token: '',
        txid_pair_token: '',
        txid_create_fee: '',
        create_order_id: '',
        mod_time: '',
      },
      statusOptions: [
        { value: '30', label: '30 PAID : ?????? ??????' },
        { value: '32', label: '32 USER_REQUESTED : ?????? ??????' },
        { value: '34', label: '34 ACCEPTED : ?????? ??????' },
        { value: '40', label: '40 SUCCESS : ?????? ??????' },
        { value: '90', label: '90 REJECTED : ?????? ??????' },
        { value: '99', label: '99 FAILED : ?????? ??????' },
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
        // ??????????????? ???????????? ??????
        this.maximized = true
      } else {
        // ??????????????? ??????????????? ??????
        this.maximized = false
      }
      this.poolModal = true

      // ??? ??????
      this.selectPool()
    },
    // ??? ??????
    selectPool() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }

      // ?????? ??????
      this.$axios.get('/api/admin/selectAdminPool', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (result.data) {
            // console.log(result.data)

            // ????????? ??????
            this.poolVo = result.data
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateAdminPoolStatusCd() {
      // ??? ?????? ?????? ??????
      const param = {
        uid: this.getUid,
        seq: this.poolVo.seq,
        token_seq: this.poolVo.token_seq,
        status_cd: this.poolVo.status_cd.value,
      }
      this.$axios.post('/api/admin/updateAdminPoolStatusCd', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // ?????? ?????? ??????
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_token_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_token_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // ?????? ?????? ??????
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
      // ??????????????? ????????????
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

    // ????????? ??? ?????? ?????? ?????? ??????
    createPool() {
      // ?????? ????????? ??????
      this.confirmCreate = true
    },

    // ????????? ??? ?????? ??????
    doCreatePool() {

      // ????????? ?????? ??????, ????????? ?????? ??????
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      this.$q.loading.show() // ?????? ?????? ??????

      // ????????? ??? ??????
      const param = {
        uid: this.getUid,
        seq: this.poolVo.seq
      }
      this.$axios.post('/api/admin/createAdminPool', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // ?????? ?????? ??????
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('register_pool_success'))
          } else {
            // this.$noti(this.$q, this.$t('register_pool_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // ?????? ?????? ??????
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // ??????????????? ????????? ????????? ??? ?????? ?????????
    updateAdminPoolStatusComment() {
      const param = {
        uid: this.getUid,
        seq: this.poolVo.seq,
        // token_seq: this.tokenContractVerifyVo.token_seq,
        status_comment: this.poolVo.status_comment,
      }
      this.$axios.post('/api/admin/updateAdminPoolStatusComment', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // ?????? ?????? ??????
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // ?????? ?????? ??????
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    close () {
      this.poolModal = false
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
