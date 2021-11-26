const HtmlWebpackPlugin = require('html-webpack-plugin')

class PreloadPlugin {
    constructor(options) {
        this.options = options;
    }
    generateLinks(compilation, htmlPluginData) {
        const { rel, include } = this.options
        let chunks = [...compilation.chunks]
        if (include === undefined || include === 'asyncChunks') {
            chunks = chunks.filter(chunk => !chunk.canBeInitial());
        }
        const allFiles = chunks.reduce((accumulated, chunk) => {
            return accumulated.concat(...chunk.files);
        }, [])
        const uniqueFiles = new Set(allFiles);
        const links = [];
        for (const file of uniqueFiles) {
            const href = `${file}`
            const attributes = { href, rel };
            links.push({
                tagName: 'link',
                attributes
            })
        }
        this.resourceHints = links
        return htmlPluginData
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(
            this.constructor.name,
            compilation => {
                HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
                    this.constructor.name,
                    (htmlPluginData, callback) => {
                        this.generateLinks(compilation, htmlPluginData)
                        callback();
                    }
                )
                HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
                    this.constructor.name,
                    (htmlPluginData) => {
                        if (this.resourceHints) {
                            htmlPluginData.assetTags.styles = [
                                ...this.resourceHints,
                                ...htmlPluginData.assetTags.styles
                            ]
                        }
                        return htmlPluginData
                    }
                )
            }
        )
    }
}
function isAsync(chunk) {
    if ('canBeInitial' in chunk) {
        return !chunk.canBeInitial()
    } else {
        return !chunk.isInitial()
    }
}
module.exports = PreloadPlugin;