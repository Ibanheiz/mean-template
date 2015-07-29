'use strict';

module.exports = {

  'browserPort'  : 3002,
  'UIPort'       : 3001,
  'serverPort'   : 3000,

  'styles': {
    'src' : 'front/css/stylus/*.styl',
    'dest': 'build/css'
  },

  'scripts': {
    'src' : ['front/js/**/*.js', 'front/js/**/**/*.js'],
    'dest': 'build/js'
  },

  'images': {
    'src' : 'front/image/*',
    'dest': 'build/images'
  },

  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'build/',
    'options': {}
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./front/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
