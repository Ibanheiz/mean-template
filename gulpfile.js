// Include do Gulp
var gulp = require('gulp');
// Include de outros plugins do gulp
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
// Variáveis de controle
// Variáveis de controle
var jsFiles = [
    'front/js/*.js',
    'front/js/mobules/**/*.js'
];
var styleFiles = 'front/css/less/*.less';
var styleFilesModules = 'front/css/less/**/*.less';

/* Boas práticas para minificação dos js*/
gulp.task('lint', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/* Compila o less para css */
gulp.task('less', function () {
  gulp.src(styleFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(minifyCss({keepBreaks: false}))
    .pipe(gulp.dest('front/css'))
    .pipe(livereload());
});

/* Concatena as libs já minificadas utilizadas no projeto */
gulp.task('concat-lib', ['lint'], function() {
    return gulp.src(lib)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('front/js/min'))
        .pipe(livereload());
});

/* Minifica os js utilizando a task do lint*/
gulp.task('minify', ['lint'], function() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('front/js/min'))
        .pipe(livereload());
});

/* Minifica o tamanho das imagens */
gulp.task('images-opt', function () {
    gulp.src('front/image/original/*.*')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true
        }))
        .pipe(gulp.dest('front/image'));
});

/* watch para alteração em tempo real*/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(jsFiles, ['minify']);
    gulp.watch(styleFiles, ['less']);
    gulp.watch(styleFilesModules, ['less']);
    gulp.watch('back/modules/**/views/*.jade').on('change', function(file) {
      livereload.changed(file.path);
    });
});

/* Nodemon chamando a function do what*/
gulp.task('demon', function () {
  nodemon({
    script: 'back/bin/www',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
});

// Default Task
gulp.task('default', ['demon', 'minify', 'less', 'watch']);
