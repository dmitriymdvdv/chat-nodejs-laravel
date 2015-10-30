'use strict';

module.exports = [
    '$scope',
    'user',
    function ($scope, user) {
        $scope.user = user;
    }
];