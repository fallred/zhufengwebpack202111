
const Stream = require('stream');
const { inherits } = require('util');
function Writable(options) {
    Stream.call(this, options);
    this._writableState = {
        ended: false,//是否已经写完了 是否已经把所有的馒头吃完了,吃撑了，吃不下了
        writing: false,//是否正在写 是否嘴里正在吃馒头
        buffer: []// 缓存区，用来存放将要写入的数据，也就是放馒头的桌子
    };
    if (options.write) this._write = options.write;
}
inherits(Writable, Stream);
Writable.prototype.write = function (chunk) {
    if (this._writableState.ended) {
        //wite header after end 可写流已经关闭了，就不能往里写东西了
        return false;
    }
    //如果当前正在写入2
    if (this._writableState.writing) {
        this._writableState.buffer.push(chunk);
    } else {//如果当前没有正在写入1
        //_write 是真正的写入方法，比如说写入硬盘，吃馒头
        this._writableState.writing = true;
        this._write(chunk, 'utf8', () => this.next());
    }
}
Writable.prototype.next = function () {
    this._writableState.writing = false;
    if (this._writableState.buffer.length > 0) {
        this._write(this._writableState.buffer.shift(), 'utf8', () => this.next());
    }
}
Writable.prototype.end = function () {
    this._writableState.ended = true;
}
module.exports = Writable;