// change Page Title based on the routers
angular.module('itesoft')
    .run(['$rootScope', '$route', function($rootScope, $route) {
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.pageTitle = $route.current.title;
        });
    }]);