const path = require('path')

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bud.js'
    }
}

//用配置文件形式修改webpack默认打包地址