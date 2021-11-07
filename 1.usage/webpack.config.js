const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',//none production development
    //指定项目打包的入口
    entry: './src/index.js',
    output: {
        //指定输出的目录，默认是dist目录,目录的配置必须是一个绝对路径而非相对路径
        path: path.resolve(__dirname, 'dist'),
        //指定的是文件名，默认是main.js
        filename: 'main.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}