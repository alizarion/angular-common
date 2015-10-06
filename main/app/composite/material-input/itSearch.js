"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itSearch
 * @module itesoft
 * @restrict E
 *
 * @description
 * An element providing a single filter box that searches across multiple columns in a grid (ui-grid) or a table.
 *
 * You MUST pass an object `<it-search it-search-control="searchControl"></it-search>`.
 * This object will be used as following:
 * <table class="table">
 *  <tr>
 *   <td><code>searchControl.columnFields = { <br/> columnFields : ['field1', 'field2', 'field3']  <br/>}</code></td>
 *   <td>Object passed to the multicolumns function filter inside the component to let it know on which columns to apply the filter.</td>
 *  </tr>
 *  <tr>
 *   <td><code>searchControl.multicolumnsFilter(renderableRows)</code></td>
 *   <td>Method to filter in the grid or table according the choosen column fields.<br/>It returns the new rows to be displayed.</td>
 *  </tr>
 * </table>
 * You MUST also pass a function `<it-search it-filter="filter()"></it-search>`.
 * This function will be executed at each new input ; it should call searchControl.multicolumnsFilter() to refresh the displayed data and has to be written in the application controller.
 *
 * @usage
 * <it-search it-placeholder="Recherche multicolonnes" it-search-control="searchControl" it-filter="filter()">
 * </it-search>
 *
 * @example
     <example module="itesoft-showcase">
         <file name="Module.js">
         angular.module('itesoft-showcase',['ngResource','itesoft']);
         </file>
         <file name="LatinService.js">
         angular.module('itesoft-showcase')
         .factory('Latin',['$resource', function($resource){
                                                    return $resource('http://jsonplaceholder.typicode.com/posts');
                                                }]);
         </file>
         <file name="Controller1.js">
         angular.module('itesoft-showcase')
         .controller('SearchDemoControllerGrid',['$scope','Latin', function($scope,Latin) {
                            $scope.searchControl = {};
                            $scope.searchControl = {
                                columnFields : ['title', 'body']
                            };

                            $scope.dataSource = [];

                            //---------------ONLY UI-GRID--------------------
                            $scope.myDefs = [
                                    {
                                        field: 'id',
                                        width: 50
                                    },
                                    {
                                        field: 'title'
                                    },
                                    {
                                        field: 'body'
                                    }
                            ];
                            $scope.latinGrid = {
                                data: 'dataSource',
                                columnDefs: $scope.myDefs,
                                onRegisterApi: function (gridApi) {
                                    $scope.gridApi = gridApi;
                                    $scope.gridApi.grid.registerRowsProcessor($scope.searchControl.multicolumnsFilter, 200);
                                }
                            };
                            //---------------ONLY UI-GRID--------------------

                            $scope.filter = function () {
                                $scope.gridApi.grid.refresh();
                            };

                            $scope.loadDataGrid = function() {
                                $scope.dataSource = [];

                                Latin.query().$promise
                                .then(function(data){
                                    $scope.dataSource = data;
                                });
                            };
                     }]);
         </file>
         <file name="index.html">
         <div ng-controller="SearchDemoControllerGrid">
         <div class="container-fluid">
             <div class="jumbotron">
                 <div class="row">
                    <button class="btn btn-primary" ng-click="loadDataGrid()">DISPLAY DATA IN UI-GRID</button>
                    <it-search it-placeholder="Recherche multicolonnes dans UI-GRID" it-search-control="searchControl" it-filter="filter()"></it-search>
                    <div ui-grid="latinGrid" id="latinGrid"></div>
                 </div>
             </div>
         </div>
         </div>
         </file>

     </example>

     <example module="itesoft-showcase1">
         <file name="index.html">
             <div ng-controller="SearchDemoControllerTable">
                 <div class="container-fluid">
                 <div class="jumbotron">
                 <div class="row">
                 <button class="btn btn-primary" ng-click="loadDataTable()">DISPLAY DATA IN TABLE</button>
                 <it-search it-placeholder="Recherche multicolonnes dans TABLE" it-search-control="searchControl" it-filter="filter()"></it-search>
                 <table class="table table-striped table-hover ">
                 <thead>
                 <tr><th>id</th><th>title</th><th>body</th></tr>
                 </thead>
                 <tbody>
                 <tr ng-repeat="dataItem in data">
                 <td>{{dataItem.id}}</td>
                 <td>{{dataItem.title}}</td>
                 <td>{{dataItem.body}}</td>
                 </tr>
                 </tbody>
                 </table>
                 </div>
                 </div>
                 </div>
             </div>
         </file>
         <file name="Module1.js">
            angular.module('itesoft-showcase1',['ngResource','itesoft']);
         </file>
         <file name="LatinService1.js">
             angular.module('itesoft-showcase1')
             .factory('Latin1',['$resource', function($resource){
                                            return $resource('http://jsonplaceholder.typicode.com/posts');
                                        }]);
         </file>
         <file name="Controller2.js">
             angular.module('itesoft-showcase1')
             .controller('SearchDemoControllerTable',['$scope','Latin1', function($scope,Latin1) {
                    $scope.searchControl = {};
                    $scope.searchControl = {
                        columnFields : ['title', 'body']
                    };

                    $scope.dataSource = [];
                    $scope.data = [];

                    $scope.filter = function () {
                        $scope.data = $scope.searchControl.multicolumnsFilter($scope.dataSource);
                    };

                    $scope.loadDataTable = function() {
                        $scope.dataSource = [];
                        $scope.data = [];

                        Latin1.query().$promise
                        .then(function(data){
                           $scope.dataSource = data;
                           $scope.data = data;
                        });
                    };
             }]);
         </file>

     </example>
 **/
IteSoft
    .directive('itSearch',function() {
        return {
            restrict: 'E',
            scope: {
                itSearchControl:'=',
                itFilter:'&'
            },
            template :'<form>'+
                            '<div class="form-group has-feedback" >'+
                                '<span class="glyphicon glyphicon-search form-control-feedback"></span>'+
                                '<input class="form-control " type="text" ng-model="itSearchControl.filterText" ng-change="itFilter()" placeholder="{{placeholderText}}"/>'+
                            '</div>'+
                        '</form>',
            link : function (scope, element, attrs ) {
                scope.placeholderText = attrs.itPlaceholder;
            },
            controller : ['$scope',
                function ($scope) {
                    $scope.itSearchControl.filterText = "";

                    $scope.itSearchControl.multicolumnsFilter = function (renderableRows) {
                        var matcher = new RegExp($scope.itSearchControl.filterText, 'i');
                        var renderableRowTable = [];
                        var table = false;
                        if ($scope.itSearchControl.columnFields) {
                            renderableRows.forEach(function (row) {
                                var match = false;
                                if (row.entity) {//UI-GRID
                                    $scope.itSearchControl.columnFields.forEach(function (field) {
                                        if (row.entity[field] && row.entity[field].toString().match(matcher)) {
                                            match = true;
                                        }
                                    });
                                    if (!match) {
                                        row.visible = false;
                                    }
                                }
                                else {//TABLE
                                    table = true;
                                    $scope.itSearchControl.columnFields.forEach(function (field) {
                                        if (row[field] && row[field].toString().match(matcher)) {
                                                match = true;
                                        }
                                    });
                                    if (match) {
                                        renderableRowTable.push(row);
                                    }
                                }
                            });
                        }
                        if (table){
                            renderableRows = renderableRowTable;
                        }
                        return renderableRows;
                    };
                }]
            }
    });