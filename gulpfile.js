'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var getLmnTask = require('lmn-gulp-tasks');

var config = {
  css: {
    src: './demo/scss/*.{sass,scss}',
    dest: './demo/build'
  },
  js: {
    watch: ['./src/js/**/*.js', './demo/js/**/*.js'],
    src: './index.js',
    dest: './demo/build/bundle.js'
  },
  lint: {
    src: './src/**/*.js'
  },
  browser: {
    server: {
      baseDir: '.'
    },
    startPath: '/demo/index.html'
  }
};

gulp.task('js-quality', getLmnTask('js-quality', config.lint));

gulp.task('js', ['js-quality'], getLmnTask('browserify', config.js));
gulp.task('scss', getLmnTask('scss', config.css));

gulp.task('js-watch', getLmnTask('browserify', {
  src: config.js.watch,
  dest: config.js.dest,
  watch: true
}));

gulp.task('js-quality', getLmnTask('js-quality', {
  src: './src/js/**/*.js'
}));

gulp.task('build', ['js', 'scss']);

gulp.task('default', ['build'], function () {
  browserSync.init([
    'build/**/*.css',
    'build/**/*.js',
    'test/**/*.js'
  ], config.browser);

  gulp.watch('./src/scss/**/*.{sass,scss}', ['scss']);
});
