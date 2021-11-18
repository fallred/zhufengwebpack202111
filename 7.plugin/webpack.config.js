const path = require('path');
const DonePlugin = require('./plugins/done-plugin');
const AssetPlugin = require('./plugins/assets-plugin');
const ArchivePlugin = require('./plugins/archive-plugin');
module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    plugins: [
        new DonePlugin(),
        new AssetPlugin(),
        new ArchivePlugin()
    ]
}