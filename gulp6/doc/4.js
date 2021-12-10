const path = require('path');
const fs = require('fs');
const { Stream } = require('stream');
//var VinylFile = require('vinyl');
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
let vinylFile = new VinylFile({
    cwd: process.cwd(),// 当前路径
    base: path.resolve(process.cwd(), 'src/scripts'),//文档所在的目录，或者说基准目录
    path: path.resolve('src/scripts/main.js'),
    contents: fs.readFileSync(path.resolve('src/scripts/main.js'))
    //contents: fs.createReadStream(path.resolve('src/scripts/main.js'))
});
console.log(VinylFile.isVinyl(vinylFile));
console.log(vinylFile.isBuffer());
console.log(vinylFile.isStream());