# uni-mp-template

## 项目使用

### 下载依赖
```
npm install
```

### 本地开发
```
npm run dev:mp-weixin
```

### 打包发布
```
npm run build:mp-weixin
```

## 代码规范配置

* vscode下载vuter、uniapp-snippet、eslint插件
* vscode设置增加配置eslint自动化fix
```
"eslint.autoFixOnSave": true,
"eslint.validate": [
  "javascript",
  "javascriptreact",
  {
    "language": "html",
    "autoFix": true
  },
  {
    "language": "vue",
    "autoFix": true
  }
]
```

## 需要实现的功能

- 完整的项目
- [x] 使用typescript创建项目 
- [x] 分包的添加
- [x] 代码规范的统一
- [x] 项目本地开发
- [ ] 项目打包上线
 
- 项目组件
- [ ] 自定义导航栏 titleBar
- [ ] 底部固底按钮 footerBar
- [x] 回到顶部 backTop
- [x] 中间显示弹窗 centerDialog
- [ ] 底部显示弹窗 bottomDialog
- [x] 登陆 login
- [ ] 选项卡 tab
- [ ] 浮窗提示 tip
- [ ] 图片压缩 compressImage
- [ ] 轮播图点 swiper-dot
- [ ] 全屏视频播放 video

- mixins的使用
- [x] 全局中使用分享 share
- [ ] 页面中使用 支持iPhoneX适配

- 项目配置
- [ ] 环境、常量本地和线上环境自动化切换

- 工具
- [x] 请求 req
- [x] api对象
- [x] 日志上报 log
- [x] 工具函数 util
- [ ] 表单验证 formValidate

- 主题
- [x] 全局样式
- [x] 按钮样式

- 功能页面
- [ ] 首页
- [ ] 我的页面
- [ ] 上课须知页
- [ ] 课程详情页
- [ ] 上课页
- [ ] 视频播放页
- [ ] 提交作品页
- [ ] 作品分享页
- [ ] 满意度调查页
