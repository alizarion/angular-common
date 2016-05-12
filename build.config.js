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
        'main/assets/lib/angular-ui-grid/ui-grid.css',
        'main/assets/lib/ngtoast/dist/ngToast.min.css',
        'main/assets/lib/ngtoast/dist/ngToast-animations.min.css',
        'main/assets/lib/codemirror/lib/codemirror.css',
        'main/assets/lib/codemirror/theme/mdn-like.css',
        'main/assets/lib/codemirror/theme/material.css',
        'main/assets/lib/codemirror/addon/dialog/dialog.css',
        'main/assets/lib/codemirror/addon/display/fullscreen.css',
        'main/assets/lib/codemirror/addon/fold/foldgutter.css',
        'main/assets/lib/codemirror/addon/lint/lint.css',
        'main/assets/lib/codemirror/addon/hint/show-hint.css'

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

    vendorJavascriptDistFiles: [
        'main/assets/lib/angular/angular.min.js',
        'main/assets/lib/angular-animate/angular-animate.min.js',
        'main/assets/lib/angular-translate/angular-translate.min.js',
        'main/assets/lib/angular-route/angular-route.min.js',
        'main/assets/lib/angular-resource/angular-resource.min.js',
        'main/assets/lib/angular-sanitize/angular-sanitize.min.js',
        'main/assets/lib/angular-messages/angular-messages.min.js',
        'main/assets/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'main/assets/lib/google-code-prettify/bin/prettify.min.js',
        'main/assets/lib/angular-local-storage/dist/angular-local-storage.min.js',
        'main/assets/lib/angular-ui-grid/ui-grid.min.js',
        'main/assets/lib/angular-media-queries/match-media.js',
        'main/assets/lib/angular-strap/dist/angular-strap.min.js',
        'main/assets/lib/angular-strap/dist/angular-strap.tpl.js',
        'main/assets/lib/ngtoast/dist/ngToast.min.js',
        'main/assets/lib/codemirror/lib/codemirror.js',
        'main/assets/lib/codemirror/mode/xml/xml.js',
        'main/assets/lib/codemirror/mode/javascript/javascript.js',
        'main/assets/lib/codemirror/mode/css/css.js',
        'main/assets/lib/codemirror/mode/htmlmixed/htmlmixed.js',
        'main/assets/lib/codemirror/mode/clike/clike.js',
        'main/assets/lib/angular-ui-codemirror/ui-codemirror.min.js',
        'main/assets/lib/codemirror/addon/search/search.js',
        'main/assets/lib/codemirror/addon/search/searchcursor.js',
        'main/assets/lib/codemirror/addon/dialog/dialog.js',
        'main/assets/lib/codemirror/addon/fold/xml-fold.js',
        'main/assets/lib/codemirror/addon/edit/matchtags.js',
        'main/assets/lib/codemirror/addon/search/match-highlighter.js',
        'main/assets/lib/codemirror/addon/selection/active-line.js',
        'main/assets/lib/codemirror/addon/display/placeholder.js',
        'main/assets/lib/codemirror/addon/display/fullscreen.js',
        'main/assets/lib/codemirror/addon/fold/foldcode.js',
        'main/assets/lib/codemirror/addon/fold/foldgutter.js',
        'main/assets/lib/codemirror/addon/fold/brace-fold.js',
        'main/assets/lib/codemirror/addon/fold/markdown-fold.js',
        'main/assets/lib/codemirror/addon/fold/comment-fold.js',
        'main/assets/lib/codemirror/addon/fold/indent-fold.js',
        'main/assets/lib/codemirror/addon/lint/lint.js',
        'main/assets/lib/jsonlint/lib/jsonlint.js',
        'main/assets/lib/codemirror/addon/lint/html-lint.js',
        'main/assets/lib/codemirror/addon/lint/json-lint.js',
        'main/assets/lib/codemirror/addon/lint/javascript-lint.js',
        'main/assets/lib/codemirror/addon/hint/show-hint.js',
        'main/assets/lib/codemirror/addon/lint/css-lint.js',
        'main/assets/lib/codemirror/addon/hint/css-hint.js',
        'main/assets/lib/codemirror/addon/hint/xml-hint.js',
        'main/assets/lib/codemirror/addon/hint/javascript-hint.js',
        'main/assets/lib/codemirror/addon/hint/html-hint.js',
        'main/assets/lib/jshint/dist/jshint.js',
        'main/assets/lib/angular-atmosphere/index.js'
    ],

    vendorJavascriptDebugFiles: [
        'main/assets/lib/angular/angular.js',
        'main/assets/lib/angular-animate/angular-animate.js',
        'main/assets/lib/angular-translate/angular-translate.js',
        'main/assets/lib/angular-route/angular-route.js',
        'main/assets/lib/angular-resource/angular-resource.js',
        'main/assets/lib/angular-sanitize/angular-sanitize.js',
        'main/assets/lib/angular-messages/angular-messages.js',
        'main/assets/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'main/assets/lib/google-code-prettify/bin/prettify.js',
        'main/assets/lib/angular-local-storage/dist/angular-local-storage.js',
        'main/assets/lib/angular-ui-grid/ui-grid.js',
        'main/assets/lib/angular-media-queries/match-media.js',
        'main/assets/lib/ngtoast/dist/ngToast.js',
        'main/assets/lib/codemirror/lib/codemirror.js',
        'main/assets/lib/codemirror/mode/xml/xml.js',
        'main/assets/lib/codemirror/mode/javascript/javascript.js',
        'main/assets/lib/codemirror/mode/css/css.js',
        'main/assets/lib/codemirror/mode/htmlmixed/htmlmixed.js',
        'main/assets/lib/codemirror/mode/clike/clike.js',
        'main/assets/lib/angular-ui-codemirror/ui-codemirror.js',
        'main/assets/lib/codemirror/addon/search/search.js',
        'main/assets/lib/codemirror/addon/search/searchcursor.js',
        'main/assets/lib/codemirror/addon/dialog/dialog.js',
        'main/assets/lib/codemirror/addon/fold/xml-fold.js',
        'main/assets/lib/codemirror/addon/edit/matchtags.js',
        'main/assets/lib/codemirror/addon/search/match-highlighter.js',
        'main/assets/lib/codemirror/addon/selection/active-line.js',
        'main/assets/lib/codemirror/addon/display/placeholder.js',
        'main/assets/lib/codemirror/addon/display/fullscreen.js',
        'main/assets/lib/codemirror/addon/fold/foldcode.js',
        'main/assets/lib/codemirror/addon/fold/foldgutter.js',
        'main/assets/lib/codemirror/addon/fold/brace-fold.js',
        'main/assets/lib/codemirror/addon/fold/markdown-fold.js',
        'main/assets/lib/codemirror/addon/fold/comment-fold.js',
        'main/assets/lib/codemirror/addon/fold/indent-fold.js',
        'main/assets/lib/codemirror/addon/lint/lint.js',
        'main/assets/lib/codemirror/addon/lint/javascript-lint.js',
        'main/assets/lib/jsonlint/lib/jsonlint.js',
        'main/assets/lib/codemirror/addon/lint/html-lint.js',
        'main/assets/lib/codemirror/addon/lint/json-lint.js',
        'main/assets/lib/codemirror/addon/lint/javascript-lint.js',
        'main/assets/lib/codemirror/addon/hint/show-hint.js',
        'main/assets/lib/codemirror/addon/lint/css-lint.js',
        'main/assets/lib/codemirror/addon/hint/css-hint.js',
        'main/assets/lib/codemirror/addon/hint/xml-hint.js',
        'main/assets/lib/codemirror/addon/hint/javascript-hint.js',
        'main/assets/lib/codemirror/addon/hint/html-hint.js',
        'main/assets/lib/jshint/dist/jshint.js',
        'main/assets/lib/angular-atmosphere/index.js'
    ],

    fileToCopyAndRename:
    [
        { src:"main/assets/lib/pdfjs-dist/build/pdf.worker.js", dest:"assets/lib/pdf.worker.js" },
        { src:"main/assets/lib/pdfjs-dist/build/pdf.js", dest:"assets/lib/pdf.js" }, 
        { src:"main/assets/lib/libtiff/tiff.min.js", dest:"assets/lib/tiff.min.js" }
    ]
};