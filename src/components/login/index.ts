import Req from '@/utils/req'
import Api from '@/utils/api'
import { appid } from '@/config/constant'
import { showToast } from '@/utils/util'

/**
 * 获取wxuser
 * @return {string} 返回wxuser字符串
 */
export function getWxUser(): string {
  return uni.getStorageSync('wx_user') || ''
}

/**
 * 手机号登陆
 * @return {string}
 */
export async function login(wx_user: string, encryptedData: string, iv: string) {
  const param: object = {
    appid: appid,
    wx_user: wx_user,
    encryptedData: encryptedData,
    iv: encodeURIComponent(iv)
  }
  const data: any = await Req.post(Api.login.login, param)
  uni.setStorageSync('zybuss', data.zybuss)
  uni.setStorageSync('wx_uid', data.wx_uid)
  return data.zybuss
}

/**
 * 手机号登陆，拿到
 * @return {string} 返回wxuser字符串
 */
export async function loginbycode() {
  const loginData: any = await uniLogin()
  const data: any = await Req.post(Api.login.loginbycode, { appid: appid, code: loginData.code })
  uni.setStorageSync('openid', data.openid)
  uni.setStorageSync('wx_user', data.wx_user)
  uni.setStorageSync('unionid', data.unionid)
}

// 小程序登陆
function uniLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      success(res) {
        resolve(res)
      },
      fail(res) {
        showToast('微信服务失败')
        reject(res)
      }
    })
  })
}

/**
 * 获取zybuss
 * @return {string} 返回zybuss字符串
 */
export function getzybuss() {
  return uni.getStorageSync('zybuss')
}

export function layout() {
  uni.removeStorageSync('zybuss')
}
