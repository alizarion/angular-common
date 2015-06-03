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
                menuItems.addClass('it-collapse');
                element.on('click', function () {
                    console.log('click');
                    if (menuItems.hasClass('it-collapse')) {
                        menuItems.removeClass('it-collapse');
                        menuItems.addClass('it-expanded');
                    } else {
                        menuItems.removeClass('it-expanded');
                        menuItems.addClass('it-collapse');

                    }
                });

            }
        }
    }]);
