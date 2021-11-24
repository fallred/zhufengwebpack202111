class AssetPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('AssetPlugin', compilation => {
            compilation.hooks.chunkAsset.tap('AssetPlugin', (chunk, filename) => {
                console.log(chunk.name || chunk.id, filename);
            });
        });
    }
}
module.exports = AssetPlugin;