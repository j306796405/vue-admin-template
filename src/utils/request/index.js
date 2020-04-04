import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'
import REQUEST_MSG from './REQUEST_MSG'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { data, data: { code, msg }} = response
    const { ignoreCodes = [] } = response.config
    const successCode = 20000
    // 是否忽略错误
    const isIgnore = ignoreCodes.indexOf(code) >= 0

    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (code === 50008 || code === 50012 || code === 50014) {
      store.dispatch('user/resetToken').then(() => {
        router.replace({
          path: '/login'
        })
      })
      Message.error(REQUEST_MSG[code])
    } else if (!isIgnore && REQUEST_MSG[code]) {
      Message.error(REQUEST_MSG[code])
    } else if (!isIgnore && code !== successCode) {
      msg && Message.error(msg)
    }

    // 如果不是正常返回值统一reject
    if (code !== successCode) {
      return Promise.reject(data)
    } else {
      return data
    }
  },
  error => {
    Message.error('网络开小差了 请稍等一会儿')
    return Promise.reject(error)
  }
)

export default service
