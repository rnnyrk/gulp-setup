/* eslint-disable global-require */
'use strict';
const gulp  = require('gulp');
const gutil = require('gulp-util');
const c     = gutil.colors;

/** Pull images through imagemin */
gulp.task('images', function() {
  const src = [
    'src/client/images/*.{gif,jpg,png,svg,ico}',
    'src/client/images/**/*.{gif,jpg,png,svg,ico}',
    '!src/client/images/icons/*.{gif,jpg,png,svg,ico}'
  ];

  if (gutil.env.dev) {
    gutil.log(`${c.cyan('images')}: watching`);
    gulp.watch(src, e => run(src, e));
  }

  return run(src);
});

function run(src, e) {
  if (e) {
    src = e.path.replace(`${process.cwd()}/`, '');
    gutil.log(`${c.cyan('images')}: ${c.yellow(src)} ${e.type}, minifying`);
  } else {
    gutil.log(`${c.cyan('images')}: minifying`);
  }

  return gulp.src(src, { base: 'src' })
    .pipe(require('gulp-rename')(path => {
      path.dirname = path.dirname.replace('client/images', '');
    }))
    .pipe(!gutil.env.dev ? require('gulp-imagemin')() : gutil.noop())
    .pipe(gulp.dest('dist/public/img'));
}
