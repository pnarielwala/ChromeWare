var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

gulp.task('test', function(done){
    var Server = require('karma').Server;
    return new Server({
        configFile: __dirname + '\\karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('build-main', function(){
    var isMinify = process.argv[3] == '-m';
    return gulp.src('ChromeWare/js/src/main.js')
        .pipe(browserify({}))
        .pipe(gulpif(isMinify, uglify()))
        .pipe(gulp.dest('ChromeWare/js'));
})

gulp.task('build-background', function(){
    var isMinify = process.argv[3] == '-m';
    return gulp.src('ChromeWare/js/src/main.js')
        .pipe(browserify({}))
        .pipe(gulpif(isMinify, uglify()))
        .pipe(gulp.dest('ChromeWare/js'));
})

gulp.task('build', ['build-main', 'build-background'], function(){
})