'use strict';

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
                input.after('<div class="alert alert-danger ng-hide"></div>');
                scope.$watch('itError', function(value) {
                    var elementDiv = input[0].offsetParent.children;
                    angular.forEach(elementDiv, function(divHtml) {
                        var div = angular.element(divHtml);     
                        if (div.hasClass('alert')) {
                            div.text(value);
                            if (value != '') {
                                div.removeClass('ng-hide');
                                div.addClass('ng-show');
                            } else {
                                div.removeClass('ng-show');
                                div.addClass('ng-hide');
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