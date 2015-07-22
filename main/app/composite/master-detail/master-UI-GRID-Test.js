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
 *   <td><code>$itAppScope</code></td>
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
            template : '<div class="col-md-4" ng-open="refreshData()" ui-i18n="{{itLang}}">'+
                '<div class="jumbotron">'+
                '<div class="row" ng-transclude>'+
                '</div>'+
                '<div class="row">'+
                '<div class="col-md-12">'+
                '<div ui-grid="gridOptions" ui-grid-selection  class="grid">' +
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

                    $templateCache.put('ui-grid/selectionSelectAllButtons',
                        "<input type=\"checkbox\" width=\"10px\"   ng-disabled=\"grid.appScope.$parent.currentItemWrapper.hasChanged\" height=\"10px\"  ng-checked='grid.selection.selectAll'  ng-click=\"headerButtonClick($event)\">"
                    );
                    $templateCache.put('ui-grid/selectionRowHeaderButtons',
                        "<input  type=\"checkbox\" width=\"10px\" ng-disabled=\"grid.appScope.$parent.currentItemWrapper.hasChanged\" height=\"10px\" ng-checked='row.isSelected'   ng-click=\"selectButtonClick(row, $event)\">"
                    );

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

                    $scope.gridOptions  = {
                        rowHeight: 40,
                        multiSelect: true,
                        enableSelectAll :true,
                        enableRowSelection : true,
                        showGridFooter: true,
                        onRegisterApi: function(gridApi){
                            $scope.gridApi = gridApi;
//                        gridApi.selection.on.rowSelectionChanged($scope,function(rows){
//                            console.log('rowSelectionChanged');
//                            $scope.selectedItems = gridApi.selection.getSelectedRows();
//                        });
                        },
                        gridFooterTemplate: '<div class="ui-grid-footer-info ui-grid-grid-footer">' +
                            '<span class="ngLabel badge alert-info">{{"search.selectedItems" | t}} {{grid.selection.selectedCount}}/{{grid.renderContainers.body.visibleRowCache.length}}</span>' +
                            '</div>',
                        rowTemplate: '<div ng-click="grid.appScope.onRowClick(col,row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell>' +
                            '</div>'
                    };

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
                        console.log(col);
                        if (col.entity != undefined){
                            _displayDetail(row.entity).then(function(msg){
                                $scope.gridApi.selection.selectAllRows(false);
                            },function(msg){
                                itPopup.alert({
                                    text: $scope.itMasterDetailControl.navAlert.text ,
                                    title : $scope.itMasterDetailControl.navAlert.title
                                });
                            });
                        }
                    };

                    $scope.itMasterDetailControl.selectItem =function (item){
                        $scope.onRowClick(null,{entity:item});
                    };


                    $scope.refreshData = function() {
                        $scope.gridOptions.data =
                            $filter('filter')($scope.itMasterData,
                                $scope.filterText, undefined);
                    };

                    function _unlockCurrent(){
                        if($scope.$parent.currentItemWrapper!==null){
                            $scope.$parent.currentItemWrapper.hasChanged = false;
                            $scope.$parent.currentItemWrapper.isWatched = false;
                        }
                    }

                    $scope.itMasterDetailControl.getSelectedItems = function(){
                        return $scope.gridApi.selection.getSelectedRows();
                    };

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
                        $scope.gridApi.selection.getSelectedRows();
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
                        var entities = [];
                        angular.forEach($scope.gridOptions.ngGrid.filteredRows,
                            function(row){
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
                        $scope.gridOptions.selectAll(false);
                        _displayDetail(entity).then(function(){
                            $timeout(function() {
                                var entityIndex = $scope.itMasterData.indexOf(entity);
                                if(entityIndex>=0) {
                                    $scope.gridOptions.selectRow(
                                        $scope.itMasterData.indexOf(entity), true);
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

                    $scope.$on("$locationChangeStart", confirmLeavePage);


                    $scope.$on("$locationChangeStart", confirmLeavePage);
                    $scope.itMasterDetailControl = angular.extend({navAlert:{
                        text:'Please save or revert your pending change',
                        title:'Unsaved changes'
                    }}, $scope.itMasterDetailControl );
                }]

        }
    });