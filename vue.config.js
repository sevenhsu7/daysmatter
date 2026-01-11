const { defineConfig } = require('@vue/cli-service')


module.exports = {
  publicPath: '/',  // 使用自定义域名时，应该使用根路径
  lintOnSave: false  // 添加这行来禁用构建时的 lint
}