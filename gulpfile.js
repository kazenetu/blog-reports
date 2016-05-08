var gulp = require('gulp');
var markdown = require('gulp-markdown');

gulp.task('default', function () {
    return gulp.src(['./reports/**/*.md','!./**/node_modules/**/*.md'])
        .pipe(markdown())
        .pipe(gulp.dest('./dest'));
});
