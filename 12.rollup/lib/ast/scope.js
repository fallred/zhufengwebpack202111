
class Scope {
    constructor(options) {
        this.name = options.name;//作用域的名字，没什么用
        this.parent = options.parent;//父作用域，它用来构建作用域链
        this.names = options.names || [];//此作用域内部的定义的变量
    }
    /**
     * 向当前的作用域内添加个变量name
     * @param {*} name 
     */
    add(name) {
        this.names.push(name);
    }
    /**
     * 查找某个变量是在哪个作用域中定义的
     * 原理是延着作用域链向上查找，一直查到根作用域为止，如果查不到返回null
     */
    findDefiningScope(name) {
        //如果当前的作用域内包含name变量
        if (this.names.includes(name)) {
            return this;//返回当前作用域 
        }
        if (this.parent) {
            return this.parent.findDefiningScope(name);
        }
        return null;
    }
}
module.exports = Scope;