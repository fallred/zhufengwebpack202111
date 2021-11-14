
class HookCodeFactory {
    setup(hook, options) {
        //把事件函数对象中的函数取出来，拼成一个数组传递给 hook._x
        hook._x = options.taps.map(tap => tap.fn);
    }
    args() {
        let allArgs = this.options.args;//[name,age]
        return allArgs.join(',');//name,age
    }
    init(options) {
        this.options = options;
    }
    deInit() {
        this.options = null;
    }
    header() {
        let code = '';
        code += `var _x = this._x;\n`;
        return code;
    }

    /**
     * 动态创建函数
     * @param {*} options  
     *    taps tapInfo数组
     *    args 参数数组
     *    type 注册类型
     */
    create(options) {
        this.init(options);  // this.options = options;
        let { type } = options;
        let fn;
        switch (type) {
            case 'sync':
                fn = new Function(
                    this.args(),//name,age
                    this.header() + this.content()
                );
                break;
            default:
                break;
        }
        return fn;
    }
    callTapsSeries() {
        let taps = this.options.taps;
        if (taps.length === 0) {
            return '';
        }
        let code = '';
        for (let i = 0; i < taps.length; i++) {
            let content = this.callTap(i);
            code += content;
        }
        return code;
    }
    /**
     *  var _fn0 = _x[0];
     *   _fn0(name, age);
     * @param {*} i 
     */
    callTap(tapIndex) {
        let code = '';
        code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
        let tapInfo = this.options.taps[tapIndex];
        switch (tapInfo.type) {
            case 'sync':
                code += `_fn${tapIndex}(${this.args()})\n`;
                break;
            default:
                break;
        }
        return code;
    }
}
module.exports = HookCodeFactory;