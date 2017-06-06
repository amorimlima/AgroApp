const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sourcemaps  = require('gulp-sourcemaps');
const sass        = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('./styles/src/**/*.scss')
             .pipe(sourcemaps.init())
             .pipe(sass().on('error', sass.logError))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('./styles/build'))
             .pipe(browserSync.stream());
});

gulp.task('browser-sync', () => {
    return browserSync.init({
        'server': {
            'baseDir': './'
        }
    });
});

gulp.task('init', ['browser-sync'], () => {
    //gulp.watch('./styles/src/**/*.scss', ['sass']);
    gulp.watch('./scripts/**/*.js').on('change', browserSync.reload);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});