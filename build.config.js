/**
 * Configuration du projet.
 */
var pkg = require('./package.json');

module.exports = {
    dist: 'dist',
    /**
     * Header de la distribution.
     */
    banner:
        '/*!\n' +
        ' * Copyright 2015 itesoft.\n' +
        ' * http://itesoft.com/\n' +
        ' *\n' +
        ' * ProductionManager, v<%= pkg.version %>\n' +
        ' * A powerful production manager.*/\n' ,

    closureStart: '(function() {\n',
    closureEnd: '\n})();',

    /**
     * Liste des fichiers JS de l'application qui seront minifier pour la prod.
     */
    appFiles: [
        '!main/app/**/*Test.js', // Exclude test files
        '!main/app/**/*.demo.js', // Exclude demo files
        'main/app/app.module.js',
        'main/app/**/*.js'
    ],
    /**
     * Liste des librairies minifié à utiliser en prod
     */
    vendorCssFiles : [
        'main/assets/lib/components-font-awesome/css/font-awesome.min.css',
        'main/assets/lib/angular-bootstrap/ui-bootstrap-csp.css',
        'main/assets/lib/bootstrap/dist/css/bootstrap.min.css',
        'main/assets/lib/google-code-prettify/bin/prettify.min.css',
        'main/assets/css/itesoft.css',
        'main/assets/css/material.css',
        'main/assets/lib/ng-grid/ng-grid.min.css'



    ],
    assetsDistFiles : [
        '!main/assets/lib/**/*.js',
        '!main/assets/lib/**/*.html',
        '!main/assets/lib/**/*.md',
        '!main/assets/lib/**/*.txt',
        '!main/assets/lib/**/*.json',
        '!main/assets/css/**/*',
        '!main/assets/scss/**/*.scss',
        '!main/assets/scss/**/*.less',
        'main/assets/**/*'
    ],
    vendorJavascriptFiles: [
        'main/assets/lib/angular/angular.min.js',
        'main/assets/lib/jquery/dist/jquery.min.js',
        'main/assets/lib/angular-translate/angular-translate.min.js',
        'main/assets/lib/ng-grid/ng-grid-2.0.14.min.js',
        'main/assets/lib/angular-route/angular-route.min.js',
        'main/assets/lib/angular-sanitize/angular-sanitize.min.js',
        'main/assets/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'main/assets/lib/google-code-prettify/bin/prettify.min.js'

    ]
};