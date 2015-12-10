var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var del = require('del');
var handlebars = require('gulp-compile-handlebars');
var ghPages = require('gulp-gh-pages');
var markdown = require('gulp-markdown');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var through = require('through2');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

gulp.task('dev', ['build'], watcher);
gulp.task('deploy', ['build'], deploy);
gulp.task('clean', cleaner);

gulp.task('build', ['build:assets', 'build:blog', 'build:webpack']);
gulp.task('build:assets', copyAssets);
gulp.task('build:blog:posts', compileBlogPosts);
gulp.task('build:blog', ['build:blog:posts'], createBlogIndex);
//gulp.task('build:scss', compileSass);
gulp.task('build:webpack', webpackTask);

var outDir = 'out';
var posts = [];
var devConfig = webpackConfig(outDir);
var devCompiler = webpack(devConfig);

function watcher() {
  browserSync({
    server : {baseDir : outDir},
    open : false
  });

  gulp.watch('src/blog/**', ['build:blog']);
  gulp.watch('src/assets/**', ['build:assets']);
  //gulp.watch('src/scss/**', ['build:scss']);
  gulp.watch('src/**', ['build:webpack']);
}

function webpackTask(callback) {
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
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
      if (post) {
        posts.push({
          link : file.dirname + '/' + file.basename + '.html',
          title : post[1],
          short : post[2]
        });
      }
      this.push(file);
      callback();
    }))
    .pipe(markdown())
    .pipe(rename(function (p) {
      var matched = /^(\d{4})-(\d\d)-(\d\d)-(.*)$/.exec(p.basename);
      p.dirname = matched ? matched.slice(1, 4).join('/') : p.dirname;
      p.basename = matched ? matched[4] : p.basename;
    }))
    .pipe(gulp.dest(outDir + '/blog'))
    .pipe(browserSync.stream());
}

function compileSass() {
  return gulp.src(['src/scss/**/*.scss', '!src/scss/**/_*.scss'])
    .pipe(sass())
    .on('error', function (err) {
      console.log('error occured:', err);
      this.emit('end');
    })
    .pipe(gulp.dest(outDir + '/css'))
    .pipe(browserSync.stream());
}

function cleaner(cb) {
  del([outDir], cb);
}

function deploy() {
  return gulp.src(outDir + '/**')
    .pipe(ghPages());
}
