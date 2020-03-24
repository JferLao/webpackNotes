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

### 图标字体的引入
```

module.exports = {
  module: {
    rules: [
      { //图标字体文件
    test: /\.(eot|ttf|svg)$/, //文字格式处理
    use: { //使用的loader
      loader: 'file-loader',
        }
      },
    ],
  },
}
```


### 使用plugins打包
1. 使用HtmlWebpackPlugin打包结束后自动生成一个index.html文件,并把打包生成的js文件自动引入到这个html文件中
```
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template:'src/index.html'   //以index.html为模板生成
  })]
};
```
2. plugin可以在webpack运行到某个阶段自动帮你完成某个任务.类似Vue等生命周期
3. 使用clean-webpack-plugin自动清除dist文件
```
new CleanWebpackPlugin()  //不用传参,自动清除output配置项里的路径就是dist目录
```

### Entry和output的配置
1. publicPath用来处理引入的Js文件中加入CDN地址前缀等等


### SourceMap处理代码出错
1. sourceMap,是一个映射关系,知道dist目录下的main.js文件中出错的代码对应打包前代码出错对应的位置,dist也会生成一个新的文件来控制映射
2. 使用devtool:'source-map'就可以实现
3. 最佳实践:在development开发环境中使用cheap-module-eval-source-map,production线上环境使用cheap-module-source-map


### webpackDevServer
1. 第一种服务器监听文件的方法,使用webpack的watch方法监听打包后的文件自动刷新
```
<!-- 在package.json文件中设置脚本 -->
"scripts": {
    "watch": "webpack --watch"
  },
```
2. 第二种方法用webpackDevServer来开启一个服务器,可以发送http请求,可以在代码发生改变时浏览器内容自动刷新.这时候打包后的dist文件会放置在内存中以提高打包效率
```
module.exports={
  devServer: {
        contentBase: './dist', //服务器根路径所在位置
        open:true,              //自动打开浏览器并打开localhost:8080   
    }
}
<!-- package.json -->
"scripts": {
      "start": "webpack-dev-server"
  }
```
3. 第三种方法使用Node环境搭建服务器(基于KOA或者Express等框架)

### webpack 热模块更新
1. 使用方法:
```
const webpack = require('webpack') 
module.exports={
  devServer: {
    hot: true, //开启热模块更新
    hotOnly: true, //不让浏览器自动刷新
  },
  plugins: [new webpack.HotModuleReplacementPlugin()] //使用webpack的热模块插件
}
```
2. 使用热模块更新,可以实现文件更改时不自动刷新,而是根据模块变化进行模块的更新,特别当如css发生变化时,当前的页面dom不更新但是更新的css样式可以更新查看
3. 如果使用热模块更新js文件,想要代码部分发生改变/模块发生改变
```
if(module.hot){
  module.hot.accept('./模块',()=>{
    <!-- 重新执行的代码 -->
  })
}

```
4. css发生变化时,css-loader的底层已经处理过HMR效果,所以不用写.
5. 本质上要实现HMR效果都要写这种代码,不过部分框架底层已经写了这部分代码所以不用写.


### 使用Babel处理ES6+语法
1. 安装
```
npm install --save-dev babel-loader @babel/core
npm install @babel/preset-env --save-dev  //所有翻译规则
```
2. 配置
```
module: {
  rules: [
    // 使用babel处理ES6代码
            {
                test: /\.js$/,
                exclude: /node_modules/, //排除node_modules,因为第三方依赖一般已经处理,没必要再处理一次
                loader: "babel-loader",
                options:{
                    "presets": ["@babel/preset-env"]
                }
            }
  ]
}
```
3. 低版本的浏览器对翻译后的语法依然不识别,就需要@babel/polyfill
```
npm install --save @babel/polyfill
import "@babel/polyfill";       //处理ES6代码低版本浏览器不兼容
```
4. 引入@babel/polyfill导致打包后的文件变大,可以通过在babel/preset-env中添加参数控制用到什么语法才翻译
```
{
                test: /\.js$/,
                exclude: /node_modules/, //排除node_modules,因为第三方依赖一般已经处理,没必要再处理一次
                loader: "babel-loader",
                options: {
                    "presets": [
                        ["@babel/preset-env", {
                            useBuiltIns: 'usage' //对使用的es6语法才翻译
                        }]
                    ]
                }
            }
```
5. 也可以把babel抽离出单独文件.babelrc使得全局都可以使用ES6代码
```
{
    "presets": ["@babel/preset-env"]
}
```


### tree shaking
1. tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。
2. 通过 package.json 的 "sideEffects" 属性，来实现将文件标记为 side-effect-free(无副作用) ,如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export
```
<!-- 不想操作的文件可以使用数组记录 -->
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
    "*.css"
  ]
}
```
3. 在webpack.config.js使用Tree Shaking,Tree Shaking在开发环境使用后打包会导入所有模块,但是会只使用用到的模块,在线上环境则会只导入使用的模块
```
<!-- 在开发环境中 -->
module.exports = {
  mode: 'development',
  optimization: {
  usedExports: true
  }
};
<!-- 在线上环境中 -->
module.exports = {
  mode: 'production'
};
```
