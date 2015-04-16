'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

var jestConfig = {};

gulp.task('default', ['tdd']);

gulp.task('test', shell.task('jest', { ignoreErrors: true  } ) );

gulp.task('tdd', function(done) {
	gulp.watch(['__tests__/*.js', 'source/**/*.js'], ['test']);
});
