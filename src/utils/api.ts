/**
 * @name api统一管理
 * @example
 *     this.$req.post('https://yyrd-docker.suanshubang.com' + this.$api.common.switch, {})
 */
const Api: any = {
  common: {
    switch: '/handwrite/init/configuration' // 服务基础配置开关接口
  },
  // 课前接口
  course: {
    list: '/handwrite/course/home' // 首页
  }
}

export default Api
