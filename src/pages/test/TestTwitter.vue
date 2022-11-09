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
        TEST 페이지
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
  created: function () {
    // this.test()
  },
  mounted: function () {
  },
  methods: {
    // connect walleet
    async test() {

      const whitelistAdminTwitterUserName = 'klaystar_offici'
      // const whitelistAdminTwitterUserName = 'ReflexToken'
      // const loginUserTwitterUserName = 'gongun14'
      const loginUserTwitterUserName = 'elonmusk'
      
      let loginUserTwitterUserId = '' // 트위터 사용자 ID
      const whitelistAdminTweetId = '1530220175832002560'

      // // 1. 사용자 아이디 조회
      let param = {
        // user_name: 'klaystar_offici', // gongun14
        // user_name: 'gongun14',
        user_name: loginUserTwitterUserName,
      }
      let result = await this.$axios.get('/api/twitter/getUserIdByUserName', { params: { ...param } })
      if (result && result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        loginUserTwitterUserId = result.data.user_id
        console.log('loginUserTwitterUserId: ' + loginUserTwitterUserId)
      } else {
        console.log('getUserIdByUserName failed')
      }

      // 2. 팔로잉
      param = {
        user_id: loginUserTwitterUserId,
        check_user_name: whitelistAdminTwitterUserName,
      }
      result = await this.$axios.get('/api/twitter/checkUserFollowing', { params: { ...param } })
      if (result && result.data && result.data.resultCd === 'SUCCESS') {
        // console.log(result.data)
        console.log('result.data.following_yn: ' + result.data.following_yn)
      } else {
        console.log('checkUserFollowing failed')
      }

      // // 3. 리트윗
      // param = {
      //   tweet_id: whitelistAdminTweetId,
      //   check_user_name: loginUserTwitterUserName,
      // }
      // result = await this.$axios.get('/api/twitter/checkTweetsRetweetedBy', { params: { ...param } })
      // if (result && result.data && result.data.resultCd === 'SUCCESS') {
      //   // console.log(result.data)
      //   console.log('result.data.retweeted_yn: ' + result.data.retweeted_yn)
      // } else {
      //   console.log('checkTweetsRetweetedBy failed')
      // }

      // // 4. 좋아요
      // param = {
      //   tweet_id: whitelistAdminTweetId,
      //   // check_user_name: loginUserTwitterUserName,
      //   check_user_name: 'klaystar_offici',
      // }
      // result = await this.$axios.get('/api/twitter/checkTweetsLikingUsers', { params: { ...param } })
      // if (result && result.data && result.data.resultCd === 'SUCCESS') {
      //   // console.log(result.data)
      //   console.log('result.data.liking_yn: ' + result.data.liking_yn)
      // } else {
      //   console.log('checkTweetsLikingUsers failed')
      // }


    }
  }
})
</script>
