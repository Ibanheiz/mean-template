var gulp = require('gulp');
var modularGulp = require('gulp-modular-tasks')(gulp);

var styleFiles = 'front/css/stylus/*.styl',
  styleFilesModules = 'front/css/stylus/**/*.styl',
  jsFiles = [
    'front/js/*.js',
    'front/js/modules/**/*.js'
  ],
  jsComponents = [
    'front/components/**/angular.min.js',
    'front/components/**/*min.js',
  ],
  jsComponentsMaps = [
    'front/components/**/*min.js.map',
  ];

gulp.task('build:stylus', modularGulp.createTask('stylus', styleFiles, 'front/css'));
gulp.task('lint', modularGulp.createTask('lint', jsFiles));
gulp.task('minify-concat:js', ['lint'], modularGulp.createTask('minify-concat', jsFiles, 'all.min.js', 'front/js/min'));
gulp.task('bower-concat', ['copy-bower-map'], modularGulp.createTask('concat', jsComponents, 'components.min.js', 'front/js/min'));
gulp.task('copy-bower-map', modularGulp.createTask('copy', jsComponentsMaps, 'front/js/min'));
gulp.task('nodemon', modularGulp.createTask('nodemon', 'back/bin/www'));
gulp.task('livereload', modularGulp.createTask('watch', 'back/modules/**/views/*.jade'));
gulp.task('mocha', modularGulp.createTask('mocha', 'back/test/**/*.js'));
gulp.task('imageopt', modularGulp.createTask('imageopt', 'front/image/original/*.*', 'front/image'));

gulp.task('default', ['build:stylus', 'minify-concat:js', 'bower-concat', 'copy-bower-map', 'nodemon', 'livereload']);