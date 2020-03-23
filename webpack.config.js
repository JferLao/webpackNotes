const path = require('path') //引入node的核心模块path
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode: 'production', //打包模式可以为生产模式production和开发模式development 
    entry: {
        main: './src/index.js', //入口文件
    },
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
    module: {
        //打包规则
        rules: [
            // {
            //     test: /\.(jpg|png|gif)$/, //匹配规则
            //     use: { //使用的loader
            //         loader: 'file-loader',
            //         options: { //图片打包选项
            //             // [hash]/[ext]/[name]这些为placeholder占位符
            //             name: '[name].[ext]', //名字设置为原来的名字加后缀名,
            //             outputPath: 'images/' //将图片打包到资源文件夹images中
            //         }
            //     }
            // },
            {
                test: /\.(jpg|png|gif)$/, //匹配规则
                use: { //使用的loader
                    loader: 'url-loader',
                    options: { //图片打包选项
                        // [hash]/[ext]/[name]这些为placeholder占位符
                        name: '[name].[ext]', //名字设置为原来的名字加后缀名,
                        outputPath: 'images/', //将图片打包到资源文件夹images中
                        limit: 204800, //图片小于200kb都会直接打包到bundle.js中,大于200kb会打包到images内
                    }
                }
            },
            {
                test: /\.css$/, //匹配规则
                use: ['style-loader', {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1, //通过import引入的文件都会依次执行下面的一个loader
                                // modules: true, //开启样式模块化
                            }
                        },
                        'postcss-loader'
                    ] //需要css-loader和挂载css的loader
            },
            // {
            //     test: /\.less$/, //匹配规则
            //     use: ['style-loader', {
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 2, //通过import引入的文件都会依次执行下面的两个loader
            //                 // modules: true, //开启样式模块化
            //             }
            //         }, 'less-loader', 'postcss-loader'] //需要两个loader
            // },
            // {
            //     test: /\.sass$/, //匹配规则
            //     use: ['style-loader', {
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 2, //通过import引入的文件都会依次执行下面的两个loader
            //                 // modules: true, //开启样式模块化
            //             }
            //         }, 'sass-loader', 'postcss-loader'] //需要两个loader
            // },
            { //图标字体文件
                test: /\.(eot|ttf|svg)$/, //文字格式处理
                use: { //使用的loader
                    loader: 'file-loader',
                }
            },
            // 使用babel处理ES6代码
            {
                test: /\.js$/,
                exclude: /node_modules/, //排除node_modules,因为第三方依赖一般已经处理,没必要再处理一次
                loader: "babel-loader",
                options: {
                    "presets": [
                        ["@babel/preset-env", {
                            targets: {
                                chrome: "67" //对chrome67以上版本忽略打包
                            },
                            useBuiltIns: 'usage' //对使用的es6语法才翻译
                        }]
                    ]
                }
            }
        ]
    },
    // 使用插件
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: { //出口文件
        filename: 'bundle.js', //打包后的文件名
        path: path.resolve(__dirname, 'dist') //__dirname是当前webpack.config.js文件的目录路径,与bundle结合最后打包在bundle文件夹中
    }
}