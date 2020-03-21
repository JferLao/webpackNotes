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