<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_token_mint') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_token_mint_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- 파라미터 정보 -->
    <!-- <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        key: {{ key }}
      </div>
    </div> -->

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

</template>

<script>
import { defineComponent } from 'vue';
import { QSpinnerGears } from 'quasar'

export default defineComponent({
  name: 'Mint',
  data () {
    return {
      key: '', // 결제창 호출시 상점 파라미터(merchantData)로 설정한 값 중의 key의 value
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
  },
  created: function () {
    console.log(this.$route.query)
    this.key = this.$route.query.key

    // 토큰발행 생성 처리
    this.mintToken()
  },
  mounted: function () {},
  methods: {
    mintToken() {
      // 로딩 표시 시작
      this.$q.loading.show({
        spinner: QSpinnerGears,
        message: this.$t('loading_message_mint_token'),
      })

      // 1. 해당 건이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: this.key,
      }
      this.$axios.post('/api/tokenmint/checkTokenMintStatusCdPaid', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 2. 토큰발행
            this.doMintToken()
          } else {
            this.$q.loading.hide() // 로딩 표시 종료
            this.$noti(this.$q, this.$t('waiting_payment')) // 결제 대기중입니다.
            this.$router.push('/token/myList') // 나의 토큰 리스트로 이동
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 토큰발행 처리
    doMintToken() {
      console.log('minting tokens....')
      // 1. 토큰발행
      // TokenContractVerifyVo의 값 = seq(X), token_seq(O)
      const params = {
        uid: this.getUid,
        seq: this.key,
      }
      this.$axios.post('/api/tokenmint/mint', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('mint_token_success'))
          } else {
            this.$noti(this.$q, this.$t('mint_token_failed'))
            this.$noti(this.$q, this.$t(result.data.resultMsg))
          }
          this.$q.loading.hide() // 로딩 표시 종료
          // 나의 리스트로 이동
          this.$router.push('/token/myList')
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
