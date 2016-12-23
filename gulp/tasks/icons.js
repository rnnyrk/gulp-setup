/* eslint-disable global-require */
'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const svgSprite = require('gulp-svg-sprite');
const c = gutil.colors;

const svgSpriteConfig = {
  mode: {
    symbol: {
      dest: '',
      sprite: 'icons.svg',
    },
  },
  // shape: {
  //   meta: 'src/images/icons/icons.yaml',
  //   id: {
  //     generator: '%s-icon',
  //   }
  // }
};

function run(src) {
  gutil.log(`${c.cyan('icons')}: spriting`);
  return gulp.src(src)
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(gulp.dest('dist/public/img'))
    .on('finish', () => {
      gutil.log(`${c.cyan('icons')}: done`);
    });
}

gulp.task('icons', () => {
  const src = 'src/client/images/icons/*.svg';

  if (gutil.env.dev) {
    gutil.log(`${c.cyan('icons')}: watching`);
    gulp.watch(src, () => run(src));
  }

  return run(src);
});
