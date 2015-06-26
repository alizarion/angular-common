'use strict';

IteSoft
    .directive('itViewMasterHeader',function(){
        return {
            restrict: 'E',
            transclude : true,
            scope:true,
            template :  '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<div class="btn-toolbar" ng-transclude>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md-6 pull-right">' +
                                '<div>' +
            '<form>' +
            '<div class="form-group has-feedback">' +
            '<span class="glyphicon glyphicon-search form-control-feedback"></span>' +
            '<input it-input class="form-control" type="text" placeholder="Rechercher"/>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>'
        }
    });
