var gulp = require('gulp');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function buildSass() {
  return gulp.src('./styles/src/**/*.scss')
    .pipe(sourcemaps.init())
    // .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./styles/build'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function browserSyn() {
  return browserSync.init({
    'server': {
      'baseDir': './'
    }
  });
});

gulp.task('init', ['browser-sync'], function init() {
    // gulp.watch('./styles/src/**/*.scss', ['sass']);
  gulp.watch('./scripts/**/*.js').on('change', browserSync.reload);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});
