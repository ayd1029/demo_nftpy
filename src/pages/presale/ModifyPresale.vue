<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_presale_modify') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_presale_modify_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- KR -->
    <div v-if="locale === 'ko-KR'" class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- 필수 사항 -->
        <div class="row text-bold">
          필수 사항
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-sm text-red">
          · 사전판매 대상 토큰을 판매 갯수만큼 클레이스타 지갑으로 전송해주세요.
        </div>
        <q-separator />
        <div class="row q-pt-sm q-pl-xs">
          클레이스타 지갑 주소
          &nbsp;&nbsp;<q-btn icon="content_copy" color="primary" size="sm" flat @click="copyValue(systemWalletAddress)" dense>&nbsp;{{ $t('copy') }}</q-btn>
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-sm">
          {{ systemWalletAddress }}
        </div>
        <q-separator />
        <!-- 화이트리스트 -->
        <div class="row text-bold q-pt-md">
          화이트리스트
        </div>
        <div class="row q-pt-sm q-pl-xs">
          · 화이트리스트가 없는 경우 공란으로 설정해주세요.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · 화이트리스트가 여러 개인 경우, 콤보박스에서 여러 번 선택해주세요.
        </div>
        <!-- 판매 방식 -->
        <div class="row text-bold q-pt-md">
          판매 방식
        </div>
        <div class="row q-pt-xs q-pl-xs">
          ① 고정가격 : 고정된 가격으로 토큰을 판매합니다.
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g.&nbsp;대상토큰 가격을 0.1 KLAY 로 1,000,000개 판매하면 총액은 100,000 KLAY 가 됩니다.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          ② 옥션스왑 : 고정된 물량을 경매방식으로 판매합니다.
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;판매 가격을 설정하지 않습니다.
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g.&nbsp;1,000,000개 판매시 총 입찰금액이 50,000 KLAY 인 경우, 토큰 가격은 50,000 / 1,000,000 = 0.05 KLAY 가 됩니다.
        </div>
        <div class="row q-pt-xs q-pl-xs text-red">
          옥션스왑은 소프트캡 달성시 모든 물량이 판매되니 유의해주세요.
        </div>
        <!-- 소프트캡 -->
        <div class="row text-bold q-pt-md">
          소프트캡 / 하드캡
        </div>
        <div class="row q-pt-sm q-pl-xs text-red">
          · 제한 없음은 '0' 으로 설정해주세요.
        </div>
        <div class="row q-pt-sm q-pl-xs text-red">
          · 판매 금액이 기한 내에 소프트캡에 도달하지 못하면 사전판매가 실패하고 모든 금액이 반환됩니다.
        </div>
        <!-- 수수료 -->
        <div class="row text-bold q-pt-md">
          수수료
        </div>
        <div class="row q-pt-sm q-pl-xs">
          · 총 판매금액의 {{ fee_rate }}% 수수료는 생태계 활성화를 위해 사용됩니다.
        </div>
      </div>
    </div>

    <!-- EN -->
    <div v-else class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- 필수 사항 -->
        <div class="row text-bold">
          Prerequisites
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-sm text-red">
          · Please send the token to the KLAYSTAR wallet.
        </div>
        <q-separator />
        <div class="row q-pt-sm q-pl-xs">
          KLAYSTAR wallet address
          &nbsp;&nbsp;<q-btn icon="content_copy" color="primary" size="sm" flat @click="copyValue(systemWalletAddress)" dense>&nbsp;{{ $t('copy') }}</q-btn>
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-sm">
          {{ systemWalletAddress }}
        </div>
        <q-separator />
        <!-- 화이트리스트 -->
        <div class="row text-bold q-pt-md">
          Whitelist
        </div>
        <div class="row q-pt-sm q-pl-xs">
          · If there is no whitelist, please set it to blank.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          · If you have multiple whitelists, please select multiple times in the combobox.
        </div>
        <!-- 판매 방식 -->
        <div class="row text-bold q-pt-md">
          Sales Type
        </div>
        <div class="row q-pt-xs q-pl-xs">
          ① Fixed Price : Sell tokens at a fixed price.
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g.&nbsp;If you sell 1,000,000 tokens price at 0.1 KLAY, the total amount will be 100,000 KLAY.
        </div>
        <div class="row q-pt-xs q-pl-xs">
          ② Auction Swap : Sell tokens by auction.
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No need to set a Token Price.
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g.&nbsp;If the total bid amount is 50,000 KLAY for 1,000,000 tokens sold, the token price will be 50,000 / 1,000,000 = 0.05 KLAY.
        </div>
        <div class="row q-pt-xs q-pl-xs text-red">
          Please note that if you select an Auction Swap, all tokens will be sold when achieve the SoftCap.
        </div>
        <!-- 소프트캡 -->
        <div class="row text-bold q-pt-md">
          SoftCap / HardCap
        </div>
        <div class="row q-pt-sm q-pl-xs text-red">
          · Set no limit to '0'.
        </div>
        <div class="row q-pt-sm q-pl-xs text-red">
          · If the presale amount does not reach the softcap within the due date, the presale fails and all funds will be returned.
        </div>
        <!-- 수수료 -->
        <div class="row text-bold q-pt-md">
          Fee
        </div>
        <div class="row q-pt-sm q-pl-xs">
          · The {{ fee_rate }}% commission of the total sales amount is used to revitalize the ecosystem.
        </div>
      </div>
    </div>

    <q-separator spaced />

    <!-- 대상 토큰 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_token') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12 q-pb-xs">
        <q-select
          v-model="targetToken"
          :options="targetTokenOptions"
          color="primary"
          use-input
          input-debounce="0"
          @filter="targetFilterFn"
          filled
          clearable
          options-selected-class="text-deep-orange"
          tabindex="1"
          @update:model-value="onChangeTargetToken"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-avatar>
                  <img v-if="scope.opt.logo_image" :src="scope.opt.logo_image" width="30" />
                  <q-icon v-else name="generating_tokens" size="md" />
                </q-avatar>
              </q-item-section>
              <q-item-section style="word-break: break-all;">
                <q-item-label class="text-bold">{{ scope.opt.symbol }}</q-item-label>
                <q-item-label class="">{{ scope.opt.name }}</q-item-label>
                <q-item-label class="text-caption">{{ scope.opt.contract_address }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <!-- 대상 토큰 Contract Address -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_token_contract_address') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="token_contract_address" ref="token_contract_address" :rules="[required]" clearable standout tabindex="2" />
      </div>
    </div>

    <!-- 대상 토큰 name -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_token_name') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="token_name" ref="token_name" :rules="[required]" clearable standout tabindex="3" />
      </div>
    </div>

    <!-- 대상 토큰 symbol -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_token_symbol') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="token_symbol" ref="token_symbol" :rules="[required]" clearable standout tabindex="4" />
      </div>
    </div>

    <!-- 대상 토큰 decimals -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_token_decimals') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="token_decimals" ref="token_decimals" type="number" :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 18)]" standout tabindex="5" />
      </div>
    </div>

    <!-- 대상 토큰 total_supply -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_token_total_supply') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="token_total_supply" ref="token_total_supply" type="number" :rules="[requiredNumber, val => minValue(val, 1), val => maxValue(val, 999999999999999999999999999999999999999999999999999999999999999999999)]" standout tabindex="6" />
      </div>
    </div>

    <!-- 대상 토큰 logo_image -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_token_logo_image') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="token_logo_image" ref="token_logo_image" :rules="[required]" clearable standout tabindex="7" />
      </div>
    </div>

    <!-- 공식 웹사이트 -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_official_website') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="official_website" ref="official_website" :rules="[required]" clearable standout tabindex="8" />
      </div>
    </div>

    <!-- 공식 이메일 -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_official_email') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="official_email" ref="official_email" :rules="[required]" clearable standout tabindex="9" />
      </div>
    </div>

    <!-- 백서 -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_whitepaper') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="whitepaper" ref="whitepaper" :rules="[required]" clearable standout tabindex="10" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- 화이트리스트 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist') }}</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('whitelist_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12 q-pb-xs">
        <q-select
          v-model="targetWhitelist"
          :options="targetWhitelistOptions"
          color="primary"
          use-input
          input-debounce="0"
          @filter="targetWhitelistFilterFn"
          filled
          clearable
          options-selected-class="text-deep-orange"
          tabindex="11"
          @update:model-value="onChangeTargetWhitelist"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-avatar>
                  <img v-if="scope.opt.logo_image" :src="scope.opt.logo_image" width="30" />
                  <q-icon v-else name="list_alt" size="md" />
                </q-avatar>
              </q-item-section>
              <q-item-section style="word-break: break-all;">
                <q-item-label class="text-bold">{{ scope.opt.symbol }}</q-item-label>
                <q-item-label class="">{{ scope.opt.name }}</q-item-label>
                <q-item-label class="text-caption">{{ scope.opt.contract_address }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <!-- 화이트리스트 SEQ -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('whitelist_seq') }}</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('whitelist_seq_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-lg">
      <div class="col-12">
        <q-input v-model="whitelist_seq" ref="whitelist_seq" :rules="[]" clearable standout tabindex="12" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- title -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_title') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="title" ref="title" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="13" />
      </div>
    </div>

    <!-- title_ko -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_title') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="title_ko" ref="title_ko" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="14" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- team_name -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_team_name') }} (English)<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_team_name_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="team_name" ref="team_name" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="15" />
      </div>
    </div>

    <!-- team_name_ko -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_team_name') }} (Korean)<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_team_name_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="team_name_ko" ref="team_name_ko" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="16" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- pre_value -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_pre_value') }} (USD)</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_pre_value_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="pre_value" ref="pre_value" type="number"
          :rules="[val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="17" />
      </div>
    </div>

    <!-- pre_value_krw -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_pre_value') }} (KRW)</span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_pre_value_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="pre_value_krw" ref="pre_value_krw" type="number"
          :rules="[val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="18" />
      </div>
    </div>

    <q-separator color="primary" style="height: 3px;" />

    <!-- main_image -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_main_image') }}</span>
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
          tabindex="19"
          @uploaded="fileUploaded_main_image"
        />
      </div>
    </div>

    <!-- main_image preview -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('presale_preview_main_image') }}</span>
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
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_contents') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="contents"
          ref="contents"
          min-height="10rem"
          autofocus
          tabindex="20"
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
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_contents') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="contents_ko"
          ref="contents_ko"
          min-height="10rem"
          autofocus
          tabindex="21"
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
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_start_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_start_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="start_time" ref="start_time" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="22">
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
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_end_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_end_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="end_time" ref="end_time" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="23">
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

    <!-- claim_time -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_claim_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_claim_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="claim_time" ref="claim_time" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="24">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="claim_time" mask="YYYY-MM-DD HH:mm">
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
                  <q-time v-model="claim_time" mask="YYYY-MM-DD HH:mm" format24h>
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

    <!-- type -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_type') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-sm">
      <div class="col-12">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="type" val="FIXED" @update:model-value="onChangePresaleType" tabindex="25" />
            </q-item-section>
            <q-item-section>
              <q-item-label>1. {{ $t('presale_type_fixed_price') }}</q-item-label>
              <q-item-label caption>{{ $t('presale_type_fixed_price_hint') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="type" val="AUCTION" @update:model-value="onChangePresaleType" tabindex="26" />
            </q-item-section>
            <q-item-section>
              <q-item-label>2. {{ $t('presale_type_auction_swap') }}</q-item-label>
              <q-item-label caption>{{ $t('presale_type_auction_swap_hint') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- klay price -->
    <!-- <div class="row justify-center q-pt-md q-pb-sm">
      <q-card class="q-pa-md">
        <table border="0" cellpadding="0" cellspacing="3">
          <tr>
            <td class="text-left" width="50">1 KLAY</td>
            <td class="text-center" width="20">:</td>
            <td class="text-left">$ {{ Number(tokenPriceKlay).toFixed(6) }}</td>
          </tr>
          <tr v-if="locale === 'ko-KR'">
            <td class="text-left">1 KLAY</td>
            <td class="text-center">:</td>
            <td class="text-right">{{ (Number(tokenPriceKlay) * Number(usdToKrw)).toFixed(6) }} 원</td>
          </tr>
        </table>
      </q-card>
    </div> -->

    <!-- price -->
    <div v-if="type === 'FIXED'" class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_price') }} (USD)<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_price_hint') }}</span>
      </div>
    </div>
    <div v-if="type === 'FIXED'" class="row justify-center">
      <div class="col-12">
        <q-input v-model="price" ref="price" type="number"
          :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="27" />
      </div>
    </div>

    <!-- listing_price -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_listing_price') }} (USD)<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_listing_price_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="listing_price" ref="listing_price" type="number"
          :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="28" />
      </div>
    </div>

    <!-- amount -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_amount') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_amount_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="amount" ref="amount" type="number"
          :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="29" />
      </div>
    </div>

    <!-- softcap -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_softcap') }} (USD)<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_softcap_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="softcap" ref="softcap" type="number"
          :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="30" />
      </div>
    </div>

    <!-- hardcap -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_hardcap') }} (USD)<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_hardcap_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="hardcap" ref="hardcap" type="number"
          :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="31" />
      </div>
    </div>

    <!-- user_softcap -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_user_softcap') }} (USD)<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_user_softcap_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="user_softcap" ref="user_softcap" type="number"
          :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="32" />
      </div>
    </div>

    <!-- user_hardcap -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_user_hardcap') }} (USD)<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_user_hardcap_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="user_hardcap" ref="user_hardcap" type="number"
          :rules="[requiredNumber, val => minValue(val, 0), val => maxValue(val, 1000000000000000)]" clearable standout tabindex="33" />
      </div>
    </div>

    <!-- admin_wallet_address -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_admin_wallet_address') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_admin_wallet_address_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="admin_wallet_address" ref="admin_wallet_address" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="34" />
      </div>
    </div>

    <!-- txid_presale_token -->
    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('presale_txid_presale_token') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('presale_txid_presale_token_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="txid_presale_token" ref="txid_presale_token" :rules="[required]" clearable standout tabindex="35" />
      </div>
    </div>

    <!-- 시세 보기 -->
    <div class="row justify-center q-pt-lg q-pb-xl">
      <q-card class="q-pa-md">
        <table border="0" cellpadding="0" cellspacing="3">
          <tr>
            <td class="text-left" width="110">{{ $t('presale_price') }}</td>
            <td class="text-center" width="20">: $ </td>
            <td class="text-right">{{ Number(price).toFixed(6) }}</td>
          </tr>
          <tr>
            <td class="text-left">{{ $t('presale_listing_price') }}</td>
            <td class="text-center">: $ </td>
            <td class="text-right">{{ Number(listing_price).toFixed(6) }}</td>
          </tr>
          <tr>
            <td class="text-left">{{ $t('presale_softcap') }}</td>
            <td class="text-center">: $ </td>
            <td class="text-right">{{ Number(softcap).toFixed(6) }}</td>
          </tr>
          <tr>
            <td class="text-left">{{ $t('presale_hardcap') }}</td>
            <td class="text-center">: $ </td>
            <td class="text-right">{{ Number(hardcap).toFixed(6) }}</td>
          </tr>
          <tr>
            <td class="text-left">{{ $t('presale_user_softcap') }}</td>
            <td class="text-center">: $ </td>
            <td class="text-right">{{ Number(user_softcap).toFixed(6) }}</td>
          </tr>
          <tr>
            <td class="text-left">{{ $t('presale_user_hardcap') }}</td>
            <td class="text-center">: $ </td>
            <td class="text-right">{{ Number(user_hardcap).toFixed(6) }}</td>
          </tr>
          <tr v-if="locale === 'ko-KR'">
            <td class="text-left" colspan="3">&nbsp;</td>
          </tr>
          <tr v-if="locale === 'ko-KR'">
            <td class="text-left">{{ $t('presale_price') }}</td>
            <td class="text-center">:</td>
            <td class="text-right">{{ (Number(price) * Number(usdToKrw)).toFixed(6) }} 원</td>
          </tr>
          <tr v-if="locale === 'ko-KR'">
            <td class="text-left">{{ $t('presale_listing_price') }}</td>
            <td class="text-center">:</td>
            <td class="text-right">{{ (Number(listing_price) * Number(usdToKrw)).toFixed(6) }} 원</td>
          </tr>
          <tr v-if="locale === 'ko-KR'">
            <td class="text-left">{{ $t('presale_softcap') }}</td>
            <td class="text-center">:</td>
            <td class="text-right">{{ (Number(softcap) * Number(usdToKrw)).toFixed(6) }} 원</td>
          </tr>
          <tr v-if="locale === 'ko-KR'">
            <td class="text-left">{{ $t('presale_hardcap') }}</td>
            <td class="text-center">:</td>
            <td class="text-right">{{ (Number(hardcap) * Number(usdToKrw)).toFixed(6) }} 원</td>
          </tr>
          <tr v-if="locale === 'ko-KR'">
            <td class="text-left">{{ $t('presale_user_softcap') }}</td>
            <td class="text-center">:</td>
            <td class="text-right">{{ (Number(user_softcap) * Number(usdToKrw)).toFixed(6) }} 원</td>
          </tr>
          <tr v-if="locale === 'ko-KR'">
            <td class="text-left">{{ $t('presale_user_hardcap') }}</td>
            <td class="text-center">:</td>
            <td class="text-right">{{ (Number(user_hardcap) * Number(usdToKrw)).toFixed(6) }} 원</td>
          </tr>
        </table>
      </q-card>
    </div>

    <!-- 지갑 주소 오기입 유의 -->
    <div class="row justify-center q-pb-md">
      <div class="col-12 text-grey">
        <div class="row text-caption text-red">
          {{ $t('token_guide_1') }}
        </div>
        <div class="row text-caption text-red">
          {{ $t('token_guide_1_1') }}
        </div>
      </div>
    </div>

    <!-- buttons -->
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="37">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="modifyPresale" tabindex="36">
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
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
import { ref } from 'vue'
// import _ from 'lodash'

export default defineComponent({
  name: 'ModifyPresale',
  data () {
    return {
      fee_rate: 0, // 수수료율
      presaleSeq: '',
      // tokenPriceKlay: '0',
      usdToKrw: '0',
      systemWalletAddress: '',
      targetToken: {},
      targetTokenList: [], // 대상 토큰 리스트
      targetTokenOptions: [], // 토큰 리스트 - 검색용
      token_contract_address: '', // 대상 토큰 계약 주소
      token_name: '', // 대상 토큰 이름
      token_symbol: '', // 대상 토큰 심볼
      token_decimals: '', // 대상 토큰 소수점
      token_total_supply: '', // 대상 토큰 총 발행량
      token_logo_image: '', // 대상 토큰 로고 이미지 URL
      official_website: '', // 공식 웹사이트
      official_email: '', // 공식 이메일
      whitepaper: '', // 백서 URL
      targetWhitelist: {},
      targetWhitelistList: [], // 대상 화이트리스트 리스트
      targetWhitelistOptions: [], // 화이트리스트 리스트 - 검색용
      whitelist_seq: '',
      start_time: '',
      end_time: '',
      claim_time: '',
      title: '',
      title_ko: '',
      team_name: '',
      team_name_ko: '',
      pre_value: '',
      pre_value_krw: '',
      contents: '',
      contents_ko: '',
      type: 'FIXED',
      price: '0.1',
      listing_price: '0.2',
      amount: '100000000',
      softcap: '0',
      hardcap: '0',
      user_softcap: '0',
      user_hardcap: '0',
      admin_wallet_address: '',
      txid_presale_token: '',
      main_image: '',
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
    this.presaleSeq = this.$route.query.seq

    // 시스템 지갑 주소
    this.systemWalletAddress = this.$systemWalletAddress

    // 클레이 가격 조회
    // this.getKlayPrice()

    // 환율 조회
    this.selectExchangeRate()

    // 사전판매 조회
    this.selectPresale()

    // 수수료율 조회
    this.selectFeeRate()
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // getKlayPrice() {
    //   // 클레이스왑 토큰 가격 정보 조회
    //   const param = {
    //     uid: this.getUid,
    //     tokenContractAddress: '0x0000000000000000000000000000000000000000', // KLAY
    //   }
    //   this.$axios.get('/api/klayswap/getTokenPrice', { params: { ...param }})
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       // console.log(result.data)
    //       if (result.data && result.data.resultCd === 'SUCCESS') {
    //         this.tokenPriceKlay = result.data.price
    //         // console.log('this.tokenPriceKlay: ' + this.tokenPriceKlay)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    selectFeeRate() {
      // 수수료율 조회
      const param = {
        uid: this.getUid,
        fee_cd: 'PRESALE',
      }
      this.$axios.get('/api/feeRate/selectFeeRate', { params: { ...param }})
        .then((result) => {
          // console.log(result.data)
          if (result && result.data) {
            this.fee_rate = result.data.fee_rate
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    selectExchangeRate() {
      // 환율 조회
      const param = {
        uid: this.getUid,
      }
      this.$axios.get('/api/exchangerate/selectExchangeRate', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.usdToKrw = result.data.deal_bas_r
            // console.log('this.usdToKrw: ' + this.usdToKrw)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async selectPresale() {
      const param = {
        uid: this.getUid,
        seq: this.presaleSeq,
      }
      const result = await this.$axios.get('/api/presale/selectPresale', { params: { ...param } })

      // target token list
      const targetTokenResponse = await this.$axios.get('/api/presale/selectMyTokenList', { params: { ...param } })
      this.targetTokenOptions = ref(targetTokenResponse.data)
      this.targetTokenList = targetTokenResponse.data
      this.targetToken = this.targetTokenList.filter(item => (item.contract_address === result.data.token_contract_address))[0]

      // whitelist list
      const targetWhitelistResponse = await this.$axios.get('/api/whitelist/selectMyWhitelistComboList', { params: { ...param } })
      this.targetWhitelistOptions = ref(targetWhitelistResponse.data)
      this.targetWhitelistList = targetWhitelistResponse.data
      // this.targetWhitelist = this.targetWhitelistList.filter(item => (item.contract_address === result.data.pair_token_contract_address))[0]
      this.targetWhitelist = []

      if (result.data) {
        // 항목 설정
        this.token_contract_address = result.data.token_contract_address
        this.token_name = result.data.token_name
        this.token_symbol = result.data.token_symbol
        this.token_decimals = result.data.token_decimals
        this.token_total_supply = result.data.token_total_supply
        this.token_logo_image = result.data.token_logo_image
        this.official_website = result.data.official_website
        this.official_email = result.data.official_email
        this.whitepaper = result.data.whitepaper
        this.whitelist_seq = result.data.whitelist_seq
        this.title = result.data.title
        this.title_ko = result.data.title_ko
        this.team_name = result.data.team_name
        this.team_name_ko = result.data.team_name_ko
        this.pre_value = result.data.pre_value
        this.pre_value_krw = result.data.pre_value_krw
        this.main_image = result.data.main_image
        this.contents = result.data.contents
        this.contents_ko = result.data.contents_ko
        this.start_time = result.data.start_time
        this.end_time = result.data.end_time
        this.claim_time = result.data.claim_time
        this.type = result.data.type
        this.price = result.data.price
        this.listing_price = result.data.listing_price
        this.amount = result.data.amount
        this.softcap = result.data.softcap
        this.hardcap = result.data.hardcap
        this.user_softcap = result.data.user_softcap
        this.user_hardcap = result.data.user_hardcap
        this.admin_wallet_address = result.data.admin_wallet_address
        this.txid_presale_token = result.data.txid_presale_token
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    onChangeTargetToken(selectedToken) {
      if (selectedToken) {
        this.token_contract_address = selectedToken.contract_address
        this.token_name = selectedToken.name
        this.token_symbol = selectedToken.symbol
        this.token_decimals = selectedToken.decimals
        // this.token_total_supply = selectedToken.initial_supply
        this.token_total_supply = selectedToken.initial_supply.substring(0, selectedToken.initial_supply.length - selectedToken.decimals)
        this.token_logo_image = selectedToken.logo_image
        this.official_website = selectedToken.official_website
        this.official_email = selectedToken.official_email
        this.whitepaper = selectedToken.docs
      } else {
        this.token_contract_address = ''
        this.token_name = ''
        this.token_symbol = ''
        this.token_decimals = 0
        this.token_total_supply = ''
        this.token_logo_image = ''
        this.official_website = ''
        this.official_email = ''
        this.whitepaper = ''
      }
    },
    targetFilterFn (val, update, abort) {
      // this.options = ref(this.pairTokenList)
      update(() => {
        const keyword = val.toLowerCase()
        // console.log('keyword: ' + keyword)
        this.targetTokenOptions = this.targetTokenList.filter(
          item => (item.name && item.name.toLowerCase().indexOf(keyword) > -1)
            || (item.symbol && item.symbol.toLowerCase().indexOf(keyword) > -1)
            || (item.contract_address && item.contract_address.toLowerCase().indexOf(keyword) > -1)
        )
      })
    },
    onChangeTargetWhitelist(selectedWhitelist) {
      if (selectedWhitelist) {
        if (this.whitelist_seq) {
          // 이미 추가한 항목인지 체크
          const seqList = this.whitelist_seq.toString().split(',')
          let isExist = false
          for (let i = 0; i < seqList.length; i++) {
            // console.log('selectedWhitelist.seq: ' + selectedWhitelist.seq + ' seqList[i]: ' + seqList[i])
            if (selectedWhitelist.seq == seqList[i]) {
              isExist = true
              break;
            }
          }
          // console.log('isExist: ' + isExist)
          if (!isExist) {
            this.whitelist_seq += ',' + selectedWhitelist.seq
          }
        } else {
          this.whitelist_seq = selectedWhitelist.seq
        }
      } else {
        this.whitelist_seq = ''
      }
    },
    targetWhitelistFilterFn (val, update, abort) {
      // this.options = ref(this.pairTokenList)
      update(() => {
        const keyword = val.toLowerCase()
        // console.log('keyword: ' + keyword)
        this.targetWhitelistOptions = this.targetWhitelistList.filter(
          item => (item.name && item.name.toLowerCase().indexOf(keyword) > -1)
        )
      })
    },
    onChangePresaleType() {
      if (this.type === 'AUCTION') {
        this.price = 0
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
      if (!this.$refs.token_contract_address.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_token_contract_address'))
        result = false
      }
      if (!this.$refs.token_name.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_token_name'))
        result = false
      }
      if (!this.$refs.token_symbol.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_token_symbol'))
        result = false
      }
      if (!this.$refs.token_decimals.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_token_decimals'))
        result = false
      }
      if (!this.$refs.token_total_supply.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_token_total_supply'))
        result = false
      }
      if (!this.$refs.token_logo_image.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_token_logo_image'))
        result = false
      }
      if (!this.$refs.official_website.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_official_website'))
        result = false
      }
      if (!this.$refs.official_email.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_official_email'))
        result = false
      }
      if (!this.$refs.whitepaper.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_whitepaper'))
        result = false
      }
      if (!this.$refs.title.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_title'))
        result = false
      }
      if (!this.$refs.title_ko.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_title_ko'))
        result = false
      }
      if (!this.$refs.team_name.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_team_name'))
        result = false
      }
      if (!this.$refs.team_name_ko.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_team_name_ko'))
        result = false
      }
      if (!this.$refs.pre_value.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_pre_value'))
        result = false
      }
      if (!this.$refs.pre_value_krw.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_pre_value_krw'))
        result = false
      }
      if (!this.contents) {
        this.$noti(this.$q, this.$t('validation_failed_presale_contents'))
        result = false
      }
      if (!this.contents_ko) {
        this.$noti(this.$q, this.$t('validation_failed_presale_contents_ko'))
        result = false
      }
      if (this.$refs.contents.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_presale_contents_length'))
        result = false
      }
      if (this.$refs.contents_ko.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_presale_contents_ko_length'))
        result = false
      }
      if (!this.$refs.start_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_start_time'))
        result = false
      }
      if (!this.$refs.end_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_end_time'))
        result = false
      }
      if (!this.$refs.claim_time.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_claim_time'))
        result = false
      }
      if (this.type === 'FIXED') {
        if (!this.$refs.price.validate()) {
          this.$noti(this.$q, this.$t('validation_failed_presale_price'))
          result = false
        }
      }
      if (!this.$refs.listing_price.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_listing_price'))
        result = false
      }
      if (!this.$refs.amount.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_amount'))
        result = false
      }
      if (!this.$refs.softcap.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_softcap'))
        result = false
      }
      if (!this.$refs.hardcap.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_hardcap'))
        result = false
      }
      if (this.hardcap != 0 && Number(this.hardcap) <= Number(this.softcap)) {
        this.$noti(this.$q, this.$t('validation_failed_presale_hardcap_must_be_greater_than_softcap'))
        result = false
      }
      if (!this.$refs.user_softcap.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_user_softcap'))
        result = false
      }
      if (!this.$refs.user_hardcap.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_user_hardcap'))
        result = false
      }
      if (this.user_hardcap != 0 && Number(this.user_hardcap) <= Number(this.user_softcap)) {
        this.$noti(this.$q, this.$t('validation_failed_presale_user_hardcap_must_be_greater_than_user_softcap'))
        result = false
      }
      if (!this.$refs.admin_wallet_address.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_admin_wallet_address'))
        result = false
      }
      if (!this.$refs.txid_presale_token.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_presale_txid_presale_token'))
        result = false
      }
      return result
    },
    // 사전판매 수정
    modifyPresale() {
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

      // 사전판매 수정 처리
      const param = {
        uid: this.getUid,
        seq: this.presaleSeq,
        token_contract_address: this.token_contract_address,
        token_name: this.token_name,
        token_symbol: this.token_symbol,
        token_decimals: this.token_decimals,
        token_total_supply: this.token_total_supply,
        token_logo_image: this.token_logo_image,
        official_website: this.official_website,
        official_email: this.official_email,
        whitepaper: this.whitepaper,
        whitelist_seq: this.whitelist_seq,
        title: this.title,
        title_ko: this.title_ko,
        team_name: this.team_name,
        team_name_ko: this.team_name_ko,
        pre_value: this.pre_value,
        pre_value_krw: this.pre_value_krw,
        main_image: !this.main_image ? null : this.main_image,
        contents: this.contents,
        contents_ko: this.contents_ko,
        start_time: this.start_time,
        end_time: this.end_time,
        claim_time: this.claim_time,
        type: this.type,
        price: this.price,
        listing_price: this.listing_price,
        amount: this.amount,
        softcap: this.softcap,
        hardcap: this.hardcap,
        user_softcap: this.user_softcap,
        user_hardcap: this.user_hardcap,
        admin_wallet_address: this.admin_wallet_address,
        txid_presale_token: this.txid_presale_token,
      }
      this.$axios.post('/api/presale/updatePresale', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_success'))

            // 2. 페이지 이동 - 사전판매 관리 화면
            // this.$router.push('/presale/myPresaleList')
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
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
      // this.$router.push('/presale/myWhitelistList')
    }
  }
})
</script>

<style scoped>
</style>
