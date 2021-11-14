

class Hook {
    constructor(args) {
        //事件回调参数的函数列表数组['name','age']
        this.args = args;
        //放置所有的事件函数对象 [{type:'sync',fn,name:'1'}]
        this.taps = [];
        this._x = null;//[fn]
        this.call = CALL_DELEGATE;
        this.callAsync = CALL_ASYNC_DELEGATE;
    }
    tap(options, fn) {
        this._tap('sync', options, fn);
    }
    tapAsync(options, fn) {
        this._tap('async', options, fn);
    }
    _tap(type, options, fn) {
        if (typeof options === 'string') {
            options = { name: options }
        }
        let tapInfo = { ...options, type, fn };
        this._insert(tapInfo);
    }
    _insert(tapInfo) {
        this.taps.push(tapInfo);
    }
    compile() {
        throw new Error('抽象方法，子类必须重写此方法');
    }
    _createCall(type) {
        return this.compile({
            taps: this.taps,//事件函数
            args: this.args,//参数数且
            type//钩子类型
        });
    }
}
const CALL_DELEGATE = function (...args) {
    this.call = this._createCall('sync');
    //this是hook实例，我用this调用call方法，call里面的this肯定是指向hook实例的
    return this.call(...args);
}
const CALL_ASYNC_DELEGATE = function (...args) {
    this.callAsync = this._createCall('async');
    //this是hook实例，我用this调用call方法，call里面的this肯定是指向hook实例的
    return this.callAsync(...args);
}
module.exports = Hook;