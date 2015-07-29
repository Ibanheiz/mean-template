'use strict';

var config = require('../config');
var gulp   = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', ['browserSync'], function(cb) {
  return nodemon({
        script: 'back/bin/www',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
      });

});

