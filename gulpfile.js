var gulp = require("gulp"),
    connect = require("gulp-connect"),
    less = require("gulp-less"),
    reload = require("gulp-livereload"),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    nodemon = require('gulp-nodemon');

//script paths
var jsFiles = 'public/src/scripts/*.js',
    jsDest = 'public/dist/scripts';

gulp.task("server", function () {
    connect.server();
});

gulp.task('less', function () {
    return gulp.src(["public/src/less/*.less"])
        .pipe(less())
        .pipe(gulp.dest("public/dist/css"))
        .pipe(reload());
});

gulp.task("watch", function () {

    reload.listen();

    gulp.watch([
        "public/dist/css/*.css",
        "public/dist/scripts/*.js"])
        .on('change', function (file) {
            console.log("File change" + file.path);
        });

    gulp.watch([
        'public/src/less/parts/*.less',
        'public/src/less/*.less'], ['minify-css']);

});

gulp.task('minify-css', ['less'], function () {
    return gulp.src([
        'public/dist/css/default.css',
        'public/dist/css/social.css',
        'public/dist/css/login.css'])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/dist/css'));
});



gulp.task('scripts', function () {
    return gulp.src(jsFiles)
        .pipe(concat('toolset.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('toolset.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('start', ['minify-css', 'scripts', 'watch'], function ()
{
    return nodemon({
        script: 'server.js'
        , ext: 'js html'
    })
        .on('restart', function () {
            console.log('restarted');
        });
});
