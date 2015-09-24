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
var footer = require('gulp-footer');
var header = require('gulp-header');
var ghPages = require('gulp-gh-pages');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var buildConfig = require('./build.config.js');
var gulpDocs = require('gulp-ngdocs');
var less = require('gulp-less');
var flatten = require('gulp-flatten');
var sh = require('shelljs');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var karma = require('gulp-karma');
var serve = require('gulp-serve');

/**
 * Execute les actions de build dans l'ordre
 */
gulp.task('build', function(callback) {
    runSequence('clean','sass','less',
        'css',
        ['uglify','uglify-debug','vendor','html','assets','fonts','demo-js'],
        callback);
});


/**
 *
 * Supression des fichiers du precedent build
 *
 */
gulp.task('less', function () {
    return gulp.src('./main/assets/less/material/material.less')
        .pipe(less())
        .pipe(gulp.dest('./main/assets/css'));
});

/**
 *
 * Supression des fichiers du precedent build
 *
 */
gulp.task('clean', function () {
    return gulp.src(['dist/assets','dist/app','docs'],
        {force: true})
        .pipe(clean());
});

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
    gulp.src(buildConfig.vendorCssFiles)
        .pipe(concat('main.css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/assets/fonts'))
        .on('end', done);
});



/**
 * copie des resources present dans assets autre que Javascrip (sera minifié et concaténé)
 */
gulp.task('fonts', function() {
    gulp.src(['main/assets/lib/**/*.eot',
        'main/assets/lib/**/*.svg',
        'main/assets/lib/**/*.ttf',
        'main/assets/lib/**/*.otf',
        'main/assets/lib/**/*.woff',
        'main/assets/lib/**/*.woff2'])
        .pipe(flatten())
        .pipe(gulp.dest('./main/assets/fonts'));

    gulp.src('./main/assets/fonts/**/*')
        .pipe(gulp.dest('./dist/assets/fonts'));
});



/**
 * Concat et Minifie le Javascript applicatif
 */
gulp.task('uglify', function() {

    return gulp.src(buildConfig.appFiles)
        .pipe(concat('itesoft.min.js'))
        .pipe(header(buildConfig.closureStart))
        .pipe(footer(buildConfig.closureEnd))
        .pipe(uglify())
        .pipe(header(buildConfig.banner,{pkg:pkg}))
        .pipe(gulp.dest('dist/app'));
});



/**
 * Concat et Minifie le Javascript applicatif
 */
gulp.task('uglify-debug', function() {
    return gulp.src(buildConfig.appFiles)
        .pipe(concat('itesoft.debug.js'))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('docs', function () {
    var options = {
        html5Mode: false,
        styles:['./dist/assets/fonts/main.min.css'],
        scripts:['./dist/assets/lib/vendor.min.js','./dist/app/itesoft.debug.js'],
        loadDefaults: {
            angular:false,
            angularAnimate: false
        },
        startPage: '/api',
        title: "Itesoft Awesome Docs",
        titleLink: "#/api"
    };
    var docFiles = buildConfig.appFiles.slice();
    docFiles.push('main/app/**/*.ngdoc');
    gulp.src(docFiles)
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
    return  gulp.src('./main/assets/fonts/**/*')
        .pipe(gulp.dest('./docs/css/dist/assets/fonts'));
});

/**
 * Concat et Minifie les fichiers de demo
 */
gulp.task('demo-js', function() {
    return gulp.src('main/app/**/*.demo.js')
        .pipe(concat('demo.min.js'))
        .pipe(uglify({outSourceMap:'lib.min.map'}))
        .pipe(gulp.dest('dist'));
});

/**
 * Concat et Minifie le Javascript des librairies utilisés
 * et les déplace
 */
gulp.task('vendor', function() {
    //TODO etudier la piste useref pour la concat et min des assets
    /** var assets = useref.assets();
     return gulp.src('main/index.html')
     .pipe(assets)
     .pipe(gulpif('*.js', uglify()))
     .pipe(gulpif('*.css', minifyCss()))
     .pipe(assets.restore())
     .pipe(useref())
     .pipe(gulp.dest('dist/assets/lib/')); **/
    return gulp.src(buildConfig.vendorJavascriptFiles)
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
    gulp.src(buildConfig.assetsDistFiles)
        // And put it in the dist folder
        .pipe(gulp.dest('dist/assets'));
});




gulp.task('deploy', function() {
    return gulp.src(['!./node_modules/**/*','!./main/**/*','./**/*'])
        .pipe(ghPages());
});

/**
 * Obsérve les modification des scss et compile en css
 */
gulp.task('watch', function() {
    gulp.watch('./main/assets/scss/**/*.scss', ['sass']);
});

/**
 * Obsérve les modifications des fichiers scss et les compile
 *
 */
gulp.task('watch', function() {
    gulp.watch('./main/assets/scss/**/*.scss', ['sass']);
    gulp.watch(['./main/app/**/*.ngdoc'], ['docs']);
    gulp.watch(['./main/app/**/*.js'], ['debug']);
});

/**
 * Test unitaire jasmine
 */
gulp.task('test', function() {

    /**Ajout des fihcier de test **/
    var allVendorFiles = buildConfig.vendorJavascriptFiles.slice();
    allVendorFiles.push('./main/assets/lib/angular-mocks/angular-mocks.js');
    var allAppFiles = buildConfig.appFiles.slice();
    allAppFiles = _removeValueFromArray(allAppFiles,'!main/app/**/*Test.js');
    var testFiles = allVendorFiles.concat(allAppFiles);

    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        });
});


/**
 * Execute les actions de build dans l'ordre
 */
gulp.task('debug', function(callback) {
    runSequence('uglify-debug','docs',
        callback);
});

gulp.task('serve', serve('docs'));

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


function _removeValueFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}