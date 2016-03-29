'use strict';
IteSoft.directive('itBlockControlPanel',
    ['$uibModal','$log',
        function ($uibModal,$log) {
            return {
                restrict: 'EA',
                scope: true,
                transclude: true,
                template:
                '<div class="block-control-panel" ng-show="itBlockControlPanelController.isDistURL">' +
                '<div ng-if="!$root.editBlock" class="btn btn-primary" ng-click="$root.editBlock=true" >{{\'TEMPLATE.BLOCK.EDIT\' | translate}}</div>' +
                '<div ng-if="$root.editBlock"  class="btn btn-primary" ng-click="$root.editBlock=false" >{{\'TEMPLATE.BLOCK.READONLY\' | translate}}</div>' +
                '<div ng-click="itBlockControlPanelController.addFile()" class="glyphicon glyphicon-plus block-btn template-add-block template-circle-btn "></div>' +
                '<div ng-click="itBlockControlPanelController.refresh()" class="glyphicon glyphicon-refresh template-circle-btn "></div>' +

                '</div>',
                controllerAs: 'itBlockControlPanelController',
                controller: ['$rootScope','$location','BlockService','itBlockNewPageModalService',
                    function ($rootScope,$location,BlockService,itBlockNewPageModalService) {
                        var self = this;

                        var currentPath = $location.absUrl();
                        this.isDistURL = currentPath.indexOf("dist") > 0;

                        this.refresh = function(){
                            BlockService.build.get(function () {
                                    location.reload();
                            }, function () {
                                $log.error("Unable to delete current block " + JSON.stringify(block))
                            });
                        };

                        this.addFile =  function(){
                            itBlockNewPageModalService.open();
                        };
                    }
                ]
            }
        }]
)
