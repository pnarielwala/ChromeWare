var gulp = require('gulp');


gulp.task('default', function(done){
    var Server = require('karma').Server;
    return new Server({
        configFile: __dirname + '\\karma.conf.js',
        singleRun: true
    }, done).start();
});