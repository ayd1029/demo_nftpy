<template>
  <!-- <q-dialog v-model="walletModal" style="min-width: 365px; min-height: 365px; max-width: 500px;"> -->
  <q-dialog v-model="walletModal">
    <q-card class="q-pa-md" style="width: 100%; max-width: 300px;">
      <!--
      <q-toolbar>
        <q-toolbar-title><span class="text-body2">{{ $t('connect_wallet') }}</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup icon-right="true" @click="close" />
      </q-toolbar>
      -->

      <!--
      <div class="q-pb-sm text-center">
        <span class="text-body2">{{ $t('connect_wallet') }}</span>
      </div>
      -->

      <div>
        <q-list bordered separator>
          <!-- 1. kaikas -->
          <q-item clickable class="text-center" v-close-popup @click="connectWallet('kaikas')">
            <q-item-section avatar>
              <img src="logo/logo_kaikas.png" width="32" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body">{{ $t('wallet_kaikas') }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- 2. MetaMask -->
          <q-item clickable class="text-center" v-close-popup @click="connectWallet('metamask')">
            <q-item-section avatar>
              <img src="logo/logo_metamask.png" width="32" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body">{{ $t('wallet_metamask') }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- 3. Klip -->
          <q-item clickable class="text-center" v-close-popup @click="connectWallet('klip')">
            <q-item-section avatar>
              <img src="logo/klip.svg" width="32" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body">{{ $t('wallet_klip') }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- 4. nftpy -->
          <q-item clickable class="text-center" v-close-popup @click="connectWallet('nftpy')">
            <q-item-section avatar>
              <img src="logo/logo_nftpy.png" width="32" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body">{{ $t('wallet_nftpy') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

    </q-card>

  </q-dialog>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
  <KlipQRCodeModal ref="refKlipQRCodeModal" @callback-qr="callbackQRCode" />
</template>

<script>
// import { Cookies } from 'quasar'
// import { sha512 } from 'js-sha512'
// import { KakaoCordovaSDK } from 'kakao-sdk'
import { prepare, request, getResult, getCardList } from 'klip-sdk'
import QRCode from 'qrcode'

export default {
  // name: 'mystore',
  data () {
    return {
      // walletModal: $store.state.walletModal,
      walletModal: false,
      loggingInFlag: false,
      loading: false,
      klipTimer: 300, // 클립 QR코드 유효시간
      interval: '', // 클립 인증 반복확인용
    }
  },
  // created: function () {
  //   if (this.$store.state.device === 'P') {
  //     this.layoutWidth = '280px'
  //   }
  // },
  methods: {
    async show () {
      this.loading = false
      this.walletModal = true
    },
    callbackQRCode(resultObj) {
      this.clearKlipTimer()
    },
    // connect wallet
    async connectWallet(walletType) {
      if (walletType === 'klaystar') {
        this.showLoginModal()
      } else if (walletType === 'kaikas') {
        // this.$noti(this.$q, this.$t('wallet_kaikas'))
        if (typeof window.klaytn !== 'undefined') {
          const provider = window['klaytn']
          // Kaikas user detected. You can now use the provider.
          try {
            const accounts = await klaytn.enable()
            const walletAddress = accounts[0]
            // alert(walletAddress)

            this.$store.dispatch('setWalletType', 'kaikas')
            this.$store.dispatch('setWalletAddress', walletAddress)

            // ■■■ 회원정보 체크, 존재하지 않으면 가입화면으로 이동
            this.checkUser(walletAddress)
          } catch (error) {
            console.log(error)
            // this.$noti(this.$q, error.message)
            this.$noti(this.$q, 'User denied account authorization')
          }
        } else {
          this.$noti(this.$q, this.$t('Kaikas is not installed.'))
        }

      } else if (walletType === 'metamask') {
        // this.$noti(this.$q, this.$t('wallet_metamask'))
        if (typeof window.ethereum !== 'undefined') {
          try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            const walletAddress = accounts[0]
            // alert(walletAddress)

            this.$store.dispatch('setWalletType', 'metamask')
            this.$store.dispatch('setWalletAddress', walletAddress)

            // ■■■ 회원정보 체크, 존재하지 않으면 가입화면으로 이동
            this.checkUser(walletAddress)
          } catch (error) {
            console.log(error)
            this.$noti(this.$q, error.message)
          }
        } else {
          this.$noti(this.$q, this.$t('MetaMask is not installed.'))
          window.open('https://metamask.app.link/dapp/nftpy.io')
        }
      } else if (walletType === 'klip') {
        // this.$noti(this.$q, this.$t('wallet_klip'))
        const bappName = 'KLAYSTAR'
        const successLink = 'myApp://...'
        const failLink = 'myApp://...'
        // PC와 모바일 분기
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          // 1. 모바일인 경우
          try {
            const res = await prepare.auth({ bappName, successLink, failLink })
            if (res.err) {
              // 에러 처리
              this.$noti(this.$q, res.err)
            } else if (res.request_key) {
              // request_key 보관
              const requestKey = res.request_key
              request(requestKey, () => alert('Run in a mobile.'))
              // console.log(res)

              // 요청 후 1초 간격으로 승인 여부 확인
              this.checkKlipAuthResult(requestKey)
            } else {
              this.$noti(this.$q, res)
            }

          } catch (error) {
            console.log(error)
            this.$noti(this.$q, error.message)
          }
        } else {
          // alert('PC')
          // 2. PC인 경우 - QR코드 생성
          const pBapp = {
            name: 'KLAYSTAR',
            callback: {
              success: this.callbackKlipPrepareSuccess,
              fail: this.callbackKlipPrepareFail,
            },
          }
          const param = {
            bapp: pBapp,
            type: 'auth',
            // transaction: '',
          }
          this.$axios.post('https://a2a-api.klipwallet.com/v2/a2a/prepare', param)
            .then((result) => {
              // console.log(result)
              // console.log(JSON.stringify(result.data))
              // this.$q.loading.hide() // 로딩 표시 종료
              if (result.data) {
                const requestKey = result.data.request_key
                // this.$noti(this.$q, requestKey)

                // QR코드 생성
                QRCode.toDataURL('https://klipwallet.com/?target=/a2a?request_key=' + requestKey)
                  .then(data => {
                    // console.log(data)
                    this.$refs.refKlipQRCodeModal.url = data
                    this.$refs.refKlipQRCodeModal.show()

                    // 요청 후 1초 간격으로 승인 여부 확인
                    this.checkKlipAuthResult(requestKey)
                  })
                  .catch(err => {
                    console.error(err)
                  })
              } else {
                this.$noti(this.$q, this.$t('failed'))
              }
            })
            .catch((err) => {
              // this.$q.loading.hide() // 로딩 표시 종료
              console.log(err)
              this.$noti(this.$q, err)
            })
        }
      }
    },
    checkKlipAuthResult(requestKey) {
      // 1초 간격으로 반복
      this.interval = setInterval(() => {
        this.klipTimer-- // 1초씩 감소

        // auth result 체크
        this.$axios.get('https://a2a-api.klipwallet.com/v2/a2a/result', {params: {request_key: requestKey}})
          .then((result) => {
            // console.log(JSON.stringify(result.data))

            if (result.data && result.data.status === 'completed') {
              // 반복 해제
              this.clearKlipTimer()
              const walletAddress = result.data.result.klaytn_address
              // alert(walletAddress)

              this.$store.dispatch('setWalletType', 'klip')
              this.$store.dispatch('setWalletAddress', walletAddress)

              try {
                // 모바일에서는 필요없는 처리
                this.$refs.refKlipQRCodeModal.close()
              } catch(e) {
                console.log(e)
              }

              // ■■■ 회원정보 체크, 존재하지 않으면 가입화면으로 이동
              this.checkUser(walletAddress)
            }
          })
          .catch((err) => {
            console.log(err)
          })

        if (this.klipTimer <= 0) {
          // 반복 해제
          this.clearKlipTimer()
        }
      }, 1000)

      /*
      // https://a2a-api.klipwallet.com/v2/a2a/result?request_key=139ce76b-fc97-403a-be1e-4cd0288154db
      this.$axios.get('https://a2a-api.klipwallet.com/v2/a2a/result', {params: {request_key: requestKey}})
        .then((result) => {
          console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
      */
    },
    clearKlipTimer() {
      clearInterval(this.interval)
      this.klipTimer = 300
    },
    callbackKlipPrepareSuccess(resultObj) {
      // console.log(resultObj)
      this.$noti(this.$q, resultObj)
    },
    callbackKlipPrepareFail(resultObj) {
      // console.log(resultObj)
      this.$noti(this.$q, resultObj)
    },
    showLoginModal() {
      this.$refs.refLoginModal.show()
    },
    callbackLogin(userVo) {
      // console.log('callbackLogin!!!')
      // console.log(userVo)
      this.$store.dispatch('setUid', userVo.uid)
      this.$store.dispatch('setAdcd', userVo.adcd)
      this.$store.dispatch('setName', userVo.name)
      this.$store.dispatch('setNickname', userVo.nickname)
      this.$store.dispatch('setProfileImage', userVo.profile_image)
      this.$store.dispatch('setWalletType', userVo.wallet_type)
      this.$store.dispatch('setWalletAddress', userVo.wallet_address)
      this.$store.dispatch('setMobileNo', userVo.mobile_no)

      this.$cookie.set('UID', userVo.uid)
      this.$cookie.set('AUTH_KEY', userVo.auth_key)
      this.$cookie.set('ADCD', userVo.adcd)
      localStorage.setItem('UID', userVo.uid)
      localStorage.setItem('AUTH_KEY', userVo.auth_key)
      localStorage.setItem('ADCD', userVo.adcd)

      // 계정 정보 조회
      // this.selectUser()
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


            this.$cookie.set('UID', result.data.uid)
            this.$cookie.set('AUTH_KEY', result.data.auth_key)
            this.$cookie.set('ADCD', result.data.adcd)
            localStorage.setItem('UID', result.data.uid)
            localStorage.setItem('AUTH_KEY', result.data.auth_key)
            localStorage.setItem('ADCD', result.data.adcd)

            // 호출화면 콜백
            // console.log('호출화면 콜백')
            this.$emit('callback-wallet', result.data)
            // console.log('호출화면 콜백 완료')

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
    async logout() {
      const userVo = {
        uid: localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID'),
        auth_key: localStorage.getItem('AUTH_KEY') ? localStorage.getItem('AUTH_KEY') : this.$cookie.get('AUTH_KEY'),
      }
      const result = await this.$axios.post('/api/login/doLogout', userVo)
      if (result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        // this.$noti(this.$q, this.$t('logout_completed'))

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
    close () {
      this.walletModal = false
    }
  }
}
</script>
