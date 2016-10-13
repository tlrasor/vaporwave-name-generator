"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cleanCSS = require('gulp-clean-css');
var lintCSS = require('gulp-csslint');
var rename = require("gulp-rename");
var wiredep = require("wiredep").stream;
var browserSync = require("browser-sync").create();
var del = require("del");
var path = require("path");
var gutil = require('gulp-util');
const babel = require('gulp-babel');


gulp.task("clean", function(done){
  return del.sync([path.join('dist', '/**/*')]);
});

gulp.task("vendor", function(done){
  return gulp.src("bower_components/**/*")
             .pipe(gulp.dest("dist/bower_components"));
});

gulp.task("sass", function () {
    return gulp.src("scss/main.scss")
               .pipe(wiredep())
               .pipe(sass().on("error", sass.logError))
               .pipe(gulp.dest("dist/css/"));
});

gulp.task("minify-css", ["sass"], function(){
  return gulp.src("dist/*.css")
             .pipe(cleanCSS({ compatibility: 'ie8' }))
             .pipe(rename({ suffix: '.min' }))
             .pipe(gulp.dest("dist/css/"))
});

gulp.task("lint-css", ["sass"], function(){
  return gulp.src("dist/css/*.css")
             .pipe(lintCSS())
             .pipe(lintCSS.formatter());
});

gulp.task("javascript", function() {
  return gulp.src('js/*.js')
             .pipe(babel())
             .pipe(concat('bundle.js'))
             .pipe(gulp.dest('dist/js/'));
});

gulp.task("minify-javascript", ["javascript"], function() {
  return gulp.src('dist/js/*.js')
             .pipe(uglify().on('error', gutil.log))
             .pipe(rename({ suffix: '.min' }))
             .pipe(gulp.dest('dist/js/'));
});

gulp.task("html", function() {
  return gulp.src('*.html')
             .pipe(wiredep())
             .pipe(gulp.dest('dist'));
});

gulp.task("images", function(){
  return gulp.src(['img/*.{jpg,png,svg}', 'memes/*.{jpg,png}'])
             .pipe(gulp.dest("dist/img/"));
});

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      routes: {
          "./bower_components": "bower_components"
      }
    },
    files: ['dist/*.html', 'dist/css/*.css', 'dist/js/*.js']
  });
})

gulp.task("dev", ["browserSync", "vendor", "images", "sass", "javascript", "html"], function(){
  gulp.watch("*.html", ["html"]);
  gulp.watch("js/*.js", ["javascript"]);
  gulp.watch("scss/*.scss", ["sass"]);
});

gulp.task("build", ["clean", "vendor", "images", "minify-css", "lint-css", "minify-javascript", "html"]);

gulp.task("test", ["lint-css"]);

gulp.task("default", ["build"]);