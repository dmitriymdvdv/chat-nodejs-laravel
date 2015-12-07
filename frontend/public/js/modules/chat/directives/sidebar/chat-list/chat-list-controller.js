'use strict';

module.exports = [
    '$scope',
    'data',
    '$modalInstance',
    function ($scope, data, $modalInstance) {

        $scope.chats  = angular.copy(data);
        
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        }
    }
];
