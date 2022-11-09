<template>
  <q-page class="justify justify-center">
    <!-- <div style="background-color: black;"> -->
    <div class="" style="">
      <!-- <div class="row">
        <div class="text-h5 text-bold">
          Overview
        </div>
      </div> -->
      <!-- <div class="row" style="background-image: url(images/star1.jpg); height: 40rem;"> -->
      <div class="row">
        TEST IPFS 페이지
      </div>



      <div style="text-align: center; width: 100%;">
        <q-btn style="background: goldenrod; color: black; width: 250px;" size="xl" @click="test" rounded>
          test
        </q-btn>
      </div>
      <br />
      <br />
    </div>
  </q-page>

</template>

<script>
import { defineComponent } from 'vue';
// import Caver from 'caver-js'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      filterType: 'now', // 랭킹타입 now, total
      msgBox: false,
    }
  },
  components: {
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
    // qDate() {
    //   return date
    // },
  },
  created: function () {
    // this.test()
  },
  mounted: function () {
  },
  methods: {
    // connect walleet
    async test() {
      console.log(111)
      const param = {
        uid: this.getUid,
      }
      const result = await this.$axios.get('/api/klay/getBlockNumber', { params: { ...param } })
      if (result) {
        // console.log(result.data)
        console.log('result: ' + result)
        // console.log(result)
        console.log(result.data)
      } else {
        console.log('result is null')
      }

    }
  }
})
</script>
