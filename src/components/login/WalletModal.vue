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
      klipTimer: 300, // ?????? QR?????? ????????????
      interval: '', // ?????? ?????? ???????????????
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

            // ????????? ???????????? ??????, ???????????? ????????? ?????????????????? ??????
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

            // ????????? ???????????? ??????, ???????????? ????????? ?????????????????? ??????
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
        // PC??? ????????? ??????
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          // 1. ???????????? ??????
          try {
            const res = await prepare.auth({ bappName, successLink, failLink })
            if (res.err) {
              // ?????? ??????
              this.$noti(this.$q, res.err)
            } else if (res.request_key) {
              // request_key ??????
              const requestKey = res.request_key
              request(requestKey, () => alert('Run in a mobile.'))
              // console.log(res)

              // ?????? ??? 1??? ???????????? ?????? ?????? ??????
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
          // 2. PC??? ?????? - QR?????? ??????
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
              // this.$q.loading.hide() // ?????? ?????? ??????
              if (result.data) {
                const requestKey = result.data.request_key
                // this.$noti(this.$q, requestKey)

                // QR?????? ??????
                QRCode.toDataURL('https://klipwallet.com/?target=/a2a?request_key=' + requestKey)
                  .then(data => {
                    // console.log(data)
                    this.$refs.refKlipQRCodeModal.url = data
                    this.$refs.refKlipQRCodeModal.show()

                    // ?????? ??? 1??? ???????????? ?????? ?????? ??????
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
              // this.$q.loading.hide() // ?????? ?????? ??????
              console.log(err)
              this.$noti(this.$q, err)
            })
        }
      }
    },
    checkKlipAuthResult(requestKey) {
      // 1??? ???????????? ??????
      this.interval = setInterval(() => {
        this.klipTimer-- // 1?????? ??????

        // auth result ??????
        this.$axios.get('https://a2a-api.klipwallet.com/v2/a2a/result', {params: {request_key: requestKey}})
          .then((result) => {
            // console.log(JSON.stringify(result.data))

            if (result.data && result.data.status === 'completed') {
              // ?????? ??????
              this.clearKlipTimer()
              const walletAddress = result.data.result.klaytn_address
              // alert(walletAddress)

              this.$store.dispatch('setWalletType', 'klip')
              this.$store.dispatch('setWalletAddress', walletAddress)

              try {
                // ?????????????????? ???????????? ??????
                this.$refs.refKlipQRCodeModal.close()
              } catch(e) {
                console.log(e)
              }

              // ????????? ???????????? ??????, ???????????? ????????? ?????????????????? ??????
              this.checkUser(walletAddress)
            }
          })
          .catch((err) => {
            console.log(err)
          })

        if (this.klipTimer <= 0) {
          // ?????? ??????
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

      // ?????? ?????? ??????
      // this.selectUser()
    },
    async checkChain() {
      // ????????? ????????? ????????? ???????????? ??????
      if(!this.$store.getters.getWalletAddress) {
        return
      }

      // ????????? ??????
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
        // ???????????? ???????????? ????????????
        this.logout()
        this.$noti(this.$q, this.$t('set_to_the_mainnet'))
        return false
      }
      return true
    },
    async checkUser(walletAddress) {
      // ????????? ??????
      const isMainnet = await this.checkChain()
      if (!isMainnet) {
        return
      }

      const param = {
        wallet_address: walletAddress,
      }
      // ?????? ??????
      this.$axios.get('/api/user/selectUserByWalletAddress', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // ??????????????? ???????????? ??????
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

            // ???????????? ??????
            // console.log('???????????? ??????')
            this.$emit('callback-wallet', result.data)
            // console.log('???????????? ?????? ??????')

            // ???????????? ???????????? ???????????? ??????????????? ????????? ????????? ??????
            if (this.$router.currentRoute.value.fullPath == '/join') {
              this.$router.push('/')
            }
          } else {
            // ??????????????? ???????????? ?????? ?????? -> ???????????? ???????????? ??????
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

        // ????????? ?????? ???????????? ??????
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
