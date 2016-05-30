'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:itMediaViewer
 * @module itesoft
 * @since 1.2
 * @restrict AEC
 *
 * @description
 * <table class="table">
 *  <tr>
 *   <td><code>src</code></td>
 *   <td>string url passed to the media viewer (the server must implement Allow cross origin in case of cross domain url).</td>
 *  </tr>
 *  <tr>
 *   <td><code>file</code></td>
 *   <td>stream passed to the media viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>type</code></td>
 *   <td>to force type of document if the media viewer can't guess the type.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options = {}</code></td>
 *   <td>Object passed to the media viewer to apply options.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.onApiLoaded = function(api) { }</code></td>
 *   <td>Callback to be notify when the property api is available.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.showProgressbar = true | false</code></td>
 *   <td>Hide | Show progress bar.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.showToolbar  = true | false</code></td>
 *   <td>Hide | Show tool bar.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.initialScale  = '20 - 500%' | 'fit_height' | 'fit_page' | 'fit_width'</code></td>
 *   <td>Set initial scale of media viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.renderTextLayer = true | false</code></td>
 *   <td>only used for pdf, Enable | Disable render of html text layer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api</code></td>
 *   <td>Api of media viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.getZoomLevel()</code></td>
 *   <td>Method to get the current zoom level.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.zoomTo(zoomLevel)</code></td>
 *   <td>Method to zoom to the zoom level parameter.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.zoomIn()</code></td>
 *   <td>Method to zoom to the next zoom level.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.zoomOut()</code></td>
 *   <td>Method to zoom to the prev zoom level.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.getZoomLevels()</code></td>
 *   <td>Method to get the list of zoom level items.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.getCurrentPage()</code></td>
 *   <td>Method to get the current page.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.goToPage(pageIndex)</code></td>
 *   <td>Method to go to the page index if possible.</td>
 *  </tr>
 *   <tr>
 *   <td><code>options.api.goToNextPage()</code></td>
 *   <td>Method to go to the next page if possible.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.goToPrevPage()</code></td>
 *   <td>Method to go to the prev page if possible.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.getNumPages()</code></td>
 *   <td>Method to get the number of pages.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.rotatePagesRight()</code></td>
 *   <td>Method to rotate to the right (90°) all pages.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.rotatePagesLeft</code></td>
 *   <td>Method to rotate to the left (-90°) all pages.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.rotatePageRight()</code></td>
 *   <td>Method to rotate to the right (per 90°) the current page.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.rotatePageLeft()</code></td>
 *   <td>Method to rotate to the left (per -90°) the current page.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.downloadProgress</code></td>
 *   <td>% of progress.</td>
 *  </tr>
 * </table>
 *
 * ```html
 *     <it-media-viewer></it-media-viewer>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
     <div ng-controller="HomeCtrl" class="row">
        <div class="col-md-12"><div style="height: 500px;"><it-media-viewer src="'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'" options="options"></it-media-viewer></div></div>
     </div>
 </file>
 <file name="Module.js">
    angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
     angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {  $scope.options = {showProgressbar: true, showToolbar : true, initialScale : 'fit_height', renderTextLayer : true, libPath : 'http://alizarion.github.io/angular-common/docs/js/dist/assets/lib', onApiLoaded : function (api) { console.log(api); } }; }]);
 </file>
 </example>
 */

IteSoft.directive('itMediaViewer', ['itScriptService', function(itScriptService){

    var _splitLast = function (word, character) {
        if(word != undefined){
            var words = word.split(character);
            return words[words.length - 1];
        }
        return word;
    };

    var linker = function (scope, element, attrs) {
        var _setTemplate = function (ext, value) {
            var pathJs = (scope.options ? scope.options.libPath : null) || "js/dist/assets/lib";
            switch (ext) {
                case 'pdf':
                    scope.pdfSrc = value;
                    itScriptService.LoadScripts([
                        pathJs + '/pdf.js'
                    ]).then(function() {
                        //Hack for IE http://stackoverflow.com/questions/26101071/no-pdfjs-workersrc-specified/26291032
                        PDFJS.workerSrc = pathJs + "/pdf.worker.js";
                        scope.template = '<it-pdf-viewer src="pdfSrc" options="options"></it-pdf-viewer>';
                    });
                    break;
                case 'png':
                case 'jpeg':
                case 'jpg':
                    scope.imageSrc = value;
                    scope.template = '<it-image-viewer src="imageSrc" options="options"></it-image-viewer>';
                    break;
                case 'tif':
                case 'tiff':
                    scope.tiffSrc = value;
                    itScriptService.LoadScripts([
                        pathJs + '/tiff.min.js'
                    ]).then(function() {
                        scope.template = '<it-tiff-viewer src="tiffSrc" options="options"></it-tiff-viewer>';
                    });
                    break;
                default :
                    scope.template = 'No template found for extension : '  + ext;
                    break;
            }
        };

        var _setValue = function(value) {
            if(value){
                if(typeof value === typeof ""){
                    scope.ext = _splitLast(value, '.').toLowerCase();
                    _setTemplate(scope.ext, value);
                } else {
                    if(attrs.type) {
                        _setTemplate(attrs.type, value);
                    }else if(value.name != undefined) {
                        scope.ext = _splitLast(value.name, '.').toLowerCase();
                        _setTemplate(scope.ext, value);
                    } else {
                        scope.template = 'must specify type when using stream';
                    }
                }
            }
        };

        scope.$watch("src", _setValue);
        scope.$watch("file", _setValue);
    };

    return {
        scope: {
            src : '=',
            file: '=',
            type: '@',
            options : '=',
        },
        restrict: 'E',
        template :  '<div it-include="template"></div>',
        link: linker
    };
}]);
