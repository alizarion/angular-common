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
                    footerTemplate : '<div id="priorityFooter" ng-show="showFooter" class="ngFooterPanel" ng-class="{\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}" ng-style="footerStyle()"> <div class="ngTotalSelectContainer"> <div class="ngFooterTotalItems" ng-class="{\'ngNoMultiSelect\': !multiSelect}"> <span class="ngLabel badge ">{{i18n.ngTotalItemsLabel}}  {{maxRows()}}</span> <span ng-show="filterText.length > 0 && maxRows()!= totalFilteredItemsLength()" class="ngLabel badge badge-warning">{{i18n.ngShowingItemsLabel}}  {{totalFilteredItemsLength()}}</span> <span ng-show="multiSelect" class="ngLabel badge badge-warning">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span> </div></div> <div class="ngPagerContainer" style="float: right; margin-top: 10px;" ng-show="enablePaging" ng-class="{\'ngNoMultiSelect\': !multiSelect}"><div style="float:left; margin-right: 10px;" class="ngRowCountPicker">               <span style="float: left; margin-top: 3px;" class="ngLabel">{{i18n.ngPageSizeLabel}}</span><select style="float: left;height: 27px; width: 100px" ng-model="pagingOptions.pageSize">                   <option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>               </select>           </div>           <div style="float:left; margin-right: 10px; line-height:25px;" class="ngPagerControl"                style="float: left; min-width: 135px;">               <button class="ngPagerButton" ng-click="pageToFirst()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerFirstTitle}}"> <div class="ngPagerFirstTriangle"> <div class="ngPagerFirstBar"></div> </div></button>  <button class="ngPagerButton" ng-click="pageBackward()" ng-disabled="cantPageBackward()"  title="{{i18n.ngPagerPrevTitle}}">  <div class="ngPagerFirstTriangle ngPagerPrevTriangle"></div>  </button>  <input class="ngPagerCurrent" min="1" max="{{maxPages()}}" type="number"  style="width:50px; height: 24px; margin-top: 1px; padding: 0 4px;"  ng-model="pagingOptions.currentPage"/> <button class="ngPagerButton" ng-click="pageForward()" ng-disabled="cantPageForward()"   title="{{i18n.ngPagerNextTitle}}">  <div class="ngPagerLastTriangle ngPagerNextTriangle"></div> </button> <button class="ngPagerButton" ng-click="pageToLast()" ng-disabled="cantPageToLast()" title="{{i18n.ngPagerLastTitle}}"> <div class="ngPagerLastTriangle">  <div class="ngPagerLastBar"></div>  </div> </button> </div> </div> </div>',
                    plugins: [evalLayout]
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