
'use strict';

/**
 * @ngdoc directive
 * @name dependencies.directive:bs-datepicker
 * @module dependencies
 * @since 1.0
 * @description
 * AngularStrap Add datepicker functionality with any form text input.
 * Datepickers require the tooltip module and dateParser helper module to be loaded.
 * These docs currently use bootstrap-additions for styling purposes.
 * See more :  {@link http://mgcrea.github.io/angular-strap/#/datepickers mgcrea-datepickers}
 * @example
         <example module="itesoft">
             <file name="index.html">
                 <form name="datepickerForm" class="form-inline" role="form">
                 <div class="form-group" ng-class="{'has-error': datepickerForm.date.$invalid}">
                 <label class="control-label"><i class="fa fa-calendar"></i> Date <small>(as date)</small></label>
                 <input type="text" class="form-control" ng-model="selectedDate" name="date" bs-datepicker>
                 </div>
                 <div class="form-group" ng-class="{'has-error': datepickerForm.date2.$invalid}">
                 <label class="control-label"><i class="fa fa-calendar"></i> Date <small>(as number)</small></label>
                 <input type="text" class="form-control" ng-model="selectedDateAsNumber" data-date-format="yyyy-MM-dd" data-date-type="number" data-min-date="02/10/86" data-max-date="today" data-autoclose="1" name="date2" bs-datepicker>
                 </div>
                 <hr>
                 <div class="form-group">
                 <label class="control-label"><i class="fa fa-calendar"></i> <i class="fa fa-arrows-h"></i> <i class="fa fa-calendar"></i> Date range <small>(dynamic)</small></label><br>
                 <div class="form-group col-xs-6">
                 <input type="text" class="form-control" ng-model="fromDate" data-max-date="{{untilDate}}" placeholder="From" bs-datepicker>
                 </div>
                 <div class="form-group col-xs-6">
                 <input type="text" class="form-control" ng-model="untilDate" data-min-date="{{fromDate}}" placeholder="Until" bs-datepicker>
                 </div>
                 </div>
                 </form>
             </file>

         </example>
 */