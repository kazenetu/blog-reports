var gulp = require('gulp');
var typescript = require('gulp-typescript');

//デフォルト
gulp.task('default1', function () {
  return gulp.src(['./**/*.ts','!./node_modules/**/*.ts'])
    .pipe(typescript('./tsconfig.json')).js
    .pipe(gulp.dest('./'));
});

var webserver = require('gulp-webserver');
gulp.task('startServer', function() {
  webStream = gulp.src('./').pipe(webserver());
});
