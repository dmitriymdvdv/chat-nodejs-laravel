'use strict';

EditProfileController.$inject =[
        '$scope',
        'authService'
   ];

function EditProfileController($scope, authService) {

    $scope.userData = authService.getIdentity();
    $scope.updateData = function (userData) {
        if(userData.email.$valid &&
            userData.mobile_phone.$valid) {

            authService.setIdentity(userData);
        }
    };
}

module.exports = EditProfileController;