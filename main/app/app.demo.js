// change Page Title based on the routers
angular.module('itesoft-showcase',['itesoft','ngRoute','ui.bootstrap','ngSanitize','ngGrid','pascalprecht.translate'])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            TITLE: 'Hallo',
            FOO: 'Dies ist ein Paragraph.',
            BUTTON_LANG_EN: 'englisch',
            BUTTON_LANG_DE: 'deutsch'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
}])
.run(['$rootScope', '$route', function($rootScope, $route) {
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.pageTitle = $route.current.title;
        });
    }]);