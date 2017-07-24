const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const rename = require('gulp-rename');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sasslint = require('gulp-sass-lint');
const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const inlinesvg = require('postcss-inline-svg');
const mqpacker = require('css-mqpacker');
const runSequence = require('run-sequence');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const paths = require('../paths');
const errorHandler = require('../errorHandler');


// Стили
gulp.task('styles', function() {
  return runSequence(['styles:desktop', 'styles:mobile', 'styles:lint'], browserSync.reload);
});

// Список PostCSS-плагинов
const processors = [
	autoprefixer(),
	mqpacker(),
  assets({
    basePath: 'dist/',
    loadPaths: ['assets/images/']
  }),
  inlinesvg({path: 'dist/assets/images/svg/'}),
  mqpacker()
];

// Компиляция стилей
gulp.task('styles:desktop', function () {
  return gulp.src(paths.sourceDesktop.styles + 'style.scss')
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'compressed',
			errLogToConsole: true,
			precision: 8
		}).on('error', errorHandler))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(paths.buildDesktop.styles));
});

// Компиляция стилей
gulp.task('styles:mobile', function () {
  return gulp.src(paths.sourceMobile.styles + 'style.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true,
      precision: 8
    }).on('error', errorHandler))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.buildMobile.styles));
});

// Линтинг стилей
gulp.task('styles:lint', function() {
  gulp.src(paths.watch.styles)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(plumber({errorHandler: errorHandler}));
});