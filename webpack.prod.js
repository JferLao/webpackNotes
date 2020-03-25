const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    mode: 'production', //打包模式可以为生产模式production和开发模式development 
    devtool: 'cheap-module-source-map', //处理代码的映射关系
    // 使用插件
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}) //压缩CSS代码
        ]
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                "css-loader"
            ]
        }]
    }
}
module.exports = merge(commonConfig, prodConfig)