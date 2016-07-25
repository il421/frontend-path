const autoprefixer = require('gulp-autoprefixer'),
    gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    less = require('gulp-less'),
    browserSync = require('browser-sync');


function func() {
    return 'test';
}


gulp.task('styles', function () {
    gulp.src(['less/**/*.less', 'less/**/*.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('css'));
});


gulp.task('server', function () {
    connect.server({}, function () {
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });
});

gulp.task('default', ['styles', 'server'], function () {

    gulp.watch('**/*.{php,html}').on('change', function () {
        browserSync.reload();
    });

    gulp.watch('less/*.less').on('change', function () {
        gulp.start('styles');
    });

    gulp.watch('**/*.css').on('change', function () {
        browserSync.reload();
    });
});
