const path = require('path') //引入node的核心模块path


module.exports = {
    mode: 'production', //打包模式可以为生产模式production和开发模式development 
    entry: {
        main: './src/index.js', //入口文件
    },
    output: { //出口文件
        filename: 'bundle.js', //打包后的文件名
        path: path.resolve(__dirname, 'dist') //__dirname是当前webpack.config.js文件的目录路径,与bundle结合最后打包在bundle文件夹中
    }
}