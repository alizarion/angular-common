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
 * GLOBAL.TEMPLATE.BLOCK.EDIT
 * GLOBAL.TEMPLATE.BLOCK.READONLY
 * GLOBAL.TEMPLATE.BLOCK.DELETE.TITLE
 * GLOBAL.TEMPLATE.BLOCK.DELETE.CONFIRM
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
                "REST_TEMPLATE_API_URL": "http://localhost:8082",
                "TEMPLATE_USER_AUTO_LOGIN": {login: "admin", password: "admin"},
                "ENABLE_TEMPLATE_EDITOR": false,
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
                //language=html
                template: '<div class="block-control-panel col-xs-12" ng-if="itBlockControlPanelController.CONFIG.ENABLE_TEMPLATE_EDITOR">' +
                '\n    <div class="col-xs-12"/>' +
                '\n    <div class="block-lists">\n        <div class=" btn btn-danger offline-editor" ng-if="!itBlockControlPanelController.editorIsOpen"\n             aria-label="Left Align">\n            <span class="fa fa-exclamation" aria-hidden="true"></span>\n            <a target="_blank" ng-href="{{CONFIG.TEMPLATE_EDITOR_URL}}">{{\'GLOBAL.TEMPLATE.BLOCK.OPEN_EDITOR\'|\n                translate}}</a>\n        </div>' +
                '<div class="row" style="margin-bottom: 10px;">'+
                '        <div ng-if="!itBlockControlPanelController.focusable" class="col-xs-12 block-control-panel-help">(Press Ctrl\n                and move your mouse over a block)\n            </div>' +
                '        <div ng-if="itBlockControlPanelController.focusable" class="col-xs-12 block-control-panel-help">(Release\n                Ctrl over an element to select it)\n            </div>' +
                '    </div>' +
                '<div>'+
                '<it-circular-btn ng-if="!$root.editSite" ng-click="$root.editSite=true"><i class="fa fa-pencil"></i>\n            </it-circular-btn>' +
                '<it-circular-btn ng-if="$root.editSite" ng-click="$root.editSite=false"><i class="fa fa-eye"></i>\n            </it-circular-btn>' +
                '<it-circular-btn ng-click="itBlockControlPanelController.refresh()"><i class="fa fa-refresh"></i>\n            </it-circular-btn>' +
                '<it-circular-btn ng-if="$root.autoRefreshTemplate" ng-click="$root.autoRefreshTemplate=false"><i\n                    class="fa fa-stop"></i></it-circular-btn>' +
                '<it-circular-btn ng-if="!$root.autoRefreshTemplate" ng-click="$root.autoRefreshTemplate=true"><i\n                    class="fa fa-play"></i></it-circular-btn>' +
                '<it-circular-btn><a ng-href="{{itBlockControlPanelController.url}}" target="_blank"><i\n                    class="fa fa-floppy-o"></i></a></it-circular-btn>' +
                '</div>'+
                '<div ng-if="$root.editSite" ng-repeat="block in itBlockControlPanelController.blocks | orderBy:\'-name\'"\n             ng-mouseover="itBlockControlPanelController.hilightBlock(block)"' +
                ' class="{{itBlockControlPanelController.getClass(block)}}">' +
                '<div class="block-lists-name">{{block.name}}</div>' +
                '<div class="block-lists-action">' +
                '<it-circular-btn ng-click="itBlockControlPanelController.addBlock(block)"><i class="fa fa-plus "></i>\n                </it-circular-btn>' +
                '<it-circular-btn ng-click="itBlockControlPanelController.editBlock(block)"><i class="fa fa-pencil"></i>\n                </it-circular-btn>' +
                '<it-circular-btn ng-if="block.removed" ng-click="itBlockControlPanelController.restoreBlock(block)"><i\n                        class="fa fa-eye"></i></it-circular-btn>' +
                '<it-circular-btn ng-if="!block.removed" ng-click="itBlockControlPanelController.deleteBlock(block)"><i\n                        class="fa fa-eye-slash block-btn"></i></it-circular-btn>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',

                controllerAs: 'itBlockControlPanelController',
                controller: ['$scope', '$rootScope', '$location', '$log', '$document', '$filter',
                    'BlockService', 'PilotSiteSideService', 'PilotService', 'CONFIG', 'itPopup', 'itNotifier',
                    function ($scope, $rootScope, $location, $log, $document, $filter,
                              BlockService, PilotSiteSideService, PilotService, CONFIG, itPopup, itNotifier) {
                        var self = this;
                        if (CONFIG.ENABLE_TEMPLATE_EDITOR) {
                            self.editorIsOpen = false;
                            self.CONFIG = CONFIG;
                            self.blocks = [];
                            self.url = CONFIG.REST_TEMPLATE_API_URL + '/api/rest/export/' + CONFIG.CURRENT_PACKAGE;
                            this.refresh = function () {
                                BlockService.build.get(function () {
                                    location.reload();
                                }, function (error) {
                                    itNotifier.notifyError({
                                        content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                        dismissOnTimeout: false
                                    }, error.data.body);
                                });
                            };
                            self.interval = 0;
                            _options();
                            PilotSiteSideService.on.pong = function (res) {
                                $log.debug("pong");
                                $scope.$applyAsync(function () {
                                    self.editorIsOpen = true;
                                    _options();
                                })
                            };

                            PilotSiteSideService.on.editorConnect = function (res) {
                                $log.debug("editorConnect");
                                $scope.$applyAsync(function () {
                                    self.editorIsOpen = true;
                                    _options();
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
                            self.editJS = function () {
                                $log.debug("edit JS");
                                PilotSiteSideService.fn.editPage({
                                    fileName: "js.blocks.js",
                                    fileType: "js",
                                    filePackage: CONFIG.CURRENT_PACKAGE
                                })
                            };
                            /**
                             *
                             */
                            self.editCSS = function () {
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
                            self.addFile = function () {
                                $log.debug("add File");
                                PilotSiteSideService.fn.createPage()
                            };

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
                        self.editBlock = function (block) {
                            $log.debug("edit block");
                            if (angular.isDefined(block.ref) && block.ref != '') {
                                PilotSiteSideService.fn.editBlock(block, $location.path());

                            } else {
                                var replaceBlock = BlockService.new(CONFIG.CURRENT_PACKAGE + '_replace' + block.name + "_" + $filter('date')(new Date(), "yyyyMMddHHmmss"), block.name, 'replace', block.content, CONFIG.CURRENT_ROLE, 1);
                                PilotSiteSideService.fn.createBlock(replaceBlock, $location.path());
                            }
                        };

                        /**
                         * Do add block action
                         * @param block
                         */
                        self.addBlock = function (block) {
                            if (angular.isDefined(block.name) && block.name != '') {
                                $log.debug("add block");
                                var addBlock = BlockService.new(CONFIG.CURRENT_PACKAGE + '_new_' + block.name + "_" + $filter('date')(new Date(), "yyyyMMddHHmmss"), block.name, 'before', '', CONFIG.CURRENT_ROLE, 1);
                                PilotSiteSideService.fn.createBlock(addBlock, $location.path());
                            }
                        };

                        /**
                         * Do restore block action
                         * @param block
                         */
                        self.restoreBlock = function (block) {
                            $log.debug("restore block");
                            BlockService.restore.get({'name': block.name}, function () {
                                BlockService.build.get(function () {
                                    BlockService.build.get(function () {
                                        if ($rootScope.autoRefreshTemplate) {
                                            location.reload();
                                        }
                                    }, function (error) {
                                        itNotifier.notifyError({
                                            content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                            dismissOnTimeout: false
                                        }, error.data.body);
                                    })
                                }, function (error) {

                                    itNotifier.notifyError({
                                        content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                        dismissOnTimeout: false
                                    }, error.data.body);
                                    $log.error("Unable to restore block " + JSON.stringify(block));
                                })
                            })
                        };

                        /**
                         * Do delete block action
                         * @param block
                         */
                        self.deleteBlock = function (block) {
                            $log.debug("delete block");
                            var confirmPopup = itPopup.confirm({
                                title: "{{'GLOBAL.TEMPLATE.BLOCK.DELETE.TITLE' | translate}}",
                                text: "{{'GLOBAL.TEMPLATE.BLOCK.DELETE.CONFIRM' | translate}}",
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

                            confirmPopup.then(function () {
                                BlockService.all.delete({name: block.name}, function () {
                                    BlockService.build.get(function () {
                                        if ($rootScope.autoRefreshTemplate) {
                                            location.reload();
                                        }
                                    }, function (error) {
                                        itNotifier.notifyError({
                                            content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                            dismissOnTimeout: false
                                        }, error.data.body);
                                    })
                                }, function (error) {
                                    itNotifier.notifyError({
                                        content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                        dismissOnTimeout: false
                                    }, error.data.body);
                                });
                            }, function () {
                                itNotifier.notifyError({
                                    content: "{{'GLOBAL.TEMPLACE.WS.BLOCK_DELETED_KO' | translate}}"
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
                        };


                        /**
                         * senf option to editor
                         * @private
                         */
                        function _options() {
                            PilotSiteSideService.fn.options({currentPackage: CONFIG.CURRENT_PACKAGE});
                        }

                    }
                ]
            }
        }
    ]
);
