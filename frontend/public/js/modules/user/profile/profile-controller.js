'use strict';

ProfileController.$inject = [
    '$scope',
    'authService'
];

function ProfileController($scope, authService) {
    $scope.userData = authService.getIdentity();
}

 module.exports = ProfileController;