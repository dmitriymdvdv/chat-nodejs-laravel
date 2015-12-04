'use strict';

module.exports = [
    '$scope',
    'data',
    '$modalInstance',
    function ($scope, data, $modalInstance) {

        $scope.users  = angular.copy(data);

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        }
    }
];
