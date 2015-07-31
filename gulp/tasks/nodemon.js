'use strict';

var config = require('../config');
var gulp   = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
  return nodemon({
    script: 'back/bin/www',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    watch: 'back/**'
  });
});

