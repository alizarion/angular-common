"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itMaster
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
 *   <td><code>masterDetail.getCurrentItemWrapper()</code></td>
 *   <td>Method to get the selected item wrapper that contain next attributes [originalItem ,currentItem, hasChanged ] .</td>
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
 *   <td><code>masterDetail.scrollToItem(item)</code></td>
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
                                    title:'{{\'FOO\' | translate}}',
                                    buttons : buttons: [
                                        {
                                            text:  '<span class="fa fa-floppy-o fa-lg"></span>',
                                            type:  'btn-warning',
                                            onTap: function() {
                                                $scope.saveCurrentItem();
                                                return true;
                                            }
                                        },
                                        {
                                            text: '<span  class="fa fa-file-code-o fa-lg"></span>',
                                            type: 'btn-primary',
                                            onTap: function () {
                                                $scope.saveCurrentItem();
                                                return true;

                                            }
                                        },
                                        {
                                            text: '<span class="fa fa-undo fa-lg"></span>',
                                            type: 'btn-success',
                                            onTap: function () {
                                                $scope.undoChange();
                                                return true;

                                            }
                                        }
                                    ]
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
 <file src="test.css">
 </file>
 </example>
 */
IteSoft
    .directive('itMaster',function(){
        return {
            restrict : 'EA',
            require : '^itMasterDetail',
            priority : -1,
            transclude : true,
            scope : {
                itMasterData : '=',
                itLang:'=',
                itMasterDetailControl:'=',
                itLockOnChange: '=',
                itNoDataMsg: '@',
                itNoDetailMsg:'@'
            },
            template : '<div  ng-show="($parent.$parent.activeState == \'master\')" class="it-master-detail-slide-right col-md-6 it-fill" ui-i18n="{{itLang}}">'+
                '<div class="row" ng-transclude>'+
                '</div>'+
                '<div class="row it-master-grid it-fill" >'+
                '<div class="col-md-12 it-master-detail-container it-fill">'+
                '<div ui-grid="gridOptions" ui-grid-selection ui-grid-resize-columns ui-grid-auto-resize  ui-grid-move-columns class="it-master-detail-grid it-fill">' +
                '<div class="it-watermark" ng-show="!gridOptions.data.length" >{{itNoDataMsg}}</div>'+
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
                '$route',
                '$window',
                function ($scope,
                          $filter,
                          $q,
                          $timeout,
                          itPopup,
                          $templateCache,
                          $route,
                          $window){

                    $templateCache.put('ui-grid/selectionRowHeaderButtons','<div class="it-master-detail-row-select"' +
                        ' ng-class="{\'ui-grid-row-selected\': row.isSelected}" >' +
                        '<input type="checkbox" ng-disabled="grid.appScope.$parent.currentItemWrapper.hasChanged" tabindex="-1" ' +
                        ' ng-checked="row.isSelected"></div>');

                    $templateCache.put('ui-grid/selectionSelectAllButtons','<div class="it-master-detail-select-all-header" ng-click="grid.appScope.$parent.currentItemWrapper.hasChanged ? \'return false\':headerButtonClick($event)">' +
                        '<input type="checkbox" ' +
                        ' ng-change="headerButtonClick($event)" ng-disabled="grid.appScope.$parent.currentItemWrapper.hasChanged" ng-model="grid.selection.selectAll"></div>');

                    function ItemWrapper(item){
                        var _self = this;
                        angular.forEach($scope.itMasterData,function(entry,index){

                            if(angular.equals(entry,item)) {
                                _self.index = index;
                            }
                        });
                        _self.originalItem = item;
                        _self.currentItem = angular.copy(item);
                        _self.hasChanged = false;
                        _self.isWatched = false;
                        _self.unlockOnEquals = true;
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

                    function _selectionChangedHandler(row){
                        if(!$scope.itMasterDetailControl.disableMultiSelect){
                            if($scope.gridApi.selection.getSelectedRows().length > 1 ){
                                $scope.$parent.currentItemWrapper = null;
                            } else if($scope.gridApi.selection.getSelectedRows().length === 1) {
                                _displayDetail($scope.gridApi.selection.getSelectedRows()[0]);
                                _scrollToEntity($scope.gridApi.selection.getSelectedRows()[0]);
                            }
                            else if($scope.gridApi.selection.getSelectedRows().length === 0) {
                                $scope.$parent.currentItemWrapper = null;
                            }
                        }else {
//                            _displayDetail(row.entity);
//                            _scrollToEntity(row.entity);
                        }
                    }

                    $scope.$parent.$itNoDetail = $scope.itNoDetailMsg;

                    $scope.$watch('itNoDetailMsg',function(){
                        $scope.$parent.$itNoDetail = $scope.itNoDetailMsg;

                    });

                    $scope.gridOptions  = {
                        rowHeight: 40,
                        data : $scope.itMasterData,
                        multiSelect: !$scope.itMasterDetailControl.disableMultiSelect,
                        enableSelectAll: !$scope.itMasterDetailControl.disableMultiSelect,
                        enableRowHeaderSelection:!$scope.itMasterDetailControl.disableMultiSelect,
                        showGridFooter: true,
                        enableMinHeightCheck :true,
                        enableColumnResizing: true,
                        enableHorizontalScrollbar : 0,
                        enableVerticalScrollbar : 2,
                        onRegisterApi : function(gridApi){
                            $scope.gridApi = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                                _selectionChangedHandler(row);
                            });
                            gridApi.selection.on.rowSelectionChangedBatch($scope,function(row){
                                _selectionChangedHandler(row);
                            });

                        },
                        gridFooterTemplate: '<div class="ui-grid-footer-info ui-grid-grid-footer"> ' +
                            '<span class="ngLabel badge ">{{"search.totalItems" |t}}  {{grid.appScope.itMasterData.length}}</span> ' +
                            '<span ng-show="grid.appScope.filterText.length > 0 && grid.appScope.itMasterData.length != grid.renderContainers.body.visibleRowCache.length" class="ngLabel badge alert-info ">{{"search.showingItems" |t}}  {{grid.renderContainers.body.visibleRowCache.length}}</span> ' +
                            '<span class="ngLabel badge">{{"search.selectedItems" | t}} {{grid.appScope.gridApi.selection.getSelectedRows().length}}</span>' +
                            '</div>',
                        rowTemplate: '<div ng-click="grid.appScope.onRowClick(col,row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell>' +
                            '</div>'
                    };

                    $scope.$watch('itMasterData',function(){
                        $scope.gridOptions.data = $scope.itMasterData;
                        if( typeof $scope.itMasterData === 'undefined' || $scope.itMasterData === null){
                            $scope.$parent.currentItemWrapper = null;
                        } else {
                            if( $scope.itMasterData.length === 0){
                                $scope.$parent.currentItemWrapper = null;
                            }
                        }

//                        $scope.$applyAsync(function(){
                        $scope.refreshData();
//                        })
                    },true);


                    if(typeof $scope.itMasterDetailControl.columnDefs !== 'undefined'){
                        angular.forEach($scope.itMasterDetailControl.columnDefs, function(columnDef){
                            columnDef['headerCellTemplate'] = '<div ng-class="{ \'sortable\': sortable }"> <!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --> ' +
                                '<div class="ui-grid-cell-contents" col-index="renderIndex" title="TOOLTIP"> ' +
                                '<span>{{ col.displayName CUSTOM_FILTERS }}</span> ' +
                                '<span ui-grid-visible="col.sort.direction" ' +
                                'ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }"> &nbsp; ' +
                                '</span> </div> <div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader && col.colDef.enableColumnMenu !== false" ' +
                                'ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}"> <i class="fa fa-align-justify"></i>' +
                                ' </div> <div ui-grid-filter></div> </div>';
                        },true)
                    }
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

                        if($scope.$parent.currentItemWrapper != null
                            && $scope.itLockOnChange ){
                            if(!$scope.$parent.currentItemWrapper.isWatched)
                            {
                                $scope.$parent.currentItemWrapper.isWatched = true;
                            }
                            if($scope.$parent.currentItemWrapper.unlockOnEquals){
                                $scope.$parent.currentItemWrapper.hasChanged =
                                    !angular.equals(newValue,
                                        $scope.$parent.currentItemWrapper.originalItem);
                            } else   {
                                $scope.$parent.currentItemWrapper.hasChanged = true;
                            }
                        }
                    }, true);

                    $scope.onRowClick = function(row,col) {
                        if (col.entity != undefined && typeof row.providedHeaderCellTemplate != 'undefined') {
                            _displayDetail(col.entity).then(function (msg) {
                                if (row.providedHeaderCellTemplate !== 'ui-grid/selectionHeaderCell') {
                                    $scope.gridApi.selection.clearSelectedRows();
                                    if ($scope.$parent.$parent.mobile) {
                                        $scope.$parent.$parent.goToDetail();
                                    }
                                }
                                $scope.gridApi.selection.toggleRowSelection(col.entity);
                            }, function (msg) {
                                itPopup.alert($scope.itMasterDetailControl.navAlert);
                                $scope.gridApi.selection.selectRow($scope.$parent.currentItemWrapper.originalItem);
                            });
                        }
                    };


                    function _scrollToEntity(entity){
                        $scope.gridApi.core.scrollTo(entity);
                    }

                    $scope.itMasterDetailControl.selectItem =function (item){
                        $scope.onRowClick(null,{entity:item});
                    };

                    $scope.$watch('filterText',function(){
                        $scope.refreshData();
                    },true);

                    /**
                     * Method to filter rows
                     */
                    $scope.refreshData = function() {
                        var renderableEntities = $filter('itUIGridGlobalFilter')
                        ($scope.itMasterData, $scope.gridOptions, $scope.filterText);
                        angular.forEach($scope.gridApi.grid.rows, function( row ) {
                            var match = false;
                            renderableEntities.forEach(function(entity){

                                if(angular.equals(row.entity,entity)){
                                    match  = true;
                                }
                            });
                            if ( !match ){
                                $scope.gridApi.core.setRowInvisible(row);
                            } else {
                                $scope.gridApi.core.clearRowInvisible(row);
                            }
                        });
                    };


                    function _unlockCurrent(){
                        $scope.$applyAsync(function(){
                            if($scope.$parent.currentItemWrapper!==null){
                                $scope.$parent.currentItemWrapper.hasChanged = false;
                                $scope.$parent.currentItemWrapper.isWatched = false;
                            }
                        });

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
                        if(typeof $scope.gridApi !== 'undefined' ) {
                            if (typeof $scope.gridApi.selection.getSelectedRows === 'function') {
                                return $scope.gridApi.selection.getSelectedRows();
                            }
                        }
                        return [];
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

                                    $scope.gridApi.selection.selectRow(entity);
                                    _scrollToEntity(entity);
                                    if( $scope.$parent.$parent.mobile){
                                        $scope.$parent.$parent.goToDetail();
                                    }
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
                                itPopup.alert( $scope.itMasterDetailControl.navAlert);
                                e.preventDefault();
                            }
                        }
                    }
                    $scope.itAppScope = $scope.$parent;

                    //  $scope.itAppScope.$navAlert = {};

                    $scope.itAppScope.$navAlert = $scope.itMasterDetailControl.navAlert;

                    var w = angular.element($window);
                    w.bind('resize', function () {
                        $scope.gridApi.core.handleWindowResize();
                    });

                    $scope.itMasterDetailControl.initState = true;
                    $scope.$on("$locationChangeStart", confirmLeavePage);
                    $scope.itMasterDetailControl = angular.extend({navAlert:{
                        text:'Please save or revert your pending change',
                        title:'Unsaved changes',
                        buttons: [
                            {
                                text: 'OK',
                                type: 'btn-info',
                                onTap: function () {
                                    return false;
                                }
                            }]
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
                    if(typeof renderedData !== 'undefined' && renderedData != null){
                        if (renderedData.toString().toLowerCase().indexOf(query) > -1) {
                            matches.push(dataItem);
                            break;
                        }
                    }
                }
            }
            scope.$destroy();
            return matches;
        };
    }] );
