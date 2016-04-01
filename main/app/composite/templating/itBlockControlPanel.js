'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itBlockControlPanel
 * @module itesoft
 * @restrict E
 *
 * @description
 * The Control Panel Block widgets provides a way to activate it-block edition
 *
 * <h1>Translate</h1>
 * ```config
 * TEMPLATE.BLOCK.EDIT
 * TEMPLATE.BLOCK.READONLY
 * ```
 *
 * <h1>Config</h1>
 * ```config
 * CONFIG.REST_TEMPLATE_API_URL = template API URL
 * CONFIG.TEMPLATE_EDITOR_URL = template web editor url
 * ENABLE_TEMPLATE_EDITOR = true if you need to customize your web app
 * ```
 * 
 * 
 * ```html
 *   <it-block-control-panel ></it-block-control-panel>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
     <div>
     <it-block-control-panel></it-block-control-panel>
     </div>
 </file>
 <file name="Module.js">
     angular.module('itesoft-showcase',['ngResource','itesoft'])
     .constant("CONFIG", {
            "REST_TEMPLATE_API_URL": "http://localhost:8080/rest",
            "TEMPLATE_EDITOR_URL": "http://localhost:8080/",
            "ENABLE_TEMPLATE_EDITOR": true
            })
 </file>
 <file name="controller.js">
     angular.module('itesoft-showcase').controller('HomeCtrl',
     ['$scope','$rootScope',
     function($scope,$rootScope) {$rootScope.editSite=true;}]);
 </file>
 </example>
 */
IteSoft.directive('itBlockControlPanel',
    ['$log',
        function ($log) {
            return {
                restrict: 'EA',
                scope: true,
                template:
                '<div class="block-control-panel" ng-show="itBlockControlPanelController.CONFIG.ENABLE_TEMPLATE_EDITOR">' +
                '<div ng-if="!$root.editSite" class="btn btn-primary" ng-click="$root.editBlock=true" >{{\'TEMPLATE.BLOCK.EDIT\' | translate}}</div>' +
                '<div ng-if="$root.editSite"  class="btn btn-primary" ng-click="$root.editBlock=false" >{{\'TEMPLATE.BLOCK.READONLY\' | translate}}</div>' +
                '<div ng-click="itBlockControlPanelController.refresh()" class="glyphicon glyphicon-refresh template-circle-btn "></div>' +
                '<div ng-click="itBlockControlPanelController.editCSS()" class="glyphicon template-circle-btn template template-circle-text-btn">CS</div>' +
                '<div ng-click="itBlockControlPanelController.editJS()" class="glyphicon template-circle-btn template-circle-text-btn">JS</div> ' +
                '<div ng-click="itBlockControlPanelController.addFile()" class="glyphicon glyphicon-plus template-add-block template-circle-btn "></div>' +
                '<a ng-href="{{itBlockControlPanelController.url}}" target="_blank" class="glyphicon glyphicon-save-file template-circle-btn"></a>' +

                '</div>',
                controllerAs: 'itBlockControlPanelController',
                controller: ['$rootScope','BlockService','CONFIG',
                    function ($rootScope,BlockService,CONFIG) {
                        var self = this;

                        self.CONFIG = CONFIG;
                        this.refresh = function(){
                            BlockService.build.get(function () {
                                    location.reload();
                            }, function () {
                                $log.error("Unable to refresh " )
                            });
                        };
                        this.editJS =  function(){
                        };
                        this.editCSS =  function(){
                        };
                        this.addFile =  function(){
                        };
                    }
                ]
            }
        }]
);
