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
     <it-media-viewer src="'http://clisla/Sparda-AngularJS/data/VSOne - Custom OData Provider V2.pdf'" options="{showProgressbar: true, showToolbar : true, initialScale : 'fit_height' }"></it-media-viewer>
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

        scope.$watch("src", function(value){
            if(value){
                var pathJs = (scope.options ? scope.options.libPath : null) || "js/dist/assets/lib";

                if(typeof value === typeof ""){
                    scope.ext = _splitLast(value, '.').toLowerCase();
                    switch (scope.ext) {
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
                            scope.template = 'No template found for extension : '  + scope.ext;
                            break;
                    }
                }else{
                    scope.template = 'Only string type supported for now : '  + typeof value;
                }
            }else {
                scope.template = null;
            }
        });
    };

    return {
        scope: {
            src : '=',
            options : '=',
        },
        restrict: 'E',
        template :  '<div it-include="template"></div>',
        link: linker
    };
}]);

