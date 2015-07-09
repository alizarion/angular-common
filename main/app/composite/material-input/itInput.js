'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itInput
 * @module itesoft
 * @restrict ECA
 *
 * @description
 * Floating labels are just like Stacked Labels,
 * except that their labels animate, or "float" up whe
 * n text is entered in the input.
 *
 *
 * ```html
 *   <div class="form-group">
 *       <input it-input
 *              class="form-control
 *              floating-label"
 *              type="text"
 *              it-text="Email"
 *              ng-model="user.email">
 *   </div>
 * ```
 * @example
    <example module="itesoft">
        <file name="index.html">
            <div ng-controller="HomeCtrl">
                <div class="form-group">
                    <input it-input class="form-control floating-label" type="text" it-text="Email" ng-model="user.email">
                </div>
                <div class="form-group">
                    <input it-input class="form-control floating-label" type="text" it-text="Prénom" ng-model="user.firstName">
                </div>
            </div>
        </file>
        <file name="controller.js">
            angular.module('itesoft').controller('HomeCtrl',['$scope', function($scope) {
                  $scope.user = {
                      email : 'test@itesoft.com',
                      firstName :''
                     };
            }]);
        </file>
    </example>
 */
IteSoft
    .directive('itInput',function(){
        return {
            restrict: 'A',
            replace : true,
            require: '?ngModel',
            link : function (scope, element, attrs, ngModel ) {
                // Check if ngModel is there else go out
                if (!ngModel)
                    return;
                // Fix on input element
                var input = angular.element(element[0]);
                //If there is no floating-lbal do nothing
                if (input.hasClass('floating-label')) {
                    // Wrapper for material design
                    input.wrap('<div class="form-control-wrapper"></div>');
                    // If there is astatic placeholder use it
                    var placeholder = input.attr('placeholder');
                    if (placeholder) {
                        input.after('<div class="floating-label">' +  placeholder + '</div');
                    } else {
                        // Else user data binding text 
                        input.after('<div class="floating-label">' +  scope.itText + '</div');
                        scope.$watch('itText', function(value) {
                            if (!input[0].offsetParent) {
                                return;
                            }
                            var elementDiv = input[0].offsetParent.children;
                            angular.forEach(elementDiv, function(divHtml) {
                                var div = angular.element(divHtml);
                                if (div.hasClass('floating-label')) {
                                    div.text(value);
                                }
                            });
                        });
                    }
                    input.after('<span class="material-input"></span>');
                    input.attr('placeholder', '').removeClass('floating-label');
                }
                // Check if error message is set
                input.after('<small class="text-danger" style="display:none;"></small>');
                scope.$watch('itError', function(value) {
                    if (!input[0].offsetParent) {
                        return;
                    }
                    var elementDiv = input[0].offsetParent.children;
                    angular.forEach(elementDiv, function(divHtml) {
                        var div = angular.element(divHtml);
                        if (div.hasClass('text-danger')) {
                            div.text(value);
                            if (value != '' && value != undefined) {
                                div.removeClass('ng-hide');
                                div.addClass('ng-show');
                                div.css('display','block');
                            } else {
                                div.removeClass('ng-show');
                                div.addClass('ng-hide');
                                div.css('display','none');
                            }
                        }
                    });
                });
                if (input.val() === null || input.val() == "undefined" || input.val() === "") {
                    input.addClass('empty');
                }
                // Watch value and update to move floating label
                scope.$watch(function () {return ngModel.$modelValue; }, function(value,oldValue) {
                    if (value === null || value == undefined || value ==="" ) {
                        input.addClass('empty');
                    } else {
                        input.removeClass('empty');
                    }
                });

                // wait key input
                input.on('key change', function() {
                    if (input.val() === null || input.val() == "undefined" || input.val() === "") {
                        input.addClass('empty');
                    } else {
                        input.removeClass('empty');
                    }
                });
            },
            scope : {
                itError : '=',
                itText : '@'
            }
        }
});