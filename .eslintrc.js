module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [2, 'never'],
    'comma-spacing': 0,
    'arrow-parens': 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
