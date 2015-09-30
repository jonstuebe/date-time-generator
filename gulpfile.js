var gulp = require('gulp'),
	notify = require('gulp-notify'),
	minifyCSS = require('gulp-minify-css'),
	changed = require('gulp-changed'),
	rename = require("gulp-rename"),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	bourbon = require('node-bourbon'),
	neat = require('node-neat'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

var paths = {
	scripts: './assets/js/src/**/*.js',
	styles: './assets/sass/**/*.scss',
	output: {
		scripts: './assets/js',
		styles: './assets/css'
	}
}

gulp.task('styles', function()
{
    gulp.src(paths.styles)
    	.pipe(changed(paths.output.styles, { extension: '.css' }))
    	.pipe(plumber())
    	.pipe(sourcemaps.init())
    	.pipe(sass({
    		includePaths: neat.includePaths,
    		sourceMap: true
        }))
        // .pipe(autoprefixer({
        //     browsers: ['last 3 versions']
        // }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.output.styles))
        .pipe(browserSync.stream())
        .pipe(notify("sass compiled"));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
    	.pipe(plumber())
    	.pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.output.scripts))
        .pipe(notify("js compiled"));
});

gulp.task('watch', function()
{
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.scripts).on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
    browserSync.init({
    	server: {
    		baseDir: "./"
    	}
    });
});

gulp.task('default', ['watch', 'browser-sync']);
// gulp.task('prod', ['styles.prod']);