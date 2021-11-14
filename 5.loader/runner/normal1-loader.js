
function loader(source) {
    console.log('normal1');
    return source + '//normal1';
}
//style=loader的时候 会用到
loader.pitch = function () {
    console.log('normal1 pitch');
    return 'var v = "normal1"';
}
module.exports = loader;