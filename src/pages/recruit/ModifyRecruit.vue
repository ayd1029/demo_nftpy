<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_recruit_modify') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_recruit_modify_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- title -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('recruit_title') }} (English)<span class="text-red"> *</span></span>
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
        <span class="text-weight-bold text-subtitle1">{{ $t('recruit_title') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="title_ko" ref="title_ko" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="2" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- main_image -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('recruit_main_image') }}</span>
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

    <!-- main_image preview -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('recruit_preview_main_image') }}</span>
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
        <span class="text-weight-bold text-subtitle1">{{ $t('recruit_contents') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="contents"
          ref="contents"
          min-height="10rem"
          autofocus
          tabindex="4"
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
        <span class="text-weight-bold text-subtitle1">{{ $t('recruit_contents') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="contents_ko"
          ref="contents_ko"
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
          <q-input v-model="start_time" ref="start_time" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="6">
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
          <q-input v-model="end_time" ref="end_time" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="7">
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

    <!-- input field list -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('input_field') }}</span>
        &nbsp;&nbsp;
        <q-btn class="btn" color="secondary" text-color="black" size="sm" style="width: 60px;" @click="addFieldRow" tabindex="13">
          <b>{{ $t('add') }}</b>
        </q-btn>
      </div>
    </div>
    <div class="q-pt-sm q-pb-md">
      <!-- <q-separator style="height: 2px;" /> -->
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="seq"
        flat
        bordered
        :rows-per-page-options="[0]"
        hide-pagination
        tabindex="14"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <!--
            <q-td key="use_yn" :props="props">
              <q-toggle v-model="props.row.use_yn" checked-icon="check" color="green" unchecked-icon="clear" />
            </q-td>
            -->
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit v-model="props.row.name" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined clearable />
              </q-popup-edit>
            </q-td>
            <q-td key="name_ko" :props="props">
              {{ props.row.name_ko }}
              <q-popup-edit v-model="props.row.name_ko" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined clearable />
              </q-popup-edit>
            </q-td>
            <q-td key="type" :props="props">
              <q-select
                v-model="props.row.type"
                v-if="props.row.deletable_yn === 'N'"
                :options="fieldTypeOptions"
                dense
                outlined
                emit-value
                readonly
              />
              <q-select
                v-model="props.row.type"
                v-else
                :options="fieldTypeOptions"
                dense
                outlined
                emit-value
              />
            </q-td>
            <q-td key="required" :props="props">
              <q-select
                v-model="props.row.required"
                v-if="props.row.deletable_yn === 'N'"
                :options="requiredOptions"
                dense
                outlined
                emit-value
                readonly
              />
              <q-select
                v-model="props.row.required"
                v-else
                :options="requiredOptions"
                dense
                outlined
                emit-value
              />
            </q-td>
            <q-td key="deletable_yn" :props="props">
              <q-btn
                v-if="props.row.deletable_yn === 'Y'"
                icon="close"
                size="sm"
                flat
                round
                dense
                @click="deleteFieldRow(props.row.seq)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <!-- project seq -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('recruit_project_seq') }}</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('recruit_project_seq_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="project_seq" ref="project_seq" type="number" clearable standout tabindex="18" />
      </div>
    </div>

    <!-- buttons -->
    <div class="row justify-center q-pt-xl">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="21">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="modifyRecruit" tabindex="20">
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
// import { shake128 as SHA3 } from 'js-sha3'
import _ from 'lodash'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ModifyRecruit',
  data () {
    return {
      seq: '',
      start_time: '',
      end_time: '',
      title: '',
      title_ko: '',
      contents: '',
      contents_ko: '',
      project_seq: '',
      main_image: '',
      columns: [
        // { name: 'use_yn', label: this.$t('use_yn'), align: 'left', field: 'use_yn' },
        { name: 'name', field: 'name', label: this.$t('field_name'), align: 'left', required: true, style: 'width: 25%' },
        { name: 'name_ko', field: 'name_ko', label: this.$t('field_name_ko'), align: 'left', required: true, style: 'width: 25%' },
        { name: 'type', field: 'type', label: this.$t('field_type'), align: 'center', style: 'width: 1%' },
        { name: 'required', field: 'required', label: this.$t('field_required'), align: 'center', style: 'width: 1%' },
        // { name: 'score', field: 'score', label: this.$t('field_score'), align: 'center', style: 'width: 1%' },
        { name: 'deletable_yn', field: 'deletable_yn', label: '', align: 'right', style: 'width: 10%' },
      ],
      rows: [],
      fieldTypeOptions: [
        { value: 'TEXT', label: 'TEXT' },
        // { value: 'number', label: 'NUMBER' },
        { value: 'FILE', label: 'FILE' },
      ],
      requiredOptions: [
        { value: 'Y', label: 'Y' },
        { value: 'N', label: 'N' },
      ],
      confirmGoBack: false,
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
    this.seq = this.$route.query.seq
    // 채용 조회
    this.selectRecruit()
    // 채용 입력항목 조회
    this.selectRecruitFieldList()
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // 기본정보 조회
    async selectRecruit() {
      const param = {
        uid: this.getUid,
        seq: this.seq,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruit', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // this.seq = result.data.seq
        this.start_time = result.data.start_time
        this.end_time = result.data.end_time
        this.title = result.data.title
        this.contents = result.data.contents
        this.title_ko = result.data.title_ko
        this.contents_ko = result.data.contents_ko
        this.project_seq = result.data.project_seq
        this.main_image = result.data.main_image
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 입력항목 리스트 조회
    async selectRecruitFieldList() {
      const param = {
        uid: this.getUid,
        seqRecruit: this.seq,
      }
      const result = await this.$axios.get('/api/recruit/selectRecruitFieldList', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        this.rows = result.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 입력항목 추가
    addFieldRow() {
      const fieldRow = {
        seq: this.rows.length + 1000, // 어차피 seq는 insert 시점에 정해짐.
        name: 'Field Name',
        name_ko: '항목명',
        type: 'TEXT',
        required: 'Y',
        score: 1,
        deletable_yn: 'Y',
      }
      this.rows.push(fieldRow)
    },
    // 입력항목 삭제
    deleteFieldRow(val) {
      // console.log(val)
      _.remove(this.rows, { seq: val })
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
      if (!this.$refs.title.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_recruit_title'))
        result = false
      }
      if (!this.$refs.title_ko.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_recruit_title_ko'))
        result = false
      }
      if (!this.contents) {
        this.$noti(this.$q, this.$t('validation_failed_recruit_contents'))
        result = false
      }
      if (!this.contents_ko) {
        this.$noti(this.$q, this.$t('validation_failed_recruit_contents_ko'))
        result = false
      }
      if (this.$refs.contents.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_recruit_contents_length'))
        result = false
      }
      if (this.$refs.contents_ko.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_recruit_contents_ko_length'))
        result = false
      }
      if (!this.$refs.start_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_recruit_start_time'))
        result = false
      }
      if (!this.$refs.end_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_recruit_end_time'))
        result = false
      }
      // check field name and name_ko in rows
      for (let i = 0; i < this.rows.length; i++) {
        const fieldObj = this.rows[i]
        if (!fieldObj.name) {
          this.$noti(this.$q, this.$t('validation_failed_recruit_field_name'))
          result = false
          break
        }
        if (!fieldObj.name_ko) {
          this.$noti(this.$q, this.$t('validation_failed_recruit_field_name_ko'))
          result = false
          break
        }
      }
      return result
    },
    // 채용 수정
    modifyRecruit() {
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

      // 채용 수정 처리
      const param = {
        uid: this.getUid,
        seq: this.seq,
        title: this.title,
        title_ko: this.title_ko,
        contents: this.contents,
        contents_ko: this.contents_ko,
        start_time: this.start_time,
        end_time: this.end_time,
        project_seq: !this.project_seq ? null : this.project_seq,
        main_image: !this.main_image ? null : this.main_image,
        recruitFieldList: this.rows,
      }
      this.$axios.post('/api/recruit/updateRecruit', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_success'))

            // 2. 페이지 이동 - 채용 관리 화면
            // this.$router.push('/recruit/myRecruitList')
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
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
      // this.$router.push('/recruit/myRecruitList')
    }
  }
})
</script>

<style scoped>
</style>
