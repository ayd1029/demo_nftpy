<template>
  
  <q-dialog v-model="userDetailModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">

    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
      <q-header class="bg-white" elevated>
        <q-toolbar>
          <q-avatar>
            <img v-if="profile_image" :src="profile_image">
            <q-icon v-else name="account_circle" size="md" color="black" />
          </q-avatar>
          <q-toolbar-title class="text-black">
            <div>
              <b>{{ uid }}</b>
            </div>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding style="word-break: break-all;">

          <!-- uid -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_uid') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="uid" ref="uid" standout readonly />
            </div>
          </div>

          <!-- wallet_address -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_wallet_address') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="wallet_address" ref="uid" standout />
            </div>
          </div>

          <!-- pwd -->
          <div class="row justify-center q-pt-md">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_pwd') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="pwd" ref="pwd" :rules="[val => minLength(val, 6), val => maxLength(val, 30)]" clearable standout tabindex="1" />
            </div>
          </div>

          <!-- pwdCheck -->
          <!-- <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_pwd_check') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="pwdCheck" ref="pwdCheck" :rules="[val => minLength(val, 6), val => maxLength(val, 30)]" clearable standout tabindex="2" />
            </div>
          </div> -->

          <!-- nickname -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_nickname') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="nickname" ref="nickname" :rules="[val => minLength(val, 2), val => maxLength(val, 100)]" clearable standout tabindex="4" />
            </div>
          </div>

          <!-- profile_image -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_profile_image') }}</span>
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
                tabindex="9"
                @uploaded="fileUploaded_profile_image"
              />
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12 text-red text-bold">
              {{ $t('square_image_only') }}
            </div>
          </div>

          <!-- profile_image preview -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">※ {{ $t('user_preview_profile_image') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img v-if="profile_image" :src="profile_image">
                    <img v-else src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div class="row">
                    <q-item-label class="col-12">{{ nickname }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <br />

          <q-separator color="primary" style="height: 3px;" />
          <div class="row justify-center text-weight-bold text-subtitle1 q-pt-md q-pb-md">
            {{ $t('user_information') }}
          </div>
          <q-separator color="primary" style="height: 3px;" />

          <!-- name -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_name') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="name" ref="name" :rules="[val => minLength(val, 2), val => maxLength(val, 100)]" clearable standout tabindex="3" />
            </div>
          </div>

          <!-- mobile_no -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_mobile_no') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="mobile_no" ref="mobile_no" :rules="[val => minLength(val, 10), val => maxLength(val, 20)]" clearable standout tabindex="5" />
            </div>
          </div>

          <!-- id_card_image -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_id_card_image') }}</span>
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
                tabindex="9"
                @uploaded="fileUploaded_id_card_image"
              />
            </div>
          </div>
          <div class="row justify-center q-pb-md" style="word-break: break-word;">
            <div class="col-12">
              {{ $t('user_id_card_type') }}
            </div>
            <div class="col-12 text-red text-bold">
              {{ $t('user_id_card_description') }}
            </div>
          </div>

          <!-- id_card_image preview -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">※ {{ $t('user_preview_id_card_image') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <img v-if="id_card_image" :src="id_card_image" style="width: 100%;">
              <span v-else>{{ $t('no_image') }}</span>
            </div>
          </div>
          <br />

          <!-- home_address -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_home_address') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="home_address" ref="home_address" :rules="[val => minLength(val, 2), val => maxLength(val, 200)]" clearable standout tabindex="3" />
            </div>
          </div>

          <!-- home_address_image -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_home_address_image') }}</span>
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
                tabindex="9"
                @uploaded="fileUploaded_home_address_image"
              />
            </div>
          </div>
          <div class="row justify-center q-pb-md" style="word-break: break-word;">
            <div class="col-12 text-red text-bold">
              {{ $t('user_home_address_description') }}
            </div>
          </div>

          <!-- home_address_image preview -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">※ {{ $t('user_preview_home_address_image') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <img v-if="home_address_image" :src="home_address_image" style="width: 100%;">
              <span v-else>{{ $t('no_image') }}</span>
            </div>
          </div>
          <br />

          <q-separator color="primary" style="height: 3px;" />
          <div class="row justify-center text-weight-bold text-subtitle1 q-pt-md q-pb-md">
            {{ $t('user_company_information') }}
          </div>
          <q-separator color="primary" style="height: 3px;" />

          <!-- business_registration_no -->
          <div class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_business_registration_no') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="business_registration_no" ref="business_registration_no" :rules="[val => minLength(val, 10), val => maxLength(val, 10)]" clearable standout tabindex="3" />
            </div>
          </div>

          <!-- business_license_image -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_business_license_image') }}</span>
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
                tabindex="9"
                @uploaded="fileUploaded_business_license_image"
              />
            </div>
          </div>
          <div class="row justify-center q-pb-md" style="word-break: break-word;">
          </div>

          <!-- business_license_image preview -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">※ {{ $t('user_preview_business_license_image') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <img v-if="business_license_image" :src="business_license_image" style="width: 100%;">
              <span v-else>{{ $t('no_image') }}</span>
            </div>
          </div>
          <br />

          <!-- company_address -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_company_address') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="company_address" ref="company_address" :rules="[val => minLength(val, 2), val => maxLength(val, 200)]" clearable standout tabindex="3" />
            </div>
          </div>

          <!-- company_address_image -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_company_address_image') }}</span>
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
                tabindex="9"
                @uploaded="fileUploaded_company_address_image"
              />
            </div>
          </div>
          <div class="row justify-center q-pb-md" style="word-break: break-word;">
            <div class="col-12 text-red text-bold">
              {{ $t('user_company_address_description') }}
            </div>
          </div>

          <!-- company_address_image preview -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">※ {{ $t('user_preview_company_address_image') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <img v-if="company_address_image" :src="company_address_image" style="width: 100%;">
              <span v-else>{{ $t('no_image') }}</span>
            </div>
          </div>
          <br />

          <!-- company_tel_no -->
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('user_company_tel_no') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-12">
              <q-input v-model="company_tel_no" ref="company_tel_no" :rules="[val => minLength(val, 9), val => maxLength(val, 20)]" clearable standout tabindex="6" />
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />


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
import { sha512 } from 'js-sha512'
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default {
  name: 'userDetailModal',
  data () {
    return {
      userDetailModal: false,
      maximized: false,
      seq: '',
      uid: '',
      wallet_address: '',
      wallet_type: '',
      pwd: '',
      auth_key: '',
      name: '',
      nickname: '',
      ucode: '',
      birth: '',
      gender: '',
      nation: '',
      mobile_no: '',
      tel_no: '',
      profile_image: '',
      thumbnail_image: '',
      introduce: '',
      id_card_image: '',
      home_address: '',
      home_address_image: '',
      business_registration_no: '',
      business_license_image: '',
      company_address: '',
      company_address_image: '',
      company_tel_no: '',
      push_agree_yn: '',
      adcd: '',
      reg_id: '',
      reg_time: '',
      mod_id: '',
      mod_time: '',
      del_id: '',
      del_time: '',
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
      this.userDetailModal = true

      // 키 설정
      // this.seq = this.$route.query.seq
      // 사용자 정보 조회
      this.selectUser()
    },
    // 사용자 조회
    selectUser() {
      const params = {
        // uid: this.getUid,
        uid: this.seq, // 조회 사용자 uid
      }

      // 사용자 조회
      this.$axios.post('/api/admin/selectAdminUser', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // console.log(result.data)

            // 데이터 설정
            // this.userVo = result.data
            this.uid = result.data.uid
            this.wallet_address = result.data.wallet_address
            this.wallet_type = result.data.wallet_type
            this.pwd = result.data.pwd
            this.auth_key = result.data.auth_key
            this.name = result.data.name
            this.nickname = result.data.nickname
            this.ucode = result.data.ucode
            this.birth = result.data.birth
            this.gender = result.data.gender
            this.nation = result.data.nation
            this.mobile_no = result.data.mobile_no
            this.tel_no = result.data.tel_no
            this.profile_image = result.data.profile_image
            this.thumbnail_image = result.data.thumbnail_image
            this.introduce = result.data.introduce
            this.id_card_image = result.data.id_card_image
            this.home_address = result.data.home_address
            this.home_address_image = result.data.home_address_image
            this.business_registration_no = result.data.business_registration_no
            this.business_license_image = result.data.business_license_image
            this.company_address = result.data.company_address
            this.company_address_image = result.data.company_address_image
            this.company_tel_no = result.data.company_tel_no
            this.push_agree_yn = result.data.push_agree_yn
            this.adcd = result.data.adcd
            this.reg_id = result.data.reg_id
            this.reg_time = result.data.reg_time
            this.mod_id = result.data.mod_id
            this.mod_time = result.data.mod_time
            this.del_id = result.data.del_id
            this.del_time = result.data.del_time

          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
    fileUploaded_profile_image (file, xhr) {
      this.profile_image = file.xhr.responseText
    },
    fileUploaded_id_card_image (file, xhr) {
      this.id_card_image = file.xhr.responseText
    },
    fileUploaded_home_address_image (file, xhr) {
      this.home_address_image = file.xhr.responseText
    },
    fileUploaded_business_license_image (file, xhr) {
      this.business_license_image = file.xhr.responseText
    },
    fileUploaded_company_address_image (file, xhr) {
      this.company_address_image = file.xhr.responseText
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
      this.userDetailModal = false
    }
  }
}
</script>
