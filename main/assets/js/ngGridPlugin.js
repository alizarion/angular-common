function ngGridFullHeight(stopContainerClassName) {
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
    function _updateGridLayout() {
        if (self.scope != null) {

            self.scope.$evalAsync(function () {
                self.domUtilityService.RebuildGrid(self.scope, self.grid);
            });
        }
    }

    this.updateGridLayout =_updateGridLayout;

    this.init = function (scope, grid, services) {
        self.domUtilityService = services.DomUtilityService;
        self.grid = grid;
        self.scope = scope;

        var setGridHeightToFull = function () {
            setTimeout(gridHeightToFull, 50);
        };
        scope.$watch(grid.config.data, setGridHeightToFull);
        self.scope.$on('it-sidemenu-state', function (event, state) {

            _updateGridLayout();//angular.element(window).resize();
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

        var margin = 20;
        if(self.grid == null){
            return;
        }
        var gridId = self.grid.gridId;
        if (document.getElementsByClassName(gridId)[0] === undefined) {
            return;
        }
        var ng_grid = angular.element(document.getElementsByClassName(gridId))[0];
        //TODO fix margin on dist
        // margin = self.computeMargin(ng_grid, directions.bottom);
        //margin = isNaN(margin) ? 0 : margin;
        var grid_container = ng_grid.getBoundingClientRect();
        var fullHeight =  window.innerHeight;
        self.gridHeight = fullHeight - grid_container.top;
        var footerElement = angular.element(document.getElementsByClassName(gridId)[0].getElementsByClassName("ngFooterPanel"))[0];
        var footerHeight = footerElement ? footerElement.getBoundingClientRect().height : 0;
        var extraHeight = self.grid.$topPanel.height() + footerHeight;
        var height = (self.gridHeight - extraHeight - 2 * margin) + 'px' ;
        if (!event) {
            self.pluginGridEvents();
        }
        //console.log(footerHeight,height,fullHeight);
        self.grid.$viewport.css('height', height );
       // self.grid.$canvas.css('height', height);
    };
}