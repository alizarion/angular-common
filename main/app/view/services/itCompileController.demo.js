angular.module('itesoft-showcase')
    .controller('itCompileCtrl',['$scope', function($scope) {

        $scope.simpleText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
            'Adipisci architecto, deserunt doloribus libero magni molestiae nisi odio' +
            ' officiis perferendis repudiandae. Alias blanditiis delectus dicta' +
            ' laudantium molestiae officia possimus quaerat quibusdam!';

        $scope.pleaseCompileThis = '<h4>This is the compile result</h4><p>{{simpleText}}</p>';
    }]);