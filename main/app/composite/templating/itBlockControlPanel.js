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
 * REST_TEMPLATE_API_URL = template API URL
 * REST_EDITOR_API_URL = editor pilot API URL
 * TEMPLATE_EDITOR_URL = template web editor url
 * ENABLE_TEMPLATE_EDITOR = true if you need to customize your web app
 * ```
 *
 * ```html
 *   <it-block-control-panel ></it-block-control-panel>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div>
 <toast class="toaster" style="left:0px !important; bottom:0px !important"></toast>
 <it-block-control-panel></it-block-control-panel>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['ngResource','itesoft'])
 .constant("CONFIG", {
                "REST_TEMPLATE_API_URL": "http://localhost:8080/rest",
                "REST_EDITOR_API_URL": "http://localhost:8081/editor",
                "TEMPLATE_USER_AUTO_LOGIN": {login: "admin", password: "admin"},
                "ENABLE_TEMPLATE_EDITOR": true,
                "SKIP_LOGIN" : true,
                "CURRENT_PACKAGE" : "10-PS",
                "VERSION": "v1",
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
    [
        function () {
            return {
                restrict: 'EA',
                scope: true,
                template: '<div class="block-control-panel" ng-show="itBlockControlPanelController.CONFIG.ENABLE_TEMPLATE_EDITOR">' +
                '<div ng-if="itBlockControlPanelController.editorIsOpen"/> ' +
                '<div ng-if="!$root.editSite" class="btn btn-primary" ng-click="$root.editSite=true" >{{\'TEMPLATE.BLOCK.EDIT\' | translate}}</div>' +
                '<div ng-if="$root.editSite"  class="btn btn-primary" ng-click="$root.editSite=false" >{{\'TEMPLATE.BLOCK.READONLY\' | translate}}</div>' +
                '<div class="block-control-panel-action-container">' +
                '<it-circular-btn ng-click="itBlockControlPanelController.refresh()"><li class="fa fa-refresh"></li></it-circular-btn>' +
                '<it-circular-btn ng-if="$root.autoRefreshTemplate" ng-click="$root.autoRefreshTemplate=false"><li class="fa fa-stop"></li></it-circular-btn>' +
                '<it-circular-btn ng-if="!$root.autoRefreshTemplate" ng-click="$root.autoRefreshTemplate=true"><li class="fa fa-play"></li></it-circular-btn>' +
                /*
                '<div ng-click="itBlockControlPanelController.editCSS()" class=" fa fa-css3 template-circle-btn template "></div>' +
                '<div ng-click="itBlockControlPanelController.editJS()" class="fa fa-superscript template-circle-btn template-circle-text-btn"></div> ' +
                '<div ng-click="itBlockControlPanelController.addFile()" class="fa fa-plus template-add-block template-circle-btn "></div>' + */
                '<it-circular-btn><a ng-href="{{itBlockControlPanelController.url}}" target="_blank" ><li class="fa fa-floppy-o"></li></a></div>' +
                '<span class="block-control-panel-help">(Press Ctrl and move your mouse over a block to select it)</span>'+
                '</div>' +
                '<div class=" btn btn-danger offline-editor"  ng-if="!itBlockControlPanelController.editorIsOpen" aria-label="Left Align">' +
                '<span class="fa fa-exclamation glyphicon-align-left" aria-hidden="true"></span>' +
                '<a  target="_blank" ng-href="{{CONFIG.TEMPLATE_EDITOR_URL}}" >{{\'TEMPLATE.BLOCK.OPEN_EDITOR\' | translate}}</a>' +
                '</div>' +
                '<div class="block-lists"  ng-if="$root.editSite">' +
                '<div ng-repeat="block in itBlockControlPanelController.blocks | orderBy:\'-name\'" ng-mouseover="itBlockControlPanelController.hilightBlock(block)"' +
                ' class="{{itBlockControlPanelController.getClass(block)}}">' +
                '<div class="block-lists-name">{{block.name}}</div>' +
                '<div class="block-lists-action">' +
                '<it-circular-btn ng-click="itBlockControlPanelController.addBlock(block)"><li class="fa fa-plus "></li></it-circular-btn>' +
                '<it-circular-btn ng-click="itBlockControlPanelController.editBlock(block)"><li  class="fa fa-pencil"></li></it-circular-btn>' +
                '<it-circular-btn ng-if="block.removed" ng-click="itBlockControlPanelController.restoreBlock(block)"><li  class="fa fa-eye"></li></it-circular-btn>' +
                '<it-circular-btn ng-if="!block.removed" ng-click="itBlockControlPanelController.deleteBlock(block)"><li  class="fa fa-eye-slash block-btn"></li></it-circular-btn>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',

                controllerAs: 'itBlockControlPanelController',
                controller: ['$scope', '$rootScope', '$location','$log', '$document', '$filter',
                    'BlockService', 'PilotSiteSideService', 'PilotService', 'CONFIG', 'itPopup', 'itNotifier',
                    function ($scope, $rootScope, $location, $log, $document ,$filter,
                              BlockService, PilotSiteSideService, PilotService, CONFIG, itPopup,itNotifier) {
                        var self = this;

                        self.editorIsOpen = false;
                        self.CONFIG = CONFIG;
                        self.blocks = [];
                        self.url =  CONFIG.REST_TEMPLATE_API_URL + '/export/'+CONFIG.CURRENT_PACKAGE;
                        this.refresh = function () {
                            BlockService.build.get(function () {
                                    location.reload();
                            }, function (error) {
                                itNotifier.notifyError({
                                    content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                    dismissOnTimeout: false
                                },error);
                            });
                        };
                        self.interval = 0;
                        PilotSiteSideService.on.pong = function (res) {
                            $log.debug("pong");
                            $scope.$applyAsync(function () {
                                self.editorIsOpen = true;
                            })
                        };
                        PilotSiteSideService.on.editorConnect = function (res) {
                            $log.debug("editorConnect");
                            $scope.$applyAsync(function () {
                                self.editorIsOpen = true;
                            })
                        };
                        PilotSiteSideService.on.editorDisconnect = function (res) {
                            $log.debug("editorDisconnect");
                            $scope.$applyAsync(function () {
                                self.editorIsOpen = false;
                            })
                        };

                        PilotSiteSideService.on.close = function () {
                            $log.error("websocket api is deconnected, please restart APIs to enable connection");
                            $scope.$applyAsync(function () {
                                self.editorIsOpen = false;
                            })
                        };
                        PilotSiteSideService.on.error = function () {
                            $log.error("websocket api is deconnected, please restart APIs to enable connection");
                            $scope.$applyAsync(function () {
                                self.editorIsOpen = false;
                            })
                        };
                        PilotSiteSideService.on.transportFailure = function () {
                            $log.error("websocket api is deconnected, please restart APIs to enable connection");
                            $scope.$applyAsync(function () {
                                self.editorIsOpen = false;
                            })
                        };

                        PilotSiteSideService.on.reload = this.refresh;

                        /**
                         *
                         */
                        this.editJS = function () {
                            $log.debug("edit JS");
                            PilotSiteSideService.fn.editPage({fileName: "js.blocks.js", fileType: "js", filePackage: CONFIG.CURRENT_PACKAGE})
                        };
                        /**
                         *
                         */
                        this.editCSS = function () {
                            $log.debug("edit CSS");
                            PilotSiteSideService.fn.editPage({
                                fileName: "css.blocks.css",
                                fileType: "css",
                                filePackage: CONFIG.CURRENT_PACKAGE
                            })
                        };
                        /**
                         *
                         */
                        this.addFile = function () {
                            $log.debug("add File");
                            PilotSiteSideService.fn.createPage()
                        };

                        if(CONFIG.ENABLE_TEMPLATE_EDITOR) {
                            /*
                            We enable edit mode by default
                             */
                            $rootScope.editSite = true;
                            $rootScope.autoRefreshTemplate = true;

                            /*
                             Capture du CTRL
                             */
                            $document.bind("keydown", function (event) {
                                if (event.keyCode == 17 && !self.focusable) {
                                    $document.find("*").addClass("crosshair");

                                    $log.log("keydown");
                                    self.focusable = true;
                                    self.blocks = [];
                                    self.hilightedBlock = undefined;
                                    self.hilightBlock(undefined);
                                }
                            });

                            /**
                             *
                             */
                            $document.bind("keyup", function (event) {
                                if (event.keyCode == 17 && self.focusable) {
                                    $log.log("keyup");
                                    $document.find("*").removeClass("crosshair");
                                    self.focusable = false;
                                }
                            });

                            /*
                             Catch event send when over block
                             */
                            $rootScope.$on("selectBlock", function (event, block) {
                                if (self.focusable && self.blocks.indexOf(block) == -1) {
                                    self.blocks.push(block)
                                }
                            });

                            /**
                             Catch event send when leave block
                             */
                            $rootScope.$on("unSelectBlock", function (event, block) {
                                if (self.focusable && self.blocks.indexOf(block) != -1) {
                                    self.blocks.splice(self.blocks.indexOf(block), 1);
                                }
                            });
                        }

                        /*
                         Do block edit action
                         */
                        this.editBlock = function (block) {
                            $log.debug("edit block");
                            if (angular.isDefined(block.ref) && block.ref != '') {
                                PilotSiteSideService.fn.editBlock(block, $location.path());

                            } else {
                                var replaceBlock = BlockService.new('PS_replace' + block.name, block.name, 'replace', block.content, 'PS', 1);
                                PilotSiteSideService.fn.createBlock(replaceBlock, $location.path());
                            }
                        };

                        /**
                         * Do add block action
                         * @param block
                         */
                        this.addBlock = function (block) {
                            if (angular.isDefined(block.name) && block.name != '') {
                                $log.debug("add block");
                                var addBlock = BlockService.new('PS_new_' + block.name, block.name, 'before', '', 'PS', 1);
                                PilotSiteSideService.fn.createBlock(addBlock, $location.path());
                            }
                        };

                        /**
                         * Do restore block action
                         * @param block
                         */
                        this.restoreBlock = function (block) {
                            $log.debug("restore block");
                            BlockService.restore.get({'name': block.name}, function () {
                                BlockService.build.get(function () {
                                    BlockService.build.get(function () {
                                        if($rootScope.autoRefreshTemplate) {
                                            location.reload();
                                        }
                                    }, function (error) {
                                        itNotifier.notifyError({
                                                content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                                dismissOnTimeout: false
                                            },error);
                                    })
                                }, function (error) {

                                    itNotifier.notifyError({
                                        content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                        dismissOnTimeout: false
                                    },error);
                                    $log.error("Unable to restore block " + JSON.stringify(block));
                                })
                            })
                        };

                        /**
                         * Do delete block action
                         * @param block
                         */
                        this.deleteBlock = function (block) {
                            $log.debug("delete block");
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
                                BlockService.all.delete({name: block.name}, function () {
                                    BlockService.build.get(function () {
                                        if($rootScope.autoRefreshTemplate) {
                                            location.reload();
                                        }
                                    }, function (error) {
                                        itNotifier.notifyError({
                                            content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                            dismissOnTimeout: false
                                        },error);
                                    })
                                }, function (error) {
                                    itNotifier.notifyError({
                                        content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                        dismissOnTimeout: false
                                    },error);
                                });
                            }, function () {
                                itNotifier.notifyError({
                                    content: "{{'BLOCK_DELETED_KO' | translate}}"
                                });
                            });
                        };

                        /**
                         * Do hilight block action (means that user click on block name inside control panel)
                         * @param block
                         */
                        self.hilightBlock = function (block) {
                            self.hilightedBlock = block;
                            $rootScope.$emit("hilightBlock", block);
                        };

                        /**
                         * Return class to use to display block name
                         * @param block
                         * @returns {*}
                         */
                        self.getClass = function (block) {
                            if (self.hilightedBlock && self.hilightedBlock.name == block.name) {
                                return "block-lists-element-hilight";
                            } else {
                                return "";
                            }
                        }

                    }
                ]
            }
        }
    ]
);
