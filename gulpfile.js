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
var livereload = require('gulp-livereload');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var styleFiles = 'front/css/stylus/*.stylus';
var styleFilesModules = 'front/css/stylus/**/*.stylus';
var jsFiles = [
  'front/js/*.js',
  'front/js/modules/**/*.js'
];

gulp.task('lint', function() {
  return gulp.src(jsFiles)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('stylus', function(){
  gulp.src(styleFiles)
  .pipe(stylus({
    paths: [ path.join(__dirname, 'stylus', 'includes') ]
   }))
  .pipe(minifyCss({keepBreaks: false}))
  .pipe(gulp.dest('front/css'))
  .pipe(livereload());
});

gulp.task("bower", function(){
    return gulp.src('front/components/**/*min.js')
    .pipe(sourcemaps.init())
    .pipe(concat('components.js'))
    .pipe(gulp.dest("front/js/min"));
});

gulp.task('minify', ['lint'], function() {
  return gulp.src(jsFiles)
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

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(jsFiles, ['minify']);
  gulp.watch(styleFiles, ['stylus']);
  gulp.watch(styleFilesModules, ['stylus']);
  gulp.watch('back/modules/**/views/*.jade').on('change', function(file) {
    livereload.changed(file.path);
  });
});

gulp.task('demon', function () {
  nodemon({
    script: 'back/bin/www',
    ext: 'js'
  })
  .on('start', ['watch'])
  .on('change', ['watch'])
});

gulp.task('default', ['demon', 'minify', 'bower', 'stylus', 'watch']);
gulp.task('imageopt', ['images-opt']);
