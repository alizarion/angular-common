
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
             <h2>JSON</h2>
             <textarea ui-codemirror="editorJSONOptions" name="json data"
             class="it-fill form-control floating-label"
             type="text"
             placeholder="Enter content"
             ng-model="modelJSON">
             </textarea>
            <h2>JAVASCRIPT</h2>
             <textarea ui-codemirror="editorJSOptions" name="js data"
             class="it-fill form-control floating-label"
             placeholder="Enter content"
             ng-model="modelJS">
             </textarea>
             <h2>CSS</h2>
             <textarea ui-codemirror="editorCSSOptions" name="css data"
             class="it-fill form-control floating-label"
             placeholder="Enter content"
             ng-model="modelCSS">
             </textarea>
             <h2>HTML</h2>
             <textarea ui-codemirror="editorHTMLOptions" name="css data"
             class="it-fill form-control floating-label"
             placeholder="Enter content"
             ng-model="modelHTML">
             </textarea>
            </div>
        </file>
         <file name="Controller.js">
         angular.module('itesoft-showcase')
             .controller('mainController', ['screenSize','$scope', function (screenSize,$scope) {
               $scope.modelJSON= '{"toto":{"toto":{"titi":3}}}';
               $scope.modelJS= 'function test(){}';
               $scope.modelCSS= '.classe{width:100px}';
               $scope.modelHTML= '<html></html>';
               $scope.editorJSONOptions = {
                    lineWrapping: true,
                    lineNumbers: true,
                    indentWithTabs: true,
                    matchTags: {bothTags: true},
                    extraKeys: {"Ctrl-Space": "autocomplete"},
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                    styleActiveLine: true,
                    mode: "application/json",
                    theme: "material",
                    lint: true
                };
                $scope.editorJSOptions = {
                    lineWrapping: true,
                    lineNumbers: true,
                    indentWithTabs: true,
                    matchTags: {bothTags: true},
                    extraKeys: {"Ctrl-Space": "autocomplete"},
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                    styleActiveLine: true,
                    mode: {name: "javascript", globalVars: true},
                    theme: "material",
                    lint: true
                };
                $scope.editorCSSOptions = {
                    lineWrapping: true,
                    lineNumbers: true,
                    indentWithTabs: true,
                    matchTags: {bothTags: true},
                    extraKeys: {"Ctrl-Space": "autocomplete"},
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                    styleActiveLine: true,
                    mode: {name: "css", globalVars: true},
                    theme: "material",
                    lint: true
                };
                $scope.editorHTMLOptions = {
                    lineWrapping: true,
                    lineNumbers: true,
                    indentWithTabs: true,
                    matchTags: {bothTags: true},
                    extraKeys: {"Ctrl-Space": "autocomplete"},
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                    styleActiveLine: true,
                    mode: "text/html",
                    theme: "material",
                    lint: true
                };
          }]);
         </file>
    </example>
 */