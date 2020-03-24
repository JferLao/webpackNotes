const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'production', //打包模式可以为生产模式production和开发模式development 
    devServer: {
        contentBase: './dist', //服务器根路径所在位置
        open: true, //自动打开浏览器并打开localhost:8080 
        proxy: { //使用跨域代理
            '/api': 'http://localhost:3000'
        },
        port: 8080, //端口
        hot: true, //开启热模块更新
        hotOnly: true, //不让浏览器自动刷新
    },
    devtool: 'cheap-module-eval-source-map', //处理代码的映射关系

    // 使用插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true //使用Tree Shaking
    }
}

module.exports = merge(commonConfig, devConfig)