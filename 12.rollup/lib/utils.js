/**
 * 判断obj对象上是否有prop属性
 * @param {*} obj  对象
 * @param {*} prop  属性
 * @returns 
 */
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
exports.hasOwnProperty = hasOwnProperty;