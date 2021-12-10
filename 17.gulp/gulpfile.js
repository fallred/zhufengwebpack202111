const { src, dest } = require('gulp6');
const defaultTask = () => {
    return src('src/scripts/**/*.js')
    //.pipe(dest('dist'));
}
exports.default = defaultTask;