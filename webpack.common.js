const path = require('path') //引入node的核心模块path
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js', //入口文件
    },
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
                // options: {
                //     "presets": [
                //         ["@babel/preset-env", {
                //             targets: {
                //                 chrome: "67" //对chrome67以上版本忽略打包
                //             },
                //             useBuiltIns: 'usage' //对使用的es6语法才翻译
                //         }]
                //     ]
                // }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),

    ],
    optimization: {
        splitChunks: {
            chunks: 'async', //代码只对异步代码生效,可以配置all然后根据cacheGroups配置判断是否对同步代码和异步代码分割,initial为同步代码
            minSize: 30000, //引入的模块/包大于3000个字节(30kb)才做代码分割
            // maxSize: 50000, //引入的模块/包大于个50000字节会将代码再分割成另外一个新的模块
            minChunks: 1, //引入的模块使用次数小于1则不作代码分割
            maxAsyncRequests: 5, //超过异步的模块/库超过5个则不会执行代码分割
            maxInitialRequests: 3, //超过同步的模块/库超过3个则不会执行代码分割
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: { //缓存组,符合上面代码分割的规则就会缓存到这里,把符合下面规则的代码打包在一起
                vendors: {
                    test: /[\\/]node_modules[\\/]/, //检测是否在node_modules文件夹内,符合的话会将代码分割到vendor~入口文件名字组
                    priority: -10, //打包优先级,越高优先打包在这
                    fillname: 'vendors.js' //把文件名改成vendors.js
                },
                default: { //默认放置的组名
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true, //复用已经打包过的模块
                    fillname: 'common.js'
                }
            }
        }
    },
    output: { //出口文件
        filename: 'bundle.js', //打包后的文件名
        path: path.resolve(__dirname, 'dist') //__dirname是当前webpack.config.js文件的目录路径,与bundle结合最后打包在bundle文件夹中
    }
}