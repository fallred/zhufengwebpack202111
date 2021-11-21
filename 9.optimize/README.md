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


## CDN
- HTML放在自己的服务器上，不缓存，关闭服务器缓存，每次访问服务器都可以获取最新的资源
- 里面的静态文件js css image都指向CDN的地址
- js css image都放在CDN上，并且文件名带上hash值
- 为了可以并行加载，需要把不同类型的文件和不同的文件放在不同的CDN服务器上
- 为了避免同一时间对同一个域名请求数并发的限制，不同的资源放在不同的域名服务器进行并行加载
- dns-prefetch DNS预解析



hash代表整个项目
vendor.4305adaee27b2a3244e5.js
main.4305adaee27b2a3244e5.js
style/main.4305adaee27b2a3244e5.css


chunkhash
每个入口都有自己的chunkhash
如果本入口对应的文件发生改变，chunkhash会改变，如果没有改变，chunkhash会保持不变
