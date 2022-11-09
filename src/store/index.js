import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // common
    },
    state: {
      loginModal: false,
      uid: '',
      adcd: '', // 권한코드
      name: '',
      nickname: '',
      profileImage: '',
      walletType: '',
      walletAddress: '',
      mobileNo: '',
      paymentGoodName: '', // 결제 상품명
      paymentPayCode: '', // 결제 코드 - CREATE_TOKEN, ...
      paymentCustomData: '', // 결제 - 상점 데이터
      keyword: '', // 검색 키워드
    },
    getters: {

      getUid: function (state) {
        return state.uid
      },
      getAdcd: function (state) {
        return state.adcd
      },
      getName: function (state) {
        return state.name
      },
      getNickname: function (state) {
        return state.nickname
      },
      getProfileImage: function (state) {
        return state.profileImage
      },
      getWalletType: function (state) {
        return state.walletType
      },
      getWalletAddress: function (state) {
        return state.walletAddress
      },
      getMobileNo: function (state) {
        return state.mobileNo
      },
      getPaymentGoodName: function (state) {
        return state.paymentGoodName
      },
      getPaymentPayCode: function (state) {
        return state.paymentPayCode
      },
      getPaymentCustomData: function (state) {
        return state.paymentCustomData
      },
      
      getKeyword: function (state) {
        return state.keyword
      },

      // getCartCount: function (state) {
      //   return state.cartCount
      // },
      // getAccessToken: function (state) {
      //   return state.kakaoLoginVO.access_token
      // },
      // getId: function (state) {
      //   return state.kakaoLoginVO.id
      // },
      // getNickname: function (state) {
      //   return state.kakaoLoginVO.nickname
      // },
      // getProfileImage: function (state) {
      //   return state.kakaoLoginVO.profile_image
      // },
      // getThumbnailImage: function (state) {
      //   return state.kakaoLoginVO.thumbnail_image
      // },
      // getEmail: function (state) {
      //   return state.kakaoLoginVO.email
      // }
    },
    mutations: {
      SET_UID (state, uid) {
        state.uid = uid
      },
      SET_ADCD (state, adcd) {
        state.adcd = adcd
      },
      SET_NAME (state, name) {
        state.name = name
      },
      SET_NICKNAME (state, nickname) {
        state.nickname = nickname
      },
      SET_PROFILE_IMAGE (state, profileImage) {
        state.profileImage = profileImage
      },
      SET_WALLET_TYPE (state, walletType) {
        state.walletType = walletType
      },
      SET_WALLET_ADDRESS (state, walletAddress) {
        state.walletAddress = walletAddress
      },
      SET_MOBILE_NO (state, mobileNo) {
        state.mobileNo = mobileNo
      },
      SET_PAYMENT_GOOD_NAME (state, paymentGoodName) {
        state.paymentGoodName = paymentGoodName
      },
      SET_PAYMENT_PAY_CODE (state, paymentPayCode) {
        state.paymentPayCode = paymentPayCode
      },
      SET_PAYMENT_CUSTOM_DATA (state, paymentCustomData) {
        state.paymentCustomData = paymentCustomData
      },

      SET_KEYWORD (state, keyword) {
        state.keyword = keyword
      },
      
      SET_LOGIN_MODAL_FLAG (state, flag) {
        state.loginModal = flag
      },
      updateDrawerState (state, opened) {
        state.drawerState = opened
      },
      updatePageMeta (state, meta) {
        state.pageMeta = {
          title: '',
          hash: '',
          icon: '',
          iframeTabs: false,
          backRoute: '/main',
          tabs: [],
          ...meta
        }
      },
      setKakaoLoginVO: function (state, payload) {
        state.kakaoLoginVO = payload
        /*
        state.kakaoLoginVO.access_token = payload.access_token
        state.kakaoLoginVO.token_type = payload.token_type
        state.kakaoLoginVO.refresh_token = payload.refresh_token
        state.kakaoLoginVO.expires_in = payload.expires_in
        state.kakaoLoginVO.scope = payload.scope
        state.kakaoLoginVO.refresh_token_expires_in = payload.refresh_token_expires_in
        state.kakaoLoginVO.id = payload.id
        state.kakaoLoginVO.nickname = payload.nickname
        state.kakaoLoginVO.profile_image = payload.profile_image
        state.kakaoLoginVO.thumbnail_image = payload.thumbnail_image
        state.kakaoLoginVO.has_email = payload.has_email
        state.kakaoLoginVO.is_email_valid = payload.is_email_valid
        state.kakaoLoginVO.is_email_verified = payload.is_email_verified
        state.kakaoLoginVO.email = payload.email
        state.kakaoLoginVO.has_age_range = payload.has_age_range
        state.kakaoLoginVO.age_range = payload.age_range
        state.kakaoLoginVO.has_birthday = payload.has_birthday
        state.kakaoLoginVO.birthday = payload.birthday
        state.kakaoLoginVO.has_gender = payload.has_gender
        state.kakaoLoginVO.gender = payload.gender
        */
      }
    },
    actions: {
      test: function (context, payload) {
        return context.commit('SET_LOGIN_MODAL_FLAG', payload)
      },
      SET_LOGIN_MODAL_FLAG: function (context, payload) {
        // commit 의 대상인 addCounter 는 mutations 의 메서드를 의미한다.
        return context.commit('setKakaoLoginVO', payload)
      },
      setUid: function (context, payload) {
        return context.commit('SET_UID', payload)
      },
      setAdcd: function (context, payload) {
        return context.commit('SET_ADCD', payload)
      },
      setName: function (context, payload) {
        return context.commit('SET_NAME', payload)
      },
      setNickname: function (context, payload) {
        return context.commit('SET_NICKNAME', payload)
      },
      setProfileImage: function (context, payload) {
        return context.commit('SET_PROFILE_IMAGE', payload)
      },
      setWalletType: function (context, payload) {
        return context.commit('SET_WALLET_TYPE', payload)
      },
      setWalletAddress: function (context, payload) {
        return context.commit('SET_WALLET_ADDRESS', payload)
      },
      setMobileNo: function (context, payload) {
        return context.commit('SET_MOBILE_NO', payload)
      },

      setPaymentGoodsName: function (context, payload) {
        return context.commit('SET_PAYMENT_GOOD_NAME', payload)
      },
      setPaymentPayCode: function (context, payload) {
        return context.commit('SET_PAYMENT_PAY_CODE', payload)
      },
      setPaymentCustomData: function (context, payload) {
        return context.commit('SET_PAYMENT_CUSTOM_DATA', payload)
      },

      setKeyword: function (context, payload) {
        return context.commit('SET_KEYWORD', payload)
      },


      
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
