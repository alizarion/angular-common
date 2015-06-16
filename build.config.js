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
        'main/assets/css/itesoft.css',
        'main/assets/css/material.css'



    ],
    vendorJavascriptFiles: [
        'main/assets/lib/angularjs/angular.js',
        'main/assets/lib/angular-route/angular-route.min.js',
        'main/assets/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'main/assets/lib/angular-bootstrap/ui-bootstrap.min.js'
    ]
};