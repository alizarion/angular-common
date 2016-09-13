/**
 *
 */

var itMultiPagesViewer = angular.module('it-multi-pages-viewer', ['pascalprecht.translate']);

var itPdfViewer = angular.module("it-pdf-viewer", ['it-multi-pages-viewer', 'ui.layout']);

var itTiffViewer = angular.module("it-tiff-viewer", ['it-multi-pages-viewer', 'ui.layout']);

var itImageViewer = angular.module("it-image-viewer", ['it-multi-pages-viewer']);

angular.module('itesoft.viewer',['it-image-viewer','it-tiff-viewer','it-pdf-viewer','it-multi-pages-viewer']);


var itTab = angular.module("it-tab",[]);


var IteSoft = angular.module('itesoft', [
    'ngSanitize',
    'ui.bootstrap.tabs',
    'itesoft.popup',
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
    'ui.bootstrap.dropdown',
    'LocalStorageModule',
    'ngToast',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.tooltip',
    'ui.codemirror',
    'it-tab',
    'itesoft.messaging',
    'itesoft.language',
    'itesoft.viewer'
]);
