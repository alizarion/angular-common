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
        '!src/app/**/*Test.js', // Exclude test files
        'src/app/**/*.js'
    ],
    /**
     * Liste des librairies minifié à utiliser en prod
     */
    vendorFiles: [
            'src/assets/lib/angularjs/angular.js',
            'src/assets/lib/angular-route/angular-route.min.js'
    ]
};