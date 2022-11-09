<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_minting_prepare_json_create') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_minting_prepare_json_create_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- KR -->
    <div v-if="locale === 'ko-KR'" class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <div class="row text-bold q-pt-xs">
          ㅁ 이미지 기본 URL
        </div>
        <div class="row q-pt-xs q-pl-xs">
          NFT 이미지가 존재하는 URL Path를 입력합니다.
        </div>
        <div class="row text-bold q-pt-xs">
          ㅁ 항목
        </div>
        <div class="row q-pt-xs q-pl-xs">
          기본 항목은 name, description, image 등이 있습니다.
        </div>
        <div class="row text-bold q-pt-xs">
          ㅁ 속성 항목
        </div>
        <div class="row q-pt-xs q-pl-xs">
          속성 항목은 NFT의 trait_type 과 값을 설정합니다.
        </div>
        <div class="row text-bold q-pt-xs">
          ㅁ 추가 항목
        </div>
        <div class="row q-pt-xs q-pl-xs">
          추가 항목은 한 항목에 여러가지 항목 및 값을 설정할 경우 사용합니다.
        </div>
        <div class="row text-bold q-pt-xs">
          ㅁ 자동증가 항목
        </div>
        <div class="row q-pt-xs q-pl-xs">
          자동증가 항목이 'Y'인 경우 - value + 1, value + 2 와 같은 방식으로 값이 설정됩니다.
        </div>
      </div>
    </div>

    <!-- EN -->
    <div v-else class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <div class="row text-bold q-pt-xs">
          ㅁ Image Base URL
        </div>
        <div class="row q-pt-xs q-pl-xs">
          Enter the URL Path where the NFT image resides.
        </div>
        <div class="row text-bold q-pt-xs">
          ㅁ Field
        </div>
        <div class="row q-pt-xs q-pl-xs">
          The fields are name, description, image, and so on.
        </div>
        <div class="row text-bold q-pt-xs">
          ㅁ Attributes
        </div>
        <div class="row q-pt-xs q-pl-xs">
          Sets the trite_type and value of the NFT.
        </div>
        <div class="row text-bold q-pt-xs">
          ㅁ Additional Node
        </div>
        <div class="row q-pt-xs q-pl-xs">
          Use additional nodes to set different fields and values for one node.
        </div>
        <div class="row text-bold q-pt-xs">
          ㅁ auto-increment
        </div>
        <div class="row q-pt-xs q-pl-xs">
          If the auto-increment entry is 'Y', the value is set in the same way as - value + 1, value + 2.
        </div>
      </div>
    </div>

    <q-separator spaced />

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
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="json_type" val="REVEALED" tabindex="2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('minting_create_json_json_type_revealed') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- Image Base URI -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_base_uri_image') }}</span>
        &nbsp;&nbsp;
        <span v-if="json_type === 'UNREVEALED'" class="text-grey">{{ $t('minting_create_json_base_uri_image_unrevealed_hint') }}</span>
        <span v-else class="text-grey">{{ $t('minting_create_json_base_uri_image_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="base_uri_image" ref="base_uri_image" :rules="[val => minLength(val, 1), val => maxLength(val, 200)]" standout tabindex="3" />
      </div>
    </div>

    <!-- File Extension -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_file_extension') }}</span>
        <span v-if="json_type === 'REVEALED'" class="text-grey">&nbsp;&nbsp;{{ $t('minting_create_json_file_extension_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="file_extension" ref="file_extension" :rules="[val => minLength(val, 1), val => maxLength(val, 10)]" standout :disable="json_type === 'UNREVEALED'" tabindex="4" />
      </div>
    </div>

    <!-- reveal 미사용일 경우 입력창 공간 동일하게 확보하기 위한 div -->
    <div v-if="json_type === 'UNREVEALED'" class="q-pt-md">
      <div class="q-pt-xs"></div>
    </div>

    <!-- field -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_field') }}</span>
        &nbsp;&nbsp;
        <q-btn class="btn" color="secondary" text-color="black" size="md" style="width: 60px;" @click="addRowField" tabindex="5">
          <b>{{ $t('add') }}</b>
        </q-btn>
      </div>
    </div>
    <div class="q-pt-sm">
      <q-table
        :rows="rows_field"
        :columns="columns_field"
        row-key="seq"
        flat
        bordered
        :rows-per-page-options="[0]"
        hide-pagination
        tabindex="6"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="field_key" :props="props">
              <span class="text-blue">{{ props.row.field_key }}</span>
              <q-popup-edit v-if="props.row.deletable_yn === 'Y'" v-model="props.row.field_key" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined />
              </q-popup-edit>
            </q-td>
            <q-td key="field_value" :props="props">
              <span class="text-blue">{{ props.row.field_value }}</span>
              <q-popup-edit v-if="props.row.deletable_yn === 'Y'" v-model="props.row.field_value" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined />
              </q-popup-edit>
            </q-td>
            <q-td key="field_increase" :props="props">
              <q-select
                v-model="props.row.field_increase"
                :options="increaseOptions"
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
                @click="deleteRowField(props.row.seq)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <!-- attributes -->
    <div class="row justify-center q-pt-xl">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_attributes') }}</span>
        &nbsp;&nbsp;
        <q-btn class="btn" color="secondary" text-color="black" size="md" style="width: 60px;" @click="addRowAttributes" tabindex="7">
          <b>{{ $t('add') }}</b>
        </q-btn>
      </div>
    </div>
    <div class="q-pt-sm">
      <q-table
        :rows="rows_attributes"
        :columns="columns_attributes"
        row-key="seq"
        flat
        bordered
        :rows-per-page-options="[0]"
        hide-pagination
        tabindex="8"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="trait_type" :props="props">
              <span class="text-red">{{ props.row.trait_type }}</span>
              <q-popup-edit v-model="props.row.trait_type" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined />
              </q-popup-edit>
            </q-td>
            <q-td key="trait_value" :props="props">
              <span class="text-red">{{ props.row.trait_value }}</span>
              <q-popup-edit v-model="props.row.trait_value" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined />
              </q-popup-edit>
            </q-td>
            <q-td key="trait_increase" :props="props">
              <q-select
                v-model="props.row.trait_increase"
                :options="increaseOptions"
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
                @click="deleteRowAttributes(props.row.seq)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <!-- node -->
    <div class="q-pt-xl">
      <q-separator color="primary" style="height: 3px;" spaced />
    </div>
    <div v-for="(item, index) in objectNodeList" :key="item.seq">
      <div class="q-pt-md">
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_node_name') }} {{ index + 1 }}</span>
          </div>
        </div>
        <div class="row justify-left">
          <div class="col-3">
            <q-input v-model="objectNodeList[index].node_name" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" standout dense />
          </div>
          <div>
            &nbsp;&nbsp;
            <!-- <q-icon name="close" size="sm" @click="deleteNode" /> -->
            <q-btn class="btn" color="orange" text-color="black" size="md" style="width: 110px;" @click="deleteObjectRowNode(objectNodeList[index].seq)">
              <b>{{ $t('delete') }}</b>
            </q-btn>
          </div>
        </div>
        <div class="row justify-left q-pt-sm q-pb-sm">
          <div>
            &nbsp;&nbsp;
            <q-btn class="btn" color="secondary" text-color="black" size="md" style="width: 60px;" @click="addRowNode(objectNodeList[index])">
              <b>{{ $t('add') }}</b>
            </q-btn>
          </div>
        </div>

        <q-table
          :rows="objectNodeList[index].rows_node"
          :columns="objectNodeList[index].columns_node"
          row-key="seq"
          flat
          bordered
          :rows-per-page-options="[0]"
          hide-pagination
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="node_key" :props="props">
                <span class="text-red">{{ props.row.node_key }}</span>
                <q-popup-edit v-if="props.row.deletable_yn === 'Y'" v-model="props.row.node_key" buttons v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus outlined />
                </q-popup-edit>
              </q-td>
              <q-td key="node_value" :props="props">
                <span class="text-red">{{ props.row.node_value }}</span>
                <q-popup-edit v-if="props.row.deletable_yn === 'Y'" v-model="props.row.node_value" buttons v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus outlined />
                </q-popup-edit>
              </q-td>
              <q-td key="node_increase" :props="props">
                <q-select
                  v-model="props.row.node_increase"
                  :options="increaseOptions"
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
                  @click="deleteRowNode(props.row.seq, objectNodeList[index])"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <div class="q-pt-md">
          <q-separator color="primary" style="height: 3px;" spaced />
        </div>

      </div>

    </div>
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_additional_node') }}</span>
        &nbsp;&nbsp;
        <q-btn class="btn" color="primary" text-color="black" size="md" style="width: 110px;" @click="addObjectNode" tabindex="21">
          <b>{{ $t('add') }}</b>
        </q-btn>
      </div>
    </div>
    <div class="q-pt-md">
      <q-separator color="primary" style="height: 3px;" spaced />
    </div>


    <!-- preview sample files -->
    <div class="row justify-center q-pt-xl">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_preview_sample_files') }}</span>
      </div>
    </div>
    <q-card class="q-mt-md q-mb-md shadow-1" v-for="item in sampleJsonList" :key="item.seq">
      <q-item class="q-pt-md q-pb-md">
        <q-item-section>
          <div class="row q-pb-sm">
            <q-item-label class="col-12 text-bold">{{ item.filename }}</q-item-label>
          </div>
          <q-separator />
          <div class="row q-pt-md">
            <q-item-label class="col-12">{{ item.json }}</q-item-label>
          </div>
        </q-item-section>
      </q-item>
    </q-card>

    <!-- 파일 생성 타입 -->
    <div class="row justify-center q-pt-xl">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_download_file_type') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_create_json_download_file_type_hint') }}</span>
      </div>
    </div>
    <div class="row justify-left">
      <div class="col-3">
        <q-select
          v-model="download_file_type"
          :options="fileTypeOptions"
          outlined
          emit-value
          tabindex="22"
        />
      </div>
    </div>

    <!-- JSON 파일 생성 개수 -->
    <div class="row justify-center q-pt-xl">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_number_of_json') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('minting_create_json_number_of_json_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="number_of_json" ref="number_of_json" type="number" :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 50000)]" standout tabindex="23" />
      </div>
    </div>

    <!-- 파일 URL - zip -->
    <div v-if="uploaded_file_url_zip" class="row justify-center q-pt-xl">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_uploaded_file_url_zip') }}</span>
        &nbsp;&nbsp;
        <q-btn class="btn" color="secondary" text-color="black" size="md" style="width: 110px;" @click="openUrl(uploaded_file_url_zip)" tabindex="24">
          <b>{{ $t('download') }}</b>
        </q-btn>
      </div>
    </div>
    <div v-if="uploaded_file_url_zip" class="row justify-center q-pt-xs">
      <div class="col-12">
        <q-input v-model="uploaded_file_url_zip" standout readonly />
      </div>
    </div>

    <!-- 파일 URL - tar -->
    <div v-if="uploaded_file_url_tar" class="row justify-center q-pt-xl">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('minting_create_json_uploaded_file_url_tar') }}</span>
        &nbsp;&nbsp;
        <q-btn class="btn" color="secondary" text-color="black" size="md" style="width: 110px;" @click="openUrl(uploaded_file_url_tar)" tabindex="25">
          <b>{{ $t('download') }}</b>
        </q-btn>
      </div>
    </div>
    <div v-if="uploaded_file_url_tar" class="row justify-center q-pt-xs">
      <div class="col-12">
        <q-input v-model="uploaded_file_url_tar" standout readonly />
      </div>
    </div>


    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-lg">
    </div>


    <!-- buttons -->
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="31">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="createJson" tabindex="30">
          <b>{{ $t('create') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
  <WalletModal ref="refWalletModal" @callback-wallet="callbackWallet" />

  <!-- 생성 확인 모달 -->
  <q-dialog v-model="confirmCreate">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_create') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('create')" color="black" v-close-popup @click="doCreate" />
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
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
// import { ref } from 'vue'
import _ from 'lodash'

export default defineComponent({
  name: 'PrepareJsonCreate',
  data () {
    return {
      jsonSeq: '', // json seq
      mintingSeq: '', // minting seq
      json_type: 'REVEALED',
      base_uri_image: 'https://nftpy.io/nft/',
      db_base_uri_image: '',
      file_extension: '.png',
      db_file_extension: '',
      download_file_type: 'zip',
      file_url_zip: '',
      file_url_tar: '',
      number_of_json: 10,
      columns_field: [
        { name: 'field_key', field: 'field_key', label: 'key', align: 'left', required: true, style: 'width: 37%' },
        { name: 'field_value', field: 'field_value', label: 'value', align: 'left', required: true, style: 'width: 61%' },
        { name: 'field_increase', field: 'field_increase', label: this.$t('minting_create_json_increase'), align: 'center', style: 'width: 1%' },
        { name: 'deletable_yn', field: 'deletable_yn', label: '', align: 'right', style: 'width: 1%' },
      ],
      rows_field: [
        {
          seq: 1,
          field_key: 'name',
          field_value: 'SAMPLE NFT #',
          field_increase: 'Y',
          deletable_yn: 'Y',
        },
        {
          seq: 2,
          field_key: 'description',
          field_value: 'This is a sample.',
          field_increase: 'N',
          deletable_yn: 'Y',
        },
        {
          seq: 3,
          field_key: 'image',
          field_value: 'https://nftpy.io/nft/',
          field_increase: 'Y',
          deletable_yn: 'Y',
        },
        // {
        //   seq: 2,
        //   field_key: 'attributes',
        //   field_value: '{attributes of bottom}',
        //   deletable_yn: 'N',
        // },
      ],
      columns_attributes: [
        { name: 'trait_type', field: 'trait_type', label: 'trait_type', align: 'left', required: true, style: 'width: 37%' },
        { name: 'trait_value', field: 'trait_value', label: 'value', align: 'left', required: true, style: 'width: 61%' },
        { name: 'trait_increase', field: 'trait_increase', label: this.$t('minting_create_json_increase'), align: 'center', style: 'width: 1%' },
        { name: 'deletable_yn', field: 'deletable_yn', label: '', align: 'right', style: 'width: 1%' },
      ],
      rows_attributes: [
        {
          seq: 1,
          trait_type: 'color',
          trait_value: 'red',
          trait_increase: 'N',
          deletable_yn: 'Y',
        },
        {
          seq: 2,
          trait_type: 'Level',
          trait_value: '1',
          trait_increase: 'N',
          deletable_yn: 'Y',
        },
        {
          seq: 3,
          trait_type: 'AGE',
          trait_value: '',
          trait_increase: 'Y',
          deletable_yn: 'Y',
        },
      ],

      objectNodeList: [], // additional node list
      columns_node: [
        { name: 'node_key', field: 'node_key', label: 'key', align: 'left', required: true, style: 'width: 37%' },
        { name: 'node_value', field: 'node_value', label: 'value', align: 'left', required: true, style: 'width: 61%' },
        { name: 'node_increase', field: 'node_increase', label: this.$t('minting_create_json_increase'), align: 'center', style: 'width: 1%' },
        { name: 'deletable_yn', field: 'deletable_yn', label: '', align: 'right', style: 'width: 1%' },
      ],
      rows_node: [
        {
          seq: 1,
          node_key: 'key',
          node_value: 'value',
          node_increase: 'N',
          deletable_yn: 'Y',
        },
      ],
      increaseOptions: [
        { value: 'Y', label: 'Y' },
        { value: 'N', label: 'N' },
      ],
      sampleJsonList: [], // 예시 JSON
      fileTypeOptions: [
        { value: 'zip', label: 'zip' },
        { value: 'tar', label: 'tar' },
      ],
      numOfSampleJson: 3, // 표시할 샘플 JSON 수
      uploaded_file_url_zip: '',
      uploaded_file_url_tar: '',
      confirmCreate: false,
      confirmGoBack: false,
    }
  },
  components: {
  },
  watch: {
    json_type (newValue, oldValue) {
      if (newValue === 'UNREVEALED') {
        this.base_uri_image = this.db_unrevealed_image_uri
        this.file_extension = ''

        // image 항목 자동증가 N으로 설정
        for (let i = 0; i < this.rows_field.length; i++) {
          if (this.rows_field[i].field_key === 'image') {
            this.rows_field[i].field_increase = 'N'
            break
          }
        }
      } else {
        this.base_uri_image = this.db_base_uri_image
        this.file_extension = this.db_file_extension

        // image 항목 자동증가 Y으로 설정
        for (let i = 0; i < this.rows_field.length; i++) {
          if (this.rows_field[i].field_key === 'image') {
            this.rows_field[i].field_increase = 'Y'
            break
          }
        }
      }
    },
    base_uri_image (newValue, oldValue) {
      // console.log('oldValue: : ' + oldValue)
      // console.log('newValue: : ' + newValue)
      // field의 image 필드의 value를 base_uri_image로 설정
      if (newValue !== oldValue) {
        for (let i = 0; i < this.rows_field.length; i++) {
          if (this.rows_field[i].field_key === 'image') {
            this.rows_field[i].field_value = newValue
            break
          }
        }
      }
    },
    file_extension (newValue, oldValue) {
      // console.log('oldValue: : ' + oldValue)
      // console.log('newValue: : ' + newValue)
      // field의 image 필드의 value를 base_uri_image로 설정
      if (newValue !== oldValue) {
        this.updateSampleJson()
      }
    },
    columns_attributes: {
      deep: true,
      handler() {
        this.updateSampleJson()
      },
    },
    rows_field: {
      deep: true,
      handler() {
        this.updateSampleJson()
      },
    },
    columns_attributes: {
      deep: true,
      handler() {
        this.updateSampleJson()
      },
    },
    rows_attributes: {
      deep: true,
      handler() {
        this.updateSampleJson()
      },
    },
    objectNodeList: {
      deep: true,
      handler() {
        this.updateSampleJson()
      },
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
  },
  async created () {
    // 키 설정
    this.mintingSeq = this.$route.query.seq
    this.jsonSeq = this.$route.query.seq_json

    // minting 조회 - JSON 타입이 리빌 전(UNREVEALED)일 경우 unrevealed_image_uri를 설정하기 위함.
    await this.selectMinting()

    // json 조회
    if (this.jsonSeq && this.jsonSeq > 0) {
      this.selectJson()
    } else {
      // 최초 진입시 - 아직 JSON 생성 이력이 없는 경우
      this.base_uri_image += this.mintingSeq + '/'
      this.db_base_uri_image = this.base_uri_image
    }


  },
  mounted: function () {
    // 샘플 파일 미리보기 초기표시
    this.updateSampleJson()
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // add additional object node
    addObjectNode() {
      const objectNodeRow = {
        seq: this.objectNodeList.length + 1000,
        node_name: 'object_node',
        columns_node: _.cloneDeep(this.columns_node),
        rows_node: _.cloneDeep(this.rows_node),
      }
      this.objectNodeList.push(objectNodeRow)
    },
    deleteObjectRowNode(val) {
      _.remove(this.objectNodeList, { seq: val })
    },
    // add node's row
    addRowNode(node) {
      const nodeRow = {
        seq: node.rows_node.length + 1000, // 어차피 seq는 insert 시점에 정해짐.
        node_key: 'new_key',
        node_value: 'new_value',
        node_increase: 'N',
        deletable_yn: 'Y',
      }
      node.rows_node.push(nodeRow)
    },
    // delete node's row
    deleteRowNode(val, node) {
      // this.objectNodeList[index].this.rows_node
      _.remove(node.rows_node, { seq: val })
    },
    // jsonSeq > 0 이면 기존 데이터 조회
    async selectJson() {

      const param = {
        uid: this.getUid,
        seq: this.jsonSeq,
      }
      const result = await this.$axios.get('/api/json/selectJson', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // 항목 설정
        this.json_type = result.data.json_type
        this.base_uri_image = result.data.base_uri_image
        this.file_extension = result.data.file_extension
        this.db_file_extension = result.data.file_extension
        this.download_file_type = result.data.download_file_type
        this.number_of_json = result.data.number_of_json
        this.uploaded_file_url_zip = result.data.uploaded_file_url_zip
        this.uploaded_file_url_tar = result.data.uploaded_file_url_tar

        // field 조회
        this.selectJsonFieldList(this.jsonSeq)

        // attributes 조회
        this.selectJsonAttributesList(this.jsonSeq)

        // object 조회
        this.selectJsonObjectList(this.jsonSeq)
      }
      // else {
      //   this.$noti(this.$q, this.$t('request_data_failed'))
      // }
    },
    // field 조회
    selectJsonFieldList(jsonSeq) {
      const param = {
        uid: this.getUid,
        seq_json: jsonSeq,
      }
      this.$axios.get('/api/json/selectJsonFieldList', { params: { ...param }})
        .then((result) => {
          if (result.data) {
            this.rows_field = result.data
          } 
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // attributes 조회
    selectJsonAttributesList(jsonSeq) {
      const param = {
        uid: this.getUid,
        seq_json: jsonSeq,
      }
      this.$axios.get('/api/json/selectJsonAttributesList', { params: { ...param }})
        .then((result) => {
          if (result.data) {
            this.rows_attributes = result.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // object 조회
    selectJsonObjectList(jsonSeq) {
      const param = {
        uid: this.getUid,
        seq_json: jsonSeq,
      }
      this.$axios.get('/api/json/selectJsonObjectList', { params: { ...param }})
        .then((result) => {
          if (result.data) {
            this.objectNodeList = result.data
            for (let i = 0; i < this.objectNodeList.length; i++) {
              this.objectNodeList[i].columns_node = this.columns_node
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async selectMinting() {

      const param = {
        uid: this.getUid,
        seq: this.mintingSeq,
      }
      const result = await this.$axios.get('/api/minting/selectMinting', { params: { ...param } })
      if (result.data) {
        // console.log(result.data)
        // 항목 설정
        // this.base_uri_image = result.data.base_uri_image
        this.db_unrevealed_image_uri = result.data.unrevealed_image_uri
        this.db_base_uri_image = result.data.base_uri_image
      }
    },
    // sampleJson 업데이트 - 항목이 변경될 때 watch에서 호출
    updateSampleJson() {
      this.sampleJsonList = this.createJsonList(this.numOfSampleJson)
    },

    // createCount 만큼의 JSON 리스트를 반환
    createJsonList(createCount) {
      // console.log('updateSampleJson start')

      // [SAMPLE] 리스트 초기화
      let tempJsonList = []

      // SAMPLE JSON - {"image":"https://nftpy.io/nft/1/json/1.json","field2":"value2","attributes":[{"trait_type":"Clothes","value":"Guayabera"},{"trait_type":"trait_type2","value":"value2"}]}
      // {"name":"Klay Star #375","description":"From now, you will be...","image":"ipfs://QmauihZ5mDJ6s5XLX3exwmsWeck2Lu6LBbzQS8QQDH8NW1","attributes":[{"trait_type": "Background","value": "75"},{"trait_type": "Star","value": "50"},{"trait_type": "Items","value": "60"}]}
      /////////////////////////////////////////////////////////////////////////////
      for (let i = 0; i < createCount; i++) { // 표시할 샘플 JSON 수 만큼 반복
        // ■■■■■■■ 1. field 추가
        let sampleJson = '{' // JSON 시작점
        for (let j = 0; j < this.rows_field.length; j++) { // field 수 만큼 반복
          if (j !== 0) {
            sampleJson += ','
          }

          const fieldKey = this.rows_field[j].field_key
          const fieldValue = this.rows_field[j].field_value
          const fieldIncrease = this.rows_field[j].field_increase
          if (fieldIncrease === 'Y') {
            // 자동증가인 경우
            if (fieldKey === 'image') { // key 가 'image' 인 경우, 뒷부분에 파일명(n.json) 붙임
              sampleJson += '"' + fieldKey + '":"' + fieldValue + (i + 1) + this.file_extension + '"' // "image":"https://nftpy.io/nft/1/json/1.png"
            } else if (fieldKey === 'name') { // key 가 'name' 인 경우, 뒷부분에 NFT번호(#n) 붙임
              sampleJson += '"' + fieldKey + '":"' + fieldValue + (i + 1) + '"' // "name":"SAMPLE NFT #1"
            } else {
              sampleJson += '"' + fieldKey + '":"' + fieldValue + (i + 1) + '"' // "description":"This is a sample.1"
            }
          } else {
            // 자동증가가 아닌 경우
            if (fieldKey === 'image') { // key 가 'image' 인 경우, 그대로 표시
              sampleJson += '"' + fieldKey + '":"' + fieldValue + '"' // "image":"https://nftpy.io/nft/1/json/1.png"
            } else if (fieldKey === 'name') { // key 가 'name' 인 경우, 그대로 표시
              sampleJson += '"' + fieldKey + '":"' + fieldValue + '"' // "name":"SAMPLE NFT #"
            } else {
              sampleJson += '"' + fieldKey + '":"' + fieldValue + '"' // "description":"This is a sample."
            }
          }
        }

        // attributes 가 존재할 경우
        if (this.rows_attributes.length > 0) {
          // ■■■■■■■ 2. attributes 추가
          if (this.rows_field.length > 0) {
            sampleJson += ','
          }
          sampleJson += '"attributes":[' // "attributes":[
          for (let k = 0; k < this.rows_attributes.length; k++) { // attributes 수 만큼 반복
            if (k !== 0) {
              sampleJson += ','
            }

            const traitType = this.rows_attributes[k].trait_type
            const traitValue = this.rows_attributes[k].trait_value
            const traitIncrease = this.rows_attributes[k].trait_increase
            if (traitIncrease === 'Y') {
              // 자동증가인 경우
              sampleJson += '{"trait_type":"' + traitType + '","value":"' + traitValue + (i + 1) + '"}' // {"trait_type":"Clothes","value":"Guayabera"}
            } else {
              // 자동증가가 아닌 경우
              sampleJson += '{"trait_type":"' + traitType + '","value":"' + traitValue + '"}' // {"trait_type":"Clothes","value":"Guayabera"}
            }
          }
          // ■■■■■■■ 3. attributes 닫기
          sampleJson += ']'
        }

        // Object Node list 가 존재할 경우
        if (this.objectNodeList.length > 0) {
          // ■■■■■■■ 4. object node 추가
          if (this.rows_field.length > 0 || this.rows_attributes.length > 0) {
            sampleJson += ','
          }
          for (let l = 0; l < this.objectNodeList.length; l++) { // Object Node 수 만큼 반복
            const objectNode = this.objectNodeList[l] // 1개의 노드
            const objectNodeRows = objectNode.rows_node

            if (l !== 0) {
              sampleJson += ','
            }
            sampleJson += '"' + objectNode.node_name + '":[' // "node_name":[
            
            for (let m = 0; m < objectNodeRows.length; m++) { // object node's row 수 만큼 반복
              if (m !== 0) {
                sampleJson += ','
              }
              const nodeKey = objectNodeRows[m].node_key
              const nodeValue = objectNodeRows[m].node_value
              const nodeIncrease = objectNodeRows[m].node_increase
              if (nodeIncrease === 'Y') {
                // 자동증가인 경우
                sampleJson += '{"' + nodeKey + '":"' + nodeValue + (i + 1) + '"}' // {"node_key1":"node_value1","node_key2":"node_value2"}
              } else {
                // 자동증가가 아닌 경우
                sampleJson += '{"' + nodeKey + '":"' + nodeValue + '"}' // {"node_key1":"node_value1","node_key2":"node_value2"}
              }
            }
            // ■■■■■■■ 5. object node 닫기
            sampleJson += ']'
          }
        }

        // ■■■■■■■ 6. field 닫기
        sampleJson += '}'

        // console.log(sampleJson)

        // 5. 샘플 리스트에 추가
        const sampleJsonObj = {
          seq: i,
          filename: (i + 1) + '.json',
          json: sampleJson,
        }
        tempJsonList.push(sampleJsonObj)
      }
      /////////////////////////////////////////////////////////////////////////////
      // console.log(tempJsonList)
      return tempJsonList
    },
    // attributes 추가
    addRowField() {
      const fieldRow = {
        seq: this.rows_field.length + 1000, // 어차피 seq는 insert 시점에 정해짐.
        field_key: 'new_key',
        field_value: 'new_value',
        field_increase: 'N',
        deletable_yn: 'Y',
      }
      this.rows_field.push(fieldRow)
    },
    // attributes 삭제
    deleteRowField(val) {
      _.remove(this.rows_field, { seq: val })
    },
    // attributes 추가
    addRowAttributes() {
      const attributesRow = {
        seq: this.rows_attributes.length + 1000, // 어차피 seq는 insert 시점에 정해짐.
        trait_type: 'new_trait_type',
        trait_value: '0',
        trait_increase: 'N',
        deletable_yn: 'Y',
      }
      this.rows_attributes.push(attributesRow)
    },
    // attributes 삭제
    deleteRowAttributes(val) {
      _.remove(this.rows_attributes, { seq: val })
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
      if (!this.$refs.base_uri_image.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_create_json_base_uri_image'))
        result = false
      }
      if (!this.$refs.number_of_json.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_minting_create_json_number_of_json'))
        result = false
      }
      return result
    },
    createJson() {
      // goBack 확인창 표시
      this.confirmCreate = true
    },
    // JSON 파일 생성
    doCreate() {
      // Field validation check
      if(!this.validate()) {
        return
      }

      // 1. 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid || !this.getWalletType || !this.getWalletAddress) {
        // console.log('this.getWalletType: ' + this.getWalletType)
        // console.log('this.getWalletAddress: ' + this.getWalletAddress)
        this.$refs.refWalletModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // NFT 민팅 JSON 생성 내역 저장
      const param = {
        uid: this.getUid,
        seq: this.jsonSeq,
        seq_minting: this.mintingSeq,
        json_type: this.json_type,
        base_uri_image: this.base_uri_image,
        file_extension: this.file_extension,
        download_file_type: this.download_file_type,
        number_of_json: this.number_of_json,
        jsonFieldList: this.rows_field,
        jsonAttributesList: this.rows_attributes,
        jsonObjectList: this.objectNodeList,
      }
      this.$axios.post('/api/json/createJson', param) // seq_minting > 0 이면 minting.json_seq 항목도 동시에 수정 됨.
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.uploaded_file_url_zip = result.data.uploaded_file_url_zip
            this.uploaded_file_url_tar = result.data.uploaded_file_url_tar
            this.$noti(this.$q, this.$t('create_success'))

          } else {
            this.$noti(this.$q, this.$t('create_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    openUrl(url) {
      window.open(url)
    },
    callbackWallet(walletVo) {

    },
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
      // this.$router.push('/minting/myWhitelistList')
    }
  }
})
</script>

<style scoped>
</style>
