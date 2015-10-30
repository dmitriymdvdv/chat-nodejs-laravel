'use strict';

module.exports = [
    '$scope',
    'userService',
    function ($scope, userService) {
        $scope.totalUsers = userService.getUsers().length;
    }
];