const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css');
const webpack = require('webpack');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const smw = new SpeedMeasureWebpackPlugin();
module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        //libraryExport: 'minus',//配置导出的模块中哪些子模块需要被 导出，它只有在libraryTarget设置为commonjs的时候才有用
        library: 'calculator',//指定导出库的名称 
        //UniversalModuleDefinition
        libraryTarget: 'umd'//以何种方式导出 this.calculator= window.calculator= global.calculator=
    },
    //此处是在模块里找依赖的模块时有效
    resolve: {
        extensions: [".js", ".jsx", ".json"],//指定要加载的模块的扩展名，尽可能把常用的往前放
        alias: { bootstrap },
        modules: ["node_modules"],//指定去哪个目录中查找对应的模块
        mainFields: ['browser', 'module', 'main'],//package.json中的main字段
        // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
        //mainFields: ['browser', 'module', 'main'],
        // target 的值为其他时，mainFields 默认值为：
        //mainFields: ["module", "main"],
        mainFiles: ["index", "main"]
    },
    //此处只用来找 loader时有效
    resolveLoader: {
        modules: ["loaders", "node_modules"],
    },
    module: {
        //不去分析这些模块的依赖，不可能有依赖，所以不去把它转成语法树，分析里的依赖模块
        noParse: /jquery|lodash/,
        /*  noParse: (moduleName) => {
             return /query|lodash/.test(moduleName);
         }, */
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {}
                    },
                    'loader1'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.IgnorePlugin({
            contextRegExp: /moment$/,//忽略 哪个模块
            resourceRegExp: /locale///忽略模块内的哪些资源
        }),
        //new BundleAnalyzerPlugin()
    ]
};
// useBuiltIns: false  400 KiB 把polyfill全量引入，不考虑浏览器兼容性
