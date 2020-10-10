module.exports = {
  // eslint限定为当前特定的项目
  root: true,
  // 全局变量
  env: {
    es6: true,
    node: true
  },
  // plugin:vue/essential 使用eslint-plugin-vue
  // @vue/prettier 使用@vue/eslint-config-prettier
  // @vue/typescript 使用@vue/eslint-config-typescript
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  // 一些extend之外的规则配置
  rules: {
    // -------------------------------- 强制的风格 -------------------------------------
    // 禁用console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 要求或禁止末尾逗号
    'comma-dangle': [2, 'never'],
    // 强制在逗号前后使用一致的空格
    'comma-spacing': 0,
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': 0,
    // 变量只能在其作用域内使用
    'block-scoped-var': 'error',
    // 构造函数首字母大写
    'new-cap': ['error', { capIsNew: false }],
    'no-tabs': 'off',
    // 不允许类成员中有重复的名称
    'no-dupe-class-members': 'error',
    // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'no-lonely-if': 'error',
    // 禁止使用嵌套的三元表达式
    'no-nested-ternary': 'error',
    // 禁用 new Symbol()
    'no-new-symbol': 'off',
    // 禁用八进制字面量
    'no-octal': 'error',
    // 禁止重新声明变量
    'no-redeclare': 'error',
    // 禁止自身比较（要判断 NaN 请使用 typeof x === 'number' && isNaN(x)）
    'no-self-compare': 'error',
    // 关键字不能被遮蔽
    'no-shadow-restricted-names': 'error',
    // 禁止定义前使用变量
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false
      }
    ],
    // 禁止使用 var（请使用 let or const）
    'no-var': 'error',
    // 禁止使用 void 操作符
    'no-void': 'error',
    // 禁用 with 语句
    'no-with': 'error',
    // 使用单引号，字符串都可以
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

    // -------------------------------- 建议的风格 -------------------------------------
    // 要求使用 === 和 !==
    eqeqeq: ['warn', 'always', { null: 'ignore' }],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 10],
    // 限制最大参数个数
    'max-params': ['warn', 10],
    // 提醒空语句块
    'no-empty': 'warn',
    // 禁止不必要的布尔类型转换
    'no-extra-boolean-cast': 'warn',
    // 建议可以表达为更简单结构的条件表达式
    'no-unneeded-ternary': 'warn',
    // 提醒未使用过的变量
    'no-unused-vars': 'warn',
    // 避免不必要的 .call() 和 .apply()
    'no-useless-call': 'warn',
    // 避免没有必要的字符拼接
    'no-useless-concat': 'warn',
    // 避免不必要的转义
    'no-useless-escape': 'warn'
  },
  // 解析器
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
