
'use strict';

/**
 * @ngdoc directive
 * @name dependencies.directive:ui-grid
 * @module dependencies
 * @restrict AE
 * @since 1.0
 * @description
 * Complex Angularjs dataGrid
 * See more :  {@link http://ui-grid.info/ ui-grid}
 *
 * @example
 <example module="itesoft">
     <file name="index.html">
     <div ng-controller="mainController">
         <button id="expandAll" type="button" class="btn btn-success" ng-click="expandAll()">Expand All</button>
         <button id="toggleFirstRow" type="button" class="btn btn-success" ng-click="toggleRow(0)">Toggle First Row</button>
         <button id="toggleSecondRow" type="button" class="btn btn-success" ng-click="toggleRow(1)">Toggle Second Row</button>
         <button id="changeGrouping" type="button" class="btn btn-success" ng-click="changeGrouping()">Change Grouping</button>
         <button id="getAggregates" type="button" class="btn btn-success" ng-click="getAggregates()">Get Aggregates</button>
         <div id="grid1" ui-grid="gridOptions" ui-grid-grouping class="grid"></div>
        </div>
     </file>
     <file name="Controller.js">
     angular.module('itesoft')
     .controller('mainController', ['$scope', '$http', '$interval', 'uiGridGroupingConstants',
       function ($scope, $http, $interval, uiGridGroupingConstants) {
                    $scope.gridOptions = {
           enableFiltering: true,
           treeRowHeaderAlwaysVisible: false,
           columnDefs: [
             { name: 'name', width: '30%' },
             { name: 'gender', grouping: { groupPriority: 1 }, sort: { priority: 1, direction: 'asc' }, width: '20%', cellFilter: 'mapGender' },
             { name: 'age', treeAggregationType: uiGridGroupingConstants.aggregation.MAX, width: '20%' },
             { name: 'company', width: '25%' },
             { name: 'registered', width: '40%', cellFilter: 'date', type: 'date' },
             { name: 'state', grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'desc' }, width: '35%',
             cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
             { name: 'balance', width: '25%', cellFilter: 'currency', treeAggregationType: uiGridGroupingConstants.aggregation.AVG,
             customTreeAggregationFinalizerFn: function( aggregation ) {
               aggregation.rendered = aggregation.value;
             } }
           ],
           onRegisterApi: function( gridApi ) {
             $scope.gridApi = gridApi;
           }
         };

         $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
           .success(function(data) {
             for ( var i = 0; i < data.length; i++ ){
               var registeredDate = new Date( data[i].registered );
               data[i].state = data[i].address.state;
               data[i].gender = data[i].gender === 'male' ? 1: 2;
               data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
               data[i].registered = new Date( registeredDate.getFullYear(), registeredDate.getMonth(), 1 )
             }
             delete data[2].age;
             $scope.gridOptions.data = data;
           });

         $scope.expandAll = function(){
           $scope.gridApi.treeBase.expandAllRows();
         };

         $scope.toggleRow = function( rowNum ){
           $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
         };

         $scope.changeGrouping = function() {
           $scope.gridApi.grouping.clearGrouping();
           $scope.gridApi.grouping.groupColumn('age');
           $scope.gridApi.grouping.aggregateColumn('state', uiGridGroupingConstants.aggregation.COUNT);
         };

         $scope.getAggregates = function() {
           var aggregatesTree = [];
           var gender

           var recursiveExtract = function( treeChildren ) {
             return treeChildren.map( function( node ) {
               var newNode = {};
               angular.forEach(node.row.entity, function( attributeCol ) {
                 if( typeof(attributeCol.groupVal) !== 'undefined' ) {
                   newNode.groupVal = attributeCol.groupVal;
                   newNode.aggVal = attributeCol.value;
                 }
               });
               newNode.otherAggregations = node.aggregations.map( function( aggregation ) {
                 return { colName: aggregation.col.name, value: aggregation.value, type: aggregation.type };
               });
               if( node.children ) {
                 newNode.children = recursiveExtract( node.children );
               }
               return newNode;
             });
           }

           aggregatesTree = recursiveExtract( $scope.gridApi.grid.treeBase.tree );

           console.log(aggregatesTree);
         };

         }]).filter('mapGender', function() {
             var genderHash = {
               1: 'male',
               2: 'female'
             };

             return function(input) {
               var result;
               var match;
               if (!input){
                 return '';
               } else if (result = genderHash[input]) {
                 return result;
               } else if ( ( match = input.match(/(.+)( \(\d+\))/) ) && ( result = genderHash[match[1]] ) ) {
                 return result + match[2];
               } else {
                 return input;
               }
             };
           });;

 </file>
 </example>
 */