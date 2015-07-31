'use strict';

var config = require('../config');
var gulp   = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
  return nodemon({
    script: config.nodemon.script,
    ext: config.nodemon.ext,
    env: { 'NODE_ENV': config.nodemon.env },
    watch: config.nodemon.watch
  });
});

