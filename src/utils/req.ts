/**
 * @name req请求
 * @description 封装了uni的request请求，做了一些集中处理
 * @example
 *     const data = await this.$req.get('XX请求地址XX', {})
 *     const data = await this.$req.post('XX请求地址XX', {})
 */

import BaseUrl from '../config/baseUrl'

class Req {
  async get(url: string, parame: any) {
    return await this.req('GET', url, parame)
  }

  async post(url: string, parame: any) {
    return await this.req('POST', url, parame)
  }

  req(method: any, url: string, parame: any = {}) {
    if (url.indexOf('http') < 0) url = BaseUrl.xzDomain + url

    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: method,
        data: parame,
        timeout: 30000,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res: any) {
          // 错误码
          if (res.data.errNo) {
            uni.showToast({
              title: res.data.errstr,
              duration: 2000,
              icon: 'none'
            })
            reject(new Error(res.data.errstr))
          } else {
            resolve(res.data.data)
          }
        },
        fail() {
          uni.showToast({
            title: '网络异常，请检查网络',
            duration: 2000,
            icon: 'none'
          })
        }
      })
    })
  }
}

export default new Req()
