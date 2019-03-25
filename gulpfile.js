'use strict';
/*jslint node: true */

/*jshint esversion: 6 */

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();


//compile sass into css & reload browser
function style() {
    return gulp
        .src('app/scss/**/*.scss') //pinpoints to scss file
        .pipe(sourcemaps.init()) //initializes sourcemaps before compilation starts
        .pipe(sass())
        .on('error', sass.logError) //pass the scss file through the compiler
        .pipe(postcss([autoprefixer(), cssnano()])) //used postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(sourcemaps.write()) //add sourcemaps
        .pipe(gulp.dest('app/css')) //where to save the compiled css
        .pipe(browserSync.stream()); //stream changes to the browser
}


//reloads the browser
function reload() {
    browserSync.reload();
}

function watch() {
    //initializes static localhost server
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });

    //watches sass file and html/js
    gulp.watch('app/scss/**/*.scss', style);
    //reloads browser when HTML/JS files change
    gulp.watch('app/index.html', reload);
    gulp.watch('app/js/*.js', reload);
}

exports.style = style;
exports.watch = watch;

var build = gulp.parallel(style, watch); //runs tasks in parallel
gulp.task('default', build);