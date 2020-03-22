# webpack

**webpack的核心是模块打包工具,用来翻译引入和导出js文件**

### module(模块)
> 模块化编程,把程序分解为功能离散的chunk,称之为模块,使得每个模块具有比完整程序更小的接触面,使得验证、调试轻而易举。

#### webpack模块
+ 区别于Node.js的模块,webpack模块是基于Node.js的经验而来,能够以各种方法来控制模块之间的依赖关系
+ 例子

    版本|方式|语法
    ---|:--:|---:
    ES2015|import | import { export1 } from "module-name"
    CommonJS|require()|const export1=require('module-name')
    AMD|define 和 require|define(function (require,exports, module) 
    css/sass/less|@import|@import url("fineprint.css")
    样式/HTML文件|url()/src()|样式(url(...))或 HTML 文件img
+ 通过loader,webpack可以支持各种语言和预处理器语法编写代码
+ loader描述了webpack如何处理非JavaScript 模块，并且在 bundle中引入这些依赖


#### webpack模块变量
变量名|解释|所属
---|:--:|--
module.loaded|表示该模块执行状态|NodeJS
module.hot|表示 模块热替换是否启用，并给进程提供一个接口|webpack 特有变量
module.id|当前模块的 ID|CommonJS
module.exports|调用者通过 require 对模块进行调用时返回的值|CommonJS
exports|该变量默认值为 module.exports（即一个对象）|CommonJS
global|Node.js global|NodeJS
process|Node.js process.|NodeJS
__dirname|取决于 node.__dirname配置|NodeJS
__filename|取决于 node.__dirname配置|NodeJS
__resourceQuery|当前模块的资源查询,如果进行了如下的 reqiure 调用，那么查询字符串(query string)在file.js 中可访问|webpack 特有变量
__ webpack_public_path___|等同于 output.publicPath 配置选项|webpack 特有变量
__ webpack_require__|原始 require 函数。这个表达式不会被解析器解析为依赖|webpack 特有变量
__webpack_chunk_load __|内部 chunk 载入函数|webpack 特有变量
__ webpack_modules__|访问所有模块的内部对象|webpack 特有变量
__ webpack_hash__|这个变量提供对编译过程中(compilation)的 hash 信息的获取|webpack 特有变量
__non_webpack_require __|生成一个不会被 webpack 解析的 require 函数|webpack 特有变量
DEBUG|等同于配置选项中的 debug|webpack 特有变量


### webpack运行的三种方式
1. webpack index.js
2. npx webpack index.js
3. npm run bundle

### webpack配置
+ webpack默认有一套默认的配置,每个工程不同需要不同的配置文件,可以通过自己写(webpack.config.js)进行配置
1. 一般默认为webpack.config.js,也可以在终端使用指令npx webpack --config 配置文件名.js进行打包
2. webpack-cli实现webpack在命令行终端的实现

### package.json配置
1. 可以通过在package.json中script设置命令打包替代npx webpack
```     
<!-- 通过npm run bundle就可以执行打包 -->
"scripts": {
    "bundle":"webpack"
}
```

### webpack打包出来的内容
1. Hash:代表此次打包生成的唯一的hash值
2. Version:代表此次打包的webpack版本
3. Time:代表此次打包的花费时间
4. Built at:代表此次打包的时间
5. Asset ->文件名
6. Size ->文件大小
7. Chunks ->打包时文件的id值和其他js文件的id值
8. Chunk Names -> 打包时的文件名字


### loader打包的流程
1. 打包从入口文件进入,进行对入口文件及其依赖进行处理
2. webpack一般能解决js的文件打包,但是对于非js文件无法处理,需要loader来进行相关处理
3. webpack配置里设置了相关内容的打包方式
4. 当处理到相关文件时,首先会将文件移动到dist文件夹下,之后会得到一个相对于dist目录的文件名称
5. 相关结果处理完可以通过在入口文件及依赖得到相关变量


### loader打包图片资源
1. file-loader可以配置将图片资源按规则打包到dist文件中
2. url-loader可以配置将图片资源直接转化为Base64然后打包到bundle.js中
3. 最佳实践,通过设置图片大小的限制,将小图片打包到bundle.js以减少http请求,大图片则打包到images文件夹内以减小http请求文件的大小

### file-loader
1. 代码示例
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,       //正则匹配的文件格式
        use: [
          {
            loader: 'file-loader',     //使用file-loader
            options: {                 //选项
                name:'[path][name].[ext]',  //用到占位符,默认[hash].[ext]为hash+后缀名,name也可以为function
                outputPath: 'images/', //将图片打包到资源文件夹images中,outputPath也可以为function
                publicPath: 'assets',   //指定目标文件的定制公共路径,也可以为function
                context: 'project',     //指定自定义文件上下文。
                regExp:/\/([a-z0-9]+)\/[a-z0-9]+\.png$/,    //为目标文件路径的一个或多个部分指定一个正则表达式 
            },
          },
        ],
      },
    ],
  },
}
```
2. 占位符placehoders
    1. [ext] 文件后缀名
    2. [name]文件原来的名字
    3. [path]资源相对于webpack / config上下文的路径
    4. [folder]资源所在的文件夹
    5. [emoji]内容的随机表情符号表示
    6. [hash]指定生成文件内容哈希值的哈希方法


### url-loader
1. 代码示例
```
<!-- url-loader和file-loader很类似 -->
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,       //正则匹配的文件格式
        use: [
          {
            loader: 'file-loader',     //使用file-loader
            options: {                 //选项
            <!-- 相同 -->
                name:'[path][name].[ext]',  //用到占位符,默认[hash].[ext]为hash+后缀名,name也可以为function
                outputPath: 'images/', //将图片打包到资源文件夹images中,outputPath也可以为function
                publicPath: 'assets',   //指定目标文件的定制公共路径,也可以为function
                context: 'project',     //指定自定义文件上下文。
                regExp:/\/([a-z0-9]+)\/[a-z0-9]+\.png$/,    //为目标文件路径的一个或多个部分指定一个正则表达式 
            <!-- 不同 -->
                limit: 204800, //图片小于200kb都会直接打包到bundle.js中,大于200kb会打包到images内
                fallback:'responsive-loader',   //指定当目标文件的大小超过limit选项中设置的限制时使用的备用加载程序
                mimetype: 'image/png', //设置要转换文件的MIME类型。 如果未指定，则文件扩展名将用于查找MIME类型
            },
          },
        ],
      },
    ],
  },
}
```

### loader打包样式资源
1. 打包样式资源需要多个loader(style-loader/css-loader),use为数组
2. style-loader主要是将css-loader处理过的css文件挂载到head的style中
3. 对其他样式文件(sass/less)需要对应的loader
4. loader的执行从队尾开始执行
5. 使用postcss-loader来处理浏览器厂商前缀的处理,postcss-loader需要autoprefix插件和进行配置
```
<!-- postcss.config.js -->
module.exports = {
    plugins: [
        require('autoprefixer')     //插件
    ]
}
```
6. 如果要使用@import引入样式,需要在options内进行配置
7. 引入图标文字

### 样式loader代码示例
```
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
```