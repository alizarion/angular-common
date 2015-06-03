/**
 *
 */
IteSoft

    .directive('itCollapsedItem', ['$animate', function($animate) {
        return  {
            'restrict': 'A',

            link: function ( scope,element, attrs) {
                var menuItems = angular.element(element[0]
                    .querySelector('ul'));
                var link = angular.element(element[0]
                                    .querySelector('a'));
                console.log(menuItems);
                console.log(link);
                menuItems.addClass('collapse');
                element.on('click', function () {
                    console.log('click');
                    if (menuItems.hasClass('collapse')) {

                        menuItems.removeClass('collapse');
                    } else {
                        menuItems.addClass('collapse');

                    }
                });

            }
        }
    }]);
