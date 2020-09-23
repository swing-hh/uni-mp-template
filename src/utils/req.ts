class Req {
  async get (url: string, parame: any) {
    return await this.req('GET', url, parame)
  }

  async post (url: string, parame: any) {
    return await this.req('POST', url, parame)
  }

  req (method: any, url: string, parame: any) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: method,
        data: parame,
        timeout: 30000,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success (res: any) {
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
        fail () {
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
