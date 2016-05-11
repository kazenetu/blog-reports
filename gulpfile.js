var gulp = require('gulp');
var markdown = require('gulp-markdown');
var hl = require('highlight.js').highlightAuto;
var marked = require('marked');

gulp.task('default', function () {
    var renderer = new marked.Renderer();
    renderer.codespan = function(code){
      console.log("codespan>"+code);
      return '<code style="background-color: #BBB; font-weight: bold; font-size:1.2em;">' + code + '</code>';
    }
    renderer.code = function(code,lang){
      console.log("code>>"+code+":"+lang);
      return '<pre><code style="background-color: #BBB; padding-top:0.5em;padding-bottom:0.5em;">' + code + '</code></pre>';
    }
    marked.Parser.parse = function(src, options, renderer) {
      console.log("parser>>");
      var parser = new marked.Parser(options, renderer);
      return '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"></head><body>\n'+parser.parse(src)+'</body></html>';
    };

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
