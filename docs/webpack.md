## webpac 个人笔记

1.  `npm i webpack webpack-cli  `  安装(必须的)
2.  ``npm i webpack-devp-server``  需要热更新及开发服务器使用

### 命令方式运行压缩

* 运行命令  `webpack .\src\index.js -o .\dist\buid.js` 前面是指定入口，后面指定出口
* 或者运行 `webpack` 其实就是默认命令简写 `webpack .\src\index.js -o .\dist\main.js`
* **需要注意点**：如果webpack配置不在更目录中，那么运行时需要指明配置在哪个位置。例如：
  * 放在根目录build文件中 那么运行  **`... --config webpack配置目录/webpack.config ...`** 

### 修复默认压缩地址

<img src="https://img-blog.csdnimg.cn/20200423231603950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMzg3ODgy,size_16,color_FFFFFF,t_70" alt="图片" style="zoom:80%;" />

### 使用热webpack-dev-server [热更新]

1. 安装插件 `npm i webpack-dev-server -D`  不能全局安装 ,不可能监听总个电脑，本地安装即可
2. 输入命令 `webpack-dev-server`  因为不是全局，本地目录输入无法识别命令 可以在package.json中配置npm run的命令如: { "dev":  "webpack-dev-server" }

* 常用配置，设置配置文件中 devServer: { ... } 如图：

  <img src="https://img-blog.csdnimg.cn/20200423234415135.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMzg3ODgy,size_16,color_FFFFFF,t_70" style="zoom:110%;" />

* 更多开发环境配置请参考 [webpack-devServer配置文档](https://webpack.js.org/configuration/dev-server/)

 

### webpack 配置多文件打包方式

* **Js文件多文件处理**

* 需要准备辅助插件 `glob` 用户查找项目的文件功能等 `npm i glob -save-dev`

  1.如果文件目录不是很多1-3个时候，我们可以在webpack配置文件中，指定入口文件为数组，例如

  1. 方案一

     ```javascript
     module.exports = {
         entry: [‘../src/js/index.js’...], //多个文件
         output: {
             path: DIST, //打包文件夹
             filename: 'dist.js', //如果入口多 出口一个，则合并打包成一个
         }
     ```

  2. 方案二

     ```javascript
     module.exports = {
         entry: {
           index: '../src/js/index.js',
           main: '../src/js/main.js'
         }
         output: {
             path: DIST, //打包文件夹
             filename: '[name].js', //打包的文件名会以entry的key命令
         }
     }
     ```

  3. 方案三

     ```javascript
     let entry = {}; //定义变量用于接收打包的文件
     let files = glob.sync(dev_+'/*.js'); //glob返回指定目录的文件，返回数组格式的文件绝对路径
     files.forEach((item, index) => {
         let key = item.match(/js\/(\S*)\./)[1]; //正则取出文件名
         entry[key] = item
     });
     module.exports = {
         entry,
         output: {
             path: DIST, //打包文件夹
             filename: '[name].js', //打包的文件名会以entry的key命令
         }
     }
     ```

* 多文件js打包`output`其他配置

  `filename: [name].[hash].js`  指定打包后的文件后面使用hash值

  `filename: [name].[chunkHash].js`  使用chunkHash当没有改动的文件不用重新打包

  `filename: [name].[chunkHash:5].js`  指定hash长度，还有一种不常用的 contentHash可了解下

  

#### html多个页面打包处理

* 需要使用插件工具 `html-webpack-plugin` 辅助打包  `npm i html-webpack-plugin -save-dev`

* 打包1-3个html文件时候可在webpack中 plugins：[] 配置

  ```javascript
  //单个文件
  plugins: [
          new htmlWebpackPlugin({
              filename: HTML_DIST + '/dist.html', //打包后的html放哪里怎么取名
              title: '无敌人博客',
              template: path.join(__dirname, '../src/index.html'), //需要打包的html
              inject: true, //是否在需要引入打包好的js, 可取值: body head false,
              hash: true,
              chunks: ["index"], //一般在对文件，选择指定需要引入打包好的js。取值为js的文件名
          })
  ],
  ```

* 当页面达到一定数量也可以同理使用多文件js处理方案一样，使用glob工具，取值指定目录文件，返回文件绝对路径的数组

* 更多详细配置介绍 [html-webpack-plugin插件配置](https://www.cnblogs.com/grimm/p/5770829.html)