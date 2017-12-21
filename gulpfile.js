var gulp = require('gulp');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
browserSync = require("browser-sync"),

//js
    gulp.task('js', function(){
        gulp.src(['./dev/js/lib/*.js', './dev/js/script.js' ])
            .pipe(concat('script.js'))
            .pipe(gulp.dest('./js'))
            .pipe(uglify())
            .pipe(rename('script.min.js'))
            .pipe(gulp.dest('./js'));
    });

//css
gulp.task('css', function (){
    gulp.src(['./dev/sass/style.scss'])
        .pipe(sass())
        .pipe(rename('stylesheet.min.css'))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
        ))
        .pipe(minifycss())
        .pipe(gulp.dest('./css/'));
});

gulp.task('default', function(){

    browserSync.init({
        server: "./"
    });
    gulp.watch(["./index.html", "./js/*.js", "./css/*.css"], browserSync.reload);

    gulp.watch("./dev/sass/*.scss", function(event){
        gulp.run('css');
    });

    gulp.watch("./dev/js/*.js", function(event){
        gulp.run('js');
    });

});