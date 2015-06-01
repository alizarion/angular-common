/**
 *
 */
IteSoft
    .directive('itSideMenus',function(){
        return {
            'restrict': 'ECA',
            'transclude' : true,
            'template': '<div class="side-menu" ng-transclude></div>'
            //'template': '<div class="it-side-menu" ng-transclude></div>' //TODO  ne support pas class de meme nom que la directive
        }
});