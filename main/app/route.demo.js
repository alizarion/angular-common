"use strict";
angular.module('itesoft-showcase').config(['$routeProvider',
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
            when('/form/checkbox', {
                templateUrl: 'app/view/form/checkboxView.html',
                controller: 'HomeCtrl',
                title : 'Checkboxs'
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
            otherwise({
                redirectTo: '/home',
                title : 'Home Page'
            });
    }]);
