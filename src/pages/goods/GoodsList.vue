<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_goods_list') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('menu_goods_list_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>












    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <IframeLinkSampleModal ref="refIframeLinkSampleModal" />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  // setup () {
  //   // needs to be called in setup()
  //   useMeta(metaData)
  // },

  name: 'GoodsList',
  data () {
    return {
      // tokenSeq: '', // route parameter seq
      baseUrl: 'https://nftpy.io/info',
      // baseUrl: 'http://172.30.1.100:8888/info',
      ca: '0xb15183d0d4d5e86ba702ce9bb7b633376e7db29f',
      p: 'y',
      t: 'i',
      l: 'ko',
      count: '',
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
  },
  mounted: function () {},
  methods: {
    goPhoneCase() {
      this.$router.push('/goods/phoneCase')
    },
  }
})
</script>
