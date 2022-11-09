<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_mypage') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_mypage_description') }}
      </div>
    </div>

    <!-- uid -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('user_uid') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="getUid" ref="uid" standout readonly />
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
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('user_pwd_check') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="pwdCheck" ref="pwdCheck" :rules="[val => minLength(val, 6), val => maxLength(val, 30)]" clearable standout tabindex="2" />
      </div>
    </div>

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


    <!-- Buttons -->
    <div class="row justify-center q-pt-md">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="18">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="modifyUser" tabindex="17">
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
import { sha512 } from 'js-sha512'
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'Mypage',
  data () {
    return {
      // uid: '',
      wallet_address: '',
      pwd: '',
      pwdCheck: '',
      // auth_key: '',
      nickname: '',
      profile_image: '',
      // reg_name: '',
      name: '',
      mobile_no: '',
      // ucode: '',
      // birth: '',
      // gender: '',
      // nation: '',
      // tel_no: '',
      // thumbnail: '',
      // introduce: '',
      // push_agree_yn: '',
      // adcd: '',
      id_card_image: '',
      home_address: '',
      home_address_image: '',
      business_registration_no: '',
      business_license_image: '',
      company_address: '',
      company_address_image: '',
      company_tel_no: '',
      // reg_id: '',
      // reg_time: '',
      // mod_id: '',
      // mod_time: '',
      // del_id: '',
      // del_time: '',
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
    // this.uid = this.$route.query.seq

    // user_profile_image preview reg_name
    // this.reg_name = this.getUid.split('@')[0]

    // 계정 정보 조회
    this.selectUser()
  },
  mounted: function () {},
  methods: {
    // 계정 조회
    selectUser() {
      const param = {
        uid: this.getUid,
      }

      // 계정 조회
      this.$axios.get('/api/user/selectUser', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // console.log(result.data)
            this.wallet_address = result.data.wallet_address
            if (!this.wallet_address) {
              this.wallet_address = this.$store.getters.getWalletAddress
            }
            this.nickname = result.data.nickname
            this.profile_image = result.data.profile_image
            // this.reg_name = result.data.reg_name
            this.name = result.data.name
            this.mobile_no = result.data.mobile_no
            this.id_card_image = result.data.id_card_image
            this.home_address = result.data.home_address
            this.home_address_image = result.data.home_address_image
            this.business_registration_no = result.data.business_registration_no
            this.business_license_image = result.data.business_license_image
            this.company_address = result.data.company_address
            this.company_address_image = result.data.company_address_image
            this.company_tel_no = result.data.company_tel_no
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
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
      // 지갑주소 유효성 체크
      if (!this.checkAddress(this.wallet_address)) {
        this.$noti(this.$q, this.$t('validation_failed_check_wallet_address'))
        result = false
      }
      if (!this.$refs.pwd.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_pwd'))
        result = false
      }
      if (!this.$refs.pwdCheck.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_pwd_check'))
        result = false
      }
      // 비밀번호 일치 확인
      if (this.pwd !== this.pwdCheck) {
        this.$noti(this.$q, this.$t('pwd_not_match'))
        result = false
      }
      if (!this.$refs.nickname.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_nickname'))
        result = false
      }
      if (!this.$refs.name.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_name'))
        result = false
      }
      if (!this.$refs.mobile_no.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_mobile_no'))
        result = false
      }
      if (!this.$refs.home_address.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_home_address'))
        result = false
      }
      if (!this.$refs.business_registration_no.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_business_registration_no'))
        result = false
      }
      if (!this.$refs.company_address.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_company_address'))
        result = false
      }
      if (!this.$refs.company_tel_no.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_company_tel_no'))
        result = false
      }
      return result
    },
    // 회원정보 수정 처리 시작
    async modifyUser() {
      // Field validation check
      if(!this.validate()) {
        // this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      // 회원정보 수정
      this.doModifyUser()
    },
    // 회원정보 수정
    async doModifyUser() {
      // 1. 회원정보 수정 처리 - token, token_description, token_contract_verify
      let encPwd = ''
      if (this.pwd) {
        encPwd = sha512(this.pwd)
      } else {
        encPwd = null
      }
      const params = {
        uid: this.getUid,
        wallet_address: this.wallet_address,
        pwd: encPwd,
        nickname: this.nickname,
        profile_image: this.profile_image,
        name: this.name,
        mobile_no: this.mobile_no,
        id_card_image: this.id_card_image,
        home_address: this.home_address,
        home_address_image: this.home_address_image,
        business_registration_no: this.business_registration_no,
        business_license_image: this.business_license_image,
        company_address: this.company_address,
        company_address_image: this.company_address_image,
        company_tel_no: this.company_tel_no,
      }

      this.$q.loading.show() // 로딩 표시 시작

      this.$axios.post('/api/user/updateUser', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_user_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_user_failed'))
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
    // 지갑주소 유효성 검증
    /**
     * Checks if the given string is an address
     *
     * @method isAddress
     * @param {String} address the given HEX address
     * @return {Boolean}
     */
    checkAddress(address) {
      if (address.length === 42) {
        return true
      } else {
        return false
      }
      // // check if it has the basic requirements of an address
      // if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      //   return false
      //     // If it's ALL lowercase or ALL upppercase
      // }
      // if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
      //   // return true
      //   // Otherwise check each case
      //   return this.checkAddressChecksum(address)
      // } else {
      //   return false
      // }
    },
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
    }
  }
})
</script>

<style scoped>
</style>
