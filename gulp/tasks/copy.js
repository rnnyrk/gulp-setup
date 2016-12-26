/* eslint-disable global-require */
'use strict';
const gulp  = require('gulp');
const gutil = require('gulp-util');
const c     = gutil.colors;

/** Copy files to dist directory */
gulp.task('copy', function() {
  const src = [
    'src/client/*.{json,js,xml}',
    'src/views/**/*.ejs'
  ];

  if (gutil.env.dev) {
    gutil.log(`${c.cyan('copy')}: watching`);
    gulp.watch(src, e => run(src, e));
  }

  return run(src);
});

function run(src, e) {
  if (e) {
    src = e.path.replace(`${process.cwd()}/`, '');
    gutil.log(`${c.cyan('copy')}: ${c.yellow(src)} ${e.type}, copying`);
  } else {
    gutil.log(`${c.cyan('copy')}: copying`);
  }

  return gulp.src(src)
    .pipe(gulp.dest('dist/public/'));
}
