'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itBlock
 * @module itesoft
 * @restrict E
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
         <it-block name="zone-coding-lines-actions" style="margin:10px">
         <it-block name="login_input" role="RD">
         <div class="form-group">
         <input it-input class="form-control floating-label" type="text" it-label="Email" ng-model="user.email"/>
         </div>
         </it-block>
         <it-block name="coding-lines-add">
         <button class="btn btn-primary col-xs-2"
         title="{{'CODING.LINES.BUTTON.ADD' | translate}}"
         ng-click="codingController.addNewLine()">
         <span class="fa fa-plus fa-lg"/>
         </button>
         </it-block>
         <it-block name="coding-lines-remove">
         <button class="btn btn-danger col-xs-2"
         title="{{'CODING.LINES.BUTTON.REMOVE' | translate}}"
         ng-click="codingController.removeNewLine()">
         <span class="fa fa-trash fa-lg"/>
         </button>
         </it-block>
         <it-block name="coding-lines-duplicate">
         <button class="btn btn-primary col-xs-2"
         title="{{'CODING.LINES.BUTTON.DUPLICATE' | translate}}"
         ng-click="codingController.duplicateLine()">
         <span class="fa fa-copy fa-lg"/>
         </button>
         </it-block>
         <it-block name="coding-lines-memorize" removed="true">
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
                "REST_TEMPLATE_API_URL": "http://localhost:8080/rest",
                "REST_EDITOR_API_URL": "http://localhost:8081/editor",
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
IteSoft.directive('itBlock',
    [
        function () {
            return {
                restrict: 'E',
                scope: true,
                transclude: true,
                template:
                '<ng-transclude  ' +
                'class="{{itBlockController.hilightClass}}" ' +
                'ng-mouseover="itBlockController.over()" ' +
                'ng-mouseleave="itBlockController.leave()" ' +
                'ng-if="!removed || $root.editSite"> ' +
                '</ng-transclude>',
                controllerAs: 'itBlockController',
                link: function ($scope, element, attrs, ctrl, transclude) {
                    transclude($scope, function (content) {
                        var myContent = "";
                        angular.forEach(content, function (contentLine) {
                            if (contentLine.outerHTML) {
                                myContent += contentLine.outerHTML;
                            }
                        });
                        $scope.content = myContent;
                    });
                    /**
                     * Get attributes values
                     */
                    $scope.ref = attrs["ref"];
                    $scope.role = attrs["role"];
                    $scope.position = attrs["position"];
                    $scope.name = attrs["name"];
                    $scope.removed = false;
                    $scope.element = element;
                    $scope.version = attrs["version"];
                    if (angular.isDefined(attrs["removed"])) {
                        $scope.removed = attrs["removed"];
                    }
                    this.fields = {};
                    /**
                     * Call when attributes are read
                     */
                    ctrl.onRegisterApi();

                },
                controller: ['$scope','$rootScope', '$location', '$log', '$interval', '$timeout','$document', 'itPopup', 'BlockService', 'PilotSiteSideService',
                    function ($scope,$rootScope, $location, $log, $interval,$timeout, $document, itPopup, BlockService, PilotSiteSideService) {

                        var self = this;
                        self.focusable = false;

                        /**
                         * Call when block is selected by control panel
                         */
                        $rootScope.$on("hilightBlock",function(event,block){
                            if(angular.isDefined(block) && block.name == self.block.name) {
                                self.hilightClass="block-hilight";
                            }else{
                                if($scope.removed){
                                    self.hilightClass = "block-removed";
                                }else {
                                    self.hilightClass = "";
                                }
                            }
                        });

                        /**
                         * Call when attributes are read
                         */
                        self.onRegisterApi = function(){
                            self.block = BlockService.new($scope.name, $scope.ref, $scope.position, $scope.content, $scope.role, $scope.version);
                            self.block.removed= $scope.removed;
                        };

                        /**
                         * Call when mouse leave block
                         */
                        self.leave = function () {
                            $rootScope.$emit("unSelectBlock",self.block);
                        };

                        /**
                         * Call when mouse is over block
                         */
                        self.over = function () {
                            $rootScope.$emit("selectBlock",self.block);
                        };

                        /**
                         * Call when edit site mode changed
                         */
                        $rootScope.$watch('editSite',function()
                        {
                            if ($rootScope.editSite) {
                                /**
                                 * Need to change transclude content if block is removed or disabled
                                 */
                                $timeout(function () {
                                    if ($scope.removed) {
                                        self.hilightClass = "block-removed";
                                    }
                                }, 500);
                                $timeout(function () {
                                    if (angular.isDefined($scope.element.find("ng-transclude")[0])) {
                                        $scope.element.find("ng-transclude")[0].children[0].disabled = false;
                                    }
                                }, 500);
                            }
                        });
                    }
                ]
            }
        }]
)
