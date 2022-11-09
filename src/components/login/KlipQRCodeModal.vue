<template>
  
  <q-dialog v-model="klipQRCodeModal" persistent>

    <q-card style="max-width: 510px; width: 100%; background: rgb(255, 217, 0);">
      <q-toolbar class="text-center q-pa-md">
        <!-- <q-btn flat round dense icon="" /> -->
        <img src="logo/klip.svg" width="40" />
        <q-toolbar-title class="text-black text-subtitle2">
          {{ $t('connect_to_kakao_klip_via_qr_code') }}&nbsp;&nbsp;&nbsp;
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup icon-right="true" @click="close" />
      </q-toolbar>
      <div class="text-center">
        <iframe :src="url" style="width: 185px; height: 185px;" frameborder="0"></iframe>
      </div>
      <div class="text-center q-pt-md">
        <span class="text-grey-6">{{ $t('time_remaining') }}:</span>
        &nbsp;
        <span class="text-red">{{ min }} {{ $t('min') }} {{ sec }} {{ $t('sec') }}</span>
      </div>
      <div class="text-center q-pt-md q-pb-lg">
        <span class="text-grey-8">{{ $t('scan_the_qr_code_through_a_qr_code_reader_or_the_kakaotalk_app') }}</span>
      </div>
      <div class="text-center q-pa-lg bg-white">
        <img src="images/klip_info_image.png" width="200" />
        <br />
        <span class="">1. {{ $t('open_kakaotalk') }}</span>
        &nbsp;<span class="">2. {{ $t('click_the_search_bar') }}</span>
        &nbsp;<span class="">3. {{ $t('log_in_by_scanning_the_code') }}</span>
      </div>

      <div class="text-center q-pb-lg bg-white">
        <span class="text-grey-8">* {{ $t('klip_code_scan_from_side_menu_can_be_used') }}</span>
      </div>

    </q-card>

  </q-dialog>

</template>

<script>
export default {
  name: 'KlipQRCodeModal',
  data () {
    return {
      klipQRCodeModal: false,
      url: '',
      min: '5',
      sec: '0',
      totalSec: 300,
      interval: '',
    }
  },
  methods: {
    async show () {
      // 인증 타이머 : 300초(5분)
      this.setAuthTimer()

      this.klipQRCodeModal = true
    },
    setAuthTimer() {
      // 1초 간격으로 반복
      this.interval = setInterval(() => {
        this.totalSec-- // 1초씩 감소

        this.min = parseInt((this.totalSec % 3600) / 60)
        this.sec = this.totalSec % 60

        if (this.totalSec <= 0) {
          // 반복 해제
          this.clearAuthTimer()
          this.close()
        }
      }, 1000)
    },
    clearAuthTimer() {
      clearInterval(this.interval)
      this.totalSec = 300
    },
    close () {
      this.clearAuthTimer()
      // 부모창의 콜백함수 호출
      this.$emit('callback-qr')
      this.klipQRCodeModal = false
      this.url = ''
      this.min = '5'
      this.sec = '0'
    },
  }
}
</script>
