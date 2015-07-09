'use strict';

IteSoft
    .factory('itNgGridPlugins', ['$rootScope','$window', function ($rootScope,$window) {
        return {

            fullHeight: function (stopContainerClassName) {
                var directions = {
                    left: "left",
                    up: "up",
                    right: "right",
                    bottom: "bottom"
                };

                var self = this;
                this.stopClass = stopContainerClassName || "container-fluid";
                this.grid = null;
                this.scope = null;
                this.groupingWatch = null;
                this.gridHeight = 0;
                this.init = function (scope, grid, services) {
                    self.domUtilityService = services.DomUtilityService;
                    self.grid = grid;
                    self.scope = scope;

                    var setGridHeightToFull = function () {
                        setTimeout(gridHeightToFull, 50);
                    };
                    scope.$watch(grid.config.data, setGridHeightToFull);
                    $rootScope.$on('it-sidemenu-state', function (event, state) {
                        angular.element($window).resize();
                    });

                    scope.$on("$destroy", function (event) {
                        if (self.groupingWatch) {
                            self.groupingWatch();
                        }
                        var plugins = self.grid.config.plugins;
                        if (plugins) {
                            for (var i = 0; i < plugins.length; i++) {
                                if (self.config)
                                    self.config.plugins[i].dispose();
                            }
                            grid.config.plugins = [];
                        }
                    });
                };

                this.updateGridLayout = function () {
                    self.scope.$evalAsync(function(){
                        self.domUtilityService.RebuildGrid(self.scope, self.grid);
                    });
                };

                this.dispose = function () {
                    angular.element($window).unbind('resize');
                    self.grid.$groupPanel.unbind('drop');
                };

                this.computeMargin = function (domElement, direction) {
                    var $$parent = angular.element(domElement).parent();
                    if ($$parent[0].nodeName.indexOf('BODY') >= 0) {
                        return 0;
                    }

                    if ($$parent.hasClass(this.stopClass)) {
                        var computed = parseInt($$parent.css('margin-' + direction), 10);
                        return (isNaN(computed) ? parseInt(computed) : computed);
                    }
                    else {
                        var computed = parseInt($$parent.css('margin-' + direction), 10);
                        var thisMargin = (isNaN(computed) ? parseInt(computed, 10) : computed);
                        return thisMargin + self.computeMargin($$parent, direction);
                    }
                };

                this.pluginGridEvents = function () {
                    angular.element(window).bind('resize', function () {
                        gridHeightToFull('resize');
                    });

                    if (self.grid.config.showGroupPanel) {

                        self.grid.$groupPanel.bind('drop', self.onHeaderDrop);
                    }

                    self.scope.$watch(function () {
                            return self.grid.filteredRows.length;
                        },
                        function (newVal, oldVal) {
                            if (!angular.equals(newVal, oldVal) && self.scope.$$phase) {
                                gridHeightToFull('filteringChanged');
                            }
                        }, false);
                };

                this.onHeaderDrop = function (event) {
                    if (!self.groupingWatch) {
                        self.groupingWatch = self.scope.$watch(function () {
                                return self.grid.config.groups.length;
                            },
                            function (newVal, oldVal) {
                                if (!angular.equals(newVal, oldVal) && self.scope.$$phase) {
                                    gridHeightToFull('groupingChanged');
                                }
                            }, false);
                        gridHeightToFull('drop');
                    }
                };

                var gridHeightToFull = function (event) {

                    var margin = 0;
                    var gridId = self.grid.gridId;
                    if (document.getElementsByClassName(gridId)[0] === undefined) {
                        return;
                    }
                    var ng_grid = angular.element(document.getElementsByClassName(gridId))[0];
                    margin = self.computeMargin(ng_grid, directions.bottom);
                    margin = isNaN(margin) ? 0 : margin;
                    var grid_container = ng_grid.getBoundingClientRect();
                    var fullHeight =  angular.element($window).height();
                    self.gridHeight = fullHeight - grid_container.top;
                    var footerElement = angular.element(document.getElementsByClassName(gridId)[0].getElementsByClassName("ngFooterPanel"))[0];
                    var footerHeight = footerElement ? footerElement.getBoundingClientRect().height : 0;
                    var extraHeight = self.grid.$topPanel.height() + footerHeight;
                    var height = (self.gridHeight - extraHeight - 2 * margin) + 'px' ;
                    if (!event) {
                        self.pluginGridEvents();
                    }
                    console.log(height, extraHeight,footerHeight, fullHeight,self.gridHeight , event);
                    self.grid.$viewport.css('height', height );
                };
            },
            reorderableRows: function () {
                var self = this;
                self.$scope = null;
                self.myGrid = null;

                // The init method gets called during the ng-grid directive execution.
                self.init = function (scope, grid, services) {
                    // The directive passes in the grid scope and the grid object which we will want to save for manipulation later.
                    self.$scope = scope;
                    self.myGrid = grid;
                    self.services = services;
                    // In this example we want to assign grid events.
                    self.assignEvents();
                };
                self.colToMove = undefined;
                self.groupToMove = undefined;
                self.assignEvents = function () {
                    // Here we set the onmousedown event handler to the header container.
                    self.myGrid.$viewport.on('mousedown', self.onRowMouseDown).on('dragover', self.dragOver).on('drop', self.onRowDrop);
                };
                // Row functions
                self.onRowMouseDown = function (event) {
                    // Get the closest row element from where we clicked.
                    var targetRow = $(event.target).closest('.ngRow');
                    // Get the scope from the row element
                    var rowScope = angular.element(targetRow).scope();
                    if (rowScope) {
                        // set draggable events
                        targetRow.attr('draggable', 'true');
                        // Save the row for later.
                        self.services.DomUtilityService.eventStorage.rowToMove = {
                            targetRow: targetRow,
                            scope: rowScope
                        };
                    }

                };
                self.onRowDrop = function (event) {
                    // Get the closest row to where we dropped
                    var targetRow = $(event.target).closest('.ngRow');
                    // Get the scope from the row element.
                    var rowScope = angular.element(targetRow).scope();
                    if (rowScope) {
                        // If we have the same Row, do nothing.
                        var prevRow = self.services.DomUtilityService.eventStorage.rowToMove;
                        if (prevRow.scope.row === rowScope.row) {
                            return;
                        }
                        // Do nothing if row's parent grid is different from the target grid
                        if (prevRow.scope.$parent.gridId != self.myGrid.gridId) {
                            return;
                        }

                        self.changeRowOrder(prevRow.scope.row, rowScope.row);
                        self.myGrid.searchProvider.evalFilter();
                        // clear out the rowToMove object
                        self.services.DomUtilityService.eventStorage.rowToMove = undefined;
                        // if there isn't an apply already in progress lets start one
                        self.services.DomUtilityService.digest(rowScope.$root);
                    }
                };
                self.changeRowOrder = function (prevRow, targetRow) {
                    // Splice the Rows via the actual datasource
                    var i = self.myGrid.rowCache.indexOf(prevRow.orig);
                    var j = self.myGrid.rowCache.indexOf(targetRow.orig);
                    self.myGrid.rowCache.splice(i, 1);
                    self.myGrid.rowCache.splice(j, 0, prevRow.orig);
                    self.$scope.$emit('ngGridEventChangeOrder', self.myGrid.rowCache);
                };
                self.dragOver = function (evt) {
                    evt.preventDefault();
                };
            }
        }
    }]);