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
 *   <td><code>masterDetail.setCurrentItem(entity)</code></td>
 *   <td>Method to define the selected item, return promise</td>
 *  </tr>
 *  <tr>
 *   <td><code>$scope.$broadcast('unlockCurrentItem')</code></td>
 *   <td>unlock the selected item from the editing mode.</td>
 *  </tr>
 *  <tr>
 *   <td><code>$scope.$broadcast('lockCurrentItem')</code></td>
 *   <td>lock the selected item from the editing mode.</td>
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
            <it-master-detail>
                <it-master>
                    <it-master-header>
                    </it-master-header>
                </it-master>
            </it-master-detail>
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
            template : '<div class="col-md-6" ui-i18n="{{itLang}}">'+
                '<div class="jumbotron">'+
                '<div class="row" ng-transclude>'+
                '</div>'+
                '<div class="row">'+
                '<div class="col-md-12">'+
                ' <div ng-grid="gridOptions"  class="gridStyle">' +
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>',
            controller : ['$scope','$filter','$q','$timeout', function ($scope,$filter,$q,$timeout){

                $scope.$parent.currentItemWrapper = null;

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
                        if($scope.$parent.currentItemWrapper!=null) {
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
                    footerTemplate : '<div id="priorityFooter" ng-show="showFooter" class="ngFooterPanel" ng-class="{\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}" ng-style="footerStyle()"> <div class="ngTotalSelectContainer"> <div class="ngFooterTotalItems" ng-class="{\'ngNoMultiSelect\': !multiSelect}"> <span class="ngLabel badge ">{{i18n.ngTotalItemsLabel}}  {{maxRows()}}</span> <span ng-show="filterText.length > 0 && maxRows()!= totalFilteredItemsLength()" class="ngLabel badge badge-warning">{{i18n.ngShowingItemsLabel}}  {{totalFilteredItemsLength()}}</span> <span ng-show="multiSelect" class="ngLabel badge badge-warning">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span> </div></div> <div class="ngPagerContainer" style="float: right; margin-top: 10px;" ng-show="enablePaging" ng-class="{\'ngNoMultiSelect\': !multiSelect}"><div style="float:left; margin-right: 10px;" class="ngRowCountPicker">               <span style="float: left; margin-top: 3px;" class="ngLabel">{{i18n.ngPageSizeLabel}}</span><select style="float: left;height: 27px; width: 100px" ng-model="pagingOptions.pageSize">                   <option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>               </select>           </div>           <div style="float:left; margin-right: 10px; line-height:25px;" class="ngPagerControl"                style="float: left; min-width: 135px;">               <button class="ngPagerButton" ng-click="pageToFirst()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerFirstTitle}}"> <div class="ngPagerFirstTriangle"> <div class="ngPagerFirstBar"></div> </div></button>  <button class="ngPagerButton" ng-click="pageBackward()" ng-disabled="cantPageBackward()"  title="{{i18n.ngPagerPrevTitle}}">  <div class="ngPagerFirstTriangle ngPagerPrevTriangle"></div>  </button>  <input class="ngPagerCurrent" min="1" max="{{maxPages()}}" type="number"  style="width:50px; height: 24px; margin-top: 1px; padding: 0 4px;"  ng-model="pagingOptions.currentPage"/> <button class="ngPagerButton" ng-click="pageForward()" ng-disabled="cantPageForward()"   title="{{i18n.ngPagerNextTitle}}">  <div class="ngPagerLastTriangle ngPagerNextTriangle"></div> </button> <button class="ngPagerButton" ng-click="pageToLast()" ng-disabled="cantPageToLast()" title="{{i18n.ngPagerLastTitle}}"> <div class="ngPagerLastTriangle">  <div class="ngPagerLastBar"></div>  </div> </button> </div> </div> </div>'

                };




                $scope.$watch('gridOptions.selectedItems',function(){
                    if($scope.gridOptions.selectedItems.length > 1 ){
                        $scope.$parent.currentItemWrapper = null
                    } else if($scope.gridOptions.selectedItems.length === 1) {
                        _displayDetail($scope.gridOptions.selectedItems[0]);
                    }


                },true);

                $scope.gridOptions.columnDefs =
                    $scope.itMasterDetailControl.columnDefs;


                $scope.hasChanged = function(){
                    if($scope.$parent.currentItemWrapper!=null) {
                        return   $scope.$parent.currentItemWrapper.hasChanged;
                    }else {
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
                    $scope.$parent.currentItemWrapper = {
                        "originalItem": item,
                        "currentItem" :angular.copy(item),
                        "hasChanged":false,
                        "isWatched":false
                    };
                    deferred.resolve('');
                    return deferred.promise;
                }

                $scope.$watch('$parent.currentItemWrapper.currentItem', function(newValue,oldValue){

                    if($scope.$parent.currentItemWrapper!=null && $scope.itLockOnChange ){
                        if(!$scope.$parent.currentItemWrapper.isWatched)
                        {
                            $scope.$parent.currentItemWrapper.isWatched = true;
                        }
                            $scope.$parent.currentItemWrapper.hasChanged =
                                !angular.equals(newValue,
                                $scope.$parent.currentItemWrapper.originalItem);
                    }
                }, true);


                $scope.onRowClick = function(row,col) {
                    //if (col.index > 0){ne fonctionne pas quand groupage
                    if (col.colDef.index != undefined){
                        _displayDetail(row.entity).then(function(msg){
                            $scope.gridOptions.selectAll(false);
                        },function(msg){
                            alert(msg);
                        });
                    }
                };

                $scope.itMasterDetailControl.selectItem =function (item){
                    $scope.onRowClick(null,{entity:item});
                };

                function _unlockCurrent(){
                    if($scope.$parent.currentItemWrapper!==null){
                        $scope.$parent.currentItemWrapper.hasChanged = false;
                        $scope.$parent.currentItemWrapper.isWatched = false;
                    }
                }

                function _lockCurrent(){
                    if($scope.$parent.currentItemWrapper!==null){
                        $scope.$parent.currentItemWrapper.hasChanged = true;
                        $scope.$parent.currentItemWrapper.isWatched = true;

                    }
                }

                $scope.itMasterDetailControl.getSelectedItems = function(){
                    return $scope.gridOptions.selectedItems;
                };

                $scope.itMasterDetailControl.getCurrentItem = function(){
                    return   $scope.$parent.currentItemWrapper.currentItem;
                };

               $scope.itMasterDetailControl.getFilteredItems = function(){
                    var entities = [];
                    angular.forEach($scope.gridOptions.ngGrid.filteredRows,
                        function(row){
                            entities.push(row.entity);

                        });
                    return entities;
                };

                /**
                 * Method to set the current item.
                 * @param entity
                 */
                $scope.itMasterDetailControl.setCurrentItem = function(entity){

                    var deferred = $q.defer();
                    $scope.gridOptions.selectAll(false);
                    _displayDetail(entity).then(function(){
                        $timeout(function() {
                            var entityIndex = $scope.itMasterData.indexOf(entity);
                            console.log(entityIndex);
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
                 *
                 * @param entity
                 * @private
                 */
                function _findEntityRow(entity){

                }

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

               $scope.$on('lockCurrentItem',function(){
                    _lockCurrent();
                });

                function confirmLeavePage(e) {
                    if($scope.$parent.currentItemWrapper!=null){
                        if ( $scope.$parent.currentItemWrapper.hasChanged ) {
                            alert("You have unsaved edits. Do you wish to leave?");
                            e.preventDefault();
                        }
                    }
                }



                $scope.$on("$locationChangeStart", confirmLeavePage);
                $scope.itAppScope = $scope.$parent;
            }]

        }
    });