- amd/es6/iife/umd/cjs



 {"modules":false}
 模块的关键字 import export不要让babel进行转译，而是交给rollup进行处理

 

import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

rollup-plugin-babel 这是社区的
@rollup/plugin-commonjs 只有rollup官方才能发布


生成代码有两种思路

var a =1;
var b =2;
var c =3;
console.log(a,b);

1思路 
改变语法树
删除 var c =3;
重新生成源代码

2.思路 rollup
语法不动
要哪个取出来，拼在一起输出
var a =1;
var b =2;
console.log(a,b);