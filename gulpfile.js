'use strict';

let gulp = require('gulp');
let del = require('del');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let notify = require('gulp-notify');
let browserSync = require('browser-sync').create();

let assets = require('./assets.json');

let jsConcatOpt = { newLine: ';;' };
let cssConcatOpt = { newLine: '\n\n' };

gulp.task('clean', (done) => del(['./dist/'], done));

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

gulp.task('core.copyFiles', () => {
  return gulp.src([
    './src/core/*.js'
  ])
    .pipe(gulp.dest('./dist/core/'));
});

gulp.task('core.css', () => {
  return gulp.src([
    './src/core/css/*.css'
  ])
    .pipe(concat('core.css', cssConcatOpt))
    .pipe(gulp.dest('./dist/core/'));
});

gulp.task('core', gulp.parallel('core.copyFiles', 'core.css'));

gulp.task('copySrc', () => {
  return gulp.src([
    './src/index.html',
    './src/bootstrap.js',
    './src/config*/config.js'
  ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('serve', (done) => {
  browserSync.init({
    ui: false,
    server: {
      baseDir: './dist/'
    },
    port: 7410,
    ghostMode: false
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

gulp.task('default', gulp.series('clean', 'assets', 'core', 'copySrc', 'serve', 'watch'));