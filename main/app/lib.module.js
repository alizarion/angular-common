/**
 *
 */

var itMultiPagesViewer = angular.module('it-multi-pages-viewer', []);

var itPdfViewer = angular.module("it-pdf-viewer", ['it-multi-pages-viewer']);

var itTiffViewer = angular.module("it-tiff-viewer", ['it-multi-pages-viewer']);

var itImageViewer = angular.module("it-image-viewer", ['it-multi-pages-viewer']); 

var IteSoft = angular.module('itesoft', [
    'ngSanitize',
    'ui.bootstrap.tabs',
    'ui.bootstrap.modal',
    'ui.bootstrap.tpls',
    'ngAnimate',
    'matchMedia',
    'ui.grid',
    'ui.grid.pagination',
    'ngRoute',
    'pascalprecht.translate',
    'ui.grid.selection',
    'ui.grid.autoResize',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ui.grid.grouping',
    'LocalStorageModule',
    'ngToast',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.tooltip',
    'ui.codemirror',
    'it-pdf-viewer',
    'it-image-viewer',
    'it-tiff-viewer'
]);
