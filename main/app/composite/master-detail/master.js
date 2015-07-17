"use strict";


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
                    checkboxHeaderTemplate:'<input class="ngSelectionHeader" type="checkbox" ng-show="multiSelect" ng-model="allSelected" ng-change="toggleSelectAll(allSelected,true)"  ng-disabled="hasChanged()"/>',

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