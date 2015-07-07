// change Page Title based on the routers
angular.module('itesoft-showcase',['itesoft','ngRoute','ui.bootstrap','ngSanitize','ngGrid'])
    .run(['$rootScope', '$route', function($rootScope, $route) {
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.pageTitle = $route.current.title;
        });
    }]);