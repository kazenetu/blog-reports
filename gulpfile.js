var gulp = require('gulp');
var markdown = require('gulp-markdown');
var hl = require('highlight.js').highlightAuto;
var marked = require('marked');

gulp.task('default', function () {
    var renderer = new marked.Renderer();
    renderer.codespan = function(code){
      console.log(">"+code);
      return '<code style="background-color: #BBB; font-weight: bold; font-size:1.2em;">' + code + '</code>';
    }
    renderer.code = function(code,lang){
      console.log(">>"+code+":"+lang);
      return '<pre><code style="background-color: #BBB; padding-top:0.5em;padding-bottom:0.5em;">' + code + '</code></pre>';
    }

    return gulp.src(['./reports/**/*.md','!./**/node_modules/**/*.md'])
        .pipe(markdown(
          {
              highlight: function (src) {
                return hl(src).value
                  .replace(/class="hljs-keyword"/g,'style="color: #AAA; font-weight: bold;"');
              }
              ,renderer:renderer
          }
        ))
        .pipe(gulp.dest('./dest'));
});
