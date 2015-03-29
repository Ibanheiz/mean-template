var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var styleFiles = 'front/css/stylus/*.styl';
var styleFilesModules = 'front/css/stylus/**/*.styl';
var jsFiles = [
  'front/js/*.js',
  'front/js/modules/**/*.js'
];
var jsComponents = [
  'front/components/**/angular.min.js',
  'front/components/**/*min.js',
];
var jsComponentsMaps = [
  'front/components/**/*min.js.map',
];

gulp.task('lint', function () {
  gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('stylus', function () {
  gulp.src(styleFiles)
    .pipe(stylus({
      paths: [ path.join(__dirname, 'stylus', 'includes') ]
    }))
    .pipe(minifyCss({keepBreaks: false}))
    .pipe(gulp.dest('front/css'))
    .pipe(livereload());
});

gulp.task("bower", function () {
  gulp.src(jsComponents)
    .pipe(sourcemaps.init())
    .pipe(concat('components.js'))
    .pipe(gulp.dest("front/js/min"));
});

gulp.task("bower-map", function () {
  gulp.src(jsComponentsMaps)
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest("front/js/min"));
});

gulp.task('minify', ['lint'], function () {
  gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('front/js/min'))
    .pipe(livereload());
});

gulp.task('images-opt', function () {
  gulp.src('front/image/original/*.*')
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true
    }))
    .pipe(gulp.dest('front/image'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(jsFiles, ['minify']);
  gulp.watch(styleFiles, ['stylus']);
  gulp.watch(styleFilesModules, ['stylus']);
  gulp.watch('back/modules/**/views/*.jade').on('change', function (file) {
    livereload.changed(file.path);
  });
});

gulp.task('demon', function () {
  nodemon({
    script: 'back/bin/www',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', ['demon', 'minify', 'bower', 'bower-map', 'stylus', 'watch']);
gulp.task('imageopt', ['images-opt']);
