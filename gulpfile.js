'use strict';

let gulp = require('gulp');
let del = require('del');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let notify = require('gulp-notify');
let browserSync = require('browser-sync').create();
let history = require('connect-history-api-fallback');

let assets = require('./assets.json');

let jsConcatOpt = { newLine: ';;' };
let cssConcatOpt = { newLine: '\n\n' };

gulp.task('clean', (done) => del(['./dist/'], done));

/**************************处理Assets*****************************/

gulp.task('assets.js', () => {
  return gulp.src(assets['assets.js'])
    .pipe(concat('assets.js', jsConcatOpt))
    .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('assets.css', () => {
  return gulp.src(assets['assets.css'])
    .pipe(concat('assets.css', cssConcatOpt))
    .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('assets.fonts', () => {
  return gulp.src(assets['assets.fonts'])
    .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('assets', gulp.parallel('assets.js', 'assets.css', 'assets.fonts'));

/**************************处理Common*****************************/
gulp.task('common.js', () => {
  return gulp.src([
    './src/common/common.js',
    './src/services/*.js'
  ]).pipe(concat('common.js', jsConcatOpt))
    .pipe(gulp.dest('./dist/assets/js/'));
});
gulp.task('common', gulp.parallel('common.js'));

/**************************处理Core*****************************/

gulp.task('core.js', () => {
  return gulp.src([
    './src/core/core.js',
    './src/core/services/*.js'
  ])
    .pipe(concat('core.js', jsConcatOpt))
    .pipe(gulp.dest('./dist/core/'));
});

gulp.task('core.css', () => {
  return gulp.src([
    './src/core/css/*.css'
  ])
    .pipe(concat('core.css', cssConcatOpt))
    .pipe(gulp.dest('./dist/core/'));
});

gulp.task('core.copyFiles', () => {
  return gulp.src([
    './src/core/**/*.html'
  ])
    .pipe(gulp.dest('./dist/core/'));
});

gulp.task('core', gulp.parallel('core.copyFiles', 'core.js', 'core.css'));

/**************************处理其他资源*****************************/

gulp.task('copySrc', () => {
  return gulp.src([
    './src/index.html',
    './src/bootstrap.js',
    './src/config*/config.js'
  ])
    .pipe(gulp.dest('./dist/'));
});

/**************************启动浏览器*****************************/

gulp.task('serve', (done) => {
  browserSync.init({
    ui: false,
    server: {
      baseDir: './dist/'
    },
    port: 7410,
    ghostMode: false,
    middleware: [history()]
  });
  done();
});

gulp.task('reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('watch', (done) => {
  gulp.watch([
    'src/**/*',
    '!modules/**/*'
  ], gulp.series('core', 'copySrc', 'reload'));
  done();

  gulp.watch([
    'assets/**/*'
  ], gulp.series('assets', 'reload'));

});

gulp.task('default', gulp.series('clean', gulp.parallel('assets', 'common', 'core', 'copySrc'), gulp.parallel('serve', 'watch')));