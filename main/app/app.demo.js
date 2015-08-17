// change Page Title based on the routers
angular.module('itesoft-showcase',[
    'itesoft',
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'pascalprecht.translate'
])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            TITLE: 'Hallo',
            FOO: 'Modification en cours.',
            BUTTON_LANG_EN: 'merci de sauvegarder',
            BUTTON_LANG_DE: 'deutsch',
            POPUP_TITLE: 'Don\'t eat that!',
            POPUP_CONTENT : 'It might taste good',
            POPUP_LABEL : 'Put your value here!!'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
}]).config(['$compileProvider', function ($compileProvider) {
           // $compileProvider.debugInfoEnabled(false);

    }])
.run(['$rootScope', '$route', function($rootScope, $route) {
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.pageTitle = $route.current.title;
        });
    }]);

