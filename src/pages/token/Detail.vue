<template>
  <q-page class="page-default">
    <div class="row justify-center">
      <div class="col-12 q-pb-xs">

        <!-- <div class="row flex flex-center"> -->
        <!-- <div class="row justify justify-between q-pt-sm"> -->
        <div class="row justify justify-between q-pt-sm">
          <div class="row flex flex-center">
            <div class="row flex flex-center">
              <div class="col">
                <table border="0" width="100%" style="margin: 0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td>
                      <div class="text-right q-pl-sm">
                        <q-avatar size="md">
                          <img v-if="tokenVo.logo_image" :src="tokenVo.logo_image">
                          <q-icon v-else name="generating_tokens" size="md" />
                        </q-avatar>
                      </div>
                    </td>
                    <td width="100%">
                      <div class="text-h6 q-pl-sm" style="word-break: break-word;">
                        <strong>{{ tokenVo.name }}</strong> <span class="text-grey-7">{{ tokenVo.symbol }}</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="q-pl-sm">
            <div class="row flex flex-center">
              <!-- <div v-if="popupYn !== 'y'"> -->
              <div>
                <q-btn flat round dense icon="arrow_back" color="black" icon-left="true" @click="goBack" />
              </div>
              <div class="col flex flex-center">
                <q-icon v-if="locale === 'ko-KR'" name="img:logo/logo_swapscanner.jpg" size="md" style="cursor: pointer;" @click="openUrl(urlSwapscannerKo + tokenVo.contract_address)" />
                <q-icon v-else name="img:logo/logo_swapscanner.jpg" size="md" style="cursor: pointer;" @click="openUrl(urlSwapscannerEn + tokenVo.contract_address)" />
              </div>
              <div class="col">
                <q-btn flat round dense icon="insert_chart" size="md" color="black" icon-right="true" @click="openUrl('https://dexata.kr/?tokenA=' + tokenVo.contract_address)" />
              </div>
              <div class="col">
                <q-btn flat round dense icon="share" size="md" color="black" icon-right="true" @click="shareUrlCopy(tokenVo.seq)" />
              </div>
              <div class="q-pl-md q-pr-sm">
                <q-select
                  v-if="popupYn === 'y'"
                  v-model="locale"
                  :options="localeOptions"
                  dense
                  borderless
                  emit-value
                  map-options
                  style="width: 55px"
                  @update:model-value="onChangeLocale"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <q-separator />
    <q-tabs
      v-model="tab"
      class="bg-grey-1 shadow-0"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="i" icon="info">&nbsp;&nbsp;{{ $t('information') }}</q-tab>
      <q-tab name="l" icon="link">&nbsp;&nbsp;{{ $t('link') }}</q-tab>
      <q-tab name="c" icon="chat">&nbsp;&nbsp;{{ $t('comment') }}</q-tab>
    </q-tabs>

    <q-separator />


    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->


    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 정보 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="i">
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
        <div v-if="description || descriptionKo" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_description') }}</span>
            <q-separator />
          </div>
        </div>
        <div v-if="description || descriptionKo" class="q-pb-md q-pl-xs">
          <div v-if="locale === 'ko-KR'" class="row q-pb-md q-pl-xs">
            <div class="col-12" v-html="descriptionKo" />
          </div>
          <div v-else class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12" v-html="description" />
          </div>
        </div>

        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>

      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 2. 링크 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="l" style="word-break: break-all;">
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('contract_address') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.contract_address)">&nbsp;{{ $t('copy') }}</q-btn>
            <q-separator />
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12">
            <a @click="openUrl(scopeKlaytnUrl + 'token/' + tokenVo.contract_address)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.contract_address }}</a>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_official_website') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.official_website)">&nbsp;{{ $t('copy') }}</q-btn>
            <q-separator />
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12">
            <a v-if="tokenVo.official_website" @click="openUrl(tokenVo.official_website)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.official_website }}</a>
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
        <div v-if="tokenVo.discord" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6">{{ $t('token_discord') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(tokenVo.discord)">&nbsp;{{ $t('copy') }}</q-btn>
            <q-separator />
          </div>
        </div>
        <div v-if="tokenVo.discord" class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12">
            <a @click="openUrl(tokenVo.discord)" class="text-weight-bold" style="cursor: pointer;">{{ tokenVo.discord }}</a>
          </div>
        </div>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 3. 댓글 패널 ※ infiniteScroll 이상동작으로 comment는 별도로 기술 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- <q-tab-panel name="comment">
        <div>
        </div>
      </q-tab-panel> -->
    </q-tab-panels>

    <!-- 댓글 리스트  -->
    <div v-if="tab === 'c'" class="col-12 justify-center q-pa-md">

      <div class="row">
        <div class="col-12">
          <q-input v-model="myContents" type="textarea" :placeholder="$t('enter_the_comment')" rows="2" outlined @keyup="countMyContentsLength" />
        </div>
      </div>

      <div class="row q-pt-sm q-pb-sm">
        <div class="col-6 text-left">
          &nbsp;&nbsp;&nbsp;{{ myContentsLength }} / 300
        </div>
        <div class="col-6 text-right">
          <q-btn size="md" color="black" style="height: 36px;" @click="insertTokenComment" outline>{{ $t('register') }}</q-btn>
        </div>
      </div>

      <!-- 토큰 댓글 리스트 -->
      <q-pull-to-refresh @refresh="refresher">
        <q-infinite-scroll @load="loadMore" :offset="100" ref="infiniteScroll">
          <div v-for="item in tokenCommentList" :key="item.seq">
            <q-separator />
            <div :style="`padding-left: ${ item.group_layer * 20 }px`" v-if="item.visible_child" :class="`${ item.group_layer === 0 ? 'bg-white' : 'bg-grey-2'}`">
              <div class="row q-pt-md">
                <div class="col-8">
                  <table border="0" cellpadding="0" sellspacing="0" width="100%">
                    <tr>
                      <td rowspan="2" width="60" class="flex-bottom">
                        <q-avatar>
                          <!-- <img src="https://cdn.quasar.dev/img/avatar7.jpg"> -->
                          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                      </td>
                      <td><span class="text-body2">{{ item.reg_name }}</span></td>
                    </tr>
                    <tr>
                      <td><span class="text-caption text-grey-7">{{ item.reg_time }}</span></td>
                    </tr>
                  </table>
                </div>
                <div v-if="getUid && getUid === item.reg_id" class="col-4 text-right q-pt-md">
                  <!-- <span style="cursor: pointer;" @click="modifyComment(item)">{{ $t('modify') }}</span> -->
                  <q-btn icon="edit" @click="modifyComment(item)" flat dense />
                  &nbsp;&nbsp;
                  <!-- <span style="cursor: pointer;" @click="deleteComment(item.seq)">{{ $t('delete') }}</span> -->
                  <q-btn icon="delete" @click="deleteComment(item.seq)" flat dense />
                  &nbsp;&nbsp;
                </div>
              </div>
              <div class="row q-pt-sm" style="word-break: break-all;">
                <div class="col-12 text-body1">{{ item.contents }}</div>
              </div>
              <div class="row q-pt-sm q-pb-sm">
                <div class="col-4">
                  <span style="cursor: pointer; text-body2" @click="showReplyInput(item)">{{ $t('register_reply') }}</span>
                  <span v-if="item.group_layer === 0" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt1 }})</span>
                  <span v-if="item.group_layer === 1" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt2 }})</span>
                  <span v-if="item.group_layer === 2" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt3 }})</span>
                  <span v-if="item.group_layer === 3" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt4 }})</span>
                  <span v-if="item.group_layer === 4" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt5 }})</span>
                  <span v-else></span>
                </div>
                <!-- <div class="col-4"></div> -->
                <div class="col-8 text-right">
                  <q-btn v-if="item.like_cd === 'Y'" icon="thumb_up_alt" @click="likeIt(item, 'YES')" flat dense size="sm" />
                  <q-btn v-else icon="thumb_up_off_alt" @click="likeIt(item, 'YES')" flat dense size="sm" />
                  &nbsp;{{ item.like_cnt }}
                  &nbsp;&nbsp;
                  <q-btn v-if="item.like_cd === 'N'" icon="thumb_down_alt" @click="likeIt(item, 'NO')" flat dense size="sm" />
                  <q-btn v-else icon="thumb_down_off_alt" @click="likeIt(item, 'NO')" flat dense size="sm" />
                  &nbsp;{{ item.dislike_cnt }}
                  &nbsp;&nbsp;
                  <!-- ### {{ item.group_order }} ### {{ item.group_layer }} -->
                </div>
              </div>

              <div v-if="item.visible_reply_input" class="row q-pt-sm q-pb-sm">
                <div class="col-12">
                  <q-input v-model="myReply" type="textarea" :placeholder="$t('enter_the_reply')" rows="2" outlined @keyup="countMyReplyLength" />
                </div>

                <div class="col-6 text-left q-pt-sm">
                  &nbsp;&nbsp;&nbsp;{{ myReplyLength }} / 300
                </div>
                <div class="col-6 text-right q-pt-sm">
                  <q-btn size="md" color="black" style="height: 36px;" @click="insertTokenCommentReply(item)" outline>{{ $t('register') }}</q-btn>
                </div>
              </div>

            </div>


          </div>
          <q-separator />
          <br>
          <br>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-pull-to-refresh>

    </div>

    <div v-if="noDataFlag && tab === 'c'" class="row justify-center">
      <img src="images/sorry-no-data.png" style="width: 50%;" />
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <q-dialog v-model="confirmDeleteCommentModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteCommennt" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmModifyCommentModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-input v-model="modifyCommentValue" type="textarea" :placeholder="$t('enter_the_comment')" rows="7" outlined />
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('modify')" color="black" v-close-popup @click="doModifyCommennt" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
// import { useMeta } from 'quasar'
// import { createMetaMixin } from 'quasar'

// const metaData = {
//   // sets document title
//   title: 'Index Page',
//   // // optional; sets final title as "Index Page - My Website", useful for multiple level meta
//   titleTemplate: title => `${title} - My Website`,

//   // meta tags
//   meta: {
//     description: { name: 'description', content: 'Page 1' },
//     keywords: { name: 'keywords', content: 'Quasar website' },
//     equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
//     // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
//     ogTitle:  {
//       property: 'og:title',
//       // optional; similar to titleTemplate, but allows templating with other meta properties
//       template (ogTitle) {
//         return `${ogTitle} - My Website`
//       }
//     }
//   },

//   // CSS tags
//   link: {
//     material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
//   },

//   // JS tags
//   script: {
//     ldJson: {
//       type: 'application/ld+json',
//       innerHTML: `{ "@context": "http://schema.org" }`
//     }
//   },

//   // <html> attributes
//   htmlAttr: {
//     'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">
//     empty: undefined // generates <html empty>
//   },

//   // <body> attributes
//   bodyAttr: {
//     'action-scope': 'xyz', // generates <body action-scope="xyz">
//     empty: undefined // generates <body empty>
//   },

//   // <noscript> tags
//   noscript: {
//     default: 'This is content for browsers with no JS (or disabled JS)'
//   }
// }

export default defineComponent({
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'EN' },
        { value: 'ko-KR', label: 'KO' },
      ],
    }
  },
  // setup () {
  //   // needs to be called in setup()
  //   useMeta(metaData)
  // },
  // mixins: [
  //   createMetaMixin(metaData)
  // ],
  // Open Graph 정보 설정 - 공유 링크 복사 - 붙여넣기 하면 하기 정보가 표시됨
  // mixins: [
  //   createMetaMixin(function () {

  //     const ogUrlString = 'https://nftpy.io/info?seq=' + this.tokenVo.seq + '&tab=' + this.tab

  //     // meta tags
  //     const metaInfo = {
  //       ogUrl: {
  //         property: 'og:url',
  //         // name: 'description',
  //         // content: window.location.href,
  //         content: ogUrlString,
  //       },
  //       ogDescription: {
  //         property: 'og:description',
  //         // name: 'description',
  //         content: this.tokenVo.summary,
  //       },
  //       ogImage: {
  //         property: 'og:image',
  //         content: this.tokenVo.logo_image,
  //       },
  //       // keywords: { name: 'keywords', content: 'Quasar website' },
  //       // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  //       // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
  //       ogTitle:  {
  //         property: 'og:title',
  //         content: this.tokenVo.title,
  //       }
  //     }
  //     // "this" here refers to your component
  //     return {
  //       title: this.tokenVo.title,
  //       description: this.tokenVo.summary,
  //       meta: metaInfo,
  //     }
  //   })
  // ],
  name: 'Detail',
  data () {
    return {
      popupYn: 'n', // 토큰정보 참조시 팝업표시 여부 파라미터
      urlSwapscannerKo: this.$urlSwapscannerKo, // https://swapscanner.io/ko/swap?from=0x0000000000000000000000000000000000000000&to=
      urlSwapscannerEn: this.$urlSwapscannerEn, // https://swapscanner.io/swap?from=0x0000000000000000000000000000000000000000&to=
      tokenSeq: '', // route parameter seq
      tab: 'i',
      tokenVo: {
        seq: '',
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
        discord: '',
      },
      scopeKlaytnUrl: this.$scopeDomainKlaytn,
      description: '',
      descriptionKo: '',
      myContents: '', // 입력 댓글
      myContentsLength: 0,
      myReply: '', // 입력 답글
      myReplyLength: 0,
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 1, // 마지막 페이지
      tokenCommentList: [],
      noDataFlag: false,
      confirmDeleteCommentModal: false, // 나의 댓글 삭제 모달
      deleteTargetSeq: '', // 삭제 대상 댓글 seq
      confirmModifyCommentModal: false, // 나의 댓글 수정 모달
      modifyTargetSeq: '', // 수정 대상 댓글 seq
      modifyCommentValue: '', // 수정 대상 댓글 내용
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
    // 탭 파라미터 존재시, 해당 탭 표시
    if (this.$route.query.t === 'i' || this.$route.query.t === 'l' || this.$route.query.t === 'c') {
      this.tab = this.$route.query.t
    } else {
      this.tab = 'i'
    }
    // locale 파라미터 존재시, 해당 locale 설정
    if (this.$route.query.l === 'ko') {
      this.locale = 'ko-KR'
    } else if (this.$route.query.l === 'en') {
      this.locale = 'en-US'
    } else {
      // klaystar default locale is... ko?
    }
    // popup 파라미터 존재시, popupYn 설정
    if (this.$route.query.p) {
      this.popupYn = this.$route.query.p
    }


    // 키 설정
    this.tokenSeq = this.$route.query.s
    // 토큰 정보 조회
    this.selectToken()

    this.selectListMax()
  },
  mounted: function () {},
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
    // 답글 글자수 카운트
    countMyReplyLength() {
      this.myReplyLength = this.myReply.length
    },
    // 답글 등록
    insertTokenCommentReply(item) {
      // console.log('insertTokenComment')

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      // 내용 유무 체크
      if (!this.myReply) {
        this.$noti(this.$q, this.$t('enter_the_reply'))
        return
      }
      
      // 글자수 체크
      if (this.myReply.length > 300) {
        this.$noti(this.$q, this.$t('validation_failed_comment_max_length'))
        return
      }

      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        token_seq: this.tokenSeq,
        seq_parent1: item.seq_parent1,
        seq_parent2: item.seq_parent2,
        seq_parent3: item.seq_parent3,
        seq_parent4: item.seq_parent4,
        seq_parent5: item.seq_parent5,
        group_order: item.group_order, // 답글의 대상 값을 넘겨서 이 값보다 큰 GROUP_ORDER 들은 + 1 씩 UPDATE 처리
        group_layer: item.group_layer + 1,
        contents: this.myReply,
      }
      this.$axios.post('/api/tokencomment/insertTokenCommentReply', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.myReply = ''
            this.$noti(this.$q, this.$t('register_token_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('register_token_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 댓글 글자수 카운트
    countMyContentsLength() {
      this.myContentsLength = this.myContents.length
    },
    // 댓글 등록
    insertTokenComment() {
      // console.log('insertTokenComment')

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      // 내용 유무 체크
      if (!this.myContents) {
        this.$noti(this.$q, this.$t('enter_the_comment'))
        return
      }
      
      if (this.myContents.length > 300) {
        this.$noti(this.$q, this.$t('validation_failed_comment_max_length'))
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // seq_parent는 WAS 쿼리에 selectKey로 설정됨
      const params = {
        uid: this.getUid,
        token_seq: this.tokenSeq,
        contents: this.myContents,
      }
      this.$axios.post('/api/tokencomment/insertTokenComment', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.myContents = ''
            this.$noti(this.$q, this.$t('register_token_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('register_token_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    refresher (done) {
      this.selectListMax()
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.tokenCommentList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMore(1, done)
    },
    loadMore(index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // console.log('index: ' + index)
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        // alert(index)
        // console.log('loadMore called index: ' + index)
        if (index <= this.lastPageNum) {
          this.selectList(index, done)
          if (index === this.lastPageNum) {
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 토근 댓글 리스트 마지막 페이지 조회
    selectListMax() {
      this.$axios.get('/api/tokencomment/selectTokenCommentListLastPageNum',
        {params: {uid: this.getUid, tokenSeq: this.tokenSeq, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 토큰 댓글 리스트 조회
    selectList(idx, done) {
      this.$axios.get('/api/tokencomment/selectTokenCommentList',
        {params: {uid: this.getUid, tokenSeq: this.tokenSeq, pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.tokenCommentList = [] // 리스트 초기화
          }
          this.tokenCommentList = this.tokenCommentList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.tokenCommentList || this.tokenCommentList.length < 1) {
            this.noDataFlag = true
          } else {
            this.noDataFlag = false
          }
          if (done) {
            done()
          }
        })
        .catch((err) => {
          console.log(err)
          if (done) {
            done()
          }
        })
    },
    selectToken() {
      const param = {
        uid: this.getUid,
        seq: this.tokenSeq,
      }
      this.$axios.get('/api/token/selectToken', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // console.log(result.data)
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
      // console.log(url)
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
    shareUrlCopy(value) {
      // console.log('copyAddress function called!')
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      // API 서버로 보내서 og 정보 달고 다시 frontPath로 넘어옴. path: https://nftpy.io/#/info?seq=999&tab=XXX
      const host = location.protocol + '//' + location.host
      const url = host + '/i?s=' + value + '&t=' + this.tab + '&l=' + this.locale.substring(0, 2) // seq, tab, locale

      // 클립보드로 복사하기
      this.$copyText(url).then(this.copyValueSuccess, this.copyValueFail)
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
      // this.$router.go(-1)
      this.$router.push('/token/popList')
    },
    // 나의 댓글 삭제 모달 표시
    deleteComment(commentSeq) {
      this.deleteTargetSeq = commentSeq
      this.confirmDeleteCommentModal = true  
    },
    // 나의 댓글 삭제
    doDeleteCommennt() {
      // console.log('insertTokenComment')
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.deleteTargetSeq,
      }
      this.$axios.post('/api/tokencomment/deleteTokenComment', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.deleteTargetSeq = ''
            this.$noti(this.$q, this.$t('delete_token_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('delete_token_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 나의 댓글 수정 모달 표시
    modifyComment(item) {
      this.modifyTargetSeq = item.seq
      this.modifyCommentValue = item.contents
      this.confirmModifyCommentModal = true  

    },
    // 나의 댓글 수정
    doModifyCommennt() {
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.modifyTargetSeq,
        contents: this.modifyCommentValue,
      }
      this.$axios.post('/api/tokencomment/updateTokenComment', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.modifyTargetSeq = ''
            this.$noti(this.$q, this.$t('modify_token_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('modify_token_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 답글 등록
    showReplyInput(item) {
      // console.log(item.visible_reply_input)

      // 1. 입력값 초기화
      this.myReply = ''

      // 2. 열린 입력창 모두 닫음
      for (let i = 0; i < this.tokenCommentList.length; i++) {
        const commentItem = this.tokenCommentList[i]
        // 현재 아이템 외 전부 닫기
        if (commentItem.seq !== item.seq) {
          commentItem.visible_reply_input = false

          // 해당 child 표시하기
          if (commentItem.seq_parent1 === item.seq_parent1 && item.group_layer === 0) {
            commentItem.visible_child = !item.visible_reply_input
          }
        }
      }

      // 3. 선택한 입력창 표시
      item.visible_reply_input = !item.visible_reply_input
    },

    // 좋아요/싫어요
    likeIt (item, likeCd) {
      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      // like_cd Y:좋아요 N:싫어요 null:중립
      // 1. 화면 조작
      if (likeCd === 'YES') { // 좋아요인 경우
        if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
          item.like_cd = null // 중립으로 설정
          item.like_cnt = Number(item.like_cnt) - 1
        } else {
          if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
            item.dislike_cnt = Number(item.dislike_cnt) - 1
          }
          item.like_cd = 'Y' // 좋아요로 설정
          item.like_cnt = Number(item.like_cnt) + 1
        }
      } else { // 싫어요인 경우
        if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
          item.like_cd = null // 중립으로 설정
          item.dislike_cnt = Number(item.dislike_cnt) - 1
        } else {
          if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
            item.like_cnt = Number(item.like_cnt) - 1
          }
          item.like_cd = 'N' // 싫어요로 설정
          item.dislike_cnt = Number(item.dislike_cnt) + 1
        }
      }

      // 2. 좋아요 테이블 저장
      const params = {
        uid: this.getUid,
        token_comment_seq: item.seq,
        like_cd: item.like_cd,
      }
      this.$axios.post('/api/tokencomment/mergeTokenCommentLike', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            // this.$noti(this.$q, this.$t('modify_token_comment_success'))
          } else {
            // this.$noti(this.$q, this.$t('modify_token_comment_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },


  }
})
</script>

<style scoped>
</style>
