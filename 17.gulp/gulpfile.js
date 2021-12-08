const { series, parallel } = require('gulp6');
const oneTask = (done) => {
    setTimeout(() => {
        console.log('oneTask');
        done();
    }, 1000);
}
const twoTask = (done) => {
    setTimeout(() => {
        console.log('twoTask');
        done();
    }, 2000);
}
const threeTask = (done) => {
    setTimeout(() => {
        console.log('threeTask');
        done();
    }, 3000);
}
//函数的组件 把三个任务变成一个函数，串行依次执行
exports.series = series(oneTask, twoTask, threeTask);
exports.parallel = parallel(oneTask, twoTask, threeTask);
const defaultTask = (done) => {
    console.log('defaultTask');
    done();
}
exports.default = defaultTask;