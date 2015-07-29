'use strict';

module.exports = {

  'browserPort'  : 3002,
  'UIPort'       : 3001,
  'serverPort'   : 3000,

  'watch': {
    'scripts' : ['front/js/**/*.js', 'front/js/**/**/*.js'],
    'styles' : ['front/css/stylus/*.styl', 'front/css/stylus/**/**/*.styl'],
    'image' : 'front/image/*',
    'views' : 'back/modules/**/views/*.jade'
  },

  'styles': {
    'src' : 'front/css/stylus/*.styl',
    'dest': 'front/build/css'
  },

  'scripts': {
    'src' : ['front/js/**/*.js', 'front/js/**/**/*.js'],
    'dest': 'front/build/js'
  },

  'images': {
    'src' : 'front/image/*',
    'dest': 'front/build/images'
  },

  'fonts': {
    'src' : 'front/css/fonts/*',
    'dest': 'front/build/css/fonts'
  },

  'gzip': {
    'src': 'front/build/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'front/build/',
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
