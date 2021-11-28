
const fs = require('fs');
const path = require('path');
const Module = require('./module');
const MagicString = require('magic-string')
class Bundle {
    constructor(options) {
        //这样写可以兼容没有添加.js后缀或者传递的路径是一个相对路径的情况
        this.entryPath = path.resolve(options.entry.replace(/\.js$/, '') + '.js');
    }
    build(filename) {
        let entryModule = this.fetchModule(this.entryPath);
        //获取入口模块所有的语句节点
        this.statements = entryModule.expandAllStatements();
        //根据这些语句节点生成新成源代码
        const { code } = this.generate();
        //写入目标文件就可以
        fs.writeFileSync(filename, code);
    }
    /**
     * 获取模块
     * @param {*} importee 模块的路径，可能是绝对路径，也可能是相对路径 msg.js
     *  @param {*}importer 从哪个模块导入 main.js
     */
    fetchModule(importee, importer) {
        let route;
        //如果importer为空说明这是一个入口模块，没有引入它的父模块
        if (!importer) {
            route = importee;
        } else {
            if (path.isAbsolute(importee)) {
                route = importee;
            } else if (importee[0] === '.') {
                route = path.resolve(path.dirname(importer), importee.replace(/\.js$/, '') + '.js');
            }
        }
        if (route) {
            let code = fs.readFileSync(route, 'utf8');
            const module = new Module({
                code,//模块源代码
                path: route,//模块的绝对路径
                bundle: this//bundle全局只有一份
            });
            return module;
        }
    }
    generate() {
        let bundleString = new MagicString.Bundle();
        debugger
        this.statements.forEach(statement => {
            const source = statement._source.clone();
            if (/^Export/.test(statement.type)) {
                source.remove(statement.start, statement.declaration.start);
            }
            //把每个astNode语法树节点代码添加到bundleString
            bundleString.addSource({
                content: source,
                separator: '\n'
            });
        });
        return { code: bundleString.toString() };
    }
}
module.exports = Bundle;