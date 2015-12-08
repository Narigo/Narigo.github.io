var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var del = require('del');
var handlebars = require('gulp-compile-handlebars');
var ghPages = require('gulp-gh-pages');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var through = require('through2');

gulp.task('build:assets', copyAssets);
gulp.task('build:blog:posts', compileBlogPosts);
gulp.task('build:blog', ['build:blog:posts'], createBlogIndex);
gulp.task('build:js', browserifyJs);
gulp.task('build:scss', compileSass);
gulp.task('build', ['build:assets', 'build:blog', 'build:js', 'build:scss']);

gulp.task('dev', ['build'], watcher);
gulp.task('deploy', ['build'], deploy);

gulp.task('clean', cleaner);

var outDir = 'out';
var posts = [];

function watcher() {
  browserSync({
    server : {baseDir : outDir},
    open : false
  });

  gulp.watch('src/assets/**', ['build:assets']);
  gulp.watch('src/blog/**', ['build:blog']);
  gulp.watch('src/js/**', ['build:js']);
  gulp.watch('src/scss/*.scss', ['build:scss']);
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
      console.log('args:', file.contents.toString());
      var post = /^.*#+\s*(.*?)[\r\n]+([\s\S]*?)(?:[\r\n]{2,}|$)/m.exec(file.contents.toString());
      if (post) {
        console.log(post);
        posts.push({
          link : file.dirname + '/' + file.basename + '.html',
          title : post[1],
          short : post[2]
        });
      } else {
        console.log(file);
      }
      console.log('through through!');
      this.push(file);
      callback();
    }))
    .pipe(markdown())
    .pipe(rename(function (p) {
      console.log('in rename!', p);
      var matched = /^(\d{4})-(\d\d)-(\d\d)-(.*)$/.exec(p.basename);
      p.dirname = matched ? matched.slice(1, 4).join('/') : p.dirname;
      p.basename = matched ? matched[4] : p.basename;
    }))
    .pipe(gulp.dest(outDir + '/blog'))
    .pipe(browserSync.stream());
}

function compileSass() {
  return gulp.src(['src/scss/*.scss', '!src/scss/_*.scss'])
    .pipe(sass())
    .on('error', function (err) {
      console.log('error occured:', err);
      this.emit('end');
    })
    .pipe(gulp.dest(outDir + '/css'))
    .pipe(browserSync.stream());
}

function browserifyJs() {
  return browserify('./src/js/app.js')
    .bundle()
    .on('error', function (err) {
      console.log('error occured:', err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest(outDir + '/js'))
    .pipe(browserSync.stream())
}

function cleaner(cb) {
  del([outDir], cb);
}

function deploy() {
  return gulp.src(outDir + '/**')
    .pipe(ghPages());
}
