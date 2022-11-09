<template>
  <q-layout view="lHr LpR lFf" class="">
    <!-- <q-header elevated> -->
    <!-- <q-header class="header" style="background-image: url(images/star1.jpg)"> -->
    <q-header class="header shadow-1">
      <q-toolbar class="page-default">

        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="text-bold">
            <table border="0" width="100%" style="margin: 0px 0px 0px 0px;" cellpadding="0" cellspacing="0">
              <tr>
                <!-- <td align="center" width="28" rowspan="2">
                  <a style="cursor: pointer;" @click="goHome">
                    <img src="logo/logo_nftpy.png" style="width: 24px; margin-top: 8px;" />
                  </a>
                </td> -->
                <td align="left" rowspan="2" width="72">
                  <div class="row">
                    <div class="q-pl-xs" style="margin-top: 0px;">
                      <a style="cursor: pointer;" @click="goHome">
                        <span class="text-red">N</span>
                        <span class="text-orange">F</span>
                        <span class="text-blue">T</span>
                        <span class="text-green">P</span>
                        <span class="text-purple">Y</span>
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="q-pl-xs">
                    <a style="cursor: pointer;" @click="goHome">
                      <!--<span class="text-body2 text-orange text-weight-thin">Beta</span>-->
                      <span class="text-body2 text-primary">Beta</span>
                    </a>
                  </div>
                </td>
                <!-- 관리자 수정용 -->
                <!-- <td v-if="isAdmin" align="left"><q-btn to="/token/newList" flat size="lg" class="text-white" label="New Tokens" style="width: 120px;" no-caps /></td> -->
              </tr>
              <tr>
                <td style="height: 10px;">
                </td>
              </tr>
            </table>
          </div>
        </q-toolbar-title>

<!--
  if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}
-->
        <!--
        <q-select
          v-model="locale"
          :options="localeOptions"
          dense
          borderless
          emit-value
          map-options
          style="width: 55px"
          @update:model-value="onChangeLocale"
        />
        -->

        &nbsp;&nbsp;&nbsp;

        <!-- wallet icon -->
        <div v-if="getUid">
          <q-btn flat dense rounded @click="toggleRightDrawer">
            <img v-if="getWalletType === 'kaikas'" src="logo/logo_kaikas.png" width="20" />
            <img v-else-if="getWalletType === 'metamask'" src="logo/logo_metamask.png" width="25" />
            <img v-else-if="getWalletType === 'klip'" src="logo/klip.svg" width="30" />
            <img v-else src="logo/logo_nftpy.png" width="20" />
            <span v-if="getWalletAddressLast" class="text-black text-weight-bold text-lowercase q-pl-xs">{{ getWalletAddressLast }}</span>
            <span v-else class="text-black text-weight-bold text-lowercase q-pl-xs">No Wallet</span>
          </q-btn>
        </div>
        <q-btn
          v-else
          flat
          dense
          round
          color="black"
          icon="account_balance_wallet"
          aria-label="Menu"
          @click="showWalletModal"
        />

        &nbsp;&nbsp;

        <q-btn
          flat
          dense
          round
          color="black"
          icon="shopping_bag"
          @click="goCart"
        >
          <q-badge color="red" floating>3</q-badge>
        </q-btn>

        <q-btn
          flat
          dense
          round
          color="black"
          icon="more_vert"
          aria-label="Menu"
        >

          <q-menu>
            <div class="no-wrap q-pa-sm">

              <!-- acount information -->
              <div class="row justify-center q-pb-xs">
                <div class="col-12" style="word-break: break-all;">
                  <table border="0" style="width: 100%;">
                    <tr>
                      <td align="center" width="100">
                        <div v-if="getUid">
                          <div>
                            <a style="cursor: pointer;" @click="goMypage">
                              <q-avatar size="60px">
                                <img v-if="getProfileImage" :src="getProfileImage">
                                <img v-else src="https://cdn.quasar.dev/img/boy-avatar.png">
                              </q-avatar>
                            </a>
                          </div>
                          <div class="q-pt-sm">
                            <q-btn
                              color="primary"
                              outline
                              rounded
                              size="sm"
                              v-close-popup
                              style="width: 60px"
                              @click="goEditUserInfo"
                            >
                              {{ $t('edit') }}
                            </q-btn>
                          </div>
                        </div>
                        <div v-else>
                          <q-btn
                            color="primary"
                            push
                            size="md"
                            no-caps
                            v-close-popup
                            style="width: 100%"
                            @click="showWalletModal"
                          >
                            {{ $t('login') }}
                          </q-btn>
                          <!-- <q-list bordered separator>
                            !-- 1. klaystar --
                            <q-item clickable class="text-center" v-close-popup @click="connectWallet('klaystar')">
                              <q-item-section avatar>
                                <img src="logo/logo_nftpy.png" width="32" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ $t('wallet_nftpy') }}</q-item-label>
                              </q-item-section>
                            </q-item>
                            !-- 2. kaikas --
                            <q-item clickable class="text-center" v-close-popup @click="connectWallet('kaikas')">
                              <q-item-section avatar>
                                <img src="logo/logo_kaikas.png" width="32" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ $t('wallet_kaikas') }}</q-item-label>
                              </q-item-section>
                            </q-item>
                            !-- 3. MetaMask --
                            <q-item clickable class="text-center" v-close-popup @click="connectWallet('metamask')">
                              <q-item-section avatar>
                                <img src="logo/logo_metamask.png" width="32" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ $t('wallet_metamask') }}</q-item-label>
                              </q-item-section>
                            </q-item>
                            !-- 4. Klip --
                            <q-item clickable class="text-center" v-close-popup @click="connectWallet('klip')">
                              <q-item-section avatar>
                                <img src="logo/klip.svg" width="32" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ $t('wallet_klip') }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list> -->
                        </div>
                      </td>
                      <td v-if="getUid" align="left">
                        <a style="cursor: pointer;" @click="goMypage">
                          <div class="q-pb-xs q-pr-sm">
                            <span class="col-12 text-weight-bold">{{ getUid }}</span>
                          </div>
                          <div class="q-pb-xs">
                            <span v-if="getNickname" class="col-12">{{ getNickname }}</span>
                            <span v-else class="col-12">No nickname</span>
                          </div>
                          <div class="q-pb-xs">
                            <span v-if="getName" class="col-12">{{ getName }}</span>
                            <span v-else class="col-12">No name</span>
                          </div>
                          <div class="q-pb-xs">
                            <span v-if="getWalletAddress" class="col-12">{{ getWalletAddressShort }}</span>
                            <span v-else class="col-12">No wallet address</span>
                          </div>
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div v-if="getUid" class="q-pb-xs">
                <q-separator />
              </div>


              <!-- settings -->
              <div class="q-pt-xs q-pb-xs">
                <!-- <div class="text-h6 q-mb-md">Settings</div> -->
                <div class="row text-center">
                  <div class="col q-pl-xs q-pr-sm">
                    <q-btn
                      v-if="locale === 'ko-KR'"
                      color="primary"
                      push
                      size="md"
                      label="English"
                      no-caps
                      @click="changeLocale('en-US')"
                    />
                    <q-btn
                      v-if="locale !== 'ko-KR'"
                      color="grey"
                      push
                      size="md"
                      label="English"
                      no-caps
                      disable
                    />
                  </div>
                  <div class="col q-pl-sm q-pr-xs">
                    <q-btn
                      v-if="locale === 'en-US'"
                      color="primary"
                      push
                      size="md"
                      label="Korean"
                      no-caps
                      @click="changeLocale('ko-KR')"
                    />
                    <q-btn
                      v-if="locale !== 'en-US'"
                      color="grey"
                      push
                      size="md"
                      label="Korean"
                      no-caps
                      disable
                    />
                  </div>
                </div>

              </div>

            </div>
          </q-menu>

        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      dark
      show-if-above
    >
      <q-toolbar class="page-default text-left shadow-1">
        &nbsp;
        <q-toolbar-title>
          <a style="cursor: pointer;" @click="toggleLeftDrawer">
            <!-- <q-avatar>
              <img src="logo/logo_nftpy.png" style="width: 24px; height: 24px; margin-top: 4px;" />
            </q-avatar> -->

            <q-icon name="close" />
            &nbsp;
            <span class="text-body2">
              <b>{{ $t('close') }}</b>
            </span>
          </a>
        </q-toolbar-title>
      </q-toolbar>

      <!-- element 가 resize 되면 onResize 호출 -->
      <q-resize-observer @resize="onResize" />

      <q-scroll-area dark :vertical-thumb-style="{width: '10px'}" :style="`width: 100%; height: ${ scrollAreaHeight }px;`">
      
    
        <q-list>
          <!--
          <q-item-label
            class="bg-grey-4"
          >
            <table v-if="getUid" border="0" width="100%">
              <tr>
                <td align="center">
                  <a style="cursor: pointer;" @click="goEditUserInfo">
                    <span class="text-white"><b>{{ getUid }}</b></span>
                    <span v-if="isAdmin" class="text-white">
                      &nbsp;[ADMIN]
                    </span>
                    &nbsp;
                    <q-icon name="account_box" size="sm" color="white" />
                  </a>
                </td>
              </tr>
            </table>
            <table border="0" width="100%">
              <tr>
                <td align="center"><b>Beyond Blockchain Framework</b></td>
              </tr>
            </table>
            <table border="0" width="100%">
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td align="center">
                  <q-btn v-if="getUid" outline style="color: goldenrod; width: 100%;" :label="$t('logout')" @click="logout" rounded />
                  <q-btn v-if="!getUid" outline style="color: goldenrod; width: 100%;" :label="$t('login')" @click="showLoginModal" rounded />
                </td>
              </tr>
            </table>
          </q-item-label>
          -->

          <!-- <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          /> -->

          <!-- MYPAGE -->
          <!-- <q-item clickable to="/mypage">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="person_pin" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_mypage') }}</q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- 1. HOME -->
          <q-item clickable to="/">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="home" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_home') }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- MY AIRDROP -->
          <!-- <q-item v-if="getUid" clickable to="/airdrop">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="auto_awesome" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_my_airdrop_list') }}</q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- WALLET -->
          <!-- <q-item v-if="!getUid" clickable @click="showWalletModal">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="account_balance_wallet" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_login') }}</q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- SHOP - Phone Case -->
          <q-item clickable to="/shop">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="phone_iphone" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_shop_phone_case') }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- INTRODUCTION -->
          <q-item clickable to="/introduction">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="apartment" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_introduction') }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- NOTICE -->
          <q-item clickable to="/notice">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="notifications_active" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_notice_list') }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- CONTACT -->
          <q-item clickable to="/inquiry">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="email" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_inquiry_list') }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- CART -->
          <!-- <q-item clickable to="/cart/cartList">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="shopping_cart" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_cart') }}</q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- LINKTREE -->
          <!-- <q-item to="#">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <img src="images/logo-128x128.png" style="width: 24px; margin-bottom: 5px;" />
            </q-item-section>
            <q-item-section>
              <a @click="openUrl('https://linktr.ee/klaystar')">
                <q-item-label class="text-white">{{ $t('menu_linktree') }}</q-item-label>
              </a>
            </q-item-section>
          </q-item> -->

          <!-- HOLDER -->
          <!-- <q-item clickable to="/holder">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="groups" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_holder_list') }}</q-item-label>
            </q-item-section>
          </q-item> -->
        

          <!-- SUPPORT -->
          <!-- <q-item clickable to="/support">
            &nbsp;&nbsp;&nbsp;
            <q-item-section avatar>
              <q-icon name="help" style="width: 20px; height: 20px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('menu_support') }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <div v-if="isAdmin">

            <q-separator color="primary" />

            <!-- ADMIN USER LIST -->
            <q-item clickable to="/admin/adminUserList">
              &nbsp;&nbsp;&nbsp;
              <q-item-section avatar>
                <q-icon name="account_circle" style="width: 20px; height: 20px;" />
              </q-item-section>
              <q-item-section>
                <q-item-label>[A] {{ $t('menu_admin_user_list') }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- ADMIN MAINTENANCE -->
            <q-item clickable to="/admin/adminMaintenance">
              &nbsp;&nbsp;&nbsp;
              <q-item-section avatar>
                <q-icon name="settings" style="width: 20px; height: 20px;" />
              </q-item-section>
              <q-item-section>
                <q-item-label>[A] {{ $t('menu_admin_maintenance') }}</q-item-label>
              </q-item-section>
            </q-item>

          </div>

        </q-list>
      
      </q-scroll-area>
      
    </q-drawer>


    <q-drawer
      side="right"
      v-model="rightDrawerOpen"
      bordered
    >
      <q-toolbar class="page-default text-center shadow-1" style="background: rgba(237,237,237)">
        <q-icon name="account_circle" size="sm" />
        <q-toolbar-title>
          <span class="text-body2"><b>{{ $t('account_information') }}</b></span>
        </q-toolbar-title>
        <q-icon name="close" size="sm" @click="toggleRightDrawer" style="cursor: pointer;" />
      </q-toolbar>

      <div class="no-wrap q-pa-sm">

        <!-- acount information -->
        <div class="row justify-center">
          <div v-if="getUid" class="col-12" style="word-break: break-all;">
            <table border="0" style="width: 100%;">
              <tr>
                <td align="center" width="100">
                  <div>
                    <div>
                      <a style="cursor: pointer;" @click="goMypage">
                        <q-avatar size="60px">
                          <img v-if="getProfileImage" :src="getProfileImage">
                          <img v-else src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                      </a>
                    </div>
                    <div class="q-pt-sm">
                      <q-btn
                        color="primary"
                        outline
                        rounded
                        size="sm"
                        style="width: 60px"
                        @click="goEditUserInfo"
                      >
                        {{ $t('edit') }}
                      </q-btn>
                    </div>
                  </div>
                </td>
                <td align="left">
                  <div class="q-pb-xs">
                    <span class="col-12 text-weight-bold">{{ getUid }}</span>
                  </div>
                  <div class="q-pb-xs">
                    <span v-if="getNickname" class="col-12">{{ getNickname }}</span>
                    <span v-else class="col-12">No nickname</span>
                  </div>
                  <div class="q-pb-xs">
                    <span v-if="getName" class="col-12">{{ getName }}</span>
                    <span v-else class="col-12">No name</span>
                  </div>
                  <div class="">
                    <span v-if="getWalletAddress" class="col-12" style="cursor: pointer;">
                      <a @click="copyValue(getWalletAddress)">
                        {{ getWalletAddress }}
                      </a>
                    </span>
                    <span v-else class="col-12">No wallet address</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center">
                  <div class="q-pt-xs">
                    <!-- <q-btn outline dense style="color: goldenrod; width: 90%;" :label="$t('logout')" @click="logout" rounded /> -->
                    <q-btn
                      color="primary"
                      push
                      size="md"
                      v-close-popup
                      style="width: 50%"
                      @click="logout"
                    >
                      {{ $t('logout') }}
                    </q-btn>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div v-else class="col-12 text-center" style="word-break: break-all;">
            <q-btn
              color="primary"
              push
              size="md"
              v-close-popup
              style="width: 50%"
              @click="showWalletModal"
            >
              {{ $t('login') }}
            </q-btn>
          </div>
        </div>

      </div>

      <div class="q-pb-xs"></div>

      <q-separator />

      <!-- Wallet Infomation -->
      <!-- <q-toolbar class="page-default text-center" style="background: rgba(237, 237, 237, .6);">
        <q-icon name="account_balance_wallet" size="sm" />
        <q-toolbar-title>
          <span class="text-body2"><b>{{ $t('wallet_information') }}</b></span>
        </q-toolbar-title>
      </q-toolbar>
      <q-list>
        <q-item-label>
        </q-item-label>

        <q-item clickable to="/token/register">
          &nbsp;&nbsp;&nbsp;
          <q-item-section avatar>
            <q-icon name="add_circle" style="width: 20px; height: 20px;" />
          </q-item-section>
          <q-item-section>
            <q-item-label>1. {{ $t('menu_register_token') }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list> -->
    </q-drawer>



    <!-- <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog v-model="msgBox">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <img src="logo/logo_nftpy.png" style="width: 24px; height: 24px;" />
        </q-avatar>

        <q-toolbar-title>
          <span class="text-weight-bold">NFTPY</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        {{ $t('under_construction')}}
      </q-card-section>
    </q-card>
  </q-dialog>

  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
  <WalletModal ref="refWalletModal" @callback-wallet="callbackWallet" />
  <IframeModal ref="refIframeModal" />

</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
// import LoginModal from 'components/login/login-modal'

import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      scrollAreaHeight: 2000, // 좌측메뉴 스크롤 DIV 높이
      scrollAreaHeightMinus: 50, // 좌측메뉴 스크롤 DIV 높이에서 차감할 높이
      // uid: '',
      // loginModal: false,
      test: '',
      // nickname: '',
      // profile_image: '',
      // name: '',
      // mobile_no: '',
      wallet_address: '',
      // ucode: '',
      // birth: '',
      // gender: '',
      // nation: '',
      // tel_no: '',
      // thumbnail: '',
      // introduce: '',
      // push_agree_yn: '',
      // adcd: '',
      // id_card_image: '',
      // home_address: '',
      // home_address_image: '',
      // business_registration_no: '',
      // business_license_image: '',
      // company_address: '',
      // company_address_image: '',
      // company_tel_no: '',
    }
  },
  components: {
    // EssentialLink,
    // LoginModal,
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getName () {
      return this.$store.getters.getName
    },
    getNickname () {
      return this.$store.getters.getNickname
    },
    getProfileImage () {
      return this.$store.getters.getProfileImage
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    getWalletAddressShort () {
      const address = this.$store.getters.getWalletAddress
      if (address) {
        return address.substr(0, 6) + '...' + address.substr(address.length - 4, address.legnth)
      } else {
        return address
      }
    },
    getWalletAddressLast () {
      const address = this.$store.getters.getWalletAddress
      if (address) {
        return '...' + address.substr(address.length - 4, address.legnth)
      } else {
        return address
      }
    },
    getMobileNo () {
      return this.$store.getters.getMobileNo
    },
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
  },
  created: function() {
    // // 디바이스 설정
    // this.setDevice()

    // 쿠키에 UID와 AUTH_KEY가 있으면 유저정보 바인딩
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
    const authKey = localStorage.getItem('AUTH_KEY') ? localStorage.getItem('AUTH_KEY') : this.$cookie.get('AUTH_KEY')
    if (uid && authKey) {
      this.$store.dispatch('setUid', uid)
      const adcd =  localStorage.getItem('ADCD') ? localStorage.getItem('ADCD') : this.$cookie.get('ADCD')
      this.$store.dispatch('setAdcd', adcd)
    }

    // 쿠키에 LOCALE이 있으면 설정
    const cookieLocale = localStorage.getItem('LOCALE') ? localStorage.getItem('LOCALE') : this.$cookie.get('LOCALE')
    // alert('cookieLocale: ' + cookieLocale)
    if (cookieLocale && cookieLocale !== 'null') {
      this.locale = cookieLocale
    }

    // CORDOVA APP에서 로그인 후 WEB으로 왔을 때 처리
    if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && this.$route.query.uid && this.$route.query.authKey
      // && this.$q.platform.is.mobile === true && (this.$q.platform.is.platform === 'andriod' || this.$q.platform.is.platform === 'ios')
    ) {
      // localStorage에 locale 값이 있으면 localStorage 값으로 설정, 없으면 this.$route.query.locale 설정
      // if (this.$route.query.locale) {
      //   this.locale = this.$route.query.locale
      //   alert('this.$route.query.locale: ' + this.$route.query.locale)
      //   this.$cookie.set('LOCALE', this.$route.query.locale)
      // }
      const localStorageLocale = localStorage.getItem('LOCALE')
      if (localStorageLocale && localStorageLocale !== 'null') {
        this.locale = localStorageLocale
        this.$cookie.set('LOCALE', localStorageLocale)
      } else {
        if (this.$route.query.locale && this.$route.query.locale !== 'null') {
          this.locale = this.$route.query.locale
        }
        this.$cookie.set('LOCALE', this.$route.query.locale)
        localStorage.setItem('LOCALE', this.$route.query.locale, 365) // APP용
      }
      // 사용자 정보 설정
      this.$store.dispatch('setUid', this.$route.query.uid)
      this.$store.dispatch('setAdcd', this.$route.query.adcd)
      localStorage.setItem('UID', this.$route.query.uid, 365) // APP용
      localStorage.setItem('AUTH_KEY', this.$route.query.authKey, 365) // APP용
      localStorage.setItem('ADCD', this.$route.query.adcd, 365) // APP용

      // 로그인 처리
      this.doLogin()
    }

    // 계정 정보 조회
    this.selectUser()

    // 화면 크기에 따른 좌측 메뉴 스크롤 DIV 의 Height 설정
    this.onResize()
  },
  mounted: function() {
    // this.$refs.refLoginModal.show()
    // console.log(this.$q.platform.is)
    if (this.$q.platform.is.desktop) {
      // 지갑주소 변경 이벤트 구독
      ethereum.on('accountsChanged', this.walletAccountsChangedMetamask)
      klaytn.on('accountsChanged', this.walletAccountsChangedKaikas)

      // 체인 변경 이벤트 구독
      ethereum.on('chainChanged', this.handleChainChangedMetamask);
      klaytn.on('networkChanged', this.handleChainChangedKaikas)
    }
  },

  setup () {
    // const $store = useStore()
    // const loginModalFlag = computed({
    //   get: () => $store.state.common.loginModalFlag,
    //   set: val => {
    //     $store.commit('common/updateLoginModalFlag', val)
    //   }
    // })

    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    const { locale } = useI18n({ useScope: 'global' })

    return {
      // essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },

      locale,
      localeOptions: [
        { value: 'en-US', label: 'EN' },
        { value: 'ko-KR', label: 'KO' },
      ],
      msgBox: ref(false),

      // loginModalFlag,
    }
  },
  methods: {
    onResize() {
      this.scrollAreaHeight = window.innerHeight - this.scrollAreaHeightMinus
      // console.log(window.innerHeight)
      // console.log(this.scrollAreaHeight)
    },
    walletAccountsChangedMetamask(accounts) {
      // console.log(accounts)
      this.$store.dispatch('setWalletType', 'metamask')
      this.$store.dispatch('setWalletAddress', accounts[0])

      // ■■■ 회원정보 체크, 존재하지 않으면 가입화면으로 이동
      this.checkUser(accounts[0])
    },
    walletAccountsChangedKaikas(accounts) {
      // console.log(accounts)
      this.$store.dispatch('setWalletType', 'kaikas')
      this.$store.dispatch('setWalletAddress', accounts[0])

      // ■■■ 회원정보 체크, 존재하지 않으면 가입화면으로 이동
      this.checkUser(accounts[0])
    },
    handleChainChangedMetamask(chainId) {
      // console.log(chainId) // eth mainnet: 0x1, cypress: 0x2019, baobab: 0x3e9
      // We recommend reloading the page, unless you must do otherwise
      // window.location.reload();
      this.checkChain()
    },
    handleChainChangedKaikas(chainId) {
      // console.log(chainId) // mainnet: 8217, baobab: 1001
      // We recommend reloading the page, unless you must do otherwise
      // window.location.reload();
      this.checkChain()
    },
    async checkChain() {
      // 로그인 상태가 아니면 처리하지 않음
      if(!this.$store.getters.getWalletAddress) {
        return
      }

      // 메인넷 확인
      const walletType = this.$store.getters.getWalletType
      let chainId = ''
      if (walletType === 'kaikas') {
        chainId = klaytn.networkVersion
      } else if (walletType === 'metamask') {
        chainId = await ethereum.request({ method: 'eth_chainId' })
      } else {
        return true
      }
      if (chainId !== 8217 && chainId !== '0x2019') {
        // 메인넷이 아니므로 로그아웃
        this.logout()
        this.$noti(this.$q, this.$t('set_to_the_mainnet'))
        return false
      }
      return true
    },
    async checkUser(walletAddress) {
      // 메인넷 확인
      const isMainnet = await this.checkChain()
      if (!isMainnet) {
        return
      }

      const param = {
        wallet_address: walletAddress,
      }
      // 계정 조회
      this.$axios.get('/api/user/selectUserByWalletAddress', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // 회원정보가 존재하는 경우
            // console.log(result.data)
            this.$store.dispatch('setUid', result.data.uid)
            this.$store.dispatch('setAdcd', result.data.adcd)
            this.$store.dispatch('setName', result.data.name)
            this.$store.dispatch('setNickname', result.data.nickname)
            this.$store.dispatch('setProfileImage', result.data.profile_image)
            // this.$store.dispatch('setWalletType', result.data.wallet_type)
            // this.$store.dispatch('setWalletAddress', result.data.wallet_address)
            this.$store.dispatch('setMobileNo', result.data.mobile_no)

            // 로그인 정보 쿠키에 저장
            this.$store.dispatch('setUid', result.data.uid)
            this.$store.dispatch('setAdcd', result.data.adcd)
            this.$cookie.set('UID', result.data.uid, 365)
            this.$cookie.set('AUTH_KEY', result.data.auth_key, 365)
            this.$cookie.set('ADCD', result.data.adcd, 365)
            localStorage.setItem('UID', result.data.uid, 365)
            localStorage.setItem('AUTH_KEY', result.data.auth_key, 365)
            localStorage.setItem('ADCD', result.data.adcd, 365)

            // console.log(this.$router.currentRoute.value)
            // 회원가입 화면에서 기존회원 지갑주소로 변경시 홈으로 이동
            if (this.$router.currentRoute.value.fullPath == '/join') {
              this.$router.push('/')
            }
          } else {
            // 회원정보가 존재하지 않는 경우 -> 회원가입 화면으로 이동
            // this.$noti(this.$q, this.$t('request_data_failed'))
            this.$router.push('/join')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
            /*
            this.nickname = result.data.nickname
            this.profile_image = result.data.profile_image
            this.name = result.data.name
            this.mobile_no = result.data.mobile_no
            this.wallet_address = result.data.wallet_address
            this.id_card_image = result.data.id_card_image
            this.home_address = result.data.home_address
            this.home_address_image = result.data.home_address_image
            this.business_registration_no = result.data.business_registration_no
            this.business_license_image = result.data.business_license_image
            this.company_address = result.data.company_address
            this.company_address_image = result.data.company_address_image
            this.company_tel_no = result.data.company_tel_no
            */

            this.$store.dispatch('setAdcd', result.data.adcd)
            this.$store.dispatch('setName', result.data.name)
            this.$store.dispatch('setNickname', result.data.nickname)
            this.$store.dispatch('setProfileImage', result.data.profile_image)
            this.$store.dispatch('setWalletType', result.data.wallet_type)
            this.$store.dispatch('setWalletAddress', result.data.wallet_address)
            this.$store.dispatch('setMobileNo', result.data.mobile_no)
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goEditUserInfo() {
      this.$router.push('/mypage')
    },
    // // 디바이스 설정 - P: 데스크탑, M: 모바일웹, android: 안드로이드 앱, ios: 아이폰 앱
    // setDevice() {
    //   if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
    //     if (this.$q.platform.is.ios) {
    //       this.$device = 'ios'
    //     } else {
    //       this.$device = 'android'
    //     }
    //   } else if (this.$q.platform.is.mobile) {
    //     this.$device = 'M'
    //   } else {
    //     this.$device = 'P'
    //   }
    // },
    // CORDOVA APP에서 이동한 경우 로그인 처리
    async doLogin () {
      const userVo = {
        uid: this.$route.query.uid,
        auth_key: this.$route.query.authKey,
      }
      // 로그인 처리
      // alert(JSON.stringify(userVo))
      const result = await this.$axios.post('/api/login/doLogin', userVo)
      // alert(JSON.stringify(result))
      if (result.data && result.data.resultCd === 'SUCCESS') {
        // this.doLogin(result.data)
        // console.log(result.data)
        // this.$noti(this.$q, this.$t('로그인 성공'))

        // 로그인 정보 쿠키에 저장
        this.$store.dispatch('setUid', result.data.uid)
        this.$store.dispatch('setAdcd', result.data.adcd)
        this.$cookie.set('UID', result.data.uid, 365)
        this.$cookie.set('AUTH_KEY', result.data.auth_key, 365)
        this.$cookie.set('ADCD', result.data.adcd, 365)
        localStorage.setItem('UID', result.data.uid, 365)
        localStorage.setItem('AUTH_KEY', result.data.auth_key, 365)
        localStorage.setItem('ADCD', result.data.adcd, 365)
      } else {
        this.$noti(this.$q, this.$t('로그인 실패'))
      }
    },
    changeLocale(selectedLocale) {
      this.locale = selectedLocale

      this.onChangeLocale()
    },
    // locale 쿠키에 설정 - APP에서 WEB의 카카오 로그인시 redirect에서 필요
    onChangeLocale() {
      this.$cookie.set('LOCALE', this.locale)
      localStorage.setItem('LOCALE', this.locale, 365) // APP용
    },
    showLoginModal() {
      this.$refs.refLoginModal.show()
    },
    showWalletModal() {
      this.$refs.refWalletModal.show()
    },
    async logout() {
      const userVo = {
        uid: localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID'),
        auth_key: localStorage.getItem('AUTH_KEY') ? localStorage.getItem('AUTH_KEY') : this.$cookie.get('AUTH_KEY'),
      }
      const result = await this.$axios.post('/api/login/doLogout', userVo)
      if (result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        this.$noti(this.$q, this.$t('logout_completed'))

        // 로그인 정보 쿠키에서 삭제
        this.$store.dispatch('setUid', '')
        this.$store.dispatch('setAdcd', '')
        this.$store.dispatch('setName', '')
        this.$store.dispatch('setNickname', '')
        this.$store.dispatch('setProfileImage', '')
        this.$store.dispatch('setWalletType', '')
        this.$store.dispatch('setWalletAddress', '')
        this.$store.dispatch('setMobileNo', '')
        this.$cookie.set('UID', '')
        this.$cookie.set('AUTH_KEY', '')
        this.$cookie.set('ADCD', '')
        localStorage.setItem('UID', '')
        localStorage.setItem('AUTH_KEY', '')
        localStorage.setItem('ADCD', '')

        // this.$router.push('/')
      } else {
        this.$noti(this.$q, this.$t('logout_failed'))
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

      // 계정 정보 조회
      // this.selectUser()
    },
    callbackWallet(walletVo) {
      // console.log('callbackWallet in MainLayout')
      // this.$store.dispatch('setWalletAddress', walletVo.wallet_address)
    },
    openUrl(url) {
      // openURL(url)
      window.open(url, '_system')

      // // cordova인 경우 IframeModal 표시
      // if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
      //   this.$refs.refIframeModal.url = url
      //   this.$refs.refIframeModal.show()
      // } else {
      //   window.open(url, '_system')
      // }
    },
    goHome() {
      this.$router.push('/web')
    },
    goCart() {
      this.$router.push('/cart')
    },
    goMypage() {
      this.$router.push('/mypage')
    },
    // connect wallet
    connectWallet(walletType) {
      if (walletType === 'klaystar') {
        this.showLoginModal()
      } else if (walletType === 'kaikas') {
        this.$noti(this.$q, this.$t('wallet_kaikas'))
      } else if (walletType === 'metamask') {
        this.$noti(this.$q, this.$t('wallet_metamask'))
      } else if (walletType === 'klip') {
        this.$noti(this.$q, this.$t('wallet_klip'))
      }

      // this.msgBox = true

      // // this.$axios.get(this.$store.state.apiServerIp + '/api/rank/selectRewardRankList',
      // this.$axios.get('/api/user/selectUser',
      //   {params: {uid: 1}})
      //   .then((result) => {
      //     console.log(JSON.stringify(result.data))
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     done()
      //   })
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
  },
})
</script>

<style lang="sass">
@supports (backdrop-filter: none)
  .header
    background-color: rgba(229,229,229,.7)
    backdrop-filter: blur(3px)
@supports not (backdrop-filter: none)
  .header
    background-color: black
</style>