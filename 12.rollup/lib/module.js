const MagicString = require('magic-string');
const { parse } = require('acorn');
const analyse = require('./ast/analyse');
class Module {
    constructor({ code, path, bundle }) {
        this.code = new MagicString(code, { filename: path });//源代码
        this.path = path;//当前模块的绝对路径
        this.bundle = bundle;//当前的bundle
        this.ast = parse(code, { ecmaVersion: 8, sourceType: 'module' });//把源代码转成抽象语法树
        this.imports = {};//记录当前模块从哪些模块导入了哪些变量
        this.exports = {};//记录当前模块向外导出了哪些变量
        this.definitions = {};//记录变量是在哪个语句节点中定义的
        this.analyse();//开始进行语法树的分析
    }
    analyse() {
        this.ast.body.forEach(statement => {
            //找出this.imports
            if (statement.type === 'ImportDeclaration') {
                let source = statement.source.value;// ./msg
                let specifiers = statement.specifiers;
                specifiers.forEach(specifier => {
                    let importName = specifier.imported.name;//导入的变量，也就是在导入的模块里叫什么名字
                    let localName = specifier.local.name;//本地变量，在当前模块叫什么
                    //this.imports['name'] = {localName:'name',source:'./msg',importName:'name'};
                    //为了方便记忆，我把格式统一一下
                    this.imports[localName] = { localName, source, importName };
                });
            }
            //找出this.exports
            if (statement.type === 'ExportNamedDeclaration') {
                let declaration = statement.declaration;
                if (declaration.type === 'VariableDeclaration') {
                    let declarations = declaration.declarations;
                    declarations.forEach(declaration => {
                        let localName = declaration.id.name;//当前模块内声明的变量名
                        let exportName = localName;
                        //记录导出了哪个变量，这个变量是通过哪个声明语名声明的
                        this.exports[exportName] = { localName, exportName, declaration };
                    });
                }
            }
        });
        analyse(this.ast, this.code, this);
    }
    expandAllStatements() {
        let allStatements = [];
        this.ast.body.forEach(statement => {
            allStatements.push(statement);
        });
        return allStatements;
    }
}
module.exports = Module;