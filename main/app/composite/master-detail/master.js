"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itMasterDetail
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
            controller : ['$scope','$filter','$q',function ($scope,$filter,$q){

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
                    rowTemplate: '<div ng-click="grid.appScope.onRowClick(colRenderIndex,row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell>' +
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
                        if(!$scope.$parent.currentItemWrapper.isWatched) {
                            $scope.$parent.currentItemWrapper.isWatched = true;
                        } else {
                            console.log('has change') ;
                            $scope.$parent.currentItemWrapper.hasChanged = true;
                        }
                    }
                }, true);


                $scope.onRowClick = function(colRenderIndex,row){
                    _displayDetail(row.entity).then(function(msg){
                        $scope.gridApi.selection.clearSelectedRows();
                        $scope.gridApi.selection.toggleRowSelection(row.entity);
                    },function(msg){
                        alert(msg);
                    });

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

                function confirmLeavePage(e) {
                    if($scope.$parent.currentItemWrapper!=null){
                        if ( $scope.$parent.currentItemWrapper.hasChanged ) {
                            alert("You have unsaved edits. Do you wish to leave?");
                            e.preventDefault();
                        }
                    }
                }

                $scope.$on("$locationChangeStart", confirmLeavePage);

            }]

        }
    });