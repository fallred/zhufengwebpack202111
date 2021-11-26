
const fs = require('fs');
const Module = require('./module');
const MagicString = require('magic-string')
class Bundle {
    constructor(options) {
        this.entryPath = options.entry;
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
     * @param {*} importee 模块的路径，可能是绝对路径，也可能是相对路径
     */
    fetchModule(importee) {
        let route = importee;
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
        this.statements.forEach(statement => {
            //把每个astNode语法树节点代码添加到bundleString
            bundleString.addSource({
                content: statement._source,
                separator: '\n'
            });
        });
        return { code: bundleString.toString() };
    }
}
module.exports = Bundle;