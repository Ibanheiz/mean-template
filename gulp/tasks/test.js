'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var config = require('./../config');
var handleErrors = require('../util/handleErrors');

gulp.task('test', ['jade'], function () {
  return gulp.src(config.test.source, {read: false})
        .pipe(mocha()
        .on('error', handleErrors));
});