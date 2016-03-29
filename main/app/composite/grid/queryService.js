'use strict';
/**
 * Service that provide RSQL query
 */
IteSoft.factory('itQueryFactory', ['OPERATOR', function (OPERATOR) {
        function Query(parameters, start, size, sort) {
            this.parameters = parameters;
            this.start = start;
            this.size = size;
            this.sort = sort;
            /**
             * Method that return RSQL path
             * @returns {string}: query=id==1 and name=="name"
             */
            this.build = function () {
                var result = '';
                if (parameters != undefined) {
                    this.parameters.forEach(function (entry) {
                        if(angular.isDefined(entry.value) && angular.isDefined(entry.key)) {

                            //Si c'est une date max, on définit l'heure à 23h59
                            if((entry.value instanceof Date) && (entry.operator == OPERATOR.LESS_EQUALS)){
                                entry.value.setHours(23);
                                entry.value.setMinutes(59);
                                entry.value.setSeconds(59);
                                entry.value.setMilliseconds(999);
                            }

                            if (result.length > 0) {
                                result += " and ";
                            }

                            //formattage ISO des dates
                            if (entry.value instanceof Date) {
                                entry.value = entry.value.toISOString();
                            }

                            if (entry.operator == OPERATOR.LIKE) {
                                entry.value = entry.value + '%';
                            }
                            result += entry.key + entry.operator + entry.value;
                        }
                    });
                }
                result = 'query=' + result;
                if (size != null && angular.isDefined(size) && size != '') {
                    result += "&size=" + this.size;
                }
                if (start != null && angular.isDefined(start) && start != '') {
                    result += "&start=" + this.start;
                }
                //le sorting en décroissant s'écrit -fieldName
                if (sort != undefined) {
                    if (this.sort.name != undefined) {
                        result += "&sort="
                        if (this.sort.direction == "desc") {
                            result += "-"
                        }
                        result += this.sort.name;
                    }
                }
                return result;

            };


        }

        return {
            create: function (parameters, start, size, sort) {
                return new Query(parameters, start, size, sort);
            }
        }
    }
    ]
);