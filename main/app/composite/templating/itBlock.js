'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itBlock
 * @module itesoft
 * @restrict EAC
 *
 * @description
 * The Block widgets provides  way to customize UI.
 *
 * <h1>Enable</h1>
 * Enable editMode with
 *
 * ```js
 * $rootScope.editSite
 * ```
 *
 * <h1>Config</h1>
 * ```config
 * REST_TEMPLATE_API_URL = url of template rest api
 * TEMPLATE_EDITOR_URL = template web editor url
 * TEMPLATE_USER_AUTO_LOGIN = login and password to use for autologin {login: "admin", password: "admin"}
 * SKIP_LOGIN = true if you want to skip login
 * CURRENT_PACKAGE = package used to saved modification (ex 10-PS)
 * CURRENT_ROLE = user usrole used to managed block (PS, RD ...)
 * ```
 *
 * ```html
 *   <it-block name="login_input" role="RD"></it-block>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl">
 <toast class="toaster" style="left:0px !important; bottom:0px !important"></toast>
 <it-block-control-panel></it-block-control-panel>
 <it-block name="zone-coding-lines-actions3" style="margin:10px">
 <it-block name="login_input" role="RD">
 <div class="form-group">
 <input it-input class="form-control floating-label" type="text" it-label="Email" ng-model="user.email"/>
 </div>
 </it-block>
 <it-block name="coding-lines-add3" removed="true">
 <button class="btn btn-primary col-xs-2"
 title="{{'CODING.LINES.BUTTON.ADD' | translate}}"
 ng-click="codingController.addNewLine()">
 <span class="fa fa-plus fa-lg"/>
 </button>
 </it-block>
 <it-block name="coding-lines-remove3">
 <button class="btn btn-danger col-xs-2"
 title="{{'CODING.LINES.BUTTON.REMOVE' | translate}}"
 ng-click="codingController.removeNewLine()">
 <span class="fa fa-trash fa-lg"/>
 </button>
 </it-block>
 <it-block name="coding-lines-duplicate3">
 <button class="btn btn-primary col-xs-2" disabled="true"
 title="{{'CODING.LINES.BUTTON.DUPLICATE' | translate}}"
 ng-click="codingController.duplicateLine()">
 <span class="fa fa-copy fa-lg"/>
 </button>
 </it-block>
 <it-block name="coding-lines-memorize3" removed="true">
 <button class="btn btn-primary col-xs-2"
 title="{{'CODING.LINES.BUTTON.MEMORIZE' | translate}}"
 ng-click=""
 disabled>
 <span class="fa fa-folder fa-lg"/>
 </button>
 </it-block>
 </it-block>
 <br/>
 <br/>
 <br/>
 <br/>
 <it-block name="zone-grid-example">
 <div id="grid1" ui-grid="gridOptions" class="grid"></div>
 </it-block>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft','ngResource'])
 .constant("CONFIG", {
                "REST_TEMPLATE_API_URL": "http://localhost:8082",
                "TEMPLATE_USER_AUTO_LOGIN": {login: "admin", password: "admin"},
                "ENABLE_TEMPLATE_EDITOR": true,
                "SKIP_LOGIN" : true,
                "CURRENT_PACKAGE" : "10-PS",
                "CURRENT_ROLE" : "PS",
                "VERSION": "v1",
                });
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl',
 ['$scope','$rootScope','$http','uiGridGroupingConstants',
 function($scope,$rootScope,$http,uiGridGroupingConstants) {
                       $rootScope.editSite = true;
                       $scope.myData = [];
            // sample values
            $scope.myDataInit = [ { "firstName": "Cox", "lastName": "Carney", "company": "Enormo", "employed": true }, { "firstName": "Lorraine", "lastName": "Wise", "company": "Comveyer", "employed": false }, { "firstName": "Nancy", "lastName": "Waters", "company": "Fuelton", "employed": false }];
            angular.copy($scope.myDataInit,$scope.myData);
            $scope.gridOptions = {
                data:$scope.myData,
                useExternalFiltering: true,
                enableFiltering: true,
                onRegisterApi: function(gridApi){
                  $scope.gridApi = gridApi;
                  //quick an dirty example of filter that use it-autocomplete
                  $scope.gridApi.core.on.filterChanged($scope, function(){
                            $scope.myData = [];
                            var filterUse = false;
                              angular.forEach($scope.myDataInit,function(item){
                                    var added = false;
                                    var key = '';
                                    var value = '';
                                    $scope.gridOptions.data = $scope.myData;
                                    $scope.gridOptions.totalItems = $scope.myData.length;
                              })
                            });
                        },
                        columnDefs:[{
                            name: 'firstName',
                            cellClass: 'firstName',
                            cellTemplate:' <div class="ui-grid-cell-contents"> <it-block name="zone-firstName">test</it-block> </div>'
                            },{
                            name: 'lastName',
                            cellClass: 'lastName'
                           }
                        ]
                    };
                    $scope.selectedOption = "Lorraine";
                    }]);
 </file>
 </example>
 */
IteSoft.directive('itBlock', ['$timeout', 'BlockService', function ($timeout, BlockService) {
        return {
            restrict: 'EAC',
            link: function ($scope, element, attrs, ctrl) {
                $scope.$root.$emit("registerBlock", BlockService.new(attrs["name"], attrs["ref"], attrs["position"], element.html(), attrs["role"], attrs["version"], attrs["removed"], element));
            }
        }
    }
    ]
);
