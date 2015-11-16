'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream')


gulp.task('default', function() {

  gulp.watch(['./app.js', './stores/*.js', './components/*.js', './actions/*.js'], ['browserify']);

});


gulp.task('browserify', function() {
  var b = browserify({
    entries : ['./app.js'],
    transform : [reactify],
    debug : true,
    cache : {}, packageCache : {}, fullPaths : true
  });

  // Handle error so watch doesn't stop
  b.on('error', function(e) {
    console.log(e);
    b.end();
  });

  return b.bundle()
  .pipe(source('./app.js'))
  .pipe(gulp.dest('./static/js/'));
});
