// Include gulp
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Include Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');

// Concatenate core js files
gulp.task('core-shortcodes-js', function () {
    return gulp.src([
        '../../../../plugins/edgtf-core/shortcodes/**/assets/js/*.js',
    ]).pipe(concat('shortcodes.js'))
        .pipe(gulp.dest('../../../../plugins/edgtf-core/assets/js'));
});

// Concatenate core js files
gulp.task('core-cpt-js', function () {
	return gulp.src([
		'../../../../plugins/edgtf-core/post-types/**/assets/js/*.js',
	]).pipe(concat('custom-post-types.js'))
		.pipe(gulp.dest('../../../../plugins/edgtf-core/assets/js'));
});

// Concatenate theme js files
gulp.task('js', ['core-shortcodes-js', 'core-cpt-js'], function () {
	return gulp.src([
        '../js/modules/global.js',
        '../js/modules/blog.js',
        '../js/modules/common.js',
		'../js/modules/headers.js',
		'../js/modules/title.js',
        '../../../../plugins/edgtf-core/assets/js/shortcodes.js',
		'../../../../plugins/edgtf-core/assets/js/custom-post-types.js',
        '../../framework/modules/woocommerce/assets/js/woocommerce.js'
	]).pipe(concat('modules.js'))
		.pipe(gulp.dest('../js'));
});

// Minify JS
gulp.task('minifyjs', ['js'], function () {
	return gulp.src([
		'../js/modules.js',
	]).pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('../js'))
});

// Compile Core Sass
gulp.task('core-sass', function () {
    return gulp.src('../../../../plugins/edgtf-core/assets/css/scss/*.scss')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('../../../../plugins/edgtf-core/assets/css'))
        .pipe(gulp.dest('../../../../plugins/edgtf-core/assets/css'))
});

// Compile Woo Sass
gulp.task('woo-sass', function () {
    return gulp.src('../../framework/modules/woocommerce/assets/css/scss/*.scss')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('../css'))
});


// Compile Theme Sass
gulp.task('sass', function () {
	return gulp.src('../css/scss/*.scss')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sassGlob())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('../css'))
});

//Concate default core and theme css files
gulp.task('concat-modules-css', ['core-sass','sass'], function () {
    return gulp.src([
    	    '../css/modules.css',
	        '../../../../plugins/edgtf-core/assets/css/shortcodes.css',
	        '../../../../plugins/edgtf-core/assets/css/custom-post-types.css'
        ])
        .pipe(concatCss('../css/modules.css'))
        .pipe(gulp.dest('../css'))
});

//Concate responsive core and theme css files
gulp.task('concat-modules-css-responsive', ['core-sass','sass'], function () {
    return gulp.src([
    	    '../css/modules-responsive.css',
	        '../../../../plugins/edgtf-core/assets/css/shortcodes-responsive.css',
	        '../../../../plugins/edgtf-core/assets/css/custom-post-types-responsive.css'
        ])
        .pipe(concatCss('../css/modules-responsive.css'))
        .pipe(gulp.dest('../css'))
});

//Minify css files
gulp.task('minifycss', ['concat-modules-css','concat-modules-css-responsive','woo-sass'], function () {
	return gulp.src([
		'../css/modules.css',
		'../css/modules-responsive.css',
		'../css/woocommerce.css',
		'../css/woocommerce-responsive.css'
	])
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('../css'))
		.pipe(browserSync.stream())
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src([
        '../js/modules.js',
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Default Task
gulp.task('default', ['js', 'concat-modules-css','concat-modules-css-responsive','woo-sass']);

// Minify Files
gulp.task('minify', ['minifyjs', 'minifycss']);

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch([
        '../../../../plugins/edgtf-core/shortcodes/**/assets/css/scss/**/*.scss',
        '../../../../plugins/edgtf-core/post-types/**/assets/css/scss/**/*.scss',
        '../../framework/modules/woocommerce/assets/css/scss/**/*.scss',
        '../../framework/modules/woocommerce/shortcodes/**/assets/css/scss/**/*.scss',
        '../../framework/modules/woocommerce/plugins/**/assets/css/scss/**/*.scss',
        '../css/scss/**/*.scss'
    ], ['minifycss']);
    gulp.watch([
        '../../../../plugins/edgtf-core/shortcodes/**/assets/js/*.js',
        '../../../../plugins/edgtf-core/post-types/**/assets/js/*.js',
	    '../../framework/modules/woocommerce/assets/js/*.js',
	    '../../framework/modules/woocommerce/shortcodes/**/assets/js/*.js',
	    '../../framework/modules/woocommerce/plugins/**/assets/js/*.js',
        '../js/modules/*.js'
    ], ['minifyjs']);
});

// Watch with browser sync
gulp.task('dev', function () {
    browserSync.init({
        proxy: 'fluidapp.dev'
    });

    gulp.watch([
        '../../../../plugins/edgtf-core/shortcodes/**/assets/css/scss/**/*.scss',
        '../../../../plugins/edgtf-core/post-types/**/assets/css/scss/**/*.scss',
        '../../framework/modules/woocommerce/assets/css/scss/**/*.scss',
        '../../framework/modules/woocommerce/shortcodes/**/assets/css/scss/**/*.scss',
        '../../framework/modules/woocommerce/plugins/**/assets/css/scss/**/*.scss',
        '../css/scss/**/*.scss'
    ], ['minifycss']);
    gulp.watch([
        '../../../../plugins/edgtf-core/shortcodes/**/assets/js/*.js',
        '../../../../plugins/edgtf-core/post-types/**/assets/js/*.js',
	    '../../framework/modules/woocommerce/assets/js/*.js',
	    '../../framework/modules/woocommerce/shortcodes/**/assets/js/*.js',
	    '../../framework/modules/woocommerce/plugins/**/assets/js/*.js',
        '../js/modules/*.js'
    ], ['minifyjs']);
});