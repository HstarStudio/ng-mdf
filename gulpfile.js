'use strict';

let gulp = require('gulp');
let del = require('del');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let notify = require('gulp-notify');
let browserSync = require('browser-sync').create();

let assets = require('./assets.json');

gulp.task('clean', (done) => del(['./dist/'], done));

gulp.task('assets.js', () => {
  return gulp.src(assets['assets.js'])
    .pipe(concat('assets.js', { newLine: ';;' }))
    .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('assets', gulp.parallel('assets.js'));

gulp.task('core.copyFiles', () => {
  return gulp.src([
    './src/core/*.js'
  ])
    .pipe(gulp.dest('./dist/core/'));
});

gulp.task('copySrc', () => {
  return gulp.src([
    './src/index.html',
    './src/bootstrap.js',
    './src/config*/config.js'
  ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('core', gulp.parallel('core.copyFiles'));

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

gulp.task('default', gulp.series('clean', 'assets', 'core', 'copySrc', 'serve'));