<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_minting_prepare_json_upload') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_minting_prepare_json_upload_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- json_type -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_json_type') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="json_type" val="UNREVEALED" tabindex="1" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('minting_create_json_json_type_unrevealed') }}</q-item-label>
              <q-item-label caption>Upload to {{ base_uri_unrevealed }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="json_type" val="REVEALED" tabindex="2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('minting_create_json_json_type_revealed') }}</q-item-label>
              <q-item-label caption>Upload to {{ base_uri }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- nft_image -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_nft_json_files') }}</span>
        <span class="text-grey">
          &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="clear_all" size="sm" />, <q-icon name="done_all" size="sm" />)
        </span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-uploader
          field-name="file"
          ref="uploaderObj"
          url="/api/minting/uploadJsonList"
          hide-upload-btn
          :form-fields="uploaderFormFields"
          color="secondary"
          text-color="black"
          no-thumbnails
          multiple
          batch
          accept=".json"
          :filter="filterFiles"
          max-files="50000"
          :auto-upload="false"
          tabindex="3"
          @added="nftFileAdded"
          @removed="nftFileRemoved"
          @uploaded="fileUploaded_nft_json"
        />
      </div>
    </div>

    <!-- nft_image info -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-red">
          <q-icon name="warning" color="red" size="sm" /> {{ $t('minting_nft_json_update_information_1') }}
        </span>
      </div>
      <div class="col-12 q-pt-sm">
        <span class="text-grey">
          <q-icon name="info" size="sm" /> {{ $t('minting_nft_json_update_information_2') }}
        </span>
      </div>
    </div>

    <!-- <div v-if="mintingJsonList.length > 0" class="row justify-center q-pt-xl">
      <q-separator color="primary" style="height: 3px;" />
    </div> -->

    <div v-if="mintingJsonList.length > 0">
      <div class="row justify-center q-pt-xl">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1">{{ $t('minting_uploaded_nft_json_list') }}</span>
        </div>
      </div>
      <div class="justify-center q-pt-xs">

        <q-list bordered separator>
          <q-item v-for="item in mintingJsonList" :key="item.seq" clickable class="text-left" @click="openUrl(item.file_url)">
            <!-- <q-item-section avatar>
              <video v-if="item.isVideoNft" :src="item.file_url" controls autoplay loop muted style="width: 100%; max-width: 80px;"></video>
              <img v-else :src="item.file_url" style="width: 100%; max-width: 80px" />
            </q-item-section> -->
            <q-item-section>
              <q-item-label class=""><span class="text-grey-5">{{ $t('minting_nft_json_file_name') }} : </span><span class="text-bold">{{ item.file_name + '.' +  item.file_extension }}</span></q-item-label>
              <q-item-label class="q-pt-xs"><span class="text-grey-5">{{ $t('minting_nft_json_file_name_original') }} : </span><span>{{ item.file_name_original }}</span></q-item-label>
              <q-item-label class="q-pt-xs"><span class="text-grey-5">{{ $t('minting_nft_json_file_name_original') }} : </span><span>{{ item.file_url }}</span></q-item-label>
              <q-item-label class="q-pt-xs"><span class="text-grey-5">{{ $t('minting_nft_json_reg_time') }} : </span><span>{{ qDate.formatDate(item.reg_time, 'YYYY-MM-DD HH:mm:ss') }}</span></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-btn v-if="currentPage <= lastPageNum" class="btn" color="secondary" text-color="black" size="md" style="width: 100%;" @click="loadMore(currentPage)" tabindex="4">
          <b>{{ $t('load_more') }}</b>
        </q-btn>
      </div>
    </div>


    <!-- buttons -->
    <div class="row justify-center q-pt-xl">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="6">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="save" tabindex="5">
          <b>{{ $t('save') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
  <WalletModal ref="refWalletModal" @callback-wallet="callbackWallet" />

  <!-- 저장 확인 모달 -->
  <q-dialog v-model="confirmSave">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_save') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('save')" color="black" v-close-popup @click="doSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- 돌아가기 확인 모달 -->
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
import { date } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PrepareJsonUpload',
  data () {
    return {
      seq: '',
      // mintingSeq: '',
      json_type: 'UNREVEALED',
      base_uri_unrevealed: '',
      base_uri: '',
      uploaderFormFields: '',
      // isVideoNft: false,
      nftFileCount: 0, // 업로드 대상 파일 수 - 대상 존재 여부 확인을 위해서 사용
      pageSize: 10,
      lastPageNum: 1, // 마지막 페이지
      currentPage: 1,
      mintingJsonList: [], // 업로드 JSON 리스트
      confirmSave: false,
      confirmGoBack: false,
    }
  },
  components: {
  },
  watch: {
    json_type (newValue, oldValue) {
      // console.log('oldValue: : ' + oldValue)
      // console.log('newValue: : ' + newValue)
      if (newValue !== oldValue) {
        // JSON 업로드시 사용할 커스텀 변수
        this.setUploaderFormFileds()
      }
    },
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    qDate() {
      return date
    },
  },
  created: function () {
    // 키 설정
    this.seq = this.$route.query.seq

    // JSON 업로드시 사용할 커스텀 변수
    this.setUploaderFormFileds()

    // minting 조회 - JSON 타입이 리빌 전/후에 따라 업로드 패스 각각 표시
    this.selectMinting()

    // NFT 민팅 JSON 조회
    this.refresher()
    // this.selectMintingImage()

    // this.unrevealed_image_uri = 'https://nftpy.io/nft/not_revealed_nft.mp4'
  },
  mounted: function () {},
  methods: {
    setUploaderFormFileds() {
      // JSON 업로드시 사용할 커스텀 변수
      this.uploaderFormFields = [
        {
          name: 'seq_minting',
          value: this.seq,
        },
        {
          name: 'uid',
          value: this.getUid,
        },
        {
          name: 'json_type',
          value: this.json_type,
        },
      ]
    },
    // 기본정보 조회
    async selectMinting() {

      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMinting', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // 항목 설정
        // this.base_uri_image = result.data.base_uri_image
        this.base_uri = result.data.base_uri
        this.base_uri_unrevealed = result.data.base_uri_unrevealed
      }
    },
    async refresher() {
      this.mintingJsonList = []
      this.currentPage = 1

      await this.selectListMax()
      await this.loadMore(1)
    },
    async loadMore(index) {
      this.selectList(index)
      this.currentPage++
    },
    // NFT 민팅 JSON 마지막 페이지 조회
    async selectListMax() {
      this.$axios.get('/api/minting/selectMintingJsonListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, seq_minting: this.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // NFT 민팅 JSON 리스트 조회
    selectList(idx) {
      this.$axios.get('/api/minting/selectMintingJsonList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, seq_minting: this.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.mintingJsonList = [] // 리스트 초기화
          }
          this.mintingJsonList = this.mintingJsonList.concat(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // NFT 민팅 JSON 조회
    async selectMintingImage() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/minting/selectMintingImageList', { params: { ...param } })
      if (result.data) {
        console.log(result.data)
        // this.seq = result.data.seq
        this.mintingJsonList = result.data
      } else {
        // this.$noti(this.$q, this.$t('request_data_failed'))
      }
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
    callbackWallet(walletVo) {
      // console.log('callbackLogin!!!')
      // this.$store.dispatch('setWalletAddress', walletVo.wallet_address)
    },
    ///////////////////////////////////////////////////////////////////////////
    // validation
    ///////////////////////////////////////////////////////////////////////////
    // required(val) {
    //   const message = this.$t('validation_required')
    //   return required(val, message);
    // },
    // requiredNumber(val) {
    //   const message = this.$t('validation_required')
    //   return required(val, message);
    // },
    // minLength(val, length) {
    //   if (!val) {
    //     return true
    //   }
    //   const message = this.$t('validation_min_length') + ': ' + length
    //   return minLength(val, message, length);
    // },
    // maxLength(val, length) {
    //   if (!val) {
    //     return true
    //   }
    //   const message = this.$t('validation_max_length') + ': ' + length
    //   return maxLength(val, message, length);
    // },
    // minValue(val, value) {
    //   const message = this.$t('validation_min_value') + ': ' + value
    //   return minValue(val, message, value);
    // },
    // maxValue(val, value) {
    //   const message = this.$t('validation_max_value') + ': ' + value
    //   return maxValue(val, message, value);
    // },
    // validate() {
    //   let result = true
    //   if (!this.$refs.unrevealed_image_uri.validate()) {
    //     this.$noti(this.$q, this.$t('validation_failed_minting_unrevealed_image_uri'))
    //     result = false
    //   }
    //   return result
    // },
    nftFileAdded(files) {
      // console.log(files)
      this.nftFileCount += files.length
      console.log(this.nftFileCount)
    },
    nftFileRemoved(files) {
      // console.log(files)
      this.nftFileCount -= files.length
      if (this.nftFileCount < 0) {
        this.nftFileCount = 0
      }
      console.log(this.nftFileCount)
    },
    save() {
      // save 확인창 표시
      this.confirmSave = true
    },
    // NFT 민팅 JSON 저장
    doSave() {
      // // Field validation check
      // if(!this.validate()) {
      //   return
      // }

      // 1. 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid || !this.getWalletType || !this.getWalletAddress) {
        // console.log('this.getWalletType: ' + this.getWalletType)
        // console.log('this.getWalletAddress: ' + this.getWalletAddress)
        this.$refs.refWalletModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작
      
      // NFT JSON 파일 업로드
      if (this.nftFileCount > 0) {
        // /api/minting/uploadJsonList 내에서 minting_json 테이블에 JSON 정보 등록
        // callback 함수인 fileUploaded_nft_json 에서 저장 완료 메시지 표시
        this.$refs.uploaderObj.upload()
      } else {
        this.$q.loading.hide() // 로딩 표시 종료
        this.$noti(this.$q, this.$t('save_success'))
      }
    },
    fileUploaded_nft_json (data, xhr) {
      // this.nft_image = file.xhr.responseText
      // console.log('fileUploaded_nft_json called!')
      // console.log(data)
      // console.log(data.files.length)

      this.$q.loading.hide() // 로딩 표시 종료

      // 처리 완료 파일 수 차감
      this.nftFileCount -= data.files.length
      // console.log(this.nftFileCount)

      if (data && data.xhr && data.xhr.response) {
        const result = JSON.parse(data.xhr.response)
        if (result && result.resultCd && result.resultCd === 'SUCCESS') {
          this.$noti(this.$q, this.$t('save_success'))

          // 화면 리프레시
          this.refresher()
        } else {
          this.$noti(this.$q, this.$t('save_failed'))
        }
      } else {
        this.$noti(this.$q, this.$t('save_failed'))
      }
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
    openUrl(url) {
      window.open(url)
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
