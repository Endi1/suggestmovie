'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream')
var browserSync = require('browser-sync').create();


gulp.task('default', function() {

  gulp.start('serve','watch');

});

gulp.task('watch', function() {
  gulp.watch(['./app.js', './stores/*.js', './components/*.js', './actions/*.js'], ['browserify']);
  gulp.watch(['./static/js/app.js', './static/css/*.css'], ['reload']);
});


gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('reload', function(){
  browserSync.reload();
})

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
