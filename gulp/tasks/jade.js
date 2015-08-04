'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var config       = require('../config');

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src(config.test.jade.source)
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest(config.test.jade.dest))
});