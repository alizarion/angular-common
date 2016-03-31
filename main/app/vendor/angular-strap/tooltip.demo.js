
'use strict';

/**
 * @ngdoc directive
 * @name dependencies.directive:bs-tooltip
 * @module dependencies
 * @restrict AE
 * @since 1.0
 * @description
 * AngularStrap Tooltip : Add small overlays of content on hover, to any element for housing secondary information.
 * See more :  {@link http://mgcrea.github.io/angular-strap/#/tooltips mgcrea-tooltips}
 *
 * @example
     <example module="itesoft">
         <file name="index.html">
            <div ng-controller="mainController">
                 <p>Tight pants next level keffiyeh <a href data-animation="am-flip-x" bs-tooltip="tooltip">you probably</a> haven't heard of them. Photo booth beard raw denim letterpress vegan messenger bag stumptown.</p>

                 <div class="input-group col-xs-5">
                 <span class="input-group-btn">
                 <!-- You can also use data-attrs to assign scope variables -->
                 <button class="btn btn-primary" type="button" data-trigger="click" data-type="success" data-title="{{tooltip.title}}" bs-tooltip>Click me</button>
                 </span>
                 <input type="text" class="form-control" data-placement="right" data-type="info" data-container="body" placeholder="Focus to toggle tooltip" data-trigger="focus" bs-tooltip="tooltip">
                 </div>
                 <div class="checkbox">
                 <label data-placement="bottom-left" data-type="info" data-animation="am-fade-and-scale" bs-tooltip="tooltip" bs-enabled="tooltip.checked">
                 <input type="checkbox" ng-model="tooltip.checked"> Check me to enable my tooltip
                 </label>
                 </div>
            </div>
         </file>
         <file name="Controller.js">
         angular.module('itesoft')
         .controller('mainController', ['$scope', function ($scope) {
                    $scope.tooltip = {
                      "title": "Hello Tooltip This is a multiline message!",
                      "checked": false
                    };
                  }]);
         </file>

     </example>
 */