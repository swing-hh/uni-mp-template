# uni-mp-template

## 下载依赖
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
