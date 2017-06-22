var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function sync() {
  return browserSync.init({
    'server': {
      'baseDir': './'
    }
  });
});

gulp.task('init', ['browser-sync'], function init() {
  gulp.watch('./scripts/**/*.js').on('change', browserSync.reload);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});
