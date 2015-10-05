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
 * You MUST pass an empty object `<it-search it-search-control="searchControl"></it-search>`
 * this object will
 * <table class="table">
 *  <tr>
 *   <td><code>searchControl.columnFields = { <br/> columnFields : ['field1', 'field2', 'field3']  <br/>}</code></td>
 *   <td>Object passed to the multicolumns function filter inside the component to let it know on which columns to apply the filter.</td>
 *  </tr>
 *  <tr>
 *   <td><code>searchControl.multicolumnsFilter()</code></td>
 *   <td>Method to filter in the grid or table according the choosen column fields.</td>
 *  </tr>
 * </table>
 * You MUST pass a function `<it-search it-filter="filter()"></it-search>`
 * this function will be executed at each new input ; it should call searchControl.multicolumnsFilter() to refresh the displayed data and has to be written in the application controller.
 *
 * @usage
 * <it-search it-placeholder="Recherche multicolonnes" it-search-control="searchControl" it-filter="filter()">
 * </it-search>
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="SearchDemoController">
 <div class="container-fluid">
     <div class="jumbotron">
         <div class="row" ng-show="mode==0">
            <it-search it-placeholder="Recherche multicolonnes dans UI-GRID" it-search-control="searchControl" it-filter="filter(0)"></it-search>
            <span class="btn btn-default"><b>UI-GRID list</b></span><button class="btn btn-primary" ng-click="switch(1)">Switch to TABLE</button>
            <div ui-grid="photoGrid" id="photoGrid"></div>
         </div>
         <div class="row" ng-show="mode==1">
            <it-search it-placeholder="Recherche multicolonnes dans TABLE" it-search-control="searchControl" it-filter="filter(1)"></it-search>
            <span class="btn btn-default"><b>TABLE list</b></span><button class="btn btn-primary" ng-click="switch(0)">Switch to UI-GRID</button>
             <table class="table table-striped table-hover ">
             <thead>
                <tr><th>id</th><th>title</th><th>url</th><th>image</th></tr>
             </thead>
             <tbody>
                 <tr ng-repeat="dataItem in data">
                     <td>{{dataItem.id}}</td>
                     <td>{{dataItem.title}}</td>
                     <td>{{dataItem.url}}</td>
                     <td><img ng-src="{{dataItem.thumbnailUrl}}" alt="">{{dataItem.body}}</td>
                 </tr>
             </tbody>
             </table>
         </div>
     </div>
 </div>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['ngResource','itesoft']);
 </file>
 <file name="PhotosService.js">
 angular.module('itesoft-showcase')
 .factory('Photos',['$resource', function($resource){
                                return $resource('http://jsonplaceholder.typicode.com/photos/:id',null,{});
                            }]);
 </file>
 <file name="Controller.js">
 angular.module('itesoft-showcase')
 .controller('SearchDemoController',['$scope','Photos','$timeout', function($scope,Photos,$timeout) {
        $scope.searchControl = {};
        $scope.searchControl = {
            columnFields : ['title', 'url']
        };

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
                    field: 'url'
                }
        ];
        $scope.photoGrid = {
            data: 'dataSource',
            columnDefs: $scope.myDefs,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.grid.registerRowsProcessor($scope.searchControl.multicolumnsFilter, 200);
            }
        };
        //---------------ONLY UI-GRID--------------------

        $scope.filter = function (mod) {
            if (mod === 0) {//UI-GRID
                $scope.gridApi.grid.refresh();
            }
            else {//TABLE
                $scope.data = $scope.searchControl.multicolumnsFilter($scope.dataSource);
            }

        };

        $scope.switch = function (mod) {
            $scope.mode = mod;
            $scope.searchControl.filterText = "";//Empty it-search input
            $scope.loadAutoData();
        };

        $scope.loadAutoData = function() {
            $scope.dataSource = [];
            $scope.data = [];//TABLE

            Photos.query().$promise
            .then(function(data){
                $scope.dataSource = data;
                $scope.data = data;//TABLE
            });
        }
        $scope.switch(0);//initialized for UI-GRID
 }]);
 </file>

 </example>
 *
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