angular
    .module('itesoft-showcase')
    .factory('Photos',['$resource', function($resource){
        return $resource('http://jsonplaceholder.typicode.com/photos/:id',null,{});
    }]);
