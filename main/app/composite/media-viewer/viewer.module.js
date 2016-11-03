/**
 *
 */

var itMultiPagesViewer = angular.module('it-multi-pages-viewer', ['pascalprecht.translate']);

var itPdfViewer = angular.module("it-pdf-viewer", ['it-multi-pages-viewer', 'ui.layout']);

var itTiffViewer = angular.module("it-tiff-viewer", ['it-multi-pages-viewer', 'ui.layout']);

var itImageViewer = angular.module("it-image-viewer", ['it-multi-pages-viewer']);

angular.module('itesoft.viewer', ['it-image-viewer', 'it-tiff-viewer', 'it-pdf-viewer', 'it-multi-pages-viewer']);