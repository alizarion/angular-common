'use strict';

IteSoft
    .directive('itCollapsedItem', function() {
        return  {
            restrict : 'A',
            link : function ( scope,element, attrs) {
                var menuItems = angular.element(element[0]
                    .querySelector('ul'));
                var link = angular.element(element[0]
                    .querySelector('a'));
                console.log(menuItems);
                console.log(link);
                menuItems.addClass('it-side-menu-collapse');
                element.addClass('it-sub-menu');

                element.on('click', function () {
                    console.log('click');
                    if (menuItems.hasClass('it-side-menu-collapse')) {
                        menuItems.removeClass('it-side-menu-collapse');
                        menuItems.addClass('it-side-menu-expanded');
                        element.addClass('toggled');
                    } else {
                        element.removeClass('toggled');
                        menuItems.removeClass('it-side-menu-expanded');
                        menuItems.addClass('it-side-menu-collapse');

                    }
                });

            }
        }
    });
