import Axios from 'axios'
import store from '@/store'
import * as types from '@/store/types'
import router from '@/router'
import config from '@/config'
import { USER_IS_NOT_LOGIN } from './consts/errorCode'
import { Toast } from 'vant'

class HttpRequest {
  constructor () {
    this.options = {
      method: 'post',
      url: ''
    }
    this.queue = {}
  }

  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 在发送请求之前做些什么
      Toast.loading({
        mask: true,
        message: '加载中...'
      })

      console.log('store', store.getters.token)

      if (store.getters.token) {
        config.headers['x-access-token'] = store.getters.token
      }

      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      console.log('response', res, USER_IS_NOT_LOGIN)
      const { data } = res
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          Toast.clear()
        }, 500)
      }

      if (data.status !== 1) {
        if (data.status === USER_IS_NOT_LOGIN) {
          console.log('redirect login', router.currentRoute)
          // 401 清除token信息并跳转到登录页面
          store.commit(types.USER_LOGOUT)

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.name !== 'login' &&
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.path }
            })
        } else {
          if (data.msg) Toast.fail(data.msg)
        }

        return false
      }
      return data
    }, (error) => {
      // 对响应错误做点什么
      Toast.fail('服务内部错误')
      return Promise.reject(error)
    })
  }

  // 创建实例
  create () {
    const conf = {
      baseURL: config.apiServer,
      // timeout: 5000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'Content-Type': 'application/json; charset=UTF-8',
        'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }

  // 合并请求实例
  mergeReqest (instances = []) { }

  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }

  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
}

const axios = new HttpRequest()
export default axios
