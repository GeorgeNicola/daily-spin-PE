var gulp = require('gulp');
var xml2json = require('./');
var rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src('./sample/*.xml')
        .pipe(xml2json())
	.pipe(rename({extname: '.json'}))
        .pipe(gulp.dest('./dist'));
});
