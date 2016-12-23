/* eslint-disable global-require */
'use strict';
const gulp 	= require('gulp');
const gutil = require('gulp-util');
const c 	= gutil.colors;

gulp.task('fonts', () => {
  const src = [
    'src/client/fonts/**/*.{eot,svg,ttf,woff,woff2}',
    'src/client/styles/fonts/**/*.{eot,svg,ttf,woff,woff2}'
  ];

  if (gutil.env.dev) {
  gutil.log(`${c.cyan('fonts')}: watching`);
  gulp.watch(src, () => run(src));
  }

  return run(src);
});

function run(src, e) {
  if (e) {
    src = e.path.replace(`${process.cwd()}/`, '');
    gutil.log(`${c.cyan('fonts')}: ${c.yellow(src)} ${e.type}, copying`);
  } else {
    gutil.log(`${c.cyan('fonts')}: copying`);
  }

  return gulp.src(src, { base: 'src' })
    .pipe(require('gulp-rename')(path => {
      path.dirname = path.dirname.replace('client/fonts', '');
      path.dirname = path.dirname.replace('client/styles/fonts', '');
    }))
    .pipe(gulp.dest('dist/public/fonts'))
    .on('finish', () => {
      gutil.log(`${c.cyan('fonts')}: done`);
    });
}
