'use strict';
IteSoft.directive('itBlock',
    ['$uibModal',
        function ($uibModal) {
            return {
                restrict: 'E',
                scope: true,
                transclude: true,
                template: '<div ng-if="itBlockController.isDistURL && $root.editBlock && (position!=\'replace\' || content!= \'\')" class="block" ng-class="removed ? \'removed-block block\':\'block\'">' +
                '<div ng-click="itBlockController.addBefore()" class="glyphicon glyphicon-plus block-btn template-add-block template-circle-btn "></div>' +
                '<div ng-click="itBlockController.editBlock()" class="glyphicon glyphicon-pencil  block-btn  template-edit-block template-circle-btn "></div>' +
                '<div ng-if="removed" ng-click="itBlockController.restoreBlock()" class="glyphicon glyphicon-eye-open block-btn  template-add-block template-circle-btn "></div>' +
                '<div ng-if="!removed" ng-click="itBlockController.deleteBlock()" class="glyphicon glyphicon-trash  block-btn template-add-block template-circle-btn "></div>' +
                '<ng-transclude></ng-transclude>' +
                '</div>' +
                '<ng-transclude  ng-if="!$root.editBlock && !removed"  ></ng-transclude>',
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
                    if (angular.isDefined(attrs["removed"])) {
                        $scope.removed = attrs["removed"];
                    }
                    this.fields = {};

                },
                controller: ['$scope', '$location', '$log', '$route', 'BlockService', 'itPopup', 'itNotifier', 'itBlockModalService',
                    function ($scope, $location, $log, $route, BlockService, itPopup, itNotifier, itBlockModalService) {

                        var self = this;

                        var currentPath = $location.absUrl();
                        this.isDistURL = currentPath.indexOf("dist") > 0;
                        this.register = function (value) {
                            $scope.content = value;
                        };
                        this.addBefore = function () {
                            var block = BlockService.new('PS_before' + $scope.name, $scope.name, 'before', '', 'PS');
                            var modalInstance = itBlockModalService.open(block);
                        };
                        this.editBlock = function () {
                            if (angular.isDefined($scope.ref) && $scope.ref != '') {
                                var block = BlockService.new($scope.name, $scope.ref, $scope.position, $scope.content, $scope.role);

                            } else {
                                var block = BlockService.new('PS_replace' + $scope.name, $scope.name, 'replace', $scope.content, 'PS');
                            }
                            var modalInstance = itBlockModalService.open(block);
                        };
                        this.restoreBlock = function () {
                            var block = BlockService.new($scope.name, $scope.ref, $scope.position, $scope.content, $scope.role);
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
