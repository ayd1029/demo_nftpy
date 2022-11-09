<template>
  <q-page class="q-pa-md page-default">
    <!--
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        resultApiCode: {{ resultApiCode }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        resultCode: {{ resultCode }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        resultMsg: {{ resultMsg }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        redirectUrl: {{ redirectUrl }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        key: {{ key }}
      </div>
    </div>
    -->

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { QSpinnerGears } from 'quasar'
// import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      // locale,
      resultApiCode: '', // FAIL, SUCCESS
      resultCode: '',
      redirectUrl: '',
      payCode: '',
      key: '',
      orderId: '',
      resultMsg: '',
    }
  },
  components: {},
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
  },
  created: function () {
    // alert(JSON.stringify(this.$route.query))
    this.resultApiCode = this.$route.query.resultApiCode
    this.resultCode = this.$route.query.resultCode
    this.redirectUrl = this.$route.query.redirectUrl
    this.payCode = this.$route.query.payCode
    this.orderId = this.$route.query.orderId
    this.key = this.$route.query.key
    this.resultMsg = this.$route.query.resultMsg

    // 결제 성공 여부 분기
    if (this.resultApiCode === 'SUCCESS') {

      // 메일 알림
      try {
        this.sendMail()
      } catch(e) {
        console.log(e)
      }

      if (this.payCode === this.$PAY_CODE_CREATE_TOKEN) { // 'CREATE_TOKEN' 결제코드가 토큰 생성인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          create_order_id: this.orderId,
        }
        this.$axios.post('/api/token/updateTokenCreateStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/token/create'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/token/create'
          })
      } else if (this.payCode === this.$PAY_CODE_MINT_TOKEN) { // 'MINT_TOKEN' 결제코드가 토큰 추가발행인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          order_id: this.orderId,
        }
        this.$axios.post('/api/tokenmint/updateTokenMintStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/token/mint'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/token/mint'
          })
      } else if (this.payCode === this.$PAY_CODE_BURN_TOKEN) { // 'BURN_TOKEN' 결제코드가 토큰 소각인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          order_id: this.orderId,
        }
        this.$axios.post('/api/tokenburn/updateTokenBurnStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/token/burn'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/token/burn'
          })
      } else if (this.payCode === this.$PAY_CODE_CONTRACT_VERIFY) { // 'CONTRACT_VERIFY' 결제코드가 계약 검증인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          contract_order_id: this.orderId,
        }
        this.$axios.post('/api/token/updateTokenContractStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/token/requestVerification'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/token/requestVerification'
          })
      } else if (this.payCode === this.$PAY_CODE_CREATE_POOL) { // 'CREATE_POOL' 결제코드가 유동성 풀 생성인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          create_order_id: this.orderId,
        }
        this.$axios.post('/api/pool/updatePoolStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/pool/requestCreatePool'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/pool/requestCreatePool'
          })
      } else if (this.payCode === this.$PAY_CODE_CREATE_AIRDROP) { // 'CREATE_AIRDROP' 결제코드가 에어드랍 생성인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          create_order_id: this.orderId,
        }
        this.$axios.post('/api/airdrop/updateAirdropStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/airdrop/requestCreateAirdrop'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/airdrop/requestCreateAirdrop'
          })
      } else if (this.payCode === this.$PAY_CODE_CREATE_WHITELIST) { // 'CREATE_WHITELIST' 결제코드가 화이트리스트 생성인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          order_id: this.orderId,
        }
        this.$axios.post('/api/whitelist/updateWhitelistStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$noti(this.$q, this.$t('listed_in_the_whitelist')) // '[화이트리스트] 목록에 표시됩니다.'
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/whitelist/myWhitelistList'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/whitelist/myWhitelistList'
          })
      } else if (this.payCode === this.$PAY_CODE_CREATE_PRESALE) { // 'CREATE_PRESALE' 결제코드가 사전판매 생성인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          order_id: this.orderId,
        }
        this.$axios.post('/api/presale/updatePresaleStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/presale/myPresaleList'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // 'presale/myPresaleList'
          })
      } else if (this.payCode === this.$PAY_CODE_CREATE_RECRUIT) { // 'CREATE_RECRUIT' 결제코드가 채용 생성인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          order_id: this.orderId,
        }
        this.$axios.post('/api/recruit/updateRecruitStatusCdPaid', params)
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/recruit/myRecruitList'
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/recruit/myRecruitList'
          })
      } else if (this.payCode === this.$PAY_CODE_CREATE_MINTING) { // 'CREATE_MINTING' 결제코드가 NFT 민팅 생성인 경우
        // 1. 결제 완료 상태로 변경
        const params = {
          uid: this.getUid,
          seq: this.key,
          order_id: this.orderId,
        }
        this.$axios.post('/api/minting/updateMintingStatusCdPaid', params)
          .then((result) => {
            console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // 로딩 표시 시작
              this.$q.loading.show({
                spinner: QSpinnerGears,
                message: this.$t('loading_message_create_contract'),
              })

              // NFT 민팅 컨트랙트 생성
              const params = {
                uid: this.getUid,
                seq: this.key,
              }
              this.$axios.post('/api/minting/createMintingContract', params)
                .then((result) => {
                  console.log(result.data)
                  this.$q.loading.hide() // 로딩 표시 종료

                  if (result && result.data && result.data.resultCd === 'SUCCESS') {
                    this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
                  } else {
                    this.$noti(this.$q, this.$t('create_contract_failed')) // '컨트랙트 생성 실패'
                  }

                  // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
                  this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/minting/myMintingList'
                })
                .catch((err) => {
                  this.$q.loading.hide() // 로딩 표시 종료
                  console.log(err)
                })

              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'

              // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
              this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/minting/myMintingList'
            }
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl, query: { key: this.key }}) // '/minting/myMintingList'
          })

      } else {
        alert('Process failed. payCode is not CREATE_TOKEN or CONTRACT_VERIFY or CREATE_POOL or CREATE_AIRDROP. Contact: nftpy.contact@gmail.com')
        console.log('Process failed. payCode is not CREATE_TOKEN or CONTRACT_VERIFY or CREATE_POOL or CREATE_AIRDROP. Contact: nftpy.contact@gmail.com')
      }
    } else {
      this.$noti(this.$q, this.$t('payment_failed'))
      this.$noti(this.$q, this.resultCode + ': ' + this.resultMsg) // '결제 실패 원인'
      this.$router.replace(this.redirectUrl)
    }
  },
  mounted: function () {},
  // setup () {
  //   const { locale } = useI18n({ useScope: 'global' })
  //   return {
  //     locale,
  //   }
  // },
  methods: {
    // send email
    sendMail() {
      const title = '[ ' + this.payCode + ' ]'
      let contents = 'ID: ' + this.getUid + '<br>'
      contents += 'JOB: ' + this.payCode + '<br>'
      contents += 'SEQ: ' + this.key + '<br>'
      contents += 'redirectUrl: ' + this.redirectUrl + '<br>'
      contents += '<br>'
      contents += 'https://nftpy.io'

      const params = {
        subject: title,
        text: contents,
        email_from: this.$systemMailFrom,
        email_to: this.$systemMailFrom,
      }
      this.$axios.post('/api/common/sendMail', params)
        .then((result) => {
          // console.log(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }
})
</script>
