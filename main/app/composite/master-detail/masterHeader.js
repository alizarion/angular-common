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
            template :'<div class="fuild-container">   <div class="row it-fill">   <div class="it-md-header col-xs-12 col-md-12">'+
                                '<div class="btn-toolbar it-fill" ng-transclude>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-xs-12 col-md-12 pull-right">'+
                                '<div>'+
                                    '<form>'+
                                        '<div class="form-group has-feedback it-master-header-search-group" >'+
                                            '<span class="glyphicon glyphicon-search form-control-feedback"></span>'+
                                            '<input  it-input class="form-control floating-label" type="text" ng-model="$parent.filterText" class="form-control floating-label"  it-text="{{placeholderText}}"/>'+
                                        '</div>'+
                                    '</form>'+
                                '</div>'+
                            '</div>'+
                '</div>'+
                        '</div>',
            link : function (scope, element, attrs ) {
                scope.placeholderText = attrs.itSearchPlaceholder;
            }
        }

    });