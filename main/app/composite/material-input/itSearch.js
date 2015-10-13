"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itSearch
 * @module itesoft
 * @restrict A
 *
 * @description
 * Attribute providing on an input a single filter box that searches across multiple columns in a grid (ui-grid) or a table.
 *
 * You MUST pass an object `<input it-search it-search-control="searchControl" ng-model="searchControl.filterText" ></input>`.
 * This object will be used as following:
 * <table class="table">
 *  <tr>
 *   <td><code>searchControl = { <br/> columnDefs : [{field:'field1'}, {field:'field2'}, {field:'field3'}]  <br/>}</code></td>
 *   <td>Object passed to the multicolumns function filter inside the component to let it know on which columns to apply the filter.
 *   <br>This object is based on the columnDefs defined for the UI-GRID. Only property field and cellFilter are used.
 *   </td>
 *  </tr>
 *  <tr>
 *   <td><code>searchControl.multicolumnsFilter(renderableRows)</code></td>
 *   <td>Method to filter in the grid or table according the choosen column fields.<br/>It returns the new rows to be displayed.</td>
 *  </tr>
 *  <tr>
 *   <td><code>searchControl.filterText</code></td>
 *   <td>This property of the scope has to be associated to the input<br/>(through ng-model).</td>
 *  </tr>
 * </table>
 * You MUST also pass a function `<input it-search ng-change="filter()"></input>`.
 * This function should call searchControl.multicolumnsFilter() to refresh the displayed data and has to be written in the application controller.
 *
 * @usage
 * <input it-search it-search-control="searchControl" ng-model="searchControl.filterText" ng-change="filter()">
 * </input>
 *
 * @example
 * <span><b>SEARCH IN UI-GRID</b></span>
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="SearchDemoControllerGrid">
 <div class="container-fluid">
 <div class="jumbotron">
 <div class="row">
 <button class="btn btn-primary" ng-click="loadDataGrid()">DISPLAY DATA IN UI-GRID</button>
 <form>
 <div class="form-group has-feedback" >
 <input it-search class="form-control" type="text" placeholder="Recherche multicolonnes dans UI-GRID" it-search-control="searchControl" ng-model="searchControl.filterText" ng-change="filter()"/>
 </div>
 </form>
 <div ui-grid="latinGrid" id="latinGrid"></div>
 </div>
 </div>
 </div>
 </div>
 </file>

 <file name="Module.js">
 angular.module('itesoft-showcase',['ngResource','itesoft']);
 </file>
 <file name="LatinService.js">
 angular.module('itesoft-showcase')
 .factory('Latin',['$resource', function($resource){
                                                    return $resource('http://jsonplaceholder.typicode.com/posts');
                                                }]);
 </file>
 <file name="Controller.js">
 angular.module('itesoft-showcase')
 .controller('SearchDemoControllerGrid',['$scope','Latin', function($scope,Latin) {
                            $scope.searchControl = {
                                columnDefs : [{field:'title'}, {field:'body'}]
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

 </example>

 * <span><b>SEARCH IN TABLE</b></span>
 <example module="itesoft-showcase1">
 <file name="index.html">
 <div ng-controller="SearchDemoControllerTable">
 <div class="container-fluid">
 <div class="jumbotron">
 <div class="row">
 <button class="btn btn-primary" ng-click="loadDataTable()">DISPLAY DATA IN TABLE</button>
 <form>
 <div class="form-group has-feedback" >
 <input it-search class="form-control" type="text" placeholder="Recherche multicolonnes dans TABLE" it-search-control="searchControl" ng-model="searchControl.filterText" ng-change="filter()"/>
 </div>
 </form>
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
 <file name="Controller1.js">
 angular.module('itesoft-showcase1')
 .controller('SearchDemoControllerTable',['$scope','Latin1', function($scope,Latin1) {
                    $scope.searchControl = {};
                    $scope.searchControl = {
                        columnDefs : [{field:'title'}, {field:'body'}]
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
            restrict: 'A',
            replace : true,
            scope: {
                itSearchControl:'='
            },
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0]);

                input.after('<span class="glyphicon glyphicon-search form-control-feedback"/>');
            },
            controller : ['$scope',
                function ($scope) {
                    $scope.itSearchControl.multicolumnsFilter = function (renderableRows) {
                        var matcher = new RegExp($scope.itSearchControl.filterText, 'i');
                        var renderableRowTable = [];
                        var table = false;
                        if ($scope.itSearchControl.columnDefs) {
                            renderableRows.forEach(function (row) {
                                var match = false;
                                if (row.entity) {//UI-GRID
                                    $scope.itSearchControl.columnDefs.forEach(function (col) {
                                        if (!match && row.entity[col.field]) {
                                            var renderedData = row.entity[col.field].toString();
                                            if (col.cellFilter) {
                                                $scope.value = renderedData;
                                                renderedData = $scope.$eval('value | ' + col.cellFilter);
                                            }
                                            if(typeof renderedData !== 'undefined' && renderedData != null){
                                                if (renderedData.match(matcher)) {
                                                    match = true;
                                                }
                                            }
                                        }
                                    });
                                    if (!match) {
                                        row.visible = false;
                                    }
                                }
                                else {//TABLE
                                    table = true;
                                    $scope.itSearchControl.columnDefs.forEach(function (col) {
                                        if (!match && row[col.field] && row[col.field].toString().match(matcher)) {
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