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
                        };

                        $scope.addNewItem = function(){
                            var newItem =  {
                                "code" : "Code " + ($scope.data.length+1) ,
                                "description": "Description " + ($scope.data.length+1),
                                "enabledde" : true
                            };
                            $scope.data.push(newItem);
                            $scope.masterDetails.setCurrentItem(newItem).then(function(success){
                                $scope.$broadcast('lockCurrentItem');
                            },function(error){

                            });
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
            template : '<div class="col-md-6 " ui-i18n="{{itLang}}">'+
                '<div class="jumbotron ">'+
                '<div class="row" ng-transclude>'+
                '</div>'+
                '<div class="row " style="clear: both;">'+
                '<div class="col-md-12 it-master-detail-container">'+
                ' <div ng-grid="gridOptions"  class="it-master-detail-grid">' +
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>',
            controller : ['$scope','$filter','$q','$timeout','itPopup', function ($scope,$filter,$q,$timeout,itPopup){

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

                var evalLayout = new  ngGridFullHeight();
                $timeout(function(){
                    evalLayout.updateGridLayout();
                });

                $scope.gridOptions  = {
                    data: 'itMasterData',
                    selectedItems: [],
                    rowHeight: 40,
                    i18n: $scope.itLang,
                    enableColumnResize: true,
                    multiSelect: true,
                    enableRowSelection: true,
                    filterOptions: {
                        filterText: '', useExternalFilter: false
                    },
                    showGroupPanel: true,
                    showSelectionCheckbox: true,
                    beforeSelectionChange: function() {
                        if($scope.$parent.currentItemWrapper != null) {
                            return !$scope.$parent.currentItemWrapper.hasChanged;
                        }else {
                            return true;
                        }
                    },
                    showFooter: true,
                    checkboxCellTemplate : '<div class="ngSelectionCell">'+
                        '<input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" ng-disabled="hasChanged()"/>'+
                        '</div>',
                    checkboxHeaderTemplate:'<input class="ngSelectionHeader" type="checkbox" ng-show="multiSelect" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"  ng-disabled="hasChanged()"/>',

                    rowTemplate:'<div ng-mouseenter="row.mouseover = true" ng-mouseleave="row.mouseover = false">'+
                        '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns"  ng-class="{ selected: row.selected, hovered: row.mouseover}"  ng-click="onRowClick(row,col)" class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-attr-id="{{\'row\'+row.rowIndex}}">'+
                        '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">'+
                        '</div>'+
                        '<div ng-attr-id="{{\'cell-r\'+row.rowIndex+\'c\'+col.index}}" ng-cell>'+
                        '</div>'+
                        '</div>'+
                        '</div>',
                    footerTemplate : '<div id="priorityFooter" ng-show="showFooter" class="ngFooterPanel" ng-class="{\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}" ng-style="footerStyle()"> <div class="ngTotalSelectContainer"> <div class="ngFooterTotalItems" ng-class="{\'ngNoMultiSelect\': !multiSelect}"> <span class="ngLabel badge ">{{i18n.ngTotalItemsLabel}}  {{maxRows()}}</span> <span ng-show="filterText.length > 0 && maxRows()!= totalFilteredItemsLength()" class="ngLabel badge badge-warning">{{i18n.ngShowingItemsLabel}}  {{totalFilteredItemsLength()}}</span> <span ng-show="multiSelect" class="ngLabel badge badge-warning">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span> </div></div> <div class="ngPagerContainer" style="float: right; margin-top: 10px;" ng-show="enablePaging" ng-class="{\'ngNoMultiSelect\': !multiSelect}"><div style="float:left; margin-right: 10px;" class="ngRowCountPicker">               <span style="float: left; margin-top: 3px;" class="ngLabel">{{i18n.ngPageSizeLabel}}</span><select style="float: left;height: 27px; width: 100px" ng-model="pagingOptions.pageSize">                   <option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>               </select>           </div>           <div style="float:left; margin-right: 10px; line-height:25px;" class="ngPagerControl"                style="float: left; min-width: 135px;">               <button class="ngPagerButton" ng-click="pageToFirst()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerFirstTitle}}"> <div class="ngPagerFirstTriangle"> <div class="ngPagerFirstBar"></div> </div></button>  <button class="ngPagerButton" ng-click="pageBackward()" ng-disabled="cantPageBackward()"  title="{{i18n.ngPagerPrevTitle}}">  <div class="ngPagerFirstTriangle ngPagerPrevTriangle"></div>  </button>  <input class="ngPagerCurrent" min="1" max="{{maxPages()}}" type="number"  style="width:50px; height: 24px; margin-top: 1px; padding: 0 4px;"  ng-model="pagingOptions.currentPage"/> <button class="ngPagerButton" ng-click="pageForward()" ng-disabled="cantPageForward()"   title="{{i18n.ngPagerNextTitle}}">  <div class="ngPagerLastTriangle ngPagerNextTriangle"></div> </button> <button class="ngPagerButton" ng-click="pageToLast()" ng-disabled="cantPageToLast()" title="{{i18n.ngPagerLastTitle}}"> <div class="ngPagerLastTriangle">  <div class="ngPagerLastBar"></div>  </div> </button> </div> </div> </div>',
                    plugins: [evalLayout]
                };

                $scope.$watch('gridOptions.selectedItems',function(){

                    if($scope.gridOptions.selectedItems.length > 1 ){
                        $scope.$parent.currentItemWrapper = null
                    } else if($scope.gridOptions.selectedItems.length === 1) {
                        _displayDetail($scope.gridOptions.selectedItems[0]);
                        _scrollToEntity($scope.gridOptions.selectedItems[0]);

                    }
                    else if($scope.gridOptions.selectedItems.length === 0) {
                        $scope.$parent.currentItemWrapper = null;
                    }

                },true);


                 function _scrollToEntity(entity){
                     if(!_isEntityDisplayed(entity)) {
                         var rowIndex = $scope.gridOptions.ngGrid.data.indexOf(entity);
                         $scope.gridOptions.ngGrid.$viewport.scrollTop(rowIndex * $scope.gridOptions.rowHeight);
                     }
                }

                $scope.gridOptions.columnDefs =
                    $scope.itMasterDetailControl.columnDefs;


                $scope.hasChanged = function(){
                    if($scope.$parent.currentItemWrapper != null){
                        return $scope.$parent.currentItemWrapper.hasChanged;
                    } else {
                        return false;
                    }
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
                    if (col.colDef.index != undefined){
                        _displayDetail(row.entity).then(function(msg){
                            $scope.gridOptions.selectAll(false);
                        },function(msg){
                            itPopup.alert({
                                text: $scope.itMasterDetailControl.navAlert.text ,
                                title : $scope.itMasterDetailControl.navAlert.title
                            });
                        });
                    }
                };

                function _isEntityDisplayed(entity){
                    var rowIndex = $scope.gridOptions.ngGrid.data.indexOf(entity);
                    var scrollTop  = $scope.gridOptions.ngGrid.$viewport.scrollTop();
                    var height =  $scope.gridOptions.ngGrid.$viewport.height();
                    return !!($scope.gridOptions.rowHeight * rowIndex > scrollTop &&
                        $scope.gridOptions.rowHeight * rowIndex < height + scrollTop);
               }

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
                    return $scope.gridOptions.selectedItems;
                };

                /**
                 * Method to get Current item.
                 * @returns {$scope.$parent.currentItemWrapper.currentItem|*}
                 */
                $scope.itMasterDetailControl.getCurrentItem = function(){
                    return   $scope.$parent.currentItemWrapper.currentItem;
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
                    evalLayout.fillHeight();
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

                $scope.itAppScope = $scope.$parent;

                $scope.itMasterDetailControl = angular.extend({navAlert:{
                    text:'Please save or revert your pending change',
                    title:'Unsaved changes'
                }}, $scope.itMasterDetailControl );


            }]

        }
    });