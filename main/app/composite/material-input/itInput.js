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
 *   <form class="form-group"  novalidate name="myForm" ng-submit="submit(myForm)">
 *       <input it-input
 *              class="form-control floating-label"
 *              type="text"
 *              name="Email"
 *              ng-minlength="5"
 *              ng-maxlength="10"
 *              required=""
 *              it-label="Email"
 *              ng-model="user.email">
 *              <div class="form-errors" ng-messages="myForm.Email.$error" style="color: red;">
         *            <div class="form-error" ng-message="required">This field is required.</div>
         *            <div class="form-error" ng-message="minlength">This field is must be at least 5 characters.</div>
         *            <div class="form-error" ng-message="maxlength">This field is must be less than 50 characters</div>
 *             </div>
 *   </form>
 * ```
 * @example
    <example module="itesoft-showcase">
        <file name="index.html">
            <div ng-controller="HomeCtrl">
               <form class="form-group"  novalidate name="myForm" ng-submit="submit(myForm)">
                <div class="form-group">
                        <input it-input class="form-control floating-label" type="text" it-label="Email" ng-model="user.email">
                </div>
                <div class="form-group">
                        <input it-input class="form-control floating-label"   required="" ng-minlength="5"  ng-maxlength="10" type="text" it-label="Prénom" name="Prenom" ng-model="user.firstName">
                </div>
                  <div class="form-errors" ng-messages="myForm.Prenom.$error" style="color: red;">
                      <div class="form-error" ng-message="required">This field is required.</div>
                      <div class="form-error" ng-message="minlength">This field is must be at least 5 characters.</div>
                      <div class="form-error" ng-message="maxlength">This field is must be less than 50 characters</div>
                  </div>
                  <button class="btn btn-primary" type="submit">submit</button>
               </form>
            </div>
        </file>
         <file name="Module.js">
         angular.module('itesoft-showcase',['ngMessages','itesoft']);
         </file>
        <file name="controller.js">
            angular.module('itesoft-showcase').controller('HomeCtrl',['$scope', function($scope) {
                  $scope.user = {
                      email : 'test@itesoft.com',
                      firstName :''
                     };

                  $scope.submit = function(form){
                       if(form.$valid){
                         console.log('submit');
                       }
                  }
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
                        input.after('<div class="floating-label">' +  scope.itLabel + '</div');
                        scope.$watch('itLabel', function(value) {
                            scope.$applyAsync(function(){
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
                            })

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
                itLabel : '@'
            }
        }
});