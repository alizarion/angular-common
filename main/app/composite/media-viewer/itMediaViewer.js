'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:itMediaViewer
 * @module itesoft
 * @since 1.2
 * @restrict AEC
 *
 * @description
 * Provide a circular button like for the full screen button
 *
 * ```html
 *     <it-media-viewer></it-media-viewer>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
     <div ng-controller="HomeCtrl" >
     <it-media-viewer src="'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'" options="{showProgressbar: true, showToolbar : true, initialScale : 'fit_height', renderTextLayer : true }"></it-media-viewer>
     </div>
 </file>
 <file name="Module.js">
    angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
     angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {  }]);
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
                }else {
                    if(attrs.type) {
                        _setTemplate(attrs.type, value);
                    }else{
                        scope.template = 'must specify type when using stream';
                    }
                }
            }else {
                scope.template = null;
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

