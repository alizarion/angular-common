"use strict";
angular.module('itesoft-showcase').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/side-menus', {
                templateUrl: 'app/view/side-menu/sideMenusView.html',
                controller: 'HomeCtrl',
                title : 'Side menus'
            }).
            when('/nav-active', {
                templateUrl: 'app/view/side-menu/navActiveView.html',
                controller: 'HomeCtrl',
                title : 'Navigation active'
            }).
            when('/collapsed-tem', {
                templateUrl: 'app/view/side-menu/collapsedItemView.html',
                controller: 'HomeCtrl',
                title : 'Collapsed menu'
            }).
            when('/typo', {
                templateUrl: 'app/view/typography/typographyView.html',
                controller: 'HomeCtrl',
                title : 'Typography pages'
            }).
            when('/form/checkbox', {
                templateUrl: 'app/view/form/checkboxView.html',
                controller: 'HomeCtrl',
                title : 'Checkbox / Toggle'
            }).

            when('/datatable', {
                templateUrl: 'app/view/table/simpleTables.html',
                controller: 'HomeCtrl',
                title : 'Simple tables'
            }).
            when('/tabs', {
                templateUrl: 'app/view/table/tabs.html',
                controller: 'HomeCtrl',
                title : 'Tabs'
            }).
            when('/list', {
                templateUrl: 'app/view/table/list.html',
                controller: 'HomeCtrl',
                title : 'List'
            }).
            when('/table', {
                templateUrl: 'app/view/table/dataTables.html',
                controller: 'HomeCtrl',
                title : 'DataTables'
            }).
            when('/services/itpopup', {
                templateUrl: 'app/view/services/popupView.html',
                controller: 'PopupCtrl',
                title : 'Popup'
            }).
            when('/services/it-compile', {
                templateUrl: 'app/view/services/itCompileView.html',
                controller: 'itCompileCtrl',
                title : 'Popup'
            }).
            when('/form/button', {
                templateUrl: 'app/view/form/buttons.html',
                controller: 'PopupCtrl',
                title : 'Button'
            }).
            when('/form/inputs', {
                templateUrl: 'app/view/form/inputs.html',
                controller: 'HomeCtrl',
                title : 'Form inputs'
            }).

            when('/master-detail', {
                templateUrl: 'app/view/master-details/masterDetailView.html',
                controller: 'MasterDetailController',
                title : 'Master Detail'
            }).
            when('/widget/itloader', {
                templateUrl: 'app/view/widget/loaderView.html',
                controller: 'LoaderDemoController',
                title : 'it-loader'
            }).
            when('/widget/itBottomGlue', {
                templateUrl: 'app/view/widget/itBottomGlueView.html',
                controller: 'BottomGlueController',
                title : 'it-bottom-glue'
            }).
            otherwise({
                redirectTo: '/side-menus',
                title : 'SideMenus '
            });
    }]);
