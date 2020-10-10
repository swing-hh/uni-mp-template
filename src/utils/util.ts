// 秒转化为时分秒
function formatTime(time: number) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  const hour = time / 3600
  time = time % 3600
  const minute = time / 60
  time = time % 60
  const second = time

  return [hour, minute, second]
    .map(function (n: number) {
      const n1 = n.toString()
      return n1[1] ? n1 : '0' + n1
    })
    .join(':')
}

// 格式化分：秒
function formatMS(time: number) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }
  const minute = time / 60
  time = time % 60
  const second = time

  return [minute, second]
    .map(function (n: number) {
      const n1 = n.toString()
      return n1[1] ? n1 : '0' + n1
    })
    .join(':')
}

// 结束时间转化为倒计时，小于0返回0
function countDownTrans(overTime: number) {
  let countdown = overTime - Math.floor(new Date().getTime() / 1000)
  countdown = countdown <= 0 ? 0 : countdown
  return countdown
}

// 传入头像uid，拼接图片url
function formatImgUrl(urlOrPid: string) {
  let url: string
  if (/^zyb_/.test(urlOrPid)) {
    url = 'https://img.zuoyebang.cc/'
  } else if (/^qa(\d+)?_/.test(urlOrPid)) {
    url = 'https://testimg.zuoyebang.cc/'
  } else if (/^zyb(\d*?)_/.test(urlOrPid)) {
    url = `https://img${RegExp.$1}.zuoyebang.cc/`
  } else {
    url = 'https://imgsrc.baidu.com/zhidao/pic/item/'
  }
  // uid 为null，则返回默认头像
  return urlOrPid ? `${url}${urlOrPid}.jpg` : '/static/student.png'
}
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
function debounce(fn: Function, delay: number = 200) {
  // 定时器，用来 setTimeout
  let timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  const fn1: Function = () => {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = fn1
    // eslint-disable-next-line prefer-rest-params
    const args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
  return fn
}

/**
 * @name imageA  apter
 * @description 图片适配大小 支持鸭鸭写字腾讯云万象优图
 * @param url 图  地址 支持 1、ht;tps://zyb-yayapub-1253445850.file.myqcloud.com/upload/up_c8546cc96c8fdc65a65f3a13d7ac8cc3.jpg?imageMogr2/thumbnail/500x/quality/70 2、https://zyb-yayapub-1253445850.file.myqcloud.com/upload/up_c8546cc96c8fdc65a65f3a13d7ac8cc3.jpg 两种格式
 * @param w 图片的宽度
 *
 */
function imageAdapter(url: string, w: string) {
  const start = url.indexOf('thumbnail/')
  if (start > 0) {
    const end = url.lastIndexOf('x') + 1
    return url.substring(0, start + 10) + w + 'x' + w + url.substring(end)
  } else {
    return url + '?imageMogr2/thumbnail/' + w + 'x' + w
  }
}

/**
 * 本地存储，校验某变量是否过期
 * @param 存储name， sting类型
 * @duration 有效周期
 */
function checkValidity(param: string, duration: number) {
  return !uni.getStorageSync(param) || Date.now() - uni.getStorageSync(param) > duration
}

/**
 * 获得当前的时间戳
 */
function getTimestamp() {
  return new Date().getTime()
}

function toNum(a: string) {
  const b = a.toString()
  // 也可以这样写 var c=a.split(/\./);
  const c = b.split('.')
  const num_place = ['', '0', '00', '000', '0000']
  const r = num_place.reverse()
  for (let i = 0; i < c.length; i++) {
    const len = c[i].length
    c[i] = r[len] + c[i]
  }
  const res = c.join('')
  return res
}

/**
 * 判断a,b版本号大小，a>b 返回true，否则返回false
 */
function cprVersion(a: string, b: string) {
  const _a = toNum(a)
  const _b = toNum(b)
  return _a > _b
}

/**
 * 根据url地址获取parame参数对象
 */
function urlParamHash(url: string) {
  const params = {}
  let h
  const hash = url.slice(url.indexOf('?') + 1).split('&')
  console.log(hash)
  for (let i = 0; i < hash.length; i++) {
    h = hash[i].split('=') //
    params[h[0]] = h[1]
    console.log(h)
  }
  return params
}

/**
 * 判断ios是否属于刘海屏幕
 * @param {String} mode
 * const { model } = uni.getSystemInfoSync();
 * iphoneAdaper(mode);
 */
function iphoneAdaper(mode: string) {
  let isIphoneAdaper = false
  const iphoneAdaper = ['iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS Max', 'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max']
  for (let i = 0; i < iphoneAdaper.length; i++) {
    if (mode.indexOf(iphoneAdaper[i]) >= 0) {
      isIphoneAdaper = true
      break
    }
  }
  return isIphoneAdaper
}

module.exports = {
  formatTime,
  formatImgUrl,
  formatMS,
  countDownTrans,
  debounce,
  imageAdapter,
  checkValidity,
  getTimestamp,
  cprVersion,
  urlParamHash,
  iphoneAdaper
}
