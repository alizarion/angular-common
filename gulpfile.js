/**
 * Les dépendences du builder
 */
var pkg = require('./package.json');
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var buildConfig = require('./build.config.js');
var sh = require('shelljs');

/**
 * Execute les actions de build dans l'ordre
 */
gulp.task('build', ['sass','css','uglify','vendor','html','assets']);

/**
 * Compile les fichier scss en css et les dépose dans le répertoire /main/assets/css
 */
gulp.task('sass', function(done) {
    gulp.src('./main/assets/scss/**/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./main/assets/css'))
        .on('end', done);


});

/**
 * Minifie les fichiers css
 */
gulp.task('css', function(done) {
    gulp.src('./main/assets/css/*.css')
        .pipe(concat('main.css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/assets/css'))
        .on('end', done);


});



/**
 * Concat et Minifie le Javascript applicatif
 */
gulp.task('uglify', function() {
    return gulp.src(buildConfig.appFiles)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(header(buildConfig.banner,{pkg:pkg}))
        .pipe(gulp.dest('dist/app'));
});

/**
 * Concat et Minifie le Javascript des librairies utilisés
 * et les déplace
 */
gulp.task('vendor', function() {
    return gulp.src(buildConfig.vendorFiles)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/assets/lib'));
});


/**
 * Déplace les fichier html de l'application
 *
 */
gulp.task('html', function() {
    gulp.src('./main/app/**/*.html')
        // And put it in the dist folder
        .pipe(gulp.dest('dist/app'));
});

/**
 * copie des resources present dans assets autre que Javascrip (sera minifié et concaténé)
 */
gulp.task('assets', function() {
    gulp.src(['!main/assets/lib/**/*.js','!main/assets/css/**/*','!main/assets/scss/**/*.scss','main/assets/**/*'])
        // And put it in the dist folder
        .pipe(gulp.dest('dist/assets'));
});


/**
 * Obsérve les modification des scss et compile en css
 */
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

/**
 * Lance l'installation des dépendences GIT
 */
gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

/**
 * Check l'installation de GIT
 */
gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
                '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
