'use strict';

module.exports =
    [
        '$scope',
        'authService',

        function($scope, authService){
            $scope.userData = authService.getIdentity();
        }
    ];
