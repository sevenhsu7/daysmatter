const { defineConfig } = require('@vue/cli-service')


module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/daysmatter/'
    : '/'
}


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false  // 暂时关闭 lint，以便我们可以先运行起来
})
