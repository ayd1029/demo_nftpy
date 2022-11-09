<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_minting_register') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_minting_register_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- title -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_title') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="title" ref="title" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="1" />
      </div>
    </div>

    <!-- title_ko -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_title') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="title_ko" ref="title_ko" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="2" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- nft_image -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_nft_image') }}</span>
        <span class="text-grey">
          <span class="text-red"> *</span>
          &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
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
          accept="image/*,video/*"
          :filter="filterFiles"
          max-files="1"
          :auto-upload="true"
          tabindex="3"
          @uploaded="fileUploaded_nft_image"
        />
      </div>
    </div>
    <div class="row justify-center q-pb-xs">
      <div class="col-12">
        <q-input v-model="nft_image" ref="nft_image" :rules="[val => maxLength(val, 200)]" placeholder="https://" clearable standout tabindex="5" />
      </div>
    </div>

    <!-- nft_image preview -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('minting_preview_nft_image') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-xs">
      <div class="col-12">
        <div v-if="nft_image">
          <video v-if="isVideoNft" :src="nft_image" controls autoplay loop muted style="width: 100%; max-width: 512px;"></video>
          <img v-else :src="nft_image" style="width: 100%; max-width: 512px" />
        </div>
        <div v-else>
          <span>{{ $t('no_image') }}</span>
        </div>
      </div>
    </div>
    <br />

    <q-separator color="primary" style="height: 3px;" />

    <!-- main_image -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_main_image') }}</span>
        <span class="text-grey">
          &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
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
          tabindex="3"
          @uploaded="fileUploaded_main_image"
        />
      </div>
    </div>
    <div class="row justify-center q-pb-xs">
      <div class="col-12">
        <q-input v-model="main_image" ref="main_image" :rules="[val => maxLength(val, 200)]" placeholder="https://" clearable standout tabindex="4" />
      </div>
    </div>

    <!-- main_image preview -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('minting_preview_main_image') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-xs">
      <div class="col-12">
        <img v-if="main_image" :src="main_image" style="width: 100%;">
        <span v-else>{{ $t('no_image') }}</span>
      </div>
    </div>
    <br />

    <q-separator color="primary" style="height: 3px;" />

    <!-- contents -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_contents') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="contents"
          ref="contents"
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
    <br />

    <!-- contents_ko -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_contents') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="contents_ko"
          ref="contents_ko"
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
    <br />

    <!-- start_time -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('start_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('start_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="start_time" ref="start_time" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="7">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="start_time" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="start_time" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <!-- end_time -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('end_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('end_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="end_time" ref="end_time" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="8">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="end_time" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="end_time" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <!-- project seq -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_project_seq') }}</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_project_seq_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="project_seq" ref="project_seq" type="number" clearable standout tabindex="9" />
      </div>
    </div>

    <!-- collection_uri -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_collection_uri') }}</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_collection_uri_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="collection_uri" ref="collection_uri" :rules="[val => maxLength(val, 200)]" clearable standout tabindex="10" />
      </div>
    </div>


    <!-- buttons -->
    <div class="row justify-center q-pt-xl">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="12">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="registerMinting" tabindex="11">
          <b>{{ $t('register') }}</b>
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
// import { shake128 as SHA3 } from 'js-sha3'
import _ from 'lodash'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RegisterMinting',
  data () {
    return {
      isVideoNft: false,
      start_time: '',
      end_time: '',
      title: '',
      title_ko: '',
      contents: '',
      contents_ko: '',
      project_seq: '',
      main_image: '',
      nft_image: '',
      collection_uri: '',
      confirmGoBack: false,
    }
  },
  components: {
  },
  watch: {
    nft_image (newValue, oldValue) {
      // console.log('oldValue: : ' + oldValue)
      // console.log('newValue: : ' + newValue)
      if (newValue && newValue !== oldValue) {
        this.checkNftType()
      }
    },
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {},
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
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
      if (!this.$refs.title.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_title'))
        result = false
      }
      if (!this.$refs.title_ko.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_title_ko'))
        result = false
      }
      if (!this.nft_image) {
        this.$noti(this.$q, this.$t('validation_failed_minting_nft_image'))
        result = false
      }
      if (!this.contents) {
        this.$noti(this.$q, this.$t('validation_failed_minting_contents'))
        result = false
      }
      if (!this.contents_ko) {
        this.$noti(this.$q, this.$t('validation_failed_minting_contents_ko'))
        result = false
      }
      if (this.$refs.contents.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_minting_contents_length'))
        result = false
      }
      if (this.$refs.contents_ko.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_minting_contents_ko_length'))
        result = false
      }
      if (!this.$refs.start_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_start_time'))
        result = false
      }
      if (!this.$refs.end_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_end_time'))
        result = false
      }
      return result
    },
    // NFT 민팅 등록
    registerMinting() {
      // Field validation check
      if(!this.validate()) {
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // NFT 민팅 등록 처리
      const param = {
        uid: this.getUid,
        title: this.title,
        title_ko: this.title_ko,
        contents: this.contents,
        contents_ko: this.contents_ko,
        start_time: this.start_time,
        end_time: this.end_time,
        project_seq: !this.project_seq ? null : this.project_seq,
        main_image: !this.main_image ? null : this.main_image,
        nft_image: this.nft_image,
        collection_uri: this.collection_uri,
      }
      this.$axios.post('/api/minting/insertMinting', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // 2. 페이지 이동 - NFT 민팅 관리 화면
            this.$router.push('/minting/myMintingList')
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
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
      const MAX_FILE_SIZE = 10 * 1024 * 1024
      // this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$noti(this.$q, this.$t('file_size_exceeded'))

        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    // 이미지 업로드가 완료되면 호출되는 메소드
    fileUploaded_main_image (file, xhr) {
      this.main_image = file.xhr.responseText
    },
    fileUploaded_nft_image (file, xhr) {
      this.nft_image = file.xhr.responseText
    },
    // NFT 대표 이미지가 동영상일 경우, this.isVideoNft 를 true 로 설정
    checkNftType() {
      if (
        this.nft_image.indexOf('.mp4') > -1
        || this.nft_image.indexOf('.avi') > -1
        || this.nft_image.indexOf('.wmv') > -1
        || this.nft_image.indexOf('.mpg') > -1
        || this.nft_image.indexOf('.mpeg') > -1
        || this.nft_image.indexOf('.mov') > -1
        || this.nft_image.indexOf('.m4v') > -1
        || this.nft_image.indexOf('.avif') > -1
        || this.nft_image.indexOf('.ogm') > -1
        || this.nft_image.indexOf('.webm') > -1
        || this.nft_image.indexOf('.ogv') > -1
        || this.nft_image.indexOf('.asx') > -1
      ) {
        this.isVideoNft = true
      } else {
        this.isVideoNft = false
      }
    },
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
      // this.$router.push('/minting/myMintingList')
    }
  }
})
</script>

<style scoped>
</style>
