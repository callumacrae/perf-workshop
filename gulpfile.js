var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var uglify = require('gulp-uglify');
var gm = require('gulp-gm');
var cleanCss = require('gulp-clean-css');

gulp.task('js', function () {
	var b = browserify('src/js/script.js', {
		debug: true
	});

	return b.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))

		.pipe(uglify())

		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public/assets'))
		.pipe(browserSync.stream());
});

gulp.task('scss', function () {
	return gulp.src('src/scss/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))


		.pipe(cleanCss())

		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public/assets'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('image-thumbs', function () {
	return gulp.src('src/imgs/*.jpg')
		.pipe(gm(function (gmfile) {
			return gmfile.resize(200);
		}, { imageMagick: true }))
		.pipe(gulp.dest('public/assets/thumbs'));
});

gulp.task('image-mains', function () {
	return gulp.src('src/imgs/*.jpg')
		.pipe(gm(function (gmfile) {
			return gmfile.resize(1240);
		}, { imageMagick: true }))
		.pipe(gulp.dest('public/assets/imgs'));
});

gulp.task('images', gulp.parallel('image-thumbs', 'image-mains'));

gulp.task('build', gulp.parallel('js', 'scss', 'images'));

gulp.task('default', gulp.series('build', function () {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	});
	
	gulp.watch('src/js/**/*.js', gulp.series('js'));
	gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
	gulp.watch('index.html', browserSync.reload);
}));
