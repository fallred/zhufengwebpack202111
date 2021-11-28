const MagicString = require('magic-string');
const { parse } = require('acorn');
const analyse = require('./ast/analyse');
const { hasOwnProperty } = require('./utils');
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
        //获取定义的变量和读取的变量
        analyse(this.ast, this.code, this);
        this.ast.body.forEach(statement => {
            //statement._defines可以从语句获取变量名
            //可以从变量名叫定义这个变量的语句
            Object.keys(statement._defines).forEach(name => {
                //this.definitions['say']=function say(hi){}
                this.definitions[name] = statement;
            });
        });
    }
    expandAllStatements() {
        let allStatements = [];
        this.ast.body.forEach(statement => {
            //如果是导入语句的话直接忽略 ，不会放在结果 里
            if (statement.type === 'ImportDeclaration') return;
            let statements = this.expandStatement(statement);
            allStatements.push(...statements);
        });
        return allStatements;
    }
    expandStatement(statement) {
        statement._include = true;
        let result = [];
        //获得这个语句依赖或者说使用到了哪些变量
        const depends = Object.keys(statement._dependsOn);
        depends.forEach(dependName => {
            //找到这个依赖的变量对应的变量定义语句
            let definition = this.define(dependName);
            result.push(...definition);
        });
        result.push(statement);
        return result;
    }
    //返回此变量对应的定义语句
    define(name) {
        //判断这个变量是外部导入的，还是模块内声明的
        if (hasOwnProperty(this.imports, name)) {
            //localName name2 importName name source home
            const { localName, importName, source } = this.imports[name];
            //获取依赖的模块 source依赖的模块名 this.path=当前模块的绝对路径
            let importModule = this.bundle.fetchModule(source, this.path);
            //externalLocalName=localName=hname
            let { localName: externalLocalName } = importModule.exports[importName];
            return importModule.define(externalLocalName);
            //说明是模块自己声明的
        } else {
            //获取本模块内的变量声明语句，如果此语句没有包含过的话，递归添加到结果 里
            let statement = this.definitions[name];
            if (statement && !statement._include) {
                return this.expandStatement(statement);
            } else {
                return [];
            }
        }
    }
}
module.exports = Module;