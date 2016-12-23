/* eslint-disable global-require */
'use strict';
const gulp    = require('gulp');
const gutil   = require('gulp-util');
const notify  = require('gulp-notify');
const c       = gutil.colors;

gulp.task('sass', () => {
  const src = [
    'src/client/styles/index.scss'
  ];

  if (gutil.env.dev) {
    gutil.log(`${c.cyan('sass')}: watching`);

    require('globby').sync(src).forEach(src => {
      gulp.watch([
        src.replace(/([^\/]+)\.scss$/, '*.scss'),
        src.replace(/([^\/]+)\.scss$/, '**/*.scss')
      ], e => run(src, e));
    });
  }

  return run(src);
});

function run(src, e) {
  const sourcemaps = require('gulp-sourcemaps');

  if (e) {
    gutil.log(`${c.cyan('sass')}: ${c.yellow(e.path.replace(process.cwd(), '.'))} ${e.type}, processing`);
  } else {
    gutil.log(`${c.cyan('sass')}: processing`);
  }

  return gulp.src(src, { base: 'src' })
    .pipe(sourcemaps.init())
    .pipe(require('gulp-sass')({
      style: 'compressed',
      errLogToConsole: false,
      onError: function(err) {
        return notify().write(err);
      }
    }))
    .pipe(require('gulp-autoprefixer')({
      browsers: [ 'last 2 versions' ]
    }))
    .pipe(gutil.env.dev ? gutil.noop() : require('gulp-cssnano')({
      zindex: false
    }))
    .pipe(require('gulp-rename')(path => {
      path.basename = 'app';
      path.dirname  = '';
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/public/css'));
}
