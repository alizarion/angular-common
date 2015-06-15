'use strict';

IteSoft
    .directive('itInput',function(){
        return {
            restrict: 'E',
            transclude : true,
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0].querySelector('input'));
                input.attr('placeholder',scope.text);
                input.attr('type',scope.type);
                if (input.hasClass('floating-label')) {
                    var placeholder = input.attr('placeholder');
                    input.attr('placeholder', '').removeClass('floating-label');
                    input.after('<div class=floating-label>' + placeholder + '</div');
                }

                if (input.attr('data-hint')) {
                    input.after('<div class=hint>' + $this.attr('data-hint') + '</div>');
                }

                if (input.val() === null || input.val() == "undefined" || input.val() === "") {
                    input.addClass('empty');
                }
            },
            scope: {
                type: '@itType',
                text: '@itText',
                itModel : '='
            },            
            template :
                '<div class="form-control-wrapper">'
               +'<input class="form-control floating-label" ng-model="itModel"/>'
               +'</div>'
               +'<span class="material-input"></span>' 
        }
});