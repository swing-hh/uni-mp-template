export default function log(obj: any = {}) {
  const defaultObj = {
    wxUser: uni.getStorageSync('wx_user'),
    wxUid: uni.getStorageSync('wx_uid'),
    lastfrom: getApp().globalData,
    cuid: uni.getStorageSync('openid')
  }
  let str: string = ''

  Object.assign(defaultObj, obj)
  Object.keys(defaultObj).forEach(item => {
    str += `${item}=${defaultObj[item]}&`
  })
  const arr: Array<string> = str.split('')
  arr.pop()
  str = arr.join('')
  uni.request({
    url: 'https://yayaxiezi.zybang.com/xiezilog/yayaxiezi_log?' + str
  })
}
