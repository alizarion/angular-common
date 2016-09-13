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
var webserver = require('gulp-webserver');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var karma = require('gulp-karma');
var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
var chmod = require('gulp-chmod');

/**
 * Execute les actions de build dans l'ordre
 */
gulp.task('build', function(callback) {
    runSequence('clean','sass','less',
        'css',
        ['uglify','uglify-debug','vendor','html','assets','fonts','demo-js', 'copy-rename-files'],
        callback);
});


/**
 *
 * Supression des fichiers du precedent build
 *
 */
gulp.task('less', function () {
    return gulp.src(buildConfig.srcFolder + '/assets/less/material/material.less')
        .pipe(less())
        .pipe(gulp.dest(buildConfig.srcFolder + '/assets/css'));
});

/**
 *
 * Supression des fichiers du precedent build
 *
 */
gulp.task('clean', function () {
    return gulp.src([buildConfig.distFolder + '/assets',buildConfig.distFolder + '/app','docs'],
        {force: true})
        .pipe(clean());
});

/**
 * Compile les fichier scss en css et les dépose dans le répertoire /main/assets/css
 */
gulp.task('sass', function(done) {
    gulp.src(buildConfig.srcFolder + '/assets/scss/**/*.scss')
        .pipe(gulp.dest(buildConfig.distFolder + '/assets/scss'))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(buildConfig.srcFolder + '/assets/css'))
        .on('end', done);


});

/**
 * build css files
 */
gulp.task('css', function(callback) {
    runSequence(['vendor-css','itesoft-css'],'css-bundle',
        callback);
});

/**
 * build vendor minified css file.
 */
gulp.task('vendor-css',function(done){
    gulp.src(buildConfig.vendorCssFiles)
        .pipe(concat('vendor.css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(buildConfig.distFolder + '/assets/fonts'))
        .on('end', done);
});

/**
 * build css minified css file.
 */
gulp.task('itesoft-css',function(done){
    gulp.src([buildConfig.srcFolder + '/assets/css/*.css'])
        .pipe(concat('itesoft.css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(buildConfig.distFolder + '/assets/css'))
        .on('end', done);
});

/**
 * build bundle css file.
 */
gulp.task('css-bundle',function(done){
    gulp.src([buildConfig.distFolder + '/assets/fonts/vendor.min.css',buildConfig.distFolder + '/assets/css/*.css'])
        .pipe(concat('itesoft-bundle.css'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(buildConfig.distFolder + '/assets/fonts'))
        .on('end', done);
});



/**
 * copie des resources present dans assets autre que Javascrip (sera minifié et concaténé)
 */
gulp.task('fonts', function() {
    gulp.src(buildConfig.fontFiles)
        .pipe(flatten())
        .pipe(gulp.dest(buildConfig.srcFolder + '/assets/fonts'));

    gulp.src(buildConfig.srcFolder + '/assets/fonts/**/*')
        .pipe(gulp.dest(buildConfig.distFolder + '/assets/fonts'));
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
        .pipe(gulp.dest(buildConfig.distFolder + '/app'));
});



/**
 * Concat et Minifie le Javascript applicatif
 */
gulp.task('uglify-debug', function() {
    buildConfig.appFiles.push('!'+buildConfig.srcFolder +'/app/**/*.demo.js');
    return gulp.src(buildConfig.appFiles)
        .pipe(concat('itesoft.debug.js'))
        .pipe(gulp.dest(buildConfig.distFolder + '/app'));
});

gulp.task('docs', function () {
    var scripts = [buildConfig.distFolder + '/assets/lib/vendor.min.js',buildConfig.distFolder + '/app/itesoft.debug.js'];
    for (var i = 0; i < buildConfig.fileToCopyAndRename.length; i++) {
        var fileToCopy = buildConfig.fileToCopyAndRename[i];
        scripts.push(buildConfig.distFolder + '/' + fileToCopy.dest);
    }

    var options = {
        html5Mode: false,
        styles:[buildConfig.distFolder + '/assets/fonts/itesoft-bundle.min.css'],
        scripts:scripts,
        loadDefaults: {
            angular:false,
            angularAnimate: false
        },
        startPage: '/api',
        title: "Itesoft Awesome Docs",
        titleLink: "#/api"
    };
    var docFiles = buildConfig.appFiles.slice();
    docFiles.push(buildConfig.srcFolder +'/app/**/*.ngdoc');
    gulp.src(docFiles)
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest(buildConfig.docFolder));
    return  gulp.src(buildConfig.srcFolder + '/assets/fonts/**/*')
        .pipe(gulp.dest(buildConfig.docFolder +'/css/' + buildConfig.distFolder +'/assets/fonts'));
});

/**
 * Concat et Minifie les fichiers de demo
 */
gulp.task('demo-js', function() {
    return gulp.src(buildConfig.srcFolder +'/app/**/*.demo.js')
        .pipe(concat('demo.min.js'))
        .pipe(uglify({outSourceMap:'lib.min.map'}))
        .pipe(gulp.dest(buildConfig.distFolder));
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
    gulp.src(buildConfig.vendorJavascriptDistFiles)
        .pipe(concat('vendor.min.js'))

        .pipe(gulp.dest(buildConfig.distFolder + '/assets/lib'));
    gulp.src(buildConfig.vendorJavascriptDebugFiles)
        .pipe(concat('vendor.debug.js'))

        .pipe(gulp.dest(buildConfig.distFolder + '/assets/lib'));
});


/**
 * Déplace les fichier html de l'application
 *
 */
gulp.task('html', function() {
    gulp.src(buildConfig.srcFolder + '/app/**/*.html')
        // And put it in the dist folder
        .pipe(gulp.dest(buildConfig.distFolder + '/app'));
});

/**
 * copie des resources present dans assets autre que Javascrip (sera minifié et concaténé)
 */
gulp.task('assets', function() {
    var globalAssetsType = buildConfig.assetsDistFiles.slice();
    globalAssetsType = globalAssetsType.concat(buildConfig.fontFiles.slice());
    gulp.src(globalAssetsType)
        // And put it in the dist folder
        .pipe(gulp.dest(buildConfig.distFolder + '/assets'));
});




gulp.task('deploy',['test','e2e'], function() {
    return gulp.src(['!./node_modules/**/*','!' + buildConfig.srcFolder +'/**/*','!' +
        buildConfig.testFolder +'/**/*','!./*','./**/*'])
        .pipe(ghPages());
});

/**
 * Obsérve les modification des scss et compile en css
 */
gulp.task('watch', function() {
    gulp.watch(buildConfig.srcFolder + '/assets/scss/**/*.scss', ['sass']);
});

/**
 * Watch les modifications des fichiers scss et les compile
 *
 */
gulp.task('watch', function() {
    gulp.watch(buildConfig.srcFolder + '/assets/scss/**/*.scss', ['css-debug']);
    gulp.watch([buildConfig.srcFolder + '/app/**/*.ngdoc'], ['docs']);
    gulp.watch([buildConfig.srcFolder + '/app/**/*.js'], ['debug']);
});


/**
 * Test unitaire jasmine
 */
gulp.task('test', function (done) {

    /**Ajout des fihcier de test **/
    var allVendorFiles = buildConfig.vendorJavascriptDistFiles.slice();
    allVendorFiles.push(buildConfig.srcFolder + '/assets/lib/angular-mocks/angular-mocks.js');
    var allAppFiles = buildConfig.appFiles.slice();
    allAppFiles = allAppFiles.concat(buildConfig.excludeFromAppDist.unitTest);
    allAppFiles = allAppFiles.concat(buildConfig.excludeFromAppDist.unminifiedDistFiles);
    var testFiles = allVendorFiles.concat(allAppFiles);
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            console.log('toto');
            this.emit('end',done);
        });
});

/**
 * Test unitaire jasmine
 */
//gulp.task('test', function() {
//
//    /**Ajout des fihcier de test **/
//    var allVendorFiles = buildConfig.vendorJavascriptDistFiles.slice();
//    allVendorFiles.push(buildConfig.srcFolder + '/assets/lib/angular-mocks/angular-mocks.js');
//    var allAppFiles = buildConfig.appFiles.slice();
//    allAppFiles = _removeValueFromArray(allAppFiles,'!'+buildConfig.srcFolder +'/app/**/*Test.js');
//    var testFiles = allVendorFiles.concat(allAppFiles);
//
//    return gulp.src(testFiles)
//        .pipe(karma({
//            configFile: 'karma.conf.js',
//            action: 'run'
//        }))
//        .on('error', function(err) {
//            console.log(err);
//            this.emit('end');
//        });
//});


/**
 * Execute les actions de build dans l'ordre
 */
gulp.task('debug', function(callback) {
    runSequence('uglify-debug','docs',
        callback);
});

gulp.task('css-debug', function(callback) {
    runSequence('sass','css','docs',
        callback);
});


gulp.task('serve', function () {
    gulp.src(buildConfig.docFolder)
        .pipe(webserver({
            port: 3000
        }));
});

gulp.task('webdriver_update', webdriver_update);

gulp.task('webdriver_standalone', webdriver_standalone);

/**
 * Execute l'action de test e2e
 */
gulp.task('e2e', ['webdriver_update'], function (callback) {
    var stream = gulp.src(buildConfig.docFolder)
        .pipe(webserver({
            port: 4000
        }));
    var fileStream = gulp.src(buildConfig.excludeFromAppDist.e2e);
    fileStream.pipe(protractor({
        configFile: "protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:4000']
    })).on('error', function (e) {
        stream.emit('kill');
        throw (e);
    }).on('end', function () {
        stream.emit('kill');
        callback();
    });
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

/**
 * File to copy an d rename to dist
 */
gulp.task('copy-rename-files', function () {
        for (var i = 0; i < buildConfig.fileToCopyAndRename.length; i++) {
            var fileToCopy = buildConfig.fileToCopyAndRename[i];
            gulp.src(fileToCopy.src)
                .pipe(chmod(755))
                .pipe(rename(fileToCopy.dest))
                .pipe(gulp.dest(buildConfig.dist));
            //return true;
        }
    }
);

/**
 * Simple function to remove item from array by value.
 * @param array
 * @returns array without removed items.
 * @private
 */
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
