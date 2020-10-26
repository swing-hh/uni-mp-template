/**
 * @name api统一管理
 * @example
 *     Req.post(Api.common.switch, {})
 */
const Api: any = {
  common: {
    switch: '/handwrite/init/configuration', // 服务基础配置开关接口
    audio: '/handwrite/submit/audio', // 上传音频
    checksubscribe: '/handwrite/submit/checksubscribe', // 查看是否关注公众号
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
    list: '/handwrite/course/home', // 首页
    details: '/handwrite/course/details', // 课程详情页
    checklogin: '/handwrite/user/checklogin' // 校验是否登录，判断是否购买过体验课
  },
  // 个人中心
  my: {
    feedback: '/handwrite/person/feedback', // 意见反馈
    userInfo: '/handwrite/person/userinfo' // 个人信息
  }
};

export default Api;
