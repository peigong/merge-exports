const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');
const isparta = require('isparta');

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register');

gulp.task('static', () => {
  return gulp.src('**/*.js')
    .pipe($.excludeGitignore())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('nsp', cb => {
  $.nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', () => {
  return gulp.src('lib\**\*.js')
    .pipe($.excludeGitignore())
    .pipe($.istanbul({
      includeUntested: true,
      instrumenter: isparta.Instrumenter
    }))
    .pipe($.istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
  gulp.src('test/**/*.js')
    .pipe($.plumber())
    .pipe($.mocha({reporter: 'spec'}))
    .on('error', () => {
    })
    .pipe($.istanbul.writeReports())
    .on('end', () => {
    });
});

gulp.task('watch', () => {
  gulp.watch(['lib\**\*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], () => {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe($.coveralls());
});

gulp.task('babel', ['clean'], () => {
  return gulp.src('lib\**\*.js')
    .pipe($.babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static', 'test', 'coveralls']);
