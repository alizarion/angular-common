
'use strict';

/**
 * @ngdoc directive
 * @name dependencies.directive:ui-code-mirror
 * @module dependencies
 * @restrict AE
 * @since 1.0
 * @description
 * Provides an Code Editor Component
 * See more :  {@link https://github.com/angular-ui/ui-codemirror}
 * @example
     <example module="itesoft-showcase">
         <file name="Module.js">
            angular.module('itesoft-showcase',['ui.codemirror','itesoft']);
         </file>
        <file name="index.html">
            <div ng-controller="mainController">
             <textarea ui-codemirror="editorOptions" name="json data"
             class="it-fill form-control floating-label"
             type="text"
             placeholder="Enter content"
             ng-model="model">
             </textarea>
            </div>
        </file>
         <file name="Controller.js">
         angular.module('itesoft-showcase')
             .controller('mainController', ['screenSize','$scope', function (screenSize,$scope) {
               $scope.model= '{"toto":{"toto":{"titi":3}}}';
               $scope.editorOptions = {
                        lineWrapping: true,
                        lineNumbers: true,
                        indentWithTabs: true,
                        matchTags: {bothTags: true},
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                        styleActiveLine: true,
                        mode: "application/json",
                        theme: "material",
                        lint: true
                    };
          }]);
         </file>
    </example>
 */