(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();//当前的环境是commonjs2
  else if (typeof define === 'function' && define.amd)
    define([], factory);//说明当前的环境是amd
  else if (typeof exports === 'object')
    exports["calculator"] = factory();//说明当前的运行环境是commonjs
  else
    window["calculator"] = factory();//否则就是脚本环境
})(window, function () {//root self window global this
  return (() => {
    var exports = {};
    (() => {
      var exports = exports;
      function add() { }
      function minus() { }
      exports.add = add;
      exports.minus = minus;
    })();
    return exports;
  })()
    ;
});