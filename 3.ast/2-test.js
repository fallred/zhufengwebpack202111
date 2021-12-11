//babel核心模块
const core = require('@babel/core');
//用来生成或者判断节点的AST语法树的节点
let types = require("@babel/types");
const { node } = require('webpack');
let functionPlugin = {
    pre(state) {
        this.replacedPath = null;
        this.targetPath = null;
        this.cache = new Map([[1, '均匀分配']]);
    },
    visitor: {
        VariableDeclaration(path) {
            // if the current path is pathA
            path.inList // true
            path.listKey // "body"
            path.key // 0
            path.getSibling(0) // pathA
            path.getSibling(path.key + 1) // pathB
            path.container // [pathA, pathB, pathC]
            // console.log('path.container:', path.container);
            path.getPrevSibling() // path(undefined) *
            path.getNextSibling() // pathB
            path.getAllPrevSiblings() // []
            path.getAllNextSiblings() // [pathB, pathC]
            // path.get('a')
            // if (path.key === 8) {
            //     const replacedNode = path.getSibling(1);
            //     path.replaceWith(
            //         replacedNode
            //     );
            //     replacedNode.remove();
            // }
            let replacedPath;
            let targetPath;
            path.traverse({
                Identifier(path) {
                    if (path.node.name === 'a') {
                        replacedPath = path.parentPath;
                    }
                    if (path.node.name === 'd') {
                        targetPath = path;
                    }
                }
            });
            if (replacedPath) {
                this.replacedPath = replacedPath;
            }
            if (targetPath) {
                this.targetPath = targetPath;
            }
            if (this.replacedPath && this.targetPath) {
                // this.replacedNode.id
                // this.replacedNode.init
                // const d1 = types.numericLiteral(444);
                // const declarationsNode = types.variableDeclarator(this.replacedNode.id, this.replacedNode.init);
                // const variableDeclarationNode = types.variableDeclaration('var', [declarationsNode]);
                this.targetPath.parentPath.replaceWith(
                    this.replacedPath.node
                );
                this.replacedPath.remove();
            }
        },
        FunctionDeclaration(path) {
            // path.replaceWithSourceString(`function add(a, b) {
            //     return a + b;
            // }`);
            path.insertBefore(types.expressionStatement(types.stringLiteral("Because I'm easy come, easy go.")));
            path.insertAfter(types.expressionStatement(types.stringLiteral("A little high, little low.")));

            // path.remove();

            // const bings = path.scope.hasBinding("_this");
            // const bings = path.scope.hasOwnBinding("_this");
            // console.log('bings:', bings);


            // path.scope.generateUidIdentifier("uid");
            
            // 和api文档不一致，暂没查什么原因
            // const id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
            // path.remove();
            // path.scope.parent.push({ id, init: path.node });

            path.scope.rename("n", "x");
        },
        ReturnStatement(path) {
            // path.replaceWithMultiple([
            //   types.expressionStatement(types.stringLiteral("Is this the real life?")),
            //   types.expressionStatement(types.stringLiteral("Is this just fantasy?")),
            //   types.expressionStatement(types.stringLiteral("(Enjoy singing the rest of the song in your head)")),
            // ]);
        },
        BinaryExpression(path) {
            path.parentPath.replaceWith(
                types.expressionStatement(types.stringLiteral("Anyway the wind blows, doesn't really matter to me, to me."))
            );
            // path.parentPath.remove();
            // path.replaceWith(
            //     types.binaryExpression("**", path.node.left, types.NumericLiteral(2))
            // );
        },
        ClassMethod(path) {
            path.get('body').unshiftContainer('body', types.expressionStatement(types.stringLiteral('before')));
            path.get('body').pushContainer('body', types.expressionStatement(types.stringLiteral('after')));
        },
        StringLiteral(path) {
            // throw path.buildCodeFrameError("Error message here");
        }
    },
    post(state) {
        console.log(this.cache);
    },
    // inherits: require("babel-plugin-syntax-jsx"),
}
/*
function square(n) {
    return n * n;
}
class A {
    constructor() {
      var a = 'middle';
    }
}
*/
let sourceCode = `
var _this = this;
var a = 1;
var b = 2;
var c = 3;
var d = 4;
`;
let targetSource = core.transform(sourceCode, {
    plugins: [functionPlugin]
});

console.log(targetSource.code);
// const tpl = '<h1>Hello, world!</h1>';