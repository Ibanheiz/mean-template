'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var stylus       = require('gulp-stylus');
var minifyCss    = require('gulp-minify-css');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');

gulp.task('styles', function () {

  return gulp.src(config.styles.src)
    .pipe(stylus())
    .pipe(minifyCss({keepBreaks: false}))
    .pipe(gulp.dest(config.styles.dest))
    .on('error', handleErrors)
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});