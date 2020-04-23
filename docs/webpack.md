## webpac 个人笔记

1.  `npm i webpack webpack-cli  `  安装(必须的)
2.  

### 命令方式运行压缩

* 运行命令  `webpack .\src\index.js -o .\dist\buid.js` 前面是指定入口，后面指定出口
* 或者运行 `webpack` 其实就是默认命令简写 `webpack .\src\index.js -o .\dist\main.js`
* 需要注意点：如果webpack配置不在更目录中，那么运行时需要指明配置在哪个位置。例如：
  * 放在根目录build文件中 那么运行  **`... --config build/webpack.config ...`** 

### 修复默认压缩地址

<img src="https://img-blog.csdnimg.cn/20200423231603950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMzg3ODgy,size_16,color_FFFFFF,t_70" alt="图片" style="zoom:80%;" />

### 使用热webpack-dev-server [热更新]

1. 安装插件 `npm i webpack-dev-server -D`  不能全局安装 ,不可能监听总个电脑，本地安装即可
2. 输入命令 `webpack-dev-server`  因为不是全局，本地目录输入无法识别命令 可以在package.json中配置npm run的命令如: { "dev":  "webpack-dev-server" }

* 常用配置，设置配置文件中 devServer: { ... } 如图：

  <img src="https://img-blog.csdnimg.cn/20200423234415135.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMzg3ODgy,size_16,color_FFFFFF,t_70" style="zoom:110%;" />

* 更多开发环境配置请参考 [webpack-devServer配置文档](https://webpack.js.org/configuration/dev-server/)

 

### webpack 配置多文件打包方式

