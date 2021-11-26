const MagicString = require('magic-string');
const { parse } = require('acorn');
const analyse = require('./ast/analyse');
class Module {
    constructor({ code, path, bundle }) {
        this.code = new MagicString(code, { filename: path });
        this.path = path;
        this.bundle = bundle;
        this.ast = parse(code, { ecmaVersion: 8, sourceType: 'module' });
        this.analyse();
    }
    analyse() {
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