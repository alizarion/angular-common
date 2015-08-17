'use strict';
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
         <file src="test.css">
         </file>
 </example>
 */
IteSoft
    .directive('itMasterDetail',['itPopup','$timeout','$window',function(itPopup,$timeout,$window){
        return {
            restrict: 'EA',
            transclude : true,
            scope :true,
            template : '<div it-bottom-glue="" class="it-master-detail-container jumbotron "><div class="it-fill row " ng-transclude></div></div>',
            controller : [
                '$scope',
                'screenSize',
                function(
                    $scope,
                    screenSize
                    )
                {
                    $scope.activeState = 'master';
                    $scope.desktop = screenSize.on('md, lg', function(match){
                        $scope.desktop = match;

                    });

                    $scope.mobile = screenSize.on('xs, sm', function(match){
                        $scope.mobile = match;
                    });

                    $scope.goToDetail = function(){
                        $scope.activeState = 'detail';
                    };

                    $scope.$watch('mobile',function(){
                        if($scope.mobile &&
                            (typeof $scope.$$childHead.currentItemWrapper !== 'undefined'
                                &&  $scope.$$childHead.currentItemWrapper != null )){
                            $scope.activeState = 'detail';
                        } else {
                            $scope.activeState = 'master';
                        }
                    });

                    $scope.goToMaster = function(){
                        if($scope.mobile &&
                            (typeof $scope.$$childHead.currentItemWrapper !== 'undefined'
                                &&  $scope.$$childHead.currentItemWrapper != null )){
                            if($scope.$$childHead.currentItemWrapper.hasChanged){
                                itPopup.alert({
                                    text:  $scope.$$childHead.$navAlert.text ,
                                    title :  $scope.$$childHead.$navAlert.title
                                });
                            } else {
                                $scope.activeState = 'master';
                                $timeout(function(){
                                    $window.dispatchEvent(new Event('resize'));
                                },300)

                            }
                        } else {
                            $scope.activeState = 'master';
                            $timeout(function(){
                                $window.dispatchEvent(new Event('resize'));
                            },300)

                        }

                    };
                }]
        }
    }]);