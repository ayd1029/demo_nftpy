<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_nft_project_modify') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_nft_project_modify_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!--
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_name') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenName" ref="tokenName" :rules="[required, val => minLength(val, 3), val => maxLength(val, 30)]" clearable standout readonly />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_symbol') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenSymbol" ref="tokenSymbol" :rules="[required, val => minLength(val, 3), val => maxLength(val, 30)]" clearable standout readonly />
      </div>
    </div>
    -->

    <q-separator color="primary" style="height: 3px;" />

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_title') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenTitle" ref="tokenTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_title') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenTitleKo" ref="tokenTitleKo" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="2" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_summary') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenSummary" ref="tokenSummary" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="3" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_summary') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenSummaryKo" ref="tokenSummaryKo" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="4" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_description') }} (English)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-lg">
      <div class="col-12">
        <q-editor
          v-model="tokenDescription"
          min-height="10rem"
          autofocus
          tabindex="5"
          @keyup.enter.stop
          toolbar-bg="grey-1"
          :toolbar="[
            ['left', 'center', 'right', 'justify'],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: [
                  'p',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'code'
                ]
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
              },
              'removeFormat'
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

            ['undo', 'redo'],
            ['print', 'fullscreen'],
            ['viewsource']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        />
      </div>
    </div>
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_description') }} (Korean)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="tokenDescriptionKo"
          min-height="10rem"
          autofocus
          tabindex="6"
          @keyup.enter.stop
          toolbar-bg="grey-1"
          :toolbar="[
            ['left', 'center', 'right', 'justify'],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: [
                  'p',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'code'
                ]
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
              },
              'removeFormat'
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

            ['undo', 'redo'],
            ['print', 'fullscreen'],
            ['viewsource']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        />
      </div>
    </div>
    <br />

    <q-separator color="primary" style="height: 3px;" />

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_official_website') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenOfficialWebsite" ref="tokenOfficialWebsite" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="7" placeholder="e.g. https://klayswap.com" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_official_email') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenOfficialEmail" ref="tokenOfficialEmail" :rules="[required, val => minLength(val, 5), val => maxLength(val, 30)]" clearable standout tabindex="8" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_logo_image') }}</span>
        <span class="text-grey">
          &nbsp;&nbsp;({{ $t('token_logo_image_reset') }} : <q-icon name="done_all" size="sm" />)
        </span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
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
          tabindex="9"
          @uploaded="fileUploaded"
        />
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12 text-red text-bold">
        {{ $t('square_image_only') }}
      </div>
    </div>

    <!-- preview -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('token_description_preview') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img v-if="tokenLogoImage" :src="tokenLogoImage">
                <q-icon v-else name="generating_tokens" size="md" />

              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="row">
                <q-item-label class="col-12 text-weight-bold">{{ tokenName }} {{ tokenSymbol }}</q-item-label>
                <q-item-label class="col-12">{{ tokenTitle }}</q-item-label>
                <q-item-label class="col-12">{{ tokenSummary }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
    <br />

    <q-separator color="primary" style="height: 3px;" />

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_docs') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenDocs" ref="tokenDocs" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="10" placeholder="e.g. https://docs.klayswap.com" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_blog') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenBlog" ref="tokenBlog" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="11" placeholder="e.g. https://medium.com/iotrustlab/tagged/klayswap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_medium') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenMedium" ref="tokenMedium" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="12" placeholder="e.g. https://medium.com/klayswap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_telegram') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenTelegram" ref="tokenTelegram" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="13" placeholder="e.g. https://t.me/klayswapchannel" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_twitter') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenTwitter" ref="tokenTwitter" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="14" placeholder="e.g. https://twitter.com/KLAYswap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_github') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenGithub" ref="tokenGithub" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="15" placeholder="e.g. https://github.com/KlaySwap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_meta') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenMeta" ref="tokenMeta" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="16" placeholder="e.g. https://www.facebook.com/klayswap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_discord') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="tokenDiscord" ref="tokenDiscord" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="17" placeholder="e.g. https://discord.gg/fRhThwHXGQ" />
      </div>
    </div>

    <div class="row justify-center q-pt-md">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="19">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="modifyToken" tabindex="18">
          <b>{{ $t('modify') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />

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

export default defineComponent({
  name: 'Registration',
  data () {
    return {
      tokenSeq: '', // route parameter seq
      tokenName: '',
      tokenSymbol: '',
      tokenDecimals: 0,
      tokenInitialSupply: 10000000000,
      walletAddress: '',
      tokenTitle: '',
      tokenTitleKo: '',
      tokenSummary: '',
      tokenSummaryKo: '',
      tokenDescription: '',
      tokenDescriptionKo: '',
      tokenOfficialWebsite: '',
      tokenOfficialEmail: '',
      tokenLogoImage: '',
      tokenDocs: '',
      tokenBlog: '',
      tokenMedium: '',
      tokenTelegram: '',
      tokenTwitter: '',
      tokenGithub: '',
      tokenMeta: '',
      tokenDiscord: '',
      // seqFileMst: '' // 파일 마스터 SEQ
      confirmGoBack: false, // goBack 확인창
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
    // 키 설정
    this.tokenSeq = this.$route.query.seq
    // 토큰 정보 조회
    this.selectToken()
  },
  mounted: function () {},
  methods: {
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
            this.tokenName = result.data.name
            this.tokenSymbol = result.data.symbol
            this.tokenDecimals = result.data.decimals
            this.tokenInitialSupply = result.data.initial_supply
            this.walletAddress = result.data.wallet_address
            this.tokenTitle = result.data.title
            this.tokenTitleKo = result.data.title_ko
            this.tokenSummary = result.data.summary
            this.tokenSummaryKo = result.data.summary_ko
            // this.tokenDescription = result.data.description
            this.tokenOfficialWebsite = result.data.official_website
            this.tokenOfficialEmail = result.data.official_email
            this.tokenLogoImage = result.data.logo_image
            this.tokenDocs = result.data.docs
            this.tokenBlog = result.data.blog
            this.tokenMedium = result.data.medium
            this.tokenTelegram = result.data.telegram
            this.tokenTwitter = result.data.twitter
            this.tokenGithub = result.data.github
            this.tokenMeta = result.data.meta
            this.tokenDiscord = result.data.discord
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
            this.tokenDescription = result.data.description
            this.tokenDescriptionKo = result.data.description_ko
          } else {
            this.$noti(this.$q, this.$t('request_data_failed') + ' - description')
          }
        })
        .catch((err) => {
          console.log(err)
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
      if (!this.$refs.tokenTitle.validate()) {
        result = false
      }
      if (!this.$refs.tokenTitleKo.validate()) {
        result = false
      }
      if (!this.$refs.tokenSummary.validate()) {
        result = false
      }
      if (!this.$refs.tokenSummaryKo.validate()) {
        result = false
      }
      if (!this.$refs.tokenOfficialWebsite.validate()) {
        result = false
      }
      if (!this.$refs.tokenOfficialEmail.validate()) {
        result = false
      }
      if (!this.$refs.tokenDocs.validate()) {
        result = false
      }
      if (!this.$refs.tokenBlog.validate()) {
        result = false
      }
      if (!this.$refs.tokenMedium.validate()) {
        result = false
      }
      if (!this.$refs.tokenTelegram.validate()) {
        result = false
      }
      if (!this.$refs.tokenTwitter.validate()) {
        result = false
      }
      if (!this.$refs.tokenGithub.validate()) {
        result = false
      }
      if (!this.$refs.tokenMeta.validate()) {
        result = false
      }
      if (!this.$refs.tokenDiscord.validate()) {
        result = false
      }
      return result
    },
    // NFT 프로젝트 수정 처리 시작
    async modifyToken() {
      // Field validation check
      if(!this.validate()) {
        this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // NFT 프로젝트 수정
      this.doModifyToken()
    },
    // NFT 프로젝트 수정
    async doModifyToken() {
      // 1. NFT 프로젝트 수정 처리 - token, token_description, token_contract_verify
      const params = {
        uid: this.getUid,
        seq: this.tokenSeq,
        title: this.tokenTitle,
        title_ko: this.tokenTitleKo,
        summary: this.tokenSummary,
        summary_ko: this.tokenSummaryKo,
        description: this.tokenDescription,
        description_ko: this.tokenDescriptionKo,
        official_website: this.tokenOfficialWebsite,
        official_email: this.tokenOfficialEmail,
        logo_image: this.tokenLogoImage,
        docs: this.tokenDocs,
        blog: this.tokenBlog,
        medium: this.tokenMedium,
        telegram: this.tokenTelegram,
        twitter: this.tokenTwitter,
        github: this.tokenGithub,
        meta: this.tokenMeta,
        discord: this.tokenDiscord,
      }
      this.$axios.post('/api/nft/updateNftProject', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_success'))

            // // 페이지 이동
            this.$router.go(-1)
            // if (this.$route.query.fromAdmin === 'Y') {
            //   // 나의 토큰 리스트 화면 - admin
            //   this.$router.push('/admin/adminMyList')
            // } else {
            //   // 나의 토큰 리스트 화면
            //   this.$router.push('/token/myList')
            // }
            // <!-- 관리자 수정용 -->
            // this.$router.push('/token/newList')
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
    // 파일 업로드 필터
    filterFiles (files) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024
      // this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$noti(this.$q, this.$t('file_size_exceeded'))

        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    // fileAdded (files) {
    //   // this.$refs.uploaderObj.reset()
    //   this.$refs.uploaderObj.removeUploadedFiles()
    //   this.$refs.uploaderObj.upload()
    // },
    fileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.tokenLogoImage = fileNameNew // 토큰 로고 URL 설정
      // this.$refs.uploaderObj.reset()
    },
    goBack() {
      // this.$router.go(-1)

      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      // 페이지 이동
      this.$router.go(-1)
      // if (this.$route.query.fromAdmin === 'Y') {
      //   // 나의 토큰 리스트 화면 - admin
      //   this.$router.push('/admin/adminMyList')
      // } else {
      //   // 나의 토큰 리스트 화면
      //   this.$router.push('/token/myList')
      // }
    }
  }
})
</script>

<style scoped>
</style>
