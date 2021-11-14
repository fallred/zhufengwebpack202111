const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    //在webpack解析loader的时候配置如何查找
    resolveLoader: {
        //配置别名
        alias: {
            'inline1-loader': path.resolve(__dirname, 'loaders', 'inline1-loader.js'),
            'inline2-loader': path.resolve(__dirname, 'loaders', 'inline2-loader.js')
        },
        //配置去哪些目录里找loader
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    //在配置里直接这样配置的话，类型就是normal
                    path.resolve(__dirname, 'loaders', 'normal1-loader.js'),
                    path.resolve(__dirname, 'loaders', 'normal2-loader.js')
                ]
            },
            {
                test: /\.js$/,
                enforce: 'post',
                use: [
                    //如果在配置的时候添加了enforce=post参数，那么这个loader就是是post-loader
                    path.resolve(__dirname, 'loaders', 'post1-loader.js'),
                    path.resolve(__dirname, 'loaders', 'post2-loader.js')
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: [
                    //如果在配置的时候添加了enforce=post参数，那么这个loader就是是post-loader
                    path.resolve(__dirname, 'loaders', 'pre1-loader.js'),
                    path.resolve(__dirname, 'loaders', 'pre2-loader.js')
                ]
            }
        ]
    }
}