
/**
 * 对当前的语法进行解析
 * @param {*} ast 语法树
 * @param {*} code 源代码
 * @param {*} module 模块
 */
function analyse(ast, magicString, module) {
    //遍历所有的语法一级语句或者说顶级语句
    ast.body.forEach(statement => {
        //给statement语法树节点添加属性
        Object.defineProperties(statement, {
            //_source 就是这个语法树的节点在源码中对应那一部分节点源代码
            _source: { value: magicString.snip(statement.start, statement.end) }
        });
    });
}
module.exports = analyse;