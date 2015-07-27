"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itPrettyprint

 * @module itesoft
 * @restrict EA
 * @parent itesoft
 *
 * @description
 * A container for display source code in browser with syntax highlighting.
 *
 * @usage
 * <it-prettyprint>
 * </it-prettyprint>
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