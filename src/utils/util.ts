/**
 * 获取当前时间戳
 * @return {number} 返回时间戳ms
 */
export function getTimestamp(): number {
  return new Date().valueOf()
}

/**
 * 封装uni.showToast
 * @param str{string} toast字符串
 */
export function showToast(str: string) {
  uni.showToast({
    title: str,
    duration: 2000,
    icon: 'none'
  })
}
