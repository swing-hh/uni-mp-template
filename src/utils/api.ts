/**
 * @name api统一管理
 * @example
 *     Req.post(Api.common.switch, {})
 */
const Api: any = {
  common: {
    switch: '/handwrite/init/configuration', // 服务基础配置开关接口
    picture: '/handwrite/submit/picture' // 图片上传
  },
  // 微信登录接口
  login: {
    loginbycode: '/wxserver/wxapp/loginbycode',
    getuserstatus: '/wxserver/user/getuserstatus',
    login: '/wxserver/wxapp/wxloginzyb'
  },
  // 课前接口
  course: {
    list: '/handwrite/course/home' // 首页
  },
  // 个人中心
  my: {
    userInfo: '/handwrite/person/userinfo' // 个人信息
  }
};

export default Api;
