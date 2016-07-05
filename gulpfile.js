var gulp = require('gulp');

var stylus = require('gulp-stylus');
var nib = require('nib');

// stylus
gulp.task('stylus', function () {
  gulp.src('./src/stylus/*.styl')
    .pipe(stylus({error: true, use: [nib()]}))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch', function() {
  gulp.watch('src/stylus/*.styl', ['stylus']);
});
gulp.task('default', ['watch']);