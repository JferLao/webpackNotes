const path = require('path') //引入node的核心模块path


module.exports = {
    mode: 'production', //打包模式可以为生产模式production和开发模式development 
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
                                modules: true, //开启样式模块化
                            }
                        },
                        'postcss-loader'
                    ] //需要css-loader和挂载css的loader
            },
            {
                test: /\.less$/, //匹配规则
                use: ['style-loader', {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, //通过import引入的文件都会依次执行下面的两个loader
                            modules: true, //开启样式模块化
                        }
                    }, 'less-loader', 'postcss-loader'] //需要两个loader
            },
            {
                test: /\.sass$/, //匹配规则
                use: ['style-loader', {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, //通过import引入的文件都会依次执行下面的两个loader
                            modules: true, //开启样式模块化
                        }
                    }, 'sass-loader', 'postcss-loader'] //需要两个loader
            },
        ]
    },
    output: { //出口文件
        filename: 'bundle.js', //打包后的文件名
        path: path.resolve(__dirname, 'dist') //__dirname是当前webpack.config.js文件的目录路径,与bundle结合最后打包在bundle文件夹中
    }
}