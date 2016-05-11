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
    marked.Parser.parse = function(src, options, renderer) {
      console.log("parser>>");
      var parser = new marked.Parser(options, renderer);
      var parseValue = parser.parse(src)
                        .replace(/<pre><code /g,'<pre  style="background-color: #BBB;padding:1em 1em 1em 1em;"><code ')
                        //.replace(/<\/pre><\/code>/g,'</code>')
                        ;


      return '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"></head><body>\n'+parseValue+'</body></html>';
    };

    return gulp.src(['./reports/**/*.md','!./**/node_modules/**/*.md'])
        .pipe(markdown(
          {
              highlight: function (src) {
                return hl(src).value
                  .replace(/class="hljs-keyword"/g,'style="color: #00F; font-weight: bold;"');
              }
              ,renderer:renderer
          }
        ))
        .pipe(gulp.dest('./dest'));
});
