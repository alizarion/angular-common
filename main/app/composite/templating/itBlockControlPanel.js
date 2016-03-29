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
                '<div ng-click="itBlockControlPanelController.refresh()" class="glyphicon glyphicon-refresh template-circle-btn "></div>' +
                '<div ng-click="itBlockControlPanelController.editCSS()" class="glyphicon template-circle-btn template template-circle-text-btn">CS</div>' +
                '<div ng-click="itBlockControlPanelController.editJS()" class="glyphicon template-circle-btn template-circle-text-btn">JS</div>' +

                '</div>',
                controllerAs: 'itBlockControlPanelController',
                controller: ['$rootScope','$location','BlockService','itBlockFileModalService',
                    function ($rootScope,$location,BlockService,itBlockFileModalService) {
                        var self = this;

                        var currentPath = $location.absUrl();
                        this.isDistURL = currentPath.indexOf("dist") > 0;

                        this.refresh = function(){
                            BlockService.build.get(function () {
                                    location.reload();
                            }, function () {
                                $log.error("Unable to refresh " )
                            });
                        };
                        this.editJS =  function(){
                            itBlockFileModalService.open("JS");
                        };
                        this.editCSS =  function(){
                            itBlockFileModalService.open("CSS");
                        };
                    }
                ]
            }
        }]
)
