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

// Files e tasks para o livereload
var watchers = [
  {
    file: jsFiles,
    task: 'minify-concat:js'
  },
  {
    file: styleFiles,
    task: 'build:stylus'
  },
  {
    file: styleFilesModules,
    task: 'build:stylus'
  }
];

// Compila Stylus e concatena o css
gulp.task('build:stylus', modularGulp.createTask('stylus', styleFiles, 'front/css'));

// Verifica a qualidade do código js utilizando o Lint js
gulp.task('lint', modularGulp.createTask('lint', jsFiles));

// Minifica e concatena todos os js da aplicação
gulp.task('minify-concat:js', ['lint'], modularGulp.createTask('minify-concat', jsFiles, 'all.min.js', 'front/js/min'));

// Concate todas as libs minifcadas baixadas pelo bower
gulp.task('bower-concat', ['copy-bower-map'], modularGulp.createTask('concat', jsComponents, 'components.min.js', 'front/js/min'));

// Copia os maps das libs minificadas baixadas pelo bower
gulp.task('copy-bower-map', modularGulp.createTask('copy', jsComponentsMaps, 'front/js/min'));

// Ativa o nodemon
gulp.task('nodemon', modularGulp.createTask('nodemon', 'back/bin/www'));

// Ativa o liveloread e cria watchers para as pages em jade
gulp.task('livereload', modularGulp.createTask('watch', watchers, 'back/modules/**/views/*.jade'));

// Roda os testes em mocha
gulp.task('mocha', modularGulp.createTask('mocha', 'back/test/**/*.js'));

// Optimiza as imagens
gulp.task('imageopt', modularGulp.createTask('imageopt', 'front/image/original/*.*', 'front/image'));

// Roda com o comando 'gulp' no prestart da aplicação
gulp.task('default', ['build:stylus', 'minify-concat:js', 'bower-concat', 'copy-bower-map', 'nodemon', 'livereload']);