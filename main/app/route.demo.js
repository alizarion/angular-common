"use strict";
angular.module('itesoft').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'app/view/home/homeView.html',
                controller: 'HomeCtrl',
                title : 'Home Page'
            }).
            when('/typo', {
                templateUrl: 'app/view/typography/typographyView.html',
                controller: 'HomeCtrl',
                title : 'Typography pages'
            }).
            when('/datatable', {
                templateUrl: 'app/view/table/simpleTables.html',
                controller: 'HomeCtrl',
                title : 'Simple tables'
            }).
            when('/table', {
                templateUrl: 'app/view/table/dataTables.html',
                controller: 'HomeCtrl',
                title : 'DataTables'
            }).
            when('/form/inputs', {
                templateUrl: 'app/view/form/inputs.html',
                controller: 'HomeCtrl',
                title : 'Form inputs'
            }).
            when('/views/masterdetail', {
                templateUrl: 'app/view/views/masterDetailView.html',
                controller: 'MasterDetailController',
                title : 'Master Detail View'
            }).
            when('/views/masterdetailv2', {
                templateUrl: 'app/view/views/masterDetail2View.html',
                controller: 'MasterDetail2Controller',
                title : 'Master Detail View V2'
            }).
            otherwise({
                redirectTo: '/home',
                title : 'Home Page'
            });
    }]);
