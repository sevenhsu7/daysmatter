const { defineConfig } = require('@vue/cli-service')


module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/daysmatter/'
    : '/',
  lintOnSave: false  // 添加这行来禁用构建时的 lint
}