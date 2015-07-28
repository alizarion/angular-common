"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:masterDetail
 * @module itesoft
 * @restrict EA
 *
 * @description
 * A container element for master-detail main content.
 *
 * To use master details directive, add an `<it-master-detail>` parent element. This will encompass all master details content,
 * and have 2 child elements: 1 `<it-master>` for the list selectable content,
 * and `<it-detail>` that display the content of the selected item.
 *
 * <table class="table">
 *  <tr>
 *   <td><code>masterDetail.getSelectedItems()</code></td>
 *   <td>Method to get selected items in the master grid.</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.getCurrentItem()</code></td>
 *   <td>Method to get the selected item that appear in the detail content.</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.undoChangeCurrentItem()</code></td>
 *   <td>Method to revert changes on the selected item.</td>
 *  </tr>
 * <tr>
 *   <td><code>masterDetail.getFilteredItems()</code></td>
 *   <td>Method to get displayed item after filter.</td>
 *  </tr>
 *  <tr>
 * <tr>
 *   <td><code>masterDetail.fillHeight()</code></td>
 *   <td>method refresh the master detail Height.</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.setCurrentItem(entity)</code></td>
 *   <td>Method to define the selected item, return promise</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.scrollToItem(itel)</code></td>
 *   <td>Method to scroll to the entity row.</td>
 *  </tr>
 *  <tr>
 *   <td><code>$scope.$broadcast('unlockCurrentItem')</code></td>
 *   <td>unlock the selected item from the editing mode.</td>
 *  </tr>
 *  <tr>
 *   <td><code>$scope.$broadcast('lockCurrentItem',unlockOnEquals)</code></td>
 *   <td>lock the selected item from the editing mode. unlockOnEquals : default true | auto unlock the item if the changed item is equals to the original selected item, if set to false only the $scope.$broadcast('unlockCurrentItem') can unlock it.</td>
 *  </tr>
 *  <tr>
 *   <td><code>grid.appScope.itAppScope</code></td>
 *   <td>access to your application scope from the master-detail context, mainly for template binding</td>
 *  </tr>
 * </table>
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="MasterDetailController">
 <it-master-detail >
 <it-master it-master-data="data" it-lang="'fr'" it-master-detail-control="masterDetails" it-lock-on-change="true" it-en>
 <it-master-header it-search-placeholder="Recherche" >
 <button class="btn btn-primary" title="Add" ng-disabled="currentItemWrapper.hasChanged" ng-click="addNewItem()"><span class="fa fa-plus fa-lg"></span></button>
 <button class="btn btn-danger" title="Delete" ng-disabled="currentItemWrapper.hasChanged" ng-click="deleteSelectedItems()"><span class="fa fa-trash fa-lg"></span></button>
 <button class="btn btn-success" ng-disabled="currentItemWrapper.hasChanged" title="Down"><span class="fa fa-chevron-down fa-lg"></span></button>
 <button class="btn btn-success" ng-disabled="currentItemWrapper.hasChanged" title="Up"><span class="fa fa-chevron-up fa-lg"></span></button>
 </it-master-header>
 </it-master>
 <it-detail>
 <it-detail-header>
 <button class="btn btn-warning" title="Save"  ng-disabled="!currentItemWrapper.hasChanged" ng-click="saveCurrentItem()">
 <span class="fa fa-floppy-o fa-lg"></span>
 </button>
 <button class=" btn btn-info" title="Check">
 <span class="fa fa-file-code-o fa-lg"></span>
 </button>
 <button class="btn btn-success" title="Undo" ng-click="undoChange()">
 <span class="fa fa-undo fa-lg"></span>
 </button>

 </it-detail-header>
 <it-detail-content>
 <div class="form-group">
 <input it-input type="text" class="form-control floating-label" id="priorityDescription"
 it-text="code"
 ng-model="currentItemWrapper.currentItem.code"
 name=""
 ng-required="true"/>
 </div>
 <div class="form-group">
 <input it-input type="text" class="form-control floating-label" id="priorityCategory"
 it-text="description"
 ng-model="currentItemWrapper.currentItem.description" name=""/>
 </div>
 <div class="form-group">
 <input type="checkbox"
 it-toggle
 ng-model="currentItemWrapper.currentItem.enabledde"
 it-text="tete"/>
 </div>
 </it-detail-content>
 </it-detail>
 </it-master-detail>
 </div>
 </file>
 <file name="controller.js">
  angular.module('itesoft-showcase')
    .controller('MasterDetailController', ['$scope', function($scope) {

                    $scope.data =
                       [
                            {
                                "code" : "Code 1",
                                "description": "Description 1",
                                "enabledde" : true
                            },
                            {
                                "code" : "Code 2",
                                "description": "Description 2",
                                "enabledde" : false
                            },
                            {
                                "code" : "Code 3",
                                "description": "Description 3",
                                "enabledde" : true
                            },
                            {
                                "code" : "Code 4",
                                "description": "Description 4",
                                "enabledde" : false
                            },
                            {
                                "code" : "Code 5",
                                "description": "Description 5",
                                "enabledde" : true
                            }
                        ];

                    $scope.masterDetails = {};

                    $scope.masterDetails = {
                        columnDefs : [{ field: 'code', displayName: 'My value 1',  width: '8%', sortable:true},
                            { field: 'description', displayName: 'My value 2',  width: '10%', sortable:true},
                            { field: 'enabledde', displayName: 'My value 3',   sortable:false}]

                    };

                    $scope.masterDetails.navAlert = {
                        text:'{{\'BUTTON_LANG_EN\' | translate}}',
                        title:'{{\'FOO\' | translate}}'
                    };

                    function _removeItems(items,dataList){
                        angular.forEach(items,function(entry){
                            var index = dataList.indexOf(entry);
                            dataList.splice(index, 1);
                        })
                    }

                    $scope.deleteSelectedItems = function(){
                        _removeItems($scope.masterDetails.getSelectedItems(), $scope.data);
                    };

                    $scope.saveCurrentItem = function(){
                        $scope.$broadcast('unlockCurrentItem');
                    };
                    $scope.undoChange = function(){
                        $scope.masterDetails.undoChangeCurrentItem();
                        $scope.masterDetails.fillHeight();
                    };

                    $scope.addNewItem = function(){
                        var newItem =  {
                            "code" : "Code " + ($scope.data.length+1) ,
                            "description": "Description " + ($scope.data.length+1),
                            "enabledde" : true
                        };
                        $scope.data.push(newItem);
                        $scope.masterDetails.setCurrentItem(newItem).then(function(success){
                            $scope.$broadcast('lockCurrentItem',false);
                        },function(error){

                        });
                    };

                    $scope.hasChanged = function(){
                        if($scope.masterDetails.getCurrentItemWrapper() != null){
                            return $scope.masterDetails.getCurrentItemWrapper().hasChanged;
                        } else {
                            return false;
                        }
                    }
                }]);
        </file>
     <file src="test.css" >
    </file>
  </example>
 */
IteSoft
    .directive('itMaster',function(){
        return {
            restrict : 'EA',
            require : '^itMasterDetail',
            transclude : true,
            scope : {
                itMasterData : '=',
                itLang:'=',
                itMasterDetailControl:'=',
                itLockOnChange: '='
            },
            template : '<div class="col-md-6" ng-open="refreshData()" ui-i18n="{{itLang}}">'+
                '<div class="jumbotron ">'+
                '<div class="row" ng-transclude>'+
                '</div>'+
                '<div class="row" >'+
                '<div class="col-md-12 it-master-detail-container">'+
                '<div ui-grid="gridOptions" ui-grid-selection ui-grid-grouping it-master-detail-auto-resize  ui-grid-move-columns class="it-master-detail-grid">' +
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>',
            controller : ['$scope',
                '$filter',
                '$q',
                '$timeout',
                'itPopup',
                '$templateCache',
                function ($scope,
                          $filter,
                          $q,
                          $timeout,
                          itPopup,
                          $templateCache){

                    $templateCache.put('ui-grid/uiGridHeaderCell', '<div ng-class="{ \'sortable\': sortable }"> <!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --> ' +
                        '<div class="ui-grid-cell-contents" col-index="renderIndex" title="TOOLTIP"> ' +
                        '<span>{{ col.displayName CUSTOM_FILTERS }}</span> ' +
                        '<span ui-grid-visible="col.sort.direction" ' +
                        'ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }"> &nbsp; ' +
                        '</span> </div> <div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader && col.colDef.enableColumnMenu !== false" ' +
                        'ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}"> <i class="fa fa-align-justify"></i>' +
                        ' </div> <div ui-grid-filter></div> </div>');

                    $templateCache.put('ui-grid/selectionRowHeaderButtons','<div class="it-master-detail-row-select"' +
                        ' ng-class="{\'ui-grid-row-selected\': row.isSelected}" ng-click="selectButtonClick(row, $event)">' +
                        '<input type="checkbox" tabindex="-1" ng-click="selectButtonClick(row, $event)"' +
                        ' ng-checked="row.isSelected">  </div>');

                    $templateCache.put('ui-grid/selectionSelectAllButtons','<div class="it-master-detail-select-all-header" ng-click="headerButtonClick($event)">' +
                        '<input type="checkbox" ' +
                        ' ng-change="headerButtonClick($event)" ng-model="grid.selection.selectAll"></div>')

                    function ItemWrapper(item){
                        this.originalItem = item;
                        this.currentItem = angular.copy(item);
                        this.hasChanged = false;
                        this.isWatched = false;
                        this.unlockOnEquals = true;
                    }

                    ItemWrapper.prototype.unlockCurrent = function(){
                        this.hasChanged = false;
                        this.isWatched = false;
                    };

                    ItemWrapper.prototype.lockCurrent = function(autoUnlock){
                        this.hasChanged = true;
                        this.isWatched = true;
                        this.unlockOnEquals = !autoUnlock;
                    };

                    $scope.$parent.currentItemWrapper = null;

                    function _selectionChangedHandler(){
                        if($scope.gridApi.selection.getSelectedRows().length > 1 ){
                            $scope.$parent.currentItemWrapper = null
                        } else if($scope.gridApi.selection.getSelectedRows().length === 1) {
                            _displayDetail($scope.gridApi.selection.getSelectedRows()[0]);
                            _scrollToEntity($scope.gridApi.selection.getSelectedRows()[0]);

                        }
                        else if($scope.gridApi.selection.getSelectedRows().length === 0) {
                            $scope.$parent.currentItemWrapper = null;
                        }
                    }

                    $scope.gridOptions  = {
                        rowHeight: 40,
                        multiSelect: true,
                        enableSelectAll: true,
                        showGridFooter: true,
                        enableMinHeightCheck :true,
                        enableColumnResizing: true,
                        enableHorizontalScrollbar : 0,
                        enableVerticalScrollbar : 2,
                        onRegisterApi : function(gridApi){
                        $scope.gridApi = gridApi;

                    },
                    gridFooterTemplate: '<div class="ui-grid-footer-info ui-grid-grid-footer"> ' +
                    '<span class="ngLabel badge ">{{"search.totalItems" |t}}  {{grid.appScope.itMasterData.length}}</span> ' +
                    '<span ng-show="grid.appScope.filterText.length > 0 && grid.appScope.itMasterData.length != grid.renderContainers.body.visibleRowCache.length" class="ngLabel badge alert-info ">{{"search.showingItems" |t}}  {{grid.renderContainers.body.visibleRowCache.length}}</span> ' +
                    '<span class="ngLabel badge">{{"search.selectedItems" | t}} {{grid.appScope.gridApi.selection.getSelectedRows().length}}</span>' +
                    '</div>',
                        rowTemplate: '<div ng-click="grid.appScope.onRowClick(col,row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell>' +
                    '</div>'
                };

        $scope.gridOptions.columnDefs =
            $scope.itMasterDetailControl.columnDefs;

        function _displayDetail(item) {
            var deferred = $q.defer();
            if($scope.$parent.currentItemWrapper != null){
                if($scope.$parent.currentItemWrapper.hasChanged){
                    deferred.reject('undo or save before change');
                    return deferred.promise;
                }
            }
            $scope.$parent.currentItemWrapper  = new ItemWrapper(item);
            deferred.resolve('');
            return deferred.promise;
        }


        $scope.$watch('$parent.currentItemWrapper.currentItem', function(newValue,oldValue){
            if($scope.$parent.currentItemWrapper != null && $scope.itLockOnChange ){
                if(!$scope.$parent.currentItemWrapper.isWatched)
                {
                    $scope.$parent.currentItemWrapper.isWatched = true;
                }
                if($scope.$parent.currentItemWrapper.unlockOnEquals){
                    $scope.$parent.currentItemWrapper.hasChanged =
                        !angular.equals(newValue,
                            $scope.$parent.currentItemWrapper.originalItem);
                } else {
                    $scope.$parent.currentItemWrapper.hasChanged = true;
                }
            }
        }, true);

        $scope.onRowClick = function(row,col) {
            //if (col.index > 0){ne fonctionne pas quand groupage
            if (col.entity != undefined &&
                (row.providedHeaderCellTemplate != 'ui-grid/selectionHeaderCell'&&
                    typeof row.providedHeaderCellTemplate != 'undefined' ) ){
                _displayDetail(col.entity).then(function(msg){
                    $scope.gridApi.selection.clearSelectedRows();
                    $scope.gridApi.selection.selectRow(col.entity);
                },function(msg){
                    itPopup.alert({
                        text: $scope.itMasterDetailControl.navAlert.text ,
                        title : $scope.itMasterDetailControl.navAlert.title
                    });
                });
            }
        };


        function _scrollToEntity(entity){
            $scope.gridApi.core.scrollTo(entity);
        }

        $scope.itMasterDetailControl.selectItem =function (item){
            $scope.onRowClick(null,{entity:item});
        };

        $scope.$watch('$scope.filterText',function(){
            $scope.refreshData();
        });

        $scope.refreshData = function() {
            $scope.gridOptions.data = $filter('filter')($scope.itMasterData, $scope.filterText, undefined);
        };

        function _unlockCurrent(){
            if($scope.$parent.currentItemWrapper!==null){
                $scope.$parent.currentItemWrapper.hasChanged = false;
                $scope.$parent.currentItemWrapper.isWatched = false;
            }
        }

        $scope.itMasterDetailControl.getCurrentItem = function(){
            return   $scope.$parent.currentItemWrapper.currentItem;
        };

        $scope.itMasterDetailControl.undoChangeCurrentItem = function(){
            if($scope.$parent.currentItemWrapper!= null){
                _displayDetail($scope.$parent.currentItemWrapper.originalItem)
                $scope.$parent.currentItemWrapper.currentItem =
                    angular.copy($scope.$parent.currentItemWrapper.originalItem);
                _unlockCurrent();
            }
        };

        $scope.$on('unlockCurrentItem',function(){
            _unlockCurrent();
        });

        /**
         * Method to scroll to specific item.
         * @param entity item to scroll to.
         */
        $scope.itMasterDetailControl.scrollToItem =function (entity){
            _scrollToEntity(entity);
        };

        /**
         * Method to get Selected items.
         * @returns {Array} of selected items
         */
        $scope.itMasterDetailControl.getSelectedItems = function(){
            return $scope.gridApi.selection.getSelectedRows();
        };

        /**
         * Method to get Current item.
         * @returns {$scope.$parent.currentItemWrapper.currentItem|*}
         * @deprecated
         */
        $scope.itMasterDetailControl.getCurrentItem = function(){
            return   $scope.$parent.currentItemWrapper.currentItem;
        };

        /**
         * Method to get Current item.
         * @returns {$scope.$parent.currentItemWrapper.currentItem|*}
         */
        $scope.itMasterDetailControl.getCurrentItemWrapper = function(){
            return   $scope.$parent.currentItemWrapper;
        };

        /**
         * Method to get filtered items.
         * @returns {Array} of filtered items.
         */
        $scope.itMasterDetailControl.getFilteredItems = function(){
            var rows = $scope.gridApi.core.getVisibleRows($scope.gridApi.grid);
            var entities  = [];
            angular.forEach(rows,function(row){
                entities.push(row.entity);
            });
            return entities;
        };


        /**
         * Method to select the current Item.
         * @param entity item to select.
         * @returns {deferred.promise|*} success if the item is found.
         */
        $scope.itMasterDetailControl.setCurrentItem = function(entity){

            var deferred = $q.defer();
            $scope.gridApi.selection.clearSelectedRows();
            _displayDetail(entity).then(function(){
                $timeout(function() {
                    var entityIndex = $scope.itMasterData.indexOf(entity);
                    if(entityIndex>=0) {
//                                    $scope.gridOptions.selectRow(
//                                        $scope.itMasterData.indexOf(entity), true);
                        $scope.gridApi.selection.selectRow(entity);
                        _scrollToEntity(entity);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }

                });
            },function(){
                deferred.reject();
            });
            return deferred.promise;
        };

        /**
         * Method to undo changes on the current item.
         */
        $scope.itMasterDetailControl.undoChangeCurrentItem = function(){
            if($scope.$parent.currentItemWrapper!= null){
                _displayDetail($scope.$parent.currentItemWrapper.originalItem)
                $scope.$parent.currentItemWrapper.currentItem =
                    angular.copy($scope.$parent.currentItemWrapper.originalItem);
                $scope.$parent.currentItemWrapper.unlockCurrent();
            }
        };

        /**
         * Method to fill windows height to the master part.
         */
        $scope.itMasterDetailControl.fillHeight = function(){
            //  evalLayout.fillHeight();
        };


        /**
         * Handler to unlock the current item.
         */
        $scope.$on('unlockCurrentItem',function(){
            $timeout(function(){
                $scope.$parent.currentItemWrapper.unlockCurrent();
            });
        });

        /**
         * Handler to lock the current item.
         */
        $scope.$on('lockCurrentItem',function(unlockOnEquals){
            $timeout(function(){
                $scope.$parent.currentItemWrapper.lockCurrent(unlockOnEquals);
            });
        });

        function confirmLeavePage(e) {
            if($scope.$parent.currentItemWrapper!=null){
                if ( $scope.$parent.currentItemWrapper.hasChanged ) {
                    itPopup.alert({
                        text: $scope.itMasterDetailControl.navAlert.text ,
                        title : $scope.itMasterDetailControl.navAlert.title
                    });
                    e.preventDefault();
                }
            }
        }
        $scope.itAppScope = $scope.$parent;
        $scope.myDiv = 'ttt';

        $scope.$on("$locationChangeStart", confirmLeavePage);
        $scope.itMasterDetailControl = angular.extend({navAlert:{
            text:'Please save or revert your pending change',
            title:'Unsaved changes'
        }}, $scope.itMasterDetailControl );
    }]

}
}).filter('itUIGridGlobalFilter',['$rootScope',function($rootScope) {
    return function(data, grid, query) {
        var matches = [];
        //no filter defined so bail
        if (query === undefined || query === '') {
            return data;
        }
        query = query.toLowerCase();
        var scope = $rootScope.$new(true);
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < grid.columnDefs.length; j++) {
                var dataItem = data[i];
                var fieldName = grid.columnDefs[j].field;
                var renderedData = dataItem[fieldName];
                // apply cell filter
                if (grid.columnDefs[j].cellFilter) {
                    scope.value = renderedData;
                    renderedData = scope.$eval('value | ' + grid.columnDefs[j].cellFilter);
                }
                //as soon as search term is found, add to match and move to next dataItem
                if (renderedData.toString().toLowerCase().indexOf(query) > -1) {
                    matches.push(dataItem);
                    break;
                }
            }
        }
        scope.$destroy();
        return matches;
    };
}] ).directive('itMasterDetailAutoResize', ['$timeout', 'gridUtil', function ($timeout, gridUtil) {
    return {
        require: 'uiGrid',
        scope: false,
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
            var prevGridWidth, prevGridHeight;

            function getDimensions() {
                prevGridHeight = gridUtil.elementHeight($elm);
                prevGridWidth = gridUtil.elementWidth($elm);
                angular.element(document.getElementsByClassName('it-master-detail-grid')).css('height','');

            }
            var resizeTimeoutId;
            function startTimeout() {
                clearTimeout(resizeTimeoutId);
                resizeTimeoutId = setTimeout(function () {
                    var newGridWidth = gridUtil.elementWidth($elm);
                    var ng_grid = angular.element(document.getElementsByClassName('it-master-detail-grid'))[0];
                    var grid_container = ng_grid.getBoundingClientRect();
                    var fullHeight =  window.innerHeight;
                    var gridHeight = fullHeight - grid_container.top;
                    var footerElement = angular.element(document.getElementsByClassName('it-master-detail-grid')[0].getElementsByClassName("ngFooterPanel"))[0];
                    var footerHeight = footerElement ? footerElement.getBoundingClientRect().height : 0;
                    var newGridHeight = gridHeight - footerHeight - 40  ;
                    if (newGridHeight !== prevGridHeight || newGridWidth !== prevGridWidth) {
                        uiGridCtrl.grid.gridHeight = newGridHeight;
                        uiGridCtrl.grid.gridWidth = newGridWidth;
                        $scope.$apply(function () {
                            uiGridCtrl.grid.refresh()
                                .then(function () {
                                    getDimensions();
                                    startTimeout();
                                });
                        });
                    }
                    else {
                        startTimeout();
                    }
                }, 250);
            }
            startTimeout();

            $scope.$on('$destroy', function() {
                clearTimeout(resizeTimeoutId);
            });
        }
    };
}]);