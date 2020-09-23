class Request {
  url; // 请求url
  parame; // 请求参数
  constructor (url: string, parame: any) {
    this.url = url
    this.parame = parame
  }

  get () {
    this.req('GET')
  }

  post () {
    this.req('POST')
  }

  req (method: any) {
    uni.request({
      url: this.url,
      method: method,
      data: this.parame,
      timeout: 30000,
      success() {
        
      }
    })
  }
}

export default Request
