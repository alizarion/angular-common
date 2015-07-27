angular
    .module('itesoft-showcase')
    .factory('Comments',['$resource', function($resource){
    return $resource('http://jsonplaceholder.typicode.com/comments/:id',null,{});
}]);
