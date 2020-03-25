const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'production', //打包模式可以为生产模式production和开发模式development 
    devServer: {
        contentBase: './dist', //告诉服务器从哪个目录中提供内容
        open: true, //自动打开浏览器并打开localhost:8080 
        proxy: { //使用跨域代理
            '/api': 'http://localhost:3000'
        },
        port: 8080, //端口
        hot: true, //开启热模块更新
        hotOnly: true, //不让浏览器自动刷新
        // before: function(app, server) {
        //     //在服务内部的所有其他中间件之前， 提供执行自定义中间件的功能
        //     app.get('/some/path', function(req, res) {
        //       res.json({ custom: 'response' });
        //     });
        //   }
        // after: function(app, server) {
        //     // 在服务内部的所有其他中间件之后， 提供执行自定义中间件的功能
        // },
        //allowedHosts:['host.com'] //选项允许你添加白名单服务，允许一些开发服务器访问
        headers: {}, //在所有响应中添加首部内容：
        host: '127.0.0.1', //指定使用一个 host。默认是 localhost
        https: false, //默认情况下，dev-server 通过 HTTP 提供服务,也可以选择带有 HTTPS 的 HTTP/2 提供服务
        //index: 'index.html',   //被作为索引文件的文件名
        lazy: false, //当启用 devServer.lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动
        // openPage: '/different/page'  //指定打开浏览器时的导航页面
        // publicPath: '/assets/'       //此路径下的打包文件可在浏览器中访问,默认 devServer.publicPath 是 '/
        // useLocalIp: false    //允许浏览器使用本地 IP 打开
    },
    module: {
        //打包规则
        rules: [

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
        ]
    },
    devtool: 'cheap-module-eval-source-map', //处理代码的映射关系

    // 使用插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    // optimization: {
    //     usedExports: true //使用Tree Shaking
    // }
}

module.exports = merge(commonConfig, devConfig)