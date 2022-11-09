<template>
  
  <q-dialog v-model="tokenDetailModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
      <q-header class="bg-white" elevated>
        <q-toolbar>
          <q-avatar>
            <img v-if="tokenVo.logo_image" :src="tokenVo.logo_image">
            <q-icon v-else name="generating_tokens" size="md" color="black" />
          </q-avatar>
          <q-toolbar-title class="text-black">
            <div v-if="tokenVo.name">
              <b>{{ tokenVo.name }}</b> <span class="text-grey-7">{{ tokenVo.symbol }}</span>
            </div>
            <div v-else>
              <div v-if="locale === 'ko-KR'">
                <b>{{ tokenVo.title_ko }}</b>
              </div>
              <div v-else>
                <b>{{ tokenVo.title }}</b>
              </div>
            </div>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding style="word-break: break-all;">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_title') }}</span>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div v-if="locale === 'ko-KR'" class="col-12">
              {{ tokenVo.title_ko }}
            </div>
            <div v-else class="col-12">
              {{ tokenVo.title }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_summary') }}</span>
              <q-separator />
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div v-if="locale === 'ko-KR'" class="col-12">
              {{ tokenVo.summary_ko }}
            </div>
            <div v-else class="col-12">
              {{ tokenVo.summary }}
            </div>
          </div>

          <!-- description -->
          <div v-if="description || descriptionKo" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_description') }}</span>
              <q-separator />
            </div>
          </div>
          <div v-if="locale === 'ko-KR'" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12" v-html="descriptionKo" />
          </div>
          <div v-else class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12" v-html="description" />
          </div>

          <div v-if="tokenVo.contract_address" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('contract_address') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.contract_address)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.contract_address" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'token/' + tokenVo.contract_address)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.contract_address }}</a>
            </div>
          </div>
          <div v-if="tokenVo.official_website" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_official_website') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.official_website)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.official_website" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenVo.official_website)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.official_website }}</a>
            </div>
          </div>
          <div v-if="tokenVo.official_email" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_official_email') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.official_email)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.official_email" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a class="text-weight-bold">{{ tokenVo.official_email }}</a>
            </div>
          </div>

          <div v-if="tokenVo.docs" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_docs') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.docs)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.docs" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenVo.docs)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.docs }}</a>
            </div>
          </div>
          <div v-if="tokenVo.blog" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_blog') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.blog)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.blog" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenVo.blog)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.blog }}</a>
            </div>
          </div>
          <div v-if="tokenVo.medium" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_medium') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.medium)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.medium" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenVo.medium)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.medium }}</a>
            </div>
          </div>
          <div v-if="tokenVo.telegram" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_telegram') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.telegram)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.telegram" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenVo.telegram)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.telegram }}</a>
            </div>
          </div>
          <div v-if="tokenVo.twitter" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_twitter') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.twitter)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.twitter" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenVo.twitter)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.twitter }}</a>
            </div>
          </div>
          <div v-if="tokenVo.github" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_github') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.github)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.github" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenVo.github)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.github }}</a>
            </div>
          </div>
          <div v-if="tokenVo.meta" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_meta') }}</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.meta)">&nbsp;{{ $t('copy') }}</q-btn>
              <q-separator />
            </div>
          </div>
          <div v-if="tokenVo.meta" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12">
              <a @click="openUrl(tokenVo.meta)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.meta }}</a>
            </div>
          </div>

          <!-- place QPageScroller at end of page -->
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="primary" />
          </q-page-scroller>

        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { useI18n } from 'vue-i18n'
// import { openURL } from 'quasar'

export default {
  name: 'TokenDetailModal',
  data () {
    return {
      tokenDetailModal: false,
      maximized: false,
      tokenSeq: '',
      tokenVo: {
        seq: '', // route parameter seq
        name: '',
        symbol: '',
        decimals: 18,
        initial_supply: 100000000,
        wallet_address: '',
        contract_address: '',
        title: '',
        title_ko: '',
        summary: '',
        summary_ko: '',
        official_website: '',
        official_email: '',
        logo_image: '',
        docs: '',
        blog: '',
        medium: '',
        telegram: '',
        twitter: '',
        github: '',
        meta: '',
      },
      scopeKlaytnUrl: '',
      description: '',
      descriptionKo: '',
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
  },
  methods: {
    async show () {
      this.scopeKlaytnUrl = this.$scopeDomainKlaytn
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
        // 디바이스가 모바일인 경우
        this.maximized = true
      } else {
        // 디바이스가 데스크탑인 경우
        this.maximized = false
      }
      this.tokenDetailModal = true

      // 키 설정
      // this.tokenSeq = this.$route.query.seq
      // 토큰 정보 조회
      this.selectToken()
    },
    // 토큰 조회
    selectToken() {
      const param = {
        uid: this.getUid,
        seq: this.tokenSeq,
      }

      // 토큰 조회
      this.$axios.get('/api/token/selectToken', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // console.log(result.data)

            // 데이터 설정
            this.tokenVo = result.data
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })

      // 토큰 상세 조회
      const paramDescription = {
        uid: this.getUid,
        tokenSeq: this.tokenSeq,
      }
      this.$axios.get('/api/token/selectTokenDescription', { params: { ...paramDescription }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // console.log(result.data)
            this.description = result.data.description
            this.descriptionKo = result.data.description_ko
          } else {
            this.description = ''
            this.descriptionKo = ''
            this.$noti(this.$q, this.$t('request_data_failed') + ' - description')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openUrl(url) {
      // openURL(url)
      // window.open(url, '_system', 'location=yes,footer=yes')

      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = url
        this.$refs.refIframeModal.show()
      } else {
        window.open(url, '_system')
      }
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
    close () {
      this.tokenDetailModal = false
    }
  }
}
</script>
