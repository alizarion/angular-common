"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itMasterHeader
 * @module itesoft
 * @restrict EA
 *
 * @description
 * A container element for master-detail header.
 *
 * @example
    <example module="itesoft-showcase">
        <file name="index.html">

            <it-master-header>
            </it-master-header>

        </file>
    </example>
 */
IteSoft
    .directive('itMasterHeader',function() {
        return {
            restrict: 'EA',
            require: '^itMaster',
            scope : false,
            transclude : true,
            template :' <div class="col-md-6">'+
                            '<div class="btn-toolbar" ng-transclude>'+

                            '</div>'+
                       '</div>'+
                       '<div class="col-md-6 pull-right">'+
                            '<div>'+
                                '<form>'+
                                    '<div class="form-group has-feedback" >'+
                                        '<span class="glyphicon glyphicon-search form-control-feedback"></span>'+
                                        '<input  it-input class="form-control floating-label" type="text" ng-model="$parent.filterText" class="form-control floating-label"  it-text="{{placeholderText}}"/>'+
                                    '</div>'+
                                '</form>'+
                            '</div>'+
                        '</div>',
            link : function (scope, element, attrs ) {
                scope.placeholderText = attrs.itSearchPlaceholder;
            }
        }

    });