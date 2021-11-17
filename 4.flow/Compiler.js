const { SyncHook } = require('tapable');
const Compilation = require('./Compilation');
const fs = require('fs');
const path = require('path').posix;
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
            done: new SyncHook(), //编译结束的时候触发
            compilation: new SyncHook(["compilation", "params"]),
        }
    }
    //4.执行对象的 run 方法开始执行编译
    run(callback) {
        //在执行Compiler的run方法开头触发run这个钩子
        this.hooks.run.call();
        const onCompiled = (err, stats, fileDependencies) => {
            //10.在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
            for (let filename in stats.assets) {
                let filePath = path.join(this.options.output.path, filename);
                fs.writeFileSync(filePath, stats.assets[filename], 'utf8');
            }
            callback(null, {
                toJson: () => stats
            });
            fileDependencies.forEach(fileDependency => {
                fs.watch(fileDependency, () => this.compile(onCompiled));
            });
        }
        this.compile(onCompiled);
        //编译过程....
        this.hooks.done.call();
    }
    compile(onCompiled) {
        //以后每次开启一次新的编译 ，都会创建一个新的Compilation类的实例
        let compilation = new Compilation(this.options);
        this.hooks.compilation.call(compilation);
        compilation.build(onCompiled);
    }
}

module.exports = Compiler;