"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itMasterHeader
 * @module itesoft
 * @restrict EA
 *
 * @description
 * A container element for master headers, MUST be include in {@link itesoft.directive:itMaster `<it-master>`},
 * can contain the action buttons of selected items.
 * for more information see {@link itesoft.directive:itMasterDetail `<it-master-detail>`}.
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *             <button class="btn btn-primary" title="Add" ng-disabled="currentItemWrapper.hasChanged" ng-click="myAction()"><span class="fa fa-plus fa-lg"></span></button>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *        <it-detail-header>
 *
 *       </it-detail-header>
 *
 *       <it-detail-content>
 *       </it-detail-content>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
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
                                        '<div class="form-group has-feedback it-master-header-search-group  col-xs-12 col-md-{{$parent.itCol < 4 ? 12 :6 }} pull-right" >'+
                                            '<span class="glyphicon glyphicon-search form-control-feedback"></span>'+
                                            '<input  class="form-control " type="text" ng-model="$parent.filterText" class="form-control floating-label"  placeholder="{{placeholderText}}"/>'+
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