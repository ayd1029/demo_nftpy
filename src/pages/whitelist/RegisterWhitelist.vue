<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_whitelist_register') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_whitelist_register_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- title -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist_title') }} (English)<span class="text-red"> *</span></span>
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
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist_title') }} (Korean)<span class="text-red"> *</span></span>
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
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist_main_image') }}</span>
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
        <span class="text-weight-bold text-subtitle1">※ {{ $t('whitelist_preview_main_image') }}</span>
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
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist_contents') }} (English)<span class="text-red"> *</span></span>
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
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist_contents') }} (Korean)<span class="text-red"> *</span></span>
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
    <div class="row justify-center q-pb-md">
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

    <!-- select_type -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('select_type') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('select_type_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="select_type" val="RANDOM" @update:model-value="onChangeSelectType" tabindex="8" />
            </q-item-section>
            <q-item-section>
              <q-item-label>1. {{ $t('select_type_random') }}</q-item-label>
              <q-item-label caption>{{ $t('select_type_random_hint') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="select_type" val="LINEUP" @update:model-value="onChangeSelectType" tabindex="9" />
            </q-item-section>
            <q-item-section>
              <q-item-label>2. {{ $t('select_type_lineup') }}</q-item-label>
              <q-item-label caption>{{ $t('select_type_lineup_hint') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="select_type" val="SCORE" @update:model-value="onChangeSelectType" tabindex="10" />
            </q-item-section>
            <q-item-section>
              <q-item-label>3. {{ $t('select_type_score') }}</q-item-label>
              <q-item-label caption>{{ $t('select_type_score_hint') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- same_score_type -->
    <div v-if="select_type === 'SCORE'" class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('same_score_type') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('same_score_type_hint') }}</span>
      </div>
    </div>
    <div v-if="select_type === 'SCORE'" class="row justify-center">
      <div class="col-12">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="same_score_type" val="RANDOM" tabindex="11" />
            </q-item-section>
            <q-item-section>
              <q-item-label>1. {{ $t('select_type_random') }}</q-item-label>
              <q-item-label caption>{{ $t('select_type_random_hint') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="same_score_type" val="LINEUP" tabindex="12" />
            </q-item-section>
            <q-item-section>
              <q-item-label>2. {{ $t('select_type_lineup') }}</q-item-label>
              <q-item-label caption>{{ $t('select_type_lineup_hint') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- input field list -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('input_field') }}</span>
        &nbsp;&nbsp;
        <q-btn class="btn" color="secondary" text-color="black" size="md" style="width: 60px;" @click="addFieldRow" tabindex="13">
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
            <q-td v-if="select_type === 'SCORE'" key="score" :props="props">
              {{ props.row.score }}
              <q-popup-edit v-model="props.row.score" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined clearable />
              </q-popup-edit>
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

    <!-- action list -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('action_field') }}</span>
        &nbsp;&nbsp;
        <q-btn class="btn" color="secondary" text-color="black" size="md" style="width: 60px;" @click="addActionRow" tabindex="15">
          <b>{{ $t('add') }}</b>
        </q-btn>
      </div>
    </div>
    <div class="q-pt-sm q-pb-md">
      <!-- <q-separator style="height: 2px;" /> -->
      <q-table
        :rows="actionRows"
        :columns="actionColumns"
        row-key="seq"
        flat
        bordered
        :rows-per-page-options="[0]"
        hide-pagination
        tabindex="16"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props" class="text-left">
              {{ props.row.name }}
              <q-popup-edit v-model="props.row.name" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined clearable />
              </q-popup-edit>
            </q-td>
            <q-td key="name_ko" :props="props" class="text-left">
              {{ props.row.name_ko }}
              <q-popup-edit v-model="props.row.name_ko" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined clearable />
              </q-popup-edit>
            </q-td>
            <q-td key="type" :props="props">
              <q-select
                v-model="props.row.type"
                :options="actionTypeOptions"
                dense
                outlined
                emit-value
              />
            </q-td>
            <q-td key="url" :props="props" class="text-left">
              {{ props.row.url }}
              <q-popup-edit v-model="props.row.url" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined clearable />
              </q-popup-edit>
            </q-td>
            <q-td v-if="select_type === 'SCORE'" key="score" :props="props">
              {{ props.row.score }}
              <q-popup-edit v-model="props.row.score" buttons v-slot="scope">
                <q-input v-model="scope.value" dense autofocus outlined clearable />
              </q-popup-edit>
            </q-td>
            <q-td key="deletable_yn" :props="props">
              <q-btn
                icon="close"
                size="sm"
                flat
                round
                dense
                @click="deleteActionRow(props.row.seq)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <!-- 유의 사항 -->
      <div class="q-pt-md">
        <div v-if="locale === 'ko-KR'" class="row justify-center">
          <!-- KR -->
          <div class="col-12" style="word-break: break-word;">
            <!-- 유의 사항 -->
            <div class="row text-bold q-pt-sm">
              유의 사항
            </div>
            <div class="row q-pl-xs q-pt-sm">
              · 트위터 팔로우 URL
            </div>
            <div class="row q-pl-xs q-pt-xs">
              e.g. https://twitter.com/intent/follow?screen_name={관리자 트위터 사용자명} (@는 제외)
            </div>
            <div class="row q-pl-xs q-pt-sm">
              · 트위터 리트윗 및 좋아요 URL (트윗 링크 복사하기)
            </div>
            <div class="row q-pl-xs q-pt-xs">
              e.g. https://twitter.com/klaystar_offici/status/1499784273716387842
            </div>
            <div class="row q-pl-xs q-pt-sm text-red">
              · 등록 후 [미리보기] 화면에서 꼭 확인해주세요.
            </div>
          </div>
        </div>
        <div v-else class="row justify-center">
          <!-- EN -->
          <div class="col-12" style="word-break: break-word;">
            <!-- 유의 사항 -->
            <div class="row text-bold q-pt-sm">
              Notes
            </div>
            <div class="row q-pl-xs q-pt-sm">
              · Twitter Follow URL
            </div>
            <div class="row q-pl-xs q-pt-xs">
              e.g. https://twitter.com/intent/follow?screen_name={Admin Twitter Username} (Not include @)
            </div>
            <div class="row q-pl-xs q-pt-sm">
              · Twitter Retweet and Like URL (Share - Copy link to Tweet)
            </div>
            <div class="row q-pl-xs q-pt-xs">
              e.g. https://twitter.com/klaystar_offici/status/1499784273716387842
            </div>
            <div class="row q-pl-xs q-pt-sm text-red">
              · Please check on the [Preview] page after registering.
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- max_select -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('max_select') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('max_select_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="max_select" ref="max_select" type="number"
          :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 1000000000000)]" clearable standout tabindex="17" />
      </div>
    </div>

    <!-- token_contract_address -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('token_contract_address') }}</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('token_contract_address_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="token_contract_address" ref="token_contract_address" clearable standout tabindex="18" />
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
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="registerWhitelist" tabindex="20">
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
  name: 'RegisterWhitelist',
  data () {
    return {
      start_time: '',
      end_time: '',
      title: '',
      title_ko: '',
      contents: '',
      contents_ko: '',
      select_type: 'RANDOM',
      same_score_type: 'RANDOM',
      max_select: '0',
      token_contract_address: '',
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
      rows: [
        {
          seq: 1,
          name: 'Wallet Address',
          name_ko: '지갑 주소',
          type: 'TEXT',
          required: 'Y',
          score: 1,
          deletable_yn: 'N',
        },
        {
          seq: 2,
          name: 'Twitter Username',
          name_ko: '트위터 사용자명',
          type: 'TEXT',
          required: 'N',
          score: 1,
          deletable_yn: 'Y',
        },
        {
          seq: 3,
          name: 'Discord Username',
          name_ko: '디스코드 사용자명',
          type: 'TEXT',
          required: 'N',
          score: 1,
          deletable_yn: 'Y',
        },
        {
          seq: 4,
          name: 'Telegram Username',
          name_ko: '텔레그램 사용자명',
          type: 'TEXT',
          required: 'N',
          score: 1,
          deletable_yn: 'Y',
        },
        {
          seq: 5,
          name: 'Telegram Nickname',
          name_ko: '텔레그램 닉네임',
          type: 'TEXT',
          required: 'N',
          score: 1,
          deletable_yn: 'Y',
        },
      ],
      fieldTypeOptions: [
        { value: 'TEXT', label: 'TEXT' },
        // { value: 'number', label: 'NUMBER' },
        { value: 'IMAGE', label: 'IMAGE' },
      ],
      requiredOptions: [
        { value: 'Y', label: 'Y' },
        { value: 'N', label: 'N' },
      ],
      actionColumns: [
        { name: 'name', field: 'name', label: this.$t('action_name'), align: 'left', required: true, style: 'width: 20%' },
        { name: 'name_ko', field: 'name_ko', label: this.$t('action_name_ko'), align: 'left', required: true, style: 'width: 20%' },
        { name: 'type', field: 'type', label: this.$t('action_type'), align: 'center', style: 'width: 20%' },
        { name: 'url', field: 'url', label: this.$t('action_url'), align: 'center', style: 'width: 30%' },
        // { name: 'score', field: 'score', label: this.$t('field_score'), align: 'center', style: 'width: 1%' },
        { name: 'deletable_yn', field: 'deletable_yn', label: '', align: 'right', style: 'width: 10%' },
      ],
      actionRows: [
        {
          seq: 1,
          name: 'Follow on Twitter',
          name_ko: '트위터 팔로우',
          type: 'follow',
          url: 'https://twitter.com/intent/follow?screen_name=klaystar_offici',
          score: 1,
        },
        {
          seq: 2,
          name: 'Retweet on Twitter',
          name_ko: '트위터 리트윗',
          type: 'retweet',
          url: 'https://twitter.com/klaystar_offici/status/1499784273716387842',
          score: 1,
        },
        {
          seq: 3,
          name: 'Like on Twitter',
          name_ko: '트위터 좋아요',
          type: 'like',
          url: 'https://twitter.com/klaystar_offici/status/1499784273716387842',
          score: 1,
        },
      ],
      actionTypeOptions: [
        { value: 'visit', label: 'visit' },
        { value: 'follow', label: '[Twitter] follow' },
        { value: 'retweet', label: '[Twitter] retweet' },
        { value: 'like', label: '[Twitter] like' },
        { value: 'join', label: 'join' },
        { value: 'subscribe', label: 'subscribe' },
        { value: 'participate', label: 'participate' },
        { value: 'share', label: 'share' },
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
  created: function () {},
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    onChangeSelectType() {
      if (this.select_type === 'SCORE') {
        const col_score = {
          name: 'score',
          field: 'score',
          label: this.$t('field_score'),
          align: 'center',
          style: 'width: 1%'
        }

        // 1. 입력 항목에 점수 컬럼 추가
        const fieldLastCol = this.columns[this.columns.length - 1]
        this.columns[this.columns.length - 1] = col_score
        this.columns.push(fieldLastCol)
        
        // 2. 액션 항목에 점수 컬럼 추가
        const actionLastCol = this.actionColumns[this.actionColumns.length - 1]
        this.actionColumns[this.actionColumns.length - 1] = col_score
        this.actionColumns.push(actionLastCol)
        
      } else {
        _.remove(this.columns, { name: 'score' })
        _.remove(this.actionColumns, { name: 'score' })
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
    // 액션 추가
    addActionRow() {
      const actionRow = {
        seq: this.actionRows.length + 1000, // 어차피 seq는 insert 시점에 정해짐.
        name: 'Action Name',
        name_ko: '액션명',
        type: 'visit',
        url: 'https://',
        score: 1,
      }
      this.actionRows.push(actionRow)
    },
    // 액션 삭제
    deleteActionRow(val) {
      // console.log(val)
      _.remove(this.actionRows, { seq: val })
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
        this.$noti(this.$q, this.$t('validation_failed_whitelist_title'))
        result = false
      }
      if (!this.$refs.title_ko.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_whitelist_title_ko'))
        result = false
      }
      if (!this.contents) {
        this.$noti(this.$q, this.$t('validation_failed_whitelist_contents'))
        result = false
      }
      if (!this.contents_ko) {
        this.$noti(this.$q, this.$t('validation_failed_whitelist_contents_ko'))
        result = false
      }
      if (this.$refs.contents.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_whitelist_contents_length'))
        result = false
      }
      if (this.$refs.contents_ko.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_whitelist_contents_ko_length'))
        result = false
      }
      if (!this.$refs.start_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_whitelist_start_time'))
        result = false
      }
      if (!this.$refs.end_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_whitelist_end_time'))
        result = false
      }
      if (!this.$refs.max_select.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_whitelist_max_select'))
        result = false
      }
      // check field name and name_ko in rows
      for (let i = 0; i < this.rows.length; i++) {
        const fieldObj = this.rows[i]
        if (!fieldObj.name) {
          this.$noti(this.$q, this.$t('validation_failed_whitelist_field_name'))
          result = false
          break
        }
        if (!fieldObj.name_ko) {
          this.$noti(this.$q, this.$t('validation_failed_whitelist_field_name_ko'))
          result = false
          break
        }
      }

      // check action name and name_ko in actionRows
      for (let i = 0; i < this.actionRows.length; i++) {
        const actionObj = this.actionRows[i]
        if (!actionObj.name) {
          this.$noti(this.$q, this.$t('validation_failed_whitelist_action_name'))
          result = false
          break
        }
        if (!actionObj.name_ko) {
          this.$noti(this.$q, this.$t('validation_failed_whitelist_action_name_ko'))
          result = false
          break
        }
      }

      return result
    },
    // 화이트리스트 등록
    registerWhitelist() {
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

      // 화이트리스트 등록 처리
      const param = {
        uid: this.getUid,
        title: this.title,
        title_ko: this.title_ko,
        contents: this.contents,
        contents_ko: this.contents_ko,
        start_time: this.start_time,
        end_time: this.end_time,
        select_type: this.select_type,
        same_score_type: this.same_score_type,
        max_select: this.max_select,
        token_contract_address: !this.token_contract_address ? null : this.token_contract_address,
        main_image: !this.main_image ? null : this.main_image,
        whitelistFieldList: this.rows,
        whitelistActionList: this.actionRows,
      }
      this.$axios.post('/api/whitelist/insertWhitelist', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // 2. 페이지 이동 - 화이트리스트 관리 화면
            this.$router.push('/whitelist/myWhitelistList')
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
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
      // this.$router.push('/whitelist/myWhitelistList')
    }
  }
})
</script>

<style scoped>
</style>
