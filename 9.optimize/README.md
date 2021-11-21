- node老版本里有全局依赖
- node新版本里已经不推荐使用了


如果你导出的内容只有一项的话 commonjs2
如果你导出的内容有多项的话，只能commonjs

exports.xxx

module.exports = 
exports.xx


module.exports 就是 export default
exports.xx 就是export {
    
}

libraryExport如果不能就导出整个exports对象
如果给了就导出指定的子属性


14:19
135****5238
提取css的插件是和 speed那个插件一起用会报错 
水星
html的压缩就是自己压缩，不和js和css一起 
