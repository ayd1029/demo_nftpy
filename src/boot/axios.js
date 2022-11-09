import { boot } from 'quasar/wrappers'
import axios from 'axios'
// import { useQuasar } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' })
const api = axios.create(
  {
    // baseURL: 'http://172.30.1.100:8888' // 로컬테스트용
    baseURL: 'https://nftpy.io' // 배포용
  }
)

export default boot(({ app, router, $q }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    // if (error.response.status === 401) {
    //   // ...
    //   router.push("/login") // <----  note there is no `this`
    // }
    // console.log('interceptors.response!!!')
    // console.log(error)
    console.log(' ■■■■■■■■■■■■■■■■■■■■■ START OF axios.js ERROR')
    console.log(JSON.stringify(error))
    console.log(' ■ error.message')
    console.log(error.message)
    console.log(' ■ error.stack')
    console.log(error.stack)
    console.log(' ■ error.config')
    console.log(JSON.stringify(error.config))
    console.log(' ■■■■■■■■■■■■■■■■■■■■■ END OF axios.js ERROR')

    // console.log(error.response.data)
    if (!error.response || !error.response.data) {
      const errorInfo = {
        data: {
          resultCd: 'FAIL',
          resultMsg: error.message,
        }
      }
    }
    return Promise.reject(error);
    // error.response.data.resultMsg = error.response.data.error
    // return error.response
  })
})

export { api }
