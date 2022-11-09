<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        [A] {{ $t('menu_admin_manage_token') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_admin_manage_token_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('create_sitemap_xml') }}</span>
      </div>
    </div> -->
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <!-- <q-input v-model="walletAddress" ref="walletAddress" :rules="[required]" clearable standout tabindex="5" /> -->
      </div>
    </div>

    <!-- <div class="row justify-center q-pt-lg">
      <div class="col-12 text-center">
        <q-btn class="btn" color="" text-color="black" size="lg" @click="createSitemapFile" style="width: 100%;" no-caps tabindex="1">
          <b>{{ $t('create_sitemap_xml') }}</b>
        </q-btn>
      </div>
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12 text-center">
        <q-btn class="btn" color="" text-color="black" size="lg" @click="pingGoogleSitemap" style="width: 100%;" no-caps tabindex="2">
          <b>Ping google sitemap.xml</b>
        </q-btn>
      </div>
    </div> -->



    <!-- <div class="row justify-center q-pt-lg">
      <div class="col-12 text-center">
        <q-btn class="btn" color="grey-1" text-color="black" size="lg" @click="testIdo" style="width: 100%;" no-caps tabindex="2">
          <b>excuteIdo()</b>
        </q-btn>
      </div>
    </div> -->

    <!-- <div class="row justify-center q-pt-lg">
      <div class="col-12 text-center">
        <q-btn class="btn" color="grey-1" text-color="black" size="lg" @click="test" style="width: 100%;" no-caps tabindex="2">
          <b>getBinCode()</b>
        </q-btn>
      </div>
    </div> -->

    <!-- <div class="row justify-center q-pt-lg">
      <div class="col-12 text-center">
        <q-btn class="btn" color="grey-1" text-color="black" size="lg" @click="addTotalSupplyTest" style="width: 100%;" no-caps tabindex="2">
          <b>addTotalSupplyTest()</b>
        </q-btn>
      </div>
    </div> -->

    <!-- <div class="row justify-center q-pt-lg">
      <div class="col-12 text-center">
        <q-btn class="btn" color="grey-1" text-color="black" size="lg" @click="testContract" style="width: 100%;" no-caps tabindex="2">
          <b>testContract()</b>
        </q-btn>
      </div>
    </div> -->

    <q-input v-model="addTokenSeq" label="■ Token SEQ" standout clearable />
    <br />

    <q-input v-model="walletAddress" label="■ Wallet Address(Owner)" standout clearable />
    <br />

    <!-- 총 갯수 (소수단위 생략) -->
    <q-input v-model="totalSupply" label="■ Amount - decimals(X)" standout clearable />
    <br />

    <div class="row justify-center q-pt-lg">
      <div class="col-12 text-center">
        <q-btn class="btn" color="grey-1" text-color="black" size="lg" @click="addTotalSupply" style="width: 100%;" no-caps tabindex="2">
          <b>Add()</b>
        </q-btn>
      </div>
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12 text-center">
        <q-btn class="btn" color="grey-1" text-color="black" size="lg" @click="burnToken" style="width: 100%;" no-caps tabindex="2">
          <b>Burn()</b>
        </q-btn>
      </div>
    </div>
    


    

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />

  <q-dialog v-model="confirmAdd">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">Really Add?</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('YES')" color="black" v-close-popup @click="doAddTotalSupply" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmBurn">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">Really Burn?</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('YES')" color="black" v-close-popup @click="doBurnToken" />
      </q-card-actions>
    </q-card>
  </q-dialog>


</template>

<script>
import { defineComponent } from 'vue';
// import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'

export default defineComponent({
  name: 'AdminMaintenance',
  data () {
    return {
      confirmAdd: false,
      confirmBurn: false,
      // tokenName: 'Klaystar',
      walletAddress: '0xb4285d543F192859cdB9f825686F3a2A8f8AA8BC',
      totalSupply: '100000000', // 토큰 갯수
      addTokenSeq: '', // 추가발행할 토큰 SEQ
      // confirmAdd: false, // 추가 확인창
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {},
  mounted: function () {},
  methods: {
    // 추가발행
    addTotalSupply() {
      this.confirmAdd = true
    },
    doAddTotalSupply() {
      const params = {
        seq: this.addTokenSeq, // KSTAR_SEQ = 153
        wallet_address: this.walletAddress, // token owner wallet address
        // wallet_address: '0xd6AC741d0060b89AD93Ff4c9578B4373DEd77A6D', // HALF
        add_total_supply_amount: this.totalSupply,
      }
      this.$q.loading.show() // 로딩 표시
      this.$axios.post('/api/token/addTotalSupplyToken', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('test_success'))
          } else {
            this.$noti(this.$q, this.$t('test_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    burnToken() {
      this.confirmBurn = true
    },
    doBurnToken() {
      const params = {
        seq: this.addTokenSeq, // KSTAR_SEQ = 153
        wallet_address: '0xb4285d543F192859cdB9f825686F3a2A8f8AA8BC', // 유동성
        // wallet_address: '0xd6AC741d0060b89AD93Ff4c9578B4373DEd77A6D', // HALF
        burn_amount: this.totalSupply,
      }
      this.$q.loading.show() // 로딩 표시
      this.$axios.post('/api/token/burnToken', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('test_success'))
          } else {
            this.$noti(this.$q, this.$t('test_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    testIdo() {
      const params = {
        // seq: '153',
        seq: '153',
        // contractAddress: '0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654',
      }
      this.$q.loading.show() // 로딩 표시
      this.$axios.post('/api/admin/excuteIdoContractTest', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('test_success'))
          } else {
            this.$noti(this.$q, this.$t('test_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    test() {
      const params = {
        
        contractAddress: '0x07ffbdba745f3a98ec462385aedcdcd973021671',
      }
      this.$q.loading.show() // 로딩 표시
      this.$axios.get('/api/admin/getContractCode', { params: { ...params } })
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('test_success'))
          } else {
            this.$noti(this.$q, this.$t('test_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    testContract() {
      const params = {
        seq: '151',
        wallet_address: '0xb4285d543f192859cdb9f825686f3a2a8f8aa8bc',
        add_total_supply_amount: '12300000000000000000000000',
      }
      this.$q.loading.show() // 로딩 표시
      this.$axios.post('/api/admin/testContract', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('test_success'))
          } else {
            this.$noti(this.$q, this.$t('test_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
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

    // 사이트맵 파일 생성
    createSitemapFile() {
      this.$q.loading.show() // 로딩 표시 시작

      // 사이트맵 파일 생성
      const params = {
        uid: this.getUid,
      }
      this.$axios.get('/api/sitemap/createSitemapFile', { params: { ...params } })
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('create_sitemap_file_success'))
          } else {
            this.$noti(this.$q, this.$t('create_sitemap_file_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },

    pingGoogleSitemap() {
      this.$axios.get('https://www.google.com/ping?sitemap=http://nftpy.io/sitemap.xml')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          this.$noti(this.$q, this.$t('ping_sitemap_file_success'))
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, this.$t('ping_sitemap_file_failed'))
          this.$noti(this.$q, err)
        })
    },

  }
})
</script>

<style scoped>
</style>
