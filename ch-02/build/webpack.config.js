const webpack = require('webpack');
const path = require('path');
const dev_DIST = path.resolve(__dirname, '../dev')

module.exports = {
    //入口js文件 
    entry: path.resolve(__dirname, '../dev/dev.js'),
    output: {
        path: dev_DIST,
        filename: 'index.js'
    },
    // 模块解析
    module: {},

    // 插件
    plugins: [],

    // 开发环境服务
    devServer: {
        hot: true,
        // 热更新目录 【一般和打包输出文件夹同个目录，不然没用】
        contentBase: dev_DIST,
        // 部署端口号
        port: 8081,
        // 主方式 【0.0.0.0|127.0.0.1】
        host: 'localhost',
        // h5记录 inde.html是否需404替代相应
        historyApiFallback: true,
        // 是否启动时打开浏览器
        open: true,
        // 网络代理
        proxy: {}
    }
}
