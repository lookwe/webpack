const webpack = require('webpack');
const path = require('path');
const build_DIST = path.resolve(__dirname, '../build')

module.exports = {
    //入口js文件
    entry: path.resolve(__dirname, '../dev/dev.js'),
    output: {
        path: path.resolve(__dirname, '../dev'),
        filename: 'index.js'
    },
    // 模块解析
    module: {},

    // 插件
    plugins: [],

    // 开发环境服务
    devServer: {
        hot: true,
        //热更新 目录
        contentBase: path.resolve(__dirname, '../'),
        port: 8081,
        host: '0.0.0.0',
        open: true,
        proxy: {
          '/api': 'http://www.baidu.com:3000'
        }
    }
}
