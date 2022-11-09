<template>
  <!-- <q-page class="justify justify-center" style="background-image: url(images/star1.jpg)"> -->
  <q-page class="justify justify-center">
    <div class="page-default" style="word-break: keep-all;">

      <div style="background-color: #404040;">
        <div class="row justify justify-between page-1200">
          <div class="q-pt-md q-pb-sm">
            <!-- PixiJS -->
            <!-- <div class="text-center text-body q-pl-md q-pr-md" style="word-break: keep-all;">
              <div class="text-h3 text-bold">
                <img v-if="mainImage" :src="mainImage" style="width: 100%; max-width: 500px;" />
                <video v-else :src="mainVideo" autoplay loop muted style="width: 100%; max-width: 500px;"></video>
                <br />
              </div>
            </div> -->

            <div class="text-center text-body q-pl-md q-pr-md" style="word-break: keep-all;">
              <div class="" ref="refPixiDiv" style="width: 100%;">
              </div>
            </div>

          </div>

          <div class="q-pt-md q-pl-md q-pr-md q-pb-md" style="width: 100%; max-width: 600px;">

            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td colspan="3">
                  <div class="col-12 doc-heading text-h4 text-bold text-left text-primary" style="max-width: 600px;">
                    Custom NFT Case
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <div class="col-12 q-pt-md">
                    <q-separator style="height: 6px;" color="grey" />
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" colspan="3">
                  <div class="col-12 q-pt-md text-primary">
                    설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                    <br />설명 표시
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <div class="col-12 q-pt-md">
                    <q-separator style="height: 6px;" color="grey" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="col-12 q-pt-md q-pb-sm">
                    <q-btn class="btn" color="primary" size="lg" style="width: 100%;" @click="buy" rounded>
                      <b>{{ $t('buy') }}</b>
                    </q-btn>
                  </div>
                </td>
              </tr>
            </table>

          </div>
        </div>

      </div>

      <!-- NFT 리스트 -->
      <div class="q-pa-sm">
        <!-- <div v-for="item in nftList" :key="item.contractAddress" @click="setNft(item)" style="cursor: pointer;z-index: 1;" class="col">
          <table border="1" cellpadding="0" cellspacing="0" width="150">
            <tr>
              <td>
                <video v-if="item.isVideoNft" :src="item.nft_image" autoplay loop muted style="width: 100%; max-width: 150px;"></video>
                <img v-else :src="item.nft_image" style="width: 100%; max-width: 150px" />
              </td>
            </tr>
            <tr>
              <td class="text-bold text-center">
                {{ item.nft_name }}
              </td>
            </tr>
          </table>
        </div> -->
        <div class="row">
          <q-card v-for="item in nftList" :key="item.contractAddress" @click="setNft(item)" style="cursor: pointer; word-break: break-word" :style="`width: ${ nftSize }`" class="q-ma-sm">
            <video v-if="item.isVideoNft" :src="item.nft_image" autoplay loop muted :style="`width: ${ nftSize }`"></video>
            <img v-else :src="item.nft_image" :style="`width: ${ nftSize }`" />

            <q-card-section>
              <div class="text-h6">{{ item.nft_name }}</div>
              <div class="text-subtitle2">{{ item.token_id }}</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              {{ item.nft_description }}
            </q-card-section>
          </q-card>

        </div>

      </div>


      <div v-if="noDataFlag" class="row justify-center">
        <img src="images/sorry-no-data.png" style="width: 50%; max-width: 512px;" />
      </div>
      <q-separator />


    </div>

    <br />
    <br />



  </q-page>

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'
import { loadScript } from 'vue-plugin-load-script'
import QRCode from 'qrcode'

export default defineComponent({
  name: 'PhoneCase',
  data () {
    return {
      // refresherDone: '',
      pageSize: 50,
      // lastPageNum: 1, // 마지막 페이지
      bgImageSize: 1120,
      pixiSize: 0,
      PIXI: null,
      pixiApp: null,
      interval: '', // PIXI loadScript 반복 인터벌
      nftList: [],
      noDataFlag: false,
      nftSize: 200,
      mainImage: 'images/phone_case_base.png',
      mainVideo: '',
    }
  },
  components: {
  },
  watch: {
    getWalletAddress (newValue, oldValue) {
      // console.log('oldValue: : ' + oldValue)
      // console.log('newValue: : ' + newValue)
      this.getNftList()
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
    getMobileNo () {
      return this.$store.getters.getMobileNo
    },
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
  },
  created: function () {
    // console.log(this.$q.platform.is.mobile)

    if (this.$q.platform.is.mobile) {
      this.nftSize = '100%'
    } else {
      this.nftSize = '200px'
    }

    // console.log('this.nftSize: ' + this.nftSize)

    // NFT 리스트 조회
    // this.nftList = [
    //   { nft_name: 'nft1', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.111111111111111111111111111111111111111111111111111111', token_id: '0x79ca64d1', isVideoNft: false, token_uri: 'https://klaystar.com/nft/1/json/1.json' }
    //   , { nft_name: 'nft2', nft_image: 'https://klaystar.com/uploaded/test/test.mp4', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: true, token_uri: 'http://www.ccccofficial.co.kr' }
    //   // , { nft_name: 'nft3', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    //   // , { nft_name: 'nft4', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    //   // , { nft_name: 'nft5', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    //   // , { nft_name: 'nft6', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    //   // , { nft_name: 'nft7', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    //   // , { nft_name: 'nft8', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    //   // , { nft_name: 'nft9', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    //   // , { nft_name: 'nft10', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    //   // , { nft_name: 'nft11', nft_image: 'https://klaystar.com/nft/nike.gif', nft_description: 'This is a NFT for test.', token_id: '0x79ca64d1', isVideoNft: false }
    // ]
    if (this.getWalletAddress) {
      this.getNftList()
    } else {
      this.noDataFlag = true
    }
  },
  mounted: function () {
    console.log(this.$refs.refPixiDiv.clientWidth)
    if (this.$q.platform.is.mobile) {
      // this.pixiSize = this.$refs.refPixiDiv.clientWidth
      this.pixiSize = screen.width - 30
    } else {
      this.pixiSize = 560
    }

    // PIXI 설정 - loadScript 완료시 까지 반복    
    this.setPixiJs()
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // PIXI 설정 - loadScript 완료시 까지 반복
    setPixiJs() {

      // console.log('setPixiJs')
      // console.log(this.$Pixi)

      this.PIXI = this.$Pixi

      // 0.1초 간격으로 반복 - loadScript 완료시 까지 반복
      this.interval = setInterval(() => {
        console.log('setInterval...')

        if (this.PIXI) {
          // 반복 해제
          this.clearPixiTimer()

          // Creating an Application
          this.pixiApp = new this.PIXI.Application({ width: this.pixiSize, height: this.pixiSize })
          console.log(this.pixiApp)

          // Adding the View to the DOM
          // document.body.appendChild(this.pixiApp.view)
          // document.getElementById('field').appendChild(this.pixiApp.view)
          this.$refs.refPixiDiv.appendChild(this.pixiApp.view)


          // Creating a background image
          let bg = this.PIXI.Sprite.from('images/phone_case_base.png')

          // bg.anchor.set(0.5)
          // bg.x = this.pixiApp.screen.width / 2
          // bg.y = this.pixiApp.screen.height / 2

          // pixi size
          if (this.$q.platform.is.mobile) {
            // bg.scale.x = 0.33
            // bg.scale.y = 0.33
            // console.log(screen.width)
            bg.scale.x = (screen.width - 30) / this.bgImageSize
            bg.scale.y = (screen.width - 30) / this.bgImageSize
          } else {
            bg.scale.x = 0.5
            bg.scale.y = 0.5
          }

          // Adding the Sprite to the Stage
          this.pixiApp.stage.addChild(bg)

          // Writing an Update Loop
          // // Add a variable to count up the seconds our demo has been running
          // let elapsed = 0.0
          // // Tell our application's ticker to run a new callback every frame, passing
          // // in the amount of time that has passed since the last tick
          // this.pixiApp.ticker.add((delta) => {
          //   // Add the time to our total elapsed time
          //   elapsed += delta
          //   // Update the sprite's X position based on the cosine of our elapsed time.  We divide
          //   // by 50 to slow the animation down a bit...
          //   sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0
          // })

          // let frame = new this.PIXI.Graphics()
          // frame.beginFill(0x666666)
          // frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 })
          // frame.drawRect(0, 0, 208, 208)
          // frame.position.set(320 - 100, 180 - 100)
          // this.pixiApp.stage.addChild(frame)

          // // Create a graphics object to define our mask
          // let mask = new this.PIXI.Graphics()
          // // Add the rectangular area to show
          // mask.beginFill(0xffffff)
          // mask.drawRect(0,0,200,200)
          // mask.endFill()

          // // Add container that will hold our masked content
          // let maskContainer = new this.PIXI.Container()
          // // Set the mask to use our graphics object from above
          // maskContainer.mask = mask
          // // Add the mask as a child, so that the mask is positioned relative to its parent
          // maskContainer.addChild(mask)
          // // Offset by the window's frame width
          // maskContainer.position.set(4,4)
          // // And add the container to the window!
          // frame.addChild(maskContainer)

          // // Create contents for the masked container
          // let text = new this.PIXI.Text(
          //   'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
          //   'You can put anything in the container and it will be masked!',
          //   {
          //     fontSize: 24,
          //     fill: 0x1010ff,
          //     wordWrap: true,
          //     wordWrapWidth: 180
          //   }
          // )
          // text.x = 10
          // maskContainer.addChild(text)

          // // Add a ticker callback to scroll the text up and down
          // let elapsed = 0.0
          // this.pixiApp.ticker.add((delta) => {
          //   // Update the text's y coordinate to scroll it
          //   elapsed += delta
          //   text.y = 10 + -100.0 + Math.cos(elapsed/50.0) * 100.0
          // })
        }

        loadScript('js/pixi.min.js')
          .then(() => {
            // Script is loaded, do something
            this.PIXI = window.PIXI
            // console.log('pixi.js loaded')
          })
          .catch(() => {
            // Failed to fetch script
            console.log('pixi.js loadScript failed.')
          })
      }, 500)


    },
    clearPixiTimer() {
      clearInterval(this.interval)
    },
    getNftList() {
      let walletAddress = '0xb4285d543F192859cdB9f825686F3a2A8f8AA8BC'
      // walletAddress = '0xC9f5ab0f2D6C13AeDb8cce9C82Ec7777312Add68'
      walletAddress = this.getWalletAddress

      this.$axios.get('/api/kas/getNftList',
        {params: {uid: this.getUid, walletAddress: walletAddress}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          console.log(result.data)
          if (result && result.data) {
            this.noDataFlag = false
            console.log('SUCCESS')
            console.log(result.data)

            this.nftList = result.data

            // nft_image가 video 타입이면 isVideoNft를 true로 설정
            for (let i = 0; i < this.nftList.length; i++) {
              const nft_image = this.nftList[i].nft_image
              console.log('nft_image: ' + nft_image)
              if (
                nft_image && (
                  nft_image.indexOf('.mp4') > -1
                  || nft_image.indexOf('.avi') > -1
                  || nft_image.indexOf('.wmv') > -1
                  || nft_image.indexOf('.mpg') > -1
                  || nft_image.indexOf('.mpeg') > -1
                  || nft_image.indexOf('.mov') > -1
                  || nft_image.indexOf('.m4v') > -1
                  || nft_image.indexOf('.avif') > -1
                  || nft_image.indexOf('.ogm') > -1
                  || nft_image.indexOf('.webm') > -1
                  || nft_image.indexOf('.ogv') > -1
                  || nft_image.indexOf('.asx') > -1
                )
              ) {
                this.nftList[i].isVideoNft = true
              } else {
                this.nftList[i].isVideoNft = false
              }
            }
          } else {
            this.noDataFlag = true
          }
        })
        .catch((err) => {
          this.noDataFlag = true
          console.log(err)
        })
    },
    setNft(item) {
      // console.log('Set NFT: ' + item.nft_name)
      
      // if (item.isVideoNft) {
      //   this.mainVideo = item.nft_image
      //   this.mainImage = ''
      // } else {
      //   this.mainImage = item.nft_image
      //   this.mainVideo = ''
      // }

      // 기존 이미지 전부 삭제 - 삭제 안하면 CPU, MEMORY 터짐
      // this.pixiApp.stage.children[0] 은 배경 이미지
      while (this.pixiApp.stage.children[1]) {
        this.pixiApp.stage.removeChild(this.pixiApp.stage.children[1])
      }

      // QR코드 생성
      // console.log('token_uri: ' + item.token_uri)
      QRCode.toDataURL(item.token_uri)
        .then(data => {
          // console.log(data)
          // Creating a background image
          let barcode = this.PIXI.Sprite.from(data)

          // barcode.anchor.set(0.5)
          barcode.x = this.pixiApp.screen.width / 1.75
          barcode.y = this.pixiApp.screen.height / 1.32

          // pixi size
          if (this.$q.platform.is.mobile) {
            // bg.scale.x = 0.33
            // bg.scale.y = 0.33
            // console.log(screen.width)
            barcode.scale.x = (screen.width - 120) / this.bgImageSize
            barcode.scale.y = (screen.width - 120) / this.bgImageSize
            // barcode.width = 100
            // barcode.height = 110
          } else {
            // barcode.scale.x = 0.4
            // barcode.scale.y = 0.4
            barcode.width = 60
            barcode.height = 60
          }

          // Adding the Sprite to the Stage
          this.pixiApp.stage.addChild(barcode)
        })
        .catch(err => {
          console.error(err)
        })




      // Creating a Sprite
      // let sprite = this.PIXI.Sprite.from(item.nft_image)

      // Adding the Sprite to the Stage
      // this.pixiApp.stage.addChild(sprite);

      // Writing an Update Loop
      // // Add a variable to count up the seconds our demo has been running
      // let elapsed = 0.0;
      // // Tell our application's ticker to run a new callback every frame, passing
      // // in the amount of time that has passed since the last tick
      // this.pixiApp.ticker.add((delta) => {
      //   // Add the time to our total elapsed time
      //   elapsed += delta;
      //   // Update the sprite's X position based on the cosine of our elapsed time.  We divide
      //   // by 50 to slow the animation down a bit...
      //   sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
      // })

      // this.PIXI.BaseTexture.from('images/logo_star_512x512.png')

      let nftImageContainer = new this.PIXI.Container()
      nftImageContainer.x = this.pixiApp.screen.width / 2
      nftImageContainer.y = (this.pixiApp.screen.height / 2) + 15

      const nftImage = this.PIXI.Sprite.from(item.nft_image)
      nftImage.anchor.set(0.5)

      // console.log('nftImage: ')
      // console.log(nftImage)

      nftImageContainer.addChild(nftImage)
      this.pixiApp.stage.addChild(nftImageContainer)

      // NFT image size
      if (this.$q.platform.is.mobile) {
        // nftImage.scale.x = 0.24
        // nftImage.scale.y = 0.24
        nftImage.width = this.pixiApp.screen.width / 2.66
        nftImage.height = this.pixiApp.screen.width / 2.66
      } else {
        // nftImage.scale.x = 0.35
        // nftImage.scale.y = 0.35
        nftImage.width = 210
        nftImage.height = 210
      }

      // NFT information
      let frame = new this.PIXI.Graphics()
      // frame.beginFill(0x666666)
      // frame.beginFill(0x404040)
      frame.beginFill(0xFFFFFF)
      // frame.beginFill(0x000000)
      // frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 })
      frame.drawRect(0, 0, this.pixiApp.screen.width / 2.66, this.pixiApp.screen.height / 7)
      // frame.position.set(this.pixiApp.screen.height / 2 + (this.pixiApp.screen.height / 2), this.pixiApp.screen.width / 2 - (this.pixiApp.screen.width / 2))
      frame.position.set(this.pixiApp.screen.width / 3.2, this.pixiApp.screen.height / 1.35)
      this.pixiApp.stage.addChild(frame)

      
      let infoText = '' + item.nft_name
      infoText += '\n' + item.token_id
      infoText += '\n' + 'etc...'

      // Create a graphics object to define our mask
      let mask = new this.PIXI.Graphics()
      // Add the rectangular area to show
      mask.beginFill()
      mask.drawRect(0, 0, this.pixiApp.screen.width / 2.66, this.pixiApp.screen.height / 7)
      mask.endFill()

      // Add container that will hold our masked content
      let maskContainer = new this.PIXI.Container()
      // Set the mask to use our graphics object from above
      maskContainer.mask = mask
      // Add the mask as a child, so that the mask is positioned relative to its parent
      maskContainer.addChild(mask)
      // Offset by the window's frame width
      maskContainer.position.set(0, 10)
      // And add the container to the window!
      frame.addChild(maskContainer)

      // Create contents for the masked container
      let text = new this.PIXI.Text(
        infoText,
        {
          fontSize: 9,
          fill: 0x000000,
          wordWrap: true,
          wordWrapWidth: this.pixiApp.screen.width / 2.9,
        }
      )
      text.x = 10
      maskContainer.addChild(text)

      // selected message
      this.$noti(this.$q, this.$t('phone_case_nft_selected'))
    },
    openUrl(url) {
      // cordova인 경우 IframeModal 표시
      // if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
      //   this.$refs.refIframeModal.url = url
      //   this.$refs.refIframeModal.show()
      // } else {
        window.open(url, '_system')
      // }
    },
  }
})
</script>
