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
 * CONFIG.TEMPLATE_EDITOR_URL = template web editor url
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
 <it-block name="login_input" role="RD">
 <div class="form-group">
 <input it-input class="form-control floating-label" type="text" it-label="Email" ng-model="user.email"/>
 </div>
 </it-block>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 .constant("CONFIG", {
            "TEMPLATE_EDITOR_URL": "http://localhost:8080/"
            });
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl',
 ['$scope','$rootScope',
 function($scope,$rootScope) {
                   $rootScope.editSite = true;
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
                template: '<div ng-if="$root.editSite && itBlockController.activated && (position!=\'replace\' || content!= \'\')"' +
                ' ng-mouseover="itBlockController.over()" ng-mouseleave="itBlockController.leave()"' +
                ' class="block" ng-class="removed ? \'removed-block block\':\'block\'">' +
                '<div ng-click="itBlockController.addBefore()" class="glyphicon glyphicon-plus block-btn template-add-block template-circle-btn "></div>' +
                '<div ng-click="itBlockController.editBlock()" class="glyphicon glyphicon-pencil  block-btn  template-edit-block template-circle-btn "></div>' +
                '<div ng-if="removed" ng-click="itBlockController.restoreBlock()" class="glyphicon glyphicon-eye-open block-btn  template-add-block template-circle-btn "></div>' +
                '<div ng-if="!removed" ng-click="itBlockController.deleteBlock()" class="glyphicon glyphicon-trash  block-btn template-add-block template-circle-btn "></div>' +
                '</div>' +
                '<ng-transclude ng-mouseover="itBlockController.over()" ng-mouseleave="itBlockController.leave()" && !removed"  ></ng-transclude>',
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
                    $scope.ref = attrs["ref"];
                    $scope.role = attrs["role"];
                    $scope.position = attrs["position"];
                    $scope.name = attrs["name"];
                    $scope.removed = false;
                    $scope.version =  attrs["version"];
                    if (angular.isDefined(attrs["removed"])) {
                        $scope.removed = attrs["removed"];
                    }
                    this.fields = {};

                },
                controller: ['$scope','$location','$log','$timeout',
                    function ($scope,$location,$log,$timeout) {

                        var self = this;

                        var currentPath = $location.absUrl();


                        self.activated = false;
                        self.manyTimesOver =0;
                        self.timer = 0;
                        self.leave = function(){
                            self.manyTimesOver =-1;
                            self.timer = $timeout(function(){self.activated = self.manyTimesOver > 0 ? true: false;},1000);
                        };
                        self.over = function(){
                            self.manyTimesOver =+1;
                            self.activated = self.manyTimesOver > 0 ? true: false;
                            self.timer = $timeout(function(){self.activated = self.manyTimesOver > 0 ? true: false;},1000);
                        };

                        this.register = function (value) {
                            $scope.content = value;
                        };
                        this.addBefore = function () {
                            var block = BlockService.new('PS_before' + $scope.name, $scope.name, 'before', '', 'PS',1);
                        };
                        this.editBlock = function () {
                            if (angular.isDefined($scope.ref) && $scope.ref != '') {
                                var block = BlockService.new($scope.name, $scope.ref, $scope.position, $scope.content, $scope.role,$scope.version);

                            } else {
                                var block = BlockService.new('PS_replace' + $scope.name, $scope.name, 'replace', $scope.content, 'PS',1);
                            }
                        };
                        this.restoreBlock = function () {
                            var block = BlockService.new($scope.name, $scope.ref, $scope.position, $scope.content, $scope.role,$scope.version);
                            BlockService.restore.get({'name': block.name}, function () {
                                BlockService.build.get(function () {
                                    BlockService.build.get(function () {
                                        location.reload();
                                    }, function () {
                                        $log.error("Unable to build dist  ")
                                    })
                                }, function () {
                                    $log.error("Unable to restore block " + JSON.stringify(block));
                                })
                            })
                        };

                        this.deleteBlock = function () {
                            var confirmPopup = itPopup.confirm({
                                title: "{{'DELETE_BLOCK_TITLE' | translate}}",
                                text: "{{'DELETE_BLOCK_CONFIRM' | translate}}",
                                buttons: [

                                    {
                                        text: 'Cancel',
                                        type: '',
                                        onTap: function () {
                                            return false;
                                        }
                                    },
                                    {
                                        text: 'ok',
                                        type: '',
                                        onTap: function () {
                                            return true;
                                        }
                                    }
                                ]
                            });
                            confirmPopup.then(function (res) {
                                var block = BlockService.new($scope.name, $scope.ref, $scope.position, $scope.content, $scope.role);
                                BlockService.custom.delete(block, function () {
                                    BlockService.build.get(function () {
                                        location.reload();
                                    }, function () {
                                        $log.error("Unable to build dist  ")
                                    })
                                }, function () {
                                    $log.error("Unable to delete current block " + JSON.stringify(block))
                                });
                            }, function () {
                                itNotifier.notifyError({
                                    content: "{{'BLOCK_DELETED_KO' | translate}}"
                                });
                            });
                        };
                    }
                ]
            }
        }]
)


