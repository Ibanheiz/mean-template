'use strict';

var config        = require('../config');
var gulp          = require('gulp');
var reload = require('browser-sync').reload;

gulp.task('watch', ['browserSync', 'nodemon'], function () {
  gulp.watch(config.watch.scripts, ['lint']);
  gulp.watch(config.watch.styles,  ['styles']);
  gulp.watch(config.watch.images,  ['images']);
  gulp.watch(config.watch.views,  ['views']);
});