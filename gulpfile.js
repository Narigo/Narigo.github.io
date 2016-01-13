var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var del = require('del');
var Handlebars = require('handlebars');
var handlebars = require('gulp-compile-handlebars');
var ghPages = require('gulp-gh-pages');
var markdown = require('gulp-markdown');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var through = require('through2');
var webpack = require('webpack');
var webpackConfig = require('./webpack.main.config');
var webpackGameConfig = require('./webpack.game.config');

var outDir = 'out';
var posts = [];
var devConfig = webpackConfig(outDir);
var devCompiler = webpack(devConfig);
var gameCompiler = webpack(webpackGameConfig);

gulp.task('dev', ['build'], watcher);
gulp.task('deploy', ['build'], deploy);
gulp.task('clean', cleaner);

gulp.task('build', ['build:assets', 'build:blog', 'build:webpack']);
gulp.task('build:assets', copyAssets);
gulp.task('build:blog:posts', compileBlogPosts);
gulp.task('build:blog', ['build:blog:posts'], createBlogIndex);
gulp.task('build:webpack:main', webpackTask(devCompiler));
gulp.task('build:webpack:game', webpackTask(gameCompiler));
gulp.task('build:webpack', ['build:webpack:game', 'build:webpack:main']);

function watcher() {
  browserSync({
    server : {baseDir : outDir},
    open : false
  });

  gulp.watch('src/blog/**', ['build:blog']);
  gulp.watch('src/assets/**', ['build:assets']);
  gulp.watch(['src/**', '!src/assets/**', '!src/blog/**'], ['build:webpack']);
}

function webpackTask(compiler) {
  return function (callback) {
    compiler.run(function (err, stats) {
      if (err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
        // output options
      }));
      callback();
    });
  };
}

function copyAssets() {
  return gulp.src(['src/assets/**'])
    .pipe(gulp.dest(outDir))
    .pipe(browserSync.stream());
}

function createBlogIndex() {
  return gulp.src(['src/blog/index.html'])
    .pipe(handlebars({posts : posts}, {
      partials : {posts : '{{{posts}}}'}
    }))
    .pipe(rename(function (p) {
      p.extname = '.html';
    }))
    .pipe(gulp.dest(outDir + '/blog'));
}

function compileBlogPosts() {
  return gulp.src(['src/blog/posts/**/*.md'])
    .pipe(through.obj(function (file, enc, callback) {
      var post = /^.*#+\s*(.*?)[\r\n]+([\s\S]*?)(?:[\r\n]{2,}|$)/m.exec(file.contents.toString());
      var filePath = compatPath(path.parse(file.path));
      console.log('md file from blogpost:', file, filePath);
      if (post) {
        pathToBlogPath(filePath);

        var postMeta = {
          link : filePath.dirname + '/' + filePath.basename + '.html',
          title : post[1],
          short : post[2]
        };

        posts.push(postMeta);
        file.post = postMeta;
      }
      this.push(file);
      callback();
    }))
    .pipe(markdown())
    .pipe(applyTemplate('src/blog/posts/post.html'))
    .pipe(rename(pathToBlogPath))
    .pipe(gulp.dest(outDir + '/blog'))
    .pipe(browserSync.stream());

  function compatPath(p) {
    return {
      dirname : p.dir,
      basename : p.base,
      extname : p.ext
    };
  }

  function applyTemplate(templateFile) {
    var template = fs.readFileSync(templateFile).toString();
    var tpl = Handlebars.compile(template);

    return through.obj(function (file, enc, cb) {
      var data = {
        meta : file.post ? file.post : {},
        post : file.contents.toString()
      };
      file.contents = new Buffer(tpl(data), 'utf8');

      this.push(file);
    });
  }

  function pathToBlogPath(p) {
    var matched = /^(\d{4})-(\d\d)-(\d\d)-(.*)(?:\.md)?$/.exec(p.basename);
    p.dirname = (matched ? matched.slice(1, 4).join('/') : p.dirname);
    p.basename = (matched ? matched[4] : p.basename);
    console.log('path to blog path ->', p);
  }
}

function cleaner(cb) {
  del([outDir], cb);
}

function deploy() {
  return gulp.src(outDir + '/**')
    .pipe(ghPages());
}
