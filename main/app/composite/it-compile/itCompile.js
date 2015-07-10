IteSoft
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('itCompile', ['$compile',function($compile) {
            return function (scope, element, attrs) {
                scope.$watch(
                    function (scope) {
                        return scope.$eval(attrs.itCompile);
                    },
                    function (value) {
                        element.html(value);
                        $compile(element.contents())(scope);

 //fdsfsd
                    }
                );
            };
        }]);
    }]);
