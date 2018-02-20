var gulp = require('gulp');
var elm = require('gulp-elm');

gulp.task('elm-init', elm.init);

gulp.task('elm-make', ['elm-init'], function() {
    return gulp.src('elm/liveslide.elm')
        .pipe(elm.bundle('liveslide.js').on('error', function(){console.log("error");}))
        .pipe(gulp.dest('public/js/'))
    ;
});

gulp.task('watch', function() {
    return gulp.watch('elm/**/*.elm', ['elm-make'])
        .on('error', function() {
            console.error('Error');
        });
});