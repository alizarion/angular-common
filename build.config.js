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
        ' * Angular-common, v<%= pkg.version %>\n' +
        ' *Itesoft common Angularjs libs.*/\n' ,

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
        'main/assets/lib/google-code-prettify/bin/prettify.min.css',
        'main/assets/lib/angular-ui-grid/ui-grid.css'
    ],

    assetsDistFiles :[
        'main/assets/**/*.gif',
        'main/assets/**/*.png',
        'main/assets/**/*.jpg',
        'main/assets/**/*.svg'
    ],


    fontFiles :[
        'main/assets/**/*.eot',
        'main/assets/**/*.svg',
        'main/assets/**/*.ttf',
        'main/assets/**/*.otf',
        'main/assets/**/*.woff',
        'main/assets/**/*.woff2'
    ],

    vendorJavascriptFiles: [
        'main/assets/lib/angular/angular.min.js',
        'main/assets/lib/angular-animate/angular-animate.min.js',
        'main/assets/lib/angular-translate/angular-translate.min.js',
        'main/assets/lib/angular-route/angular-route.min.js',
        'main/assets/lib/angular-resource/angular-resource.min.js',
        'main/assets/lib/angular-sanitize/angular-sanitize.min.js',
        'main/assets/lib/angular-messages/angular-messages.min.js',
        'main/assets/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'main/assets/lib/google-code-prettify/bin/prettify.min.js',
        'main/assets/lib/angular-ui-grid/ui-grid.min.js',
        'main/assets/lib/angular-media-queries/match-media.js'
    ]
};