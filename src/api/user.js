import axios from '@/utils/request'

export default{
  login () {
    const data = {}
    return axios.request({
      url: 'Api_User_Login/Login',
      method: 'post',
      data
    })
  }
}
