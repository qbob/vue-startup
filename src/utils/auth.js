import Cookies from 'js-cookie'
import config from '../config'
import { KEY_USER_TOKEN } from '@/utils/consts'

export function setToken (token) {
  return Cookies.set(KEY_USER_TOKEN, token, { expires: config.cookieExpires || 1 })
}

export function getToken () {
  const token = Cookies.get(KEY_USER_TOKEN)
  if (token) return token
  else return false
}

export function removeToken () {
  return Cookies.remove(KEY_USER_TOKEN)
}
