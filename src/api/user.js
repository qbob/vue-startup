import axios from '@/utils/request'

export default{
  login () {
    const data = {
      // username: 'test', 'pass': 'test'
    }
    return axios.request({
      url: 'http://api.gbmall.zrk.com/test/default',
      method: 'post',
      data
    })
  }
}
