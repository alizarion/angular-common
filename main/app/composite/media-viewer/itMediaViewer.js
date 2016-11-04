'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:itMediaViewer
 * @module itesoft
 * @since 1.2
 * @restrict AEC
 * @requires $translate (pascalprecht.translate)
 * @requires angular-ui-layout (ui.layout)
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
 *   <td><code>options.libPath = 'assets/lib'</code></td>
 *   <td>Specify where all libraries (pdfjs / tiffjs ect) are stored.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.onApiLoaded = function(api) { }</code></td>
 *   <td>Callback to be notify when the property api is available.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.onTemplateNotFound = function(extension) { }</code></td>
 *   <td>Callback to be notify when template not found for the specify extension.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.orientation = 'vertical' | 'horizontal'</code></td>
 *   <td>Set orientation of the viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.zoomSelectionShortcutKey = 'ctrlKey' | 'shiftKey' | 'altKey'</code></td>
 *   <td>Set zoom selection shortcut of the viewer.</td>
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
 *   <td><code>options.showThumbnail  = true | false</code></td>
 *   <td>Hide | Show thumbnail.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.showSizeMenu  = true | false</code></td>
 *   <td>Hide | Show size menu.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.initialScale  = '20 - 500%' | 'fit_height' | 'fit_page' | 'fit_width'</code></td>
 *   <td>Set initial scale of media viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.initialMode  = 'mode_hand' | 'mode_zoomSelection' | 'mode_text'</code></td>
 *   <td>set initial mode of viewer (default is mode_hand).</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.getApi()</code></td>
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
 *   <td><code>options.api.onZoomLevelsChanged = function (zoomLevels) { }</code></td>
 *   <td>Callback to be notify when the property zoom levels change.</td>
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
 *   <td><code>options.api.rotatePagesLeft()</code></td>
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
 *   <td><code>options.api.onError = function (operation, message) { }</code></td>
 *   <td>Callback to be notify on error.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.onZoomToSelection = function (zoomSelection) { }</code></td>
 *   <td>Callback to be notify on zoom to rectangle.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.onTextSelected = function (text) { }</code></td>
 *   <td>Callback to be notify on text selected.</td>
 *  </tr>
 *  <tr>
 *  <tr>
 *   <td><code>options.api.onPageClicked = function (pageIndex) { }</code></td>
 *   <td>Callback to be notify when click on a page.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.onPageRotation = function (args) { alert(args.pageIndex + " " + args.rotation); }</code></td>
 *   <td>Callback to be notify on page rotation.</td>
 *  </tr>
 *   <td><code>options.api.downloadProgress</code></td>
 *   <td>% of progress.</td>
 *  </tr>
 * </table>
 *
 * ```html
 *    <style>
 //override style selection
 .multipage-viewer .selected {
            border-style: solid;
            border-width: 1px;
            border-color: red;
         }

 .thumbnail-viewer .selected {
            border-style: solid;
            border-width: 1px;
            border-color: red;
         }

 //override thumbnail num-page
 .thumbnail-viewer .num-page {
         	text-align: center;
         }

 //override full text rectangle
 .multipage-viewer .textLayer > .word:hover {
              border: solid;
              border-color: red;
              border-width: 1px;
        }

 //override text selection color
 .multipage-viewer .textLayer ::selection {
             background: rgba(0,0,255, 0.2);
        }
 .multipage-viewer .textLayer ::-moz-selection {
             background: rgba(0,0,255, 0.2);
        }
 </style>
 *    <it-media-viewer></it-media-viewer>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl" class="row">
 <div class="col-md-12"><div style="height: 500px;">SelectedText : {{selectedText}}<it-media-viewer src="'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'" options="options"></it-media-viewer></div></div>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft.viewer'])
 </file>
 <file name="controller.js">
    angular.module('itesoft-showcase')
     .controller('HomeCtrl', ['$scope', function($scope) {
        $scope.options = {showProgressbar: true,
              showToolbar : true,
             initialScale : 'fit_height',
             libPath : 'http://alizarion.github.io/angular-common/docs/js/dist/assets/lib/',
             onApiLoaded : function (api) {
                api.onTextSelected = function(text) {
                 $scope.selectedText = text;
                 },
                 api.onZoomLevelsChanged = function (zoomLevels) {
                  console.log(zoomLevels);
                   }
                  }
                };
           }]);
 </file>
 </example>
 */



angular.module('itesoft.viewer').directive('itMediaViewer', ['itScriptService', function (itScriptService) {

    var _splitLast = function (word, character) {
        if (word != undefined) {
            var words = word.split(character);
            return words[words.length - 1];
        }
        return word;
    };

    var linker = function (scope, element, attrs) {

        var _setTemplate = function (ext, value) {
            var pathJs = (scope.options ? scope.options.libPath : null) || "assets/Scripts/vendor";
            switch (ext) {
                case 'pdf':
                    scope.pdfSrc = value;
                    itScriptService.LoadScripts([
                        pathJs + '/pdf.js',
                    ]).then(function () {
                        //Hack for IE http://stackoverflow.com/questions/26101071/no-pdfjs-workersrc-specified/26291032
                        PDFJS.workerSrc = pathJs + "/pdf.worker.js";
                        //PDFJS.cMapUrl = pathJs + "/cmaps/";
                        //PDFJS.imageResourcesPath = pathJs + "/images";
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
                    ]).then(function () {
                        scope.template = '<it-tiff-viewer src="tiffSrc" options="options"></it-tiff-viewer>';
                    });
                    break;
                default :
                    if (scope.options && scope.options.onTemplateNotFound) {
                        scope.options.onTemplateNotFound(ext);
                    }
                    $log.debug('No template found for extension : ' + ext);
                    scope.template = null;
                    break;
            }
        };

        var _setValue = function (newValue, oldValue) {
            if (newValue) {
                if (typeof newValue === typeof "") {
                    scope.ext = _splitLast(newValue, '.').toLowerCase();
                    _setTemplate(scope.ext, newValue);
                } else {
                    if (attrs.type) {
                        _setTemplate(attrs.type.toLowerCase(), newValue);
                    } else if (newValue.name != undefined) {
                        scope.ext = _splitLast(_splitLast(newValue.name, '.'), '/').toLowerCase();
                        _setTemplate(scope.ext, newValue);
                    } else {
                        $log.debug('must specify type when using stream');
                        scope.template = null;
                    }
                }
            } else if (newValue != oldValue) {
                scope.template = null;
            }
        };

        scope.$watch("src", _setValue);
        scope.$watch("file", _setValue);
    };

    return {
        scope: {
            src: '=',
            file: '=',
            type: '@',
            options: '=',
        },
        restrict: 'E',
        template: '<div it-include="template"></div>',
        link: linker
    };
}]);

