/* eslint-disable global-require */
'use strict';
const gulp  = require('gulp');
const gutil = require('gulp-util');
const c     = gutil.colors;

gulp.task('css', () => {
  const src = [
    'src/client/css/*.css',
    'src/client/css/**/*.css'
  ];

  if (gutil.env.dev) {
    gutil.log(`${c.cyan('css')}: watching`);
    gulp.watch(src, e => run(src, e));
  }

  return run(src);
});

function run(src, e) {
  const sourcemaps = require('gulp-sourcemaps');

  if (e) {
    gutil.log(`${c.cyan('css')}: ${c.yellow(e.path.replace(process.cwd(), '.'))} ${e.type}, processing`);
  } else {
    gutil.log(`${c.cyan('css')}: processing`);
  }

  return gulp.src(src, { base: 'src' })
    .pipe(sourcemaps.init())
    .pipe(require('gulp-concat-css')('app.css'))
    .pipe(require('gulp-autoprefixer')({
      browsers: [ 'last 2 versions' ]
    }))
    .pipe(gutil.env.dev ? gutil.noop() : require('gulp-cssnano')({
      zindex: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/public/css'));
};
