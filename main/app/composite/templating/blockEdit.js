'use strict';

IteSoft.directive('blockEdit', [function () {
    return {
        restrict: 'E',
        template: '<div class="readOnly-block"> <div class="inside-block-tags"> ' +
        '<div ui-codemirror="{ lineNumbers: true, theme:\'dracula\', lineWrapping : true, mode: \'xml\', ' +
        'smartIndent:  true, readOnly: false, viewportMargin: 1000 }" ' +
        'ng-model="blockEditController.fields.block.content"> </div>',
        scope: {
            block: '='
        },
        controllerAs: 'blockEditController',
        controller: ['$scope', '$rootScope', '$log', '$route', 'EVENT', 'BlockService', 'CONFIG',
            function ($scope, $rootScope, $log, $route, EVENT, BlockService, CONFIG) {
            var self = this;

            self.fields = {
                blocksBefore: [],
                blocksAfter: [],
                block: {},
                loaded: false
            };

            //TODO there is multiple before and after tag
            self.fn = {};

            self.fields.block = $scope.block;
            $scope.$watch('block', function (olValue, newValue) {
                self.fields.block = $scope.block;
            });

            function deleteBlock() {
                var confirmPopup = itPopup.confirm({
                    title: "{{'DELETE_BLOCK_TITLE' | translate}}",
                    text: "{{'DELETE_BLOCK_CONFIRM' | translate}}",
                    buttons: [

                        {
                            text: 'Cancel',
                            type: '',
                            onTap: function () {
                                return false;
                            }
                        },
                        {
                            text: 'ok',
                            type: '',
                            onTap: function () {
                                return true;
                            }
                        }
                    ]
                });
                confirmPopup.then(function (res) {
                    BlockService.custom.delete({'name':self.fields.block.name}, function () {
                        BlockService.build.get(function () {
                            self.fields.block = {};
                            itNotifier.notifySuccess({
                                content: "{{'BLOCK_DELETED_OK' | translate}}"
                            });
                            $route.reload();
                            debugger;
                        }, function () {
                            $log("Unable to build dist");
                        })
                    }, function () {
                        $log("Unable to delete block");
                    })
                }, function () {
                    itNotifier.notifyError({
                        content: "{{'BLOCK_DELETED_KO' | translate}}"
                    });
                });
            }

        }]
    }
}
]);