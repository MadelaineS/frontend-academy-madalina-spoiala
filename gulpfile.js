'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');

// gulp.task("hello", async function(){
// 	console.log("Hello!");
// });

gulp.task('sass', function() {
    return gulp.src('app/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
    gulp.watch('app/scss/styles.scss', gulp.series('sass'));
})