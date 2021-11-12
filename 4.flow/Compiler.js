const { SyncHook } = require('tapable');
const Compilation = require('./Compilation');
/**
 * 代表整个编译对象，负责整个编译的过程，里面会保存所有的编译的信息
 * Compiler类的实例全局唯一
 */
class Compiler {
    constructor(options) {
        this.options = options;
        //存的是当前的Compiler上面的所有的钩子
        this.hooks = {
            run: new SyncHook(), //开始编译的时候触发
            done: new SyncHook() //编译结束的时候触发
        }
    }
    //4.执行对象的 run 方法开始执行编译
    run(callback) {
        //在执行Compiler的run方法开头触发run这个钩子
        this.hooks.run.call();
        function onCompiled() {
            console.log('onCompiled');
        }
        this.compile(onCompiled);
        //编译过程....
        this.hooks.done.call();
    }
    compile(onCompiled) {
        //以后每次开启一次新的编译 ，都会创建一个新的Compilation类的实例
        let compilation = new Compilation(this.options);
        compilation.build(onCompiled);
    }
}

module.exports = Compiler;