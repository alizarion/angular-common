"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itPrettyprint

 * @module itesoft
 * @restrict EA
 * @parent itesoft
 * @since 1.0
 * @description
 * A container for display source code in browser with syntax highlighting.
 *
 * @usage
 * <it-prettyprint>
 * </it-prettyprint>
 *
 * @example
    <example module="itesoft">
        <file name="index.html">
             <pre it-prettyprint=""  class="prettyprint lang-html">
                 <label class="toggle">
                     <input type="checkbox">
                         <div class="track">
                         <div class="handle"></div>
                     </div>
                 </label>
             </pre>
        </file>
    </example>
 */
IteSoft
    .directive('itPrettyprint', ['$rootScope', '$sanitize', function($rootScope, $sanitize) {
        var prettyPrintTriggered = false;
        return {
            restrict: 'EA',
            terminal: true,  // Prevent AngularJS compiling code blocks
            compile: function(element, attrs) {
                if (!attrs['class']) {
                    attrs.$set('class', 'prettyprint');
                } else if (attrs['class'] && attrs['class'].split(' ')
                    .indexOf('prettyprint') == -1) {
                    attrs.$set('class', attrs['class'] + ' prettyprint');
                }
                return function(scope, element, attrs) {
                    var entityMap = {
                          "&": "&amp;",
                          "<": "&lt;",
                          ">": "&gt;",
                          '"': '&quot;',
                          "'": '&#39;',
                          "/": '&#x2F;'
                      };

                       function replace(str) {
                          return String(str).replace(/[&<>"'\/]/g, function (s) {
                              return entityMap[s];
                          });
                      }
                    element[0].innerHTML = prettyPrintOne(replace(element[0].innerHTML));

                };
            }

        };
    }]);