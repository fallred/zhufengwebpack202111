const { Stream } = require('stream');
function VinylFile(options) {
    for (let key in options) {
        this[key] = options[key];
    }
}
VinylFile.prototype.isBuffer = function () {
    return Buffer.isBuffer(this.contents)
}
VinylFile.prototype.isStream = function () {
    return this.contents instanceof Stream;
}
VinylFile.isVinyl = function (obj) {
    return obj instanceof VinylFile;
}
module.exports = VinylFile;