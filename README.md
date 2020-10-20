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
- [*] 代码规范的统一

- 项目组件
- [ ] titleBar
- [ ] footerBar
- [x] backTop
- [x] 中间显示dialog
- [ ] 底部显示dialog

- mixins的使用
- [x] 全局中使用
- [ ] 页面中使用



