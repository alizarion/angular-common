"use strict";
/**
 * You do not talk about FIGHT CLUB!!
 */
IteSoft
    .directive("konami", ['$document','$uibModal', function($document,$uibModal) {
        return {
            restrict: 'A',
            template : '<style type="text/css"> @-webkit-keyframes easterEggSpinner { from { -webkit-transform: rotateY(0deg); } to { -webkit-transform: rotateY(-360deg); } } @keyframes easterEggSpinner { from { -moz-transform: rotateY(0deg); -ms-transform: rotateY(0deg); transform: rotateY(0deg); } to { -moz-transform: rotateY(-360deg); -ms-transform: rotateY(-360deg); transform: rotateY(-360deg); } } .easterEgg { -webkit-animation-name: easterEggSpinner; -webkit-animation-timing-function: linear; -webkit-animation-iteration-count: infinite; -webkit-animation-duration: 6s; animation-name: easterEggSpinner; animation-timing-function: linear; animation-iteration-count: infinite; animation-duration: 6s; -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -ms-transform-style: preserve-3d; transform-style: preserve-3d; } .easterEgg img { position: absolute; border: 1px solid #ccc; background: rgba(255,255,255,0.8); box-shadow: inset 0 0 20px rgba(0,0,0,0.2); } </style>',
            link: function(scope) {
                var konami_keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], konami_index = 0;

                var handler = function(e) {
                    if (e.keyCode === konami_keys[konami_index++]) {
                        if (konami_index === konami_keys.length) {
                            $document.off('keydown', handler);

                            var modalInstance =  $uibModal.open({
                                template: '<div style="max-width: 100%;" class="easterEgg"> <img style="-webkit-transform: rotateY(0deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> <img style="-webkit-transform: rotateY(-72deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> <img style="-webkit-transform: rotateY(-144deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> <img style="-webkit-transform: rotateY(-216deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> <img style="-webkit-transform: rotateY(-288deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> </div>'
                                   ,
                                size: 'lg'
                            });
                            scope.cancel = function(){
                                modalInstance.dismiss('cancel');
                            } ;
                        }
                    } else {
                        konami_index = 0;
                    }
                };

                $document.on('keydown', handler);

                scope.$on('$destroy', function() {
                    $document.off('keydown', handler);
                });
            }
        };
    }]);