'use strict';

IteSoft
    .directive('itInput',function(){
        return {
            restrict: 'E',
            transclude : true,
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0].querySelector('input'));
                if (input.hasClass('floating-label')) {
                    var placeholder = input.attr('placeholder');
                    input.attr('placeholder', '').removeClass('floating-label');
                    if (scope.itText == undefined) {
                        input.after('<div class="floating-label">' + placeholder + '</div');
                    } else  {
                        input.after('<div class="floating-label">' + scope.itText + '</div');
                    }
                }

                if (input.attr('data-hint')) {
                    input.after('<div class="hint">' + $this.attr('data-hint') + '</div>');
                }

                if (input.val() === null || input.val() == "undefined" || input.val() === "") {
                    input.addClass('empty');
                }
                input.on('key change', function() {
                    if (input.val() === null || input.val() == "undefined" || input.val() === "") {
                        input.addClass('empty');
                    } else {
                        input.removeClass('empty');
                    }
                });
            },
            scope : {
                itText : '@'
            },
            template :
                '<div class="form-control-wrapper">'
               +'<ng-transclude></ng-transclude>'
               +'</div>'
               +'<span class="material-input"></span>' 
        }
});