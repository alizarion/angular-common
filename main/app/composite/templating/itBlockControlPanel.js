'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itBlockControlPanel
 * @module itesoft
 * @restrict E
 * @since 1.2
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
 <file name="config.json">

 {
       "CONFIG":{
       "REST_TEMPLATE_API_URL": "http://localhost:8082",
       "TEMPLATE_USER_AUTO_LOGIN": {"login": "admin", "password": "admin"},
       "ENABLE_TEMPLATE_EDITOR": true,
       "SKIP_LOGIN" : true,
       "CURRENT_PACKAGE" : "10-PS",
       "CURRENT_ROLE" : "PS",
       "VERSION": "v1"
       }
 }
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase',['itesoft','ngResource']).config(['itConfigProvider', function (itConfigProvider) {
			//configuration of default values
			itConfigProvider.defaultNamespace('CONFIG');
			itConfigProvider.allowOverride(true);
			itConfigProvider.configFile("config.json");
	}]).run(['itConfig', function (itConfig) {
	    //initialize itConfig
        itConfig.initialize();
    }]).controller('HomeCtrl',
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
                template: '<div class="block-control-panel col-xs-12" ng-if="itBlockControlPanelController.itConfig.get().ENABLE_TEMPLATE_EDITOR">' +
                '    <div class="col-xs-12"/>' +
                '    <div class="block-lists">        <div class=" btn btn-danger offline-editor" ng-if="!itBlockControlPanelController.editorIsOpen"             aria-label="Left Align">            <span class="fa fa-exclamation" aria-hidden="true"></span>            <a target="_blank" ng-href="{{itConfig.get().TEMPLATE_EDITOR_URL}}">{{\'GLOBAL.TEMPLATE.BLOCK.OPEN_EDITOR\'|                translate}}</a>        </div>' +
                '<div class="row" style="margin-bottom: 10px;">' +
                '        <div ng-if="!itBlockControlPanelController.focusable" class="col-xs-12 block-control-panel-help">(Press Ctrl                and move your mouse over a block)            </div>' +
                '        <div ng-if="itBlockControlPanelController.focusable" class="col-xs-12 block-control-panel-help">(Release                Ctrl over an element to select it)            </div>' +
                '    </div>' +
                '<div>' +
                '<it-circular-btn ng-if="!$root.editSite" ng-click="itBlockControlPanelController.editSite()">' +
                '   <i class="fa fa-pencil"></i>            ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="$root.editSite" ng-click="itBlockControlPanelController.viewSite()">' +
                '   <i class="fa fa-eye"></i>            ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-click="itBlockControlPanelController.refresh()">' +
                '   <i class="fa fa-refresh"></i>            ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="$root.autoRefreshTemplate" ng-click="$root.autoRefreshTemplate=false">' +
                '   <i class="fa fa-stop"></i>' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="!$root.autoRefreshTemplate" ng-click="$root.autoRefreshTemplate=true">' +
                '   <i class="fa fa-play"></i>' +
                '</it-circular-btn>' +
                '<it-circular-btn><a ng-href="{{itBlockControlPanelController.url}}" target="_blank">' +
                '<i class="fa fa-floppy-o"></i>' +
                '</a></it-circular-btn>' +
                '</div>' +
                '<div  ng-repeat="block in itBlockControlPanelController.blocks | orderBy:\'-name\'" ng-mouseover="itBlockControlPanelController.hilightBlock(block)" ng-mouseleave="itBlockControlPanelController.unHilightBlock(block)"' +
                ' class="{{itBlockControlPanelController.getClass(block)}}">' +
                '<div class="block-lists-name">{{block.name}}</div>' +
                '<div class="block-lists-action">' +
                '<it-circular-btn ng-click="itBlockControlPanelController.addBlock(block)">' +
                '   <i class="fa fa-plus "></i> ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-click="itBlockControlPanelController.editBlock(block)">' +
                '   <i class="fa fa-pencil"></i> ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="block.removed" ng-click="itBlockControlPanelController.restoreBlock(block)">' +
                '   <i class="fa fa-eye"></i>' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="!block.removed" ng-click="itBlockControlPanelController.deleteBlock(block)">' +
                '   <i class="fa fa-eye-slash block-btn"></i>' +
                '</it-circular-btn>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',

                controllerAs: 'itBlockControlPanelController',
                controller: ['$scope', '$rootScope', '$location', '$log', '$document', '$filter',
                    'BlockService', 'PilotSiteSideService', 'PilotService', 'itConfig', 'itPopup', 'itNotifier',
                    function ($scope, $rootScope, $location, $log, $document, $filter,
                              BlockService, PilotSiteSideService, PilotService, itConfig, itPopup, itNotifier) {
                        var self = this;
                        if (itConfig.get().ENABLE_TEMPLATE_EDITOR) {
                            self.editorIsOpen = false;
                            self.itConfig = itConfig;
                            self.blocks = [];
                            self.availableBlocks = [];
                            self.url = itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/export/' + itConfig.get().CURRENT_PACKAGE;
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

                            /**
                             * Wait WS before calling option
                             * @param response
                             */
                            PilotService.on.open = function (response) {
                                _options();
                            };

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

                            /*
                             We enable edit mode by default
                             */
                            $rootScope.editSite = true;
                            $rootScope.autoRefreshTemplate = true;

                            /*
                             * Capture du CTRL
                             */
                            $document.bind("keydown", function (event) {
                                if ($rootScope.editSite) {
                                    if (event.keyCode == 17 && !self.focusable) {
                                        $document.find("*").addClass("crosshair");
                                        self.focusable = true;
                                        self.init();
                                    }
                                }
                            });

                            /**
                             *
                             */
                            $document.bind("keyup", function (event) {
                                if ($rootScope.editSite) {
                                    if (event.keyCode == 17 && self.focusable) {
                                        $document.find("*").removeClass("crosshair");
                                        self.focusable = false;
                                    }
                                }
                            });


                            /**
                             * Call by block to register
                             */
                            $rootScope.$on("registerBlock", function (event, block) {
                                self.availableBlocks[block.name] = block;

                                block.element.bind('mouseenter', function (e) {
                                    $scope.$applyAsync(function () {
                                        self.selectBlock(block.name);
                                    });
                                });

                                block.element.bind('mouseleave', function (e) {
                                    $scope.$applyAsync(function () {
                                        self.unSelectBlock(block.name);
                                    });
                                });

                                self.blocks = [];
                                self.clearStyle();
                                self.hilightedBlock = undefined;
                            });

                            /**
                             * Init
                             */
                            self.init = function () {
                                self.blocks = [];
                                self.clearStyle();
                                self.hilightedBlock = undefined;
                            };

                            /*
                             * Catch event send when over block
                             */
                            self.selectBlock = function (blockName) {
                                var block = self.availableBlocks[blockName];
                                if (self.focusable && !self.exists(block)) {
                                    self.blocks.push(block)
                                }
                            };

                            /**
                             * Catch event send when leave block
                             */
                            self.unSelectBlock = function (blockName) {
                                var block = self.availableBlocks[blockName];
                                if (self.focusable && self.exists(block)) {
                                    self.blocks.splice(self.blocks.indexOf(block), 1);
                                }
                            };
                        }

                        /**
                         *
                         */
                        self.editSite = function () {
                            $rootScope.editSite = true;
                            self.clearStyle();
                        };

                        /**
                         *
                         */
                        self.viewSite = function () {
                            $rootScope.editSite = false;
                            self.clearStyle();
                            self.init();
                        };

                        /*
                         Do block edit action
                         */
                        self.editBlock = function (block) {
                            $log.debug("edit block");
                            if (angular.isDefined(block.ref) && block.ref != '') {
                                PilotSiteSideService.fn.editBlock(block, $location.path());

                            } else {
                                var replaceBlock = BlockService.new(itConfig.get().CURRENT_PACKAGE + '_replace' + block.name + "_" + $filter('date')(new Date(), "yyyyMMddHHmmss"), block.name, 'replace', block.content, itConfig.get().CURRENT_ROLE, 1);
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
                                var addBlock = BlockService.new(itConfig.get().CURRENT_PACKAGE + '_new_' + block.name + "_" + $filter('date')(new Date(), "yyyyMMddHHmmss"), block.name, 'before', '', itConfig.get().CURRENT_ROLE, 1);
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
                            if (angular.isDefined(block)) {
                                self.hilightedBlock = block;
                                self.clearStyle();
                                self.updateStyle(block.name);
                            }
                        };

                        self.unHilightBlock = function (block) {
                            if (angular.isDefined(block)) {
                                self.hilightedBlock = undefined;
                                self.clearStyle();
                            }
                        };

                        /**
                         * Update background selected style
                         * @param blockName
                         */
                        self.updateStyle = function (blockName) {
                            for (var name in self.availableBlocks) {
                                if (name == blockName) {
                                    self.availableBlocks[name].element.addClass("block-hilight");
                                }
                            }
                        };

                        /**
                         * Init style
                         */
                        self.clearStyle = function () {
                            for (var name in self.availableBlocks) {
                                var element = self.availableBlocks[name].element;

                                if (angular.isDefined(element)) {

                                    element.removeClass("block-removed");
                                    element.removeClass("block-hilight");
                                    element.css('display', '');

                                    if ($rootScope.editSite) {
                                        element.children().attr("disabled", false);
                                    }

                                    if (self.availableBlocks[name].removed) {
                                        if ($rootScope.editSite) {
                                            element.addClass("block-removed");
                                        } else {
                                            element.css('display', 'none');
                                        }
                                    }
                                }
                            }
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
                         * Block already exists
                         * @param block
                         * @returns {boolean}
                         */
                        self.exists = function (block) {
                            var find = false;
                            self.blocks.forEach(function (existingBlock) {
                                if (existingBlock.name == block.name) {
                                    find = true;
                                }
                            });
                            return find;
                        };

                        /**
                         * Send option to editor
                         * @private
                         */
                        function _options() {
                            PilotSiteSideService.fn.options({currentPackage: itConfig.get().CURRENT_PACKAGE});
                        }

                    }
                ]
            }
        }
    ]
);
