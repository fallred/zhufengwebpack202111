

const gs = require('./glob-stream');
const wrapVinyl = require('./wrap-vinyl');
function src(glob) {
    //获取了glob的可读流
    const globStream = gs(glob);
    //获取的一个虚拟文件流
    const vinylStream = globStream.pipe(wrapVinyl());
    vinylStream.on('data', (vinylFile) => {
        console.log(vinylFile);
    });
}
module.exports = src;