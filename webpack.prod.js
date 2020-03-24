const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
    mode: 'production', //打包模式可以为生产模式production和开发模式development 
    devtool: 'cheap-module-source-map', //处理代码的映射关系
    // 使用插件
}
module.exports = merge(commonConfig, prodConfig)