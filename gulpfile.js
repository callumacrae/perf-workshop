var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('js', function () {
	var b = browserify('src/js/script.js', {
		debug: true
	});

	return b.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))

		// Other plugins here

		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public/assets'))
		.pipe(browserSync.stream());
});

gulp.task('scss', function () {
	return gulp.src('src/scss/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))

		// Other plugins here

		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public/assets'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('build', gulp.parallel('js', 'scss'));

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
