<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_howto_link') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_howto_link_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <table border="0" cellpadding="0" sellspacing="0" width="100%">
      <tr>
        <td colspan="2"><span class="text-weight-bold text-subtitle1">https://nftpy.io/info?ca=0xb15183d0d4d5e86ba702ce9bb7b633376e7db29f&p=y&t=i&l=ko</span></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td width="120"><span class="text-black">URI</span></td>
        <td><span class="text-black">https://nftpy.io/info</span></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">Parameters</span></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">ca</span></td>
        <td><span class="text-black">Target Token's Contract Address</span></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">p</span></td>
        <td>
          <span class="text-black">
            Popup Layout Flag
          </span>
        </td>
      </tr>
      <tr>
        <td><span class="text-black"></span></td>
        <td>
          <span class="text-black">
            n : header, side menu (O) 
            <br />
            y : header, side menu (X)
            <br />
            ※ default : n
          </span>
        </td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">t</span></td>
        <td>
          <span class="text-black">
            Tab
          </span>
        </td>
      </tr>
      <tr>
        <td><span class="text-black"></span></td>
        <td>
          <span class="text-black">
            i : information
            <br />
            l : link
            <br />
            c : comment
            <br />
            ※ default : i
          </span>
        </td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">l</span></td>
        <td>
          <span class="text-black">
            locale
          </span>
        </td>
      </tr>
      <tr>
        <td><span class="text-black"></span></td>
        <td>
          <span class="text-black">
            en : english
            <br />
            ko : korean
            <br />
            ※ default : ko
          </span>
        </td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
    </table>

    <br />
    <br />

    <div class="row justify-center">
      <div class="col-12 text-subtitle1">
        Test
      </div>
    </div>
    <table border="0" cellpadding="0" sellspacing="0" width="100%">
      <tr>
        <td colspan="2"><span class="text-weight-bold text-subtitle1">https://nftpy.io/info?ca={{ ca }}&p={{ p }}&t={{ t }}&l={{ l }}</span></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td width="120"><span class="text-black">Parameters</span></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">ca</span></td>
        <td><q-input v-model="ca" ref="refCa" dense clearable standout tabindex="1" /></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">p</span></td>
        <td><q-input v-model="p" ref="refP" dense clearable standout tabindex="2" /></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">t</span></td>
        <td><q-input v-model="t" ref="refT" dense clearable standout tabindex="3" /></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">l</span></td>
        <td><q-input v-model="l" ref="refL" dense clearable standout tabindex="4" /></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black"></span></td>
        <td><q-btn class="btn" color="secondary" text-color="black" size="md" @click="openUrl" style="width: 100px;" tabindex="5"><b>TEST</b></q-btn></td>
      </tr>
    </table>

    <br />
    <br />

    <div class="row justify-center">
      <div class="col-12 text-subtitle1">
        ※ Checking the existence of project information
      </div>
    </div>
    <table border="0" cellpadding="0" sellspacing="0" width="100%">
      <tr>
        <td colspan="2"><span class="text-weight-bold text-subtitle1">https://nftpy.io/api/project/count?ca={{ ca }}</span></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td width="120"><span class="text-black">URI</span></td>
        <td><span class="text-black">https://nftpy.io/api/project/count</span></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">Parameter</span></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">ca</span></td>
        <td><span class="text-black">Target Token's Contract Address</span></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td colspan="2">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2"><span class="text-black">response.data</span></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">count</span></td>
        <td>0 (not exist) or 1 (exist)</td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">contract_address</span></td>
        <td>ca (parameter)</td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td colspan="2">&nbsp;</td>
      </tr>
      <tr>
        <td><span class="text-black">Test</span></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">ca</span></td>
        <td><q-input v-model="ca" ref="refCa" dense clearable standout tabindex="6" /></td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black">count</span></td>
        <td>{{ count }}</td>
      </tr>
      <tr>
        <td colspan="2"><q-separator /></td>
      </tr>
      <tr>
        <td><span class="text-black"></span></td>
        <td><q-btn class="btn" color="secondary" text-color="black" size="md" @click="testCount" style="width: 100px;" tabindex="7"><b>TEST</b></q-btn></td>
      </tr>
    </table>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <IframeLinkSampleModal ref="refIframeLinkSampleModal" />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  // setup () {
  //   // needs to be called in setup()
  //   useMeta(metaData)
  // },

  name: 'Link',
  data () {
    return {
      // tokenSeq: '', // route parameter seq
      baseUrl: 'https://nftpy.io/info',
      // baseUrl: 'http://172.30.1.100:8888/info',
      ca: '0xb15183d0d4d5e86ba702ce9bb7b633376e7db29f',
      p: 'y',
      t: 'i',
      l: 'ko',
      count: '',
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {
  },
  mounted: function () {},
  methods: {
    openUrl() {

      const url = this.baseUrl + '?ca=' + this.ca + '&p=' + this.p + '&t=' + this.t + '&l=' + this.l

      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeLinkSampleModal.url = url
        this.$refs.refIframeLinkSampleModal.show()
      } else {
        if (this.p === 'y') {
          this.$refs.refIframeLinkSampleModal.url = url
          this.$refs.refIframeLinkSampleModal.maximized = false
          this.$refs.refIframeLinkSampleModal.show()
        } else {
          window.open(url, '_system')
        }
      }
    },

    // 프로젝트 정보 유무 체크
    testCount() {
      this.$q.loading.show() // 로딩 표시 시작

      const param = {
        uid: this.getUid,
        ca: this.ca,
      }
      this.$axios.get('/api/project/count', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data) {
            // console.log(result.data)
            this.count = result.data.count
            this.$noti(this.$q, 'count=' + result.data.count + ', contract_address: ' + result.data.contract_address)
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          this.$noti(this.$q, this.$t('request_data_failed'))
          console.log(err)
        })
    },
  }
})
</script>
