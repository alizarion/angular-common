/**
 * Created by dge on 14/12/2015.
 */
'use strict';
IteSoft.factory('itBlockNewPageModalService', ['$uibModal','$log','itPopup','BlockService','itNotifier',
    function ($uibModal,$log,itPopup,BlockService,itNotifier) {
        var self = this;
        function openModal(block) {
            self.itBlockNewPageModal = $uibModal.open({
                template: '<div class="modal-control-panel ">' +
                '</div>' +
                '<div ng-click="exit()" class="glyphicon glyphicon-remove template-add-block template-circle-btn float-right"></div>' +
                '<div ng-click="delete()" class="glyphicon glyphicon-trash template-add-block template-circle-btn float-right"></div>' +
                '<div ng-click="save()" class="glyphicon glyphicon-floppy-save template-add-block template-circle-btn float-right"></div>' +
                '<div class="modal-header"> ' +
                ' </div>' +
                '<div class="modal-body row row-height-10""> ' +
                '<block-edit block="block" class="col-xs-12 row-height-10"></block-edit> ' +
                '</div>',
                controller: ['$scope', '$uibModalInstance','$window','$location','$document', function ($scope, $uibModalInstance,$window,$location,$document) {
                    $scope.block = block;
                    $scope.location = $location.absUrl().replace("/dist/","/preview/");

                    $scope.exit = function () {
                        BlockService.build.get(function () {
                            location.reload();
                        }, function () {
                            $log.error("Unable to build dist  ")
                        })
                    };
                    $scope.save = function () {

                        
                    };
                    $scope.delete = function () {

                    };

                }],
                size: 'xxl',
                resolve: {}
            })

            return self.itBlockNewPageModal;
        }
        ;
        return {
            open: openModal,
        };
    }

]);