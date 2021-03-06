var gulp = require('gulp');
var markdown = require('gulp-markdown');
var hl = require('highlight.js').highlightAuto;
var marked = require('marked');
var inlineCss = require('gulp-inline-css');

gulp.task('_createHtml', function () {
    marked.Parser.parse = function(src, options, renderer) {
      var parser = new marked.Parser(options, renderer);
      var parseValue = parser.parse(src);

      return '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">'
      +'<link rel="stylesheet" href="../../node_modules/highlight.js/styles/vs.css">'
      +'<link rel="stylesheet" href="../../css/code.css">'
      +'</head><body>\n'+parseValue+'</body></html>';
    };

    var renderer = new marked.Renderer();
    renderer.heading = function (text, level) {
      return '<br><b>' + text + '</b><br>';
    };
    renderer.paragraph = function(text) {
      return text + '<br>\n';
    };
    renderer.code = function(code, lang, escaped) {
      if (this.options.highlight) {
        var out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }

      if (!lang) {
        return '<pre><span class="code">'
          + (escaped ? code : escape(code, true))
          + '\n</span></pre>';
      }

      return '<pre><span class="'
        + this.options.langPrefix
        + escape(lang, true)
        + ' code">'
        + (escaped ? code : escape(code, true))
        + '\n</span></pre>\n';
    };
    renderer.codespan = function(text) {
      return '<span class="code">' + text + '</span>';
    };

    return gulp.src(['./reports/**/*.md','!./**/node_modules/**/*.md'])
        .pipe(markdown(
          {
              highlight: function (src) {
                return hl(src).value;
              }
              ,renderer: renderer
          }
        ))
        .pipe(gulp.dest('./temp'));
});

gulp.task('default',['_createHtml'], function () {
  return gulp.src(['./temp/**/*.html','!./temp/*.html'])
      .pipe(inlineCss())
      .pipe(gulp.dest('dest/'));
});
