// 多文件 [js,html] 打包配置
const path = require('path')
const glob = require('glob')
const htmlWebpackPlugin = require('html-webpack-plugin')

const DIST = path.join(__dirname, '../dist');
const HTML_DIST = path.join(__dirname, '../html');
const dev_ = path.resolve(__dirname, '../src/js');

//处理多文件js打包地址 和取名
let entry = {}
let files = glob.sync(dev_+'/*.js')
files.forEach((item, index) => {
    let key = item.match(/js\/(\S*)\./)[1];
    entry[key] = item
});

let plugins = [];
let htmlS = glob.sync(path.join(__dirname, '../src')+ '/*.html')
console.log(htmlS);
htmlS.forEach((item) => {
    let name = item.match(/src\/(\S*)\.html/)[1];
    plugins.push(
        new htmlWebpackPlugin({
           filename: HTML_DIST + `/${name}.html`,
           title: name,
           template: item,
           inject: 'body',
           hash: true,
           chunks: [name]
        })
    )
})

module.exports = {

    //entry: dev_+'/test1.js', //单文件
    //entry: [dev_+'/test1.js', dev_+'/test2.js'],  //多文件 方式1
    // entry: {
    //     test1: dev_+'/test1.js',
    //     test2: dev_+'/test2.js'
    // },
    entry: entry, //方式2 当文件超过3个以上，建议使用glob 查找所以文件并取值需要的文件
    output: {
        path: DIST,
        //filename: 'dist.js', //如果多文件入门 且一个出门，那么多个js会合并在一个js里
        //filename: '[name].js', // 如果多文件入门，这种 [name] 会根据入口配置key取值当真文件名
        //filename: '[name].[hash].js', //hash 有3种方式 第一种，这种是每次打包会后面加载hash值
        //filename: '[name].[chunkHash].js', //第二种hash 方式： 当多文件时候，如果只改动了某个文件，那么只会打包改动文件，其他不会打包，有利于cdn缓存
        filename: '[name].[chunkHash:5].js', //可以控制hash值长度 第三contentHash
    },

    module: {},

    //单个文件
    // plugins: [
    //     new htmlWebpackPlugin({
    //         filename: HTML_DIST + '/dist.html', //打包后的html放哪里怎么取名
    //         title: '无敌人博客',
    //         template: path.join(__dirname, '../src/index.html'), //需要打包的html
    //         inject: true, //是否在需要引入打包好的js, 可取值: body head false,
    //         hash: true,
    //         chunks: ["index"], //一般在对文件，选择指定需要引入打包好的js。取值为js的文件名
    //     })
    // ],
    plugins: plugins,

    devServer: {
        hot: true,
        contentBase: DIST,
        port: 8080,
        host: 'localhost',
    }
}