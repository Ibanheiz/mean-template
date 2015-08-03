'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var config = require('./../config');

gulp.task('test', function () {
  return gulp.src(config.test.source, {read: false})
        .pipe(mocha());
});