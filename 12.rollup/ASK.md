- amd/es6/iife/umd/cjs



 {"modules":false}
 模块的关键字 import export不要让babel进行转译，而是交给rollup进行处理

 

import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

rollup-plugin-babel 这是社区的
@rollup/plugin-commonjs 只有rollup官方才能发布