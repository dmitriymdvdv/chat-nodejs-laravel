'use strict';

EditProfileController.$inject =[
        '$scope',
        'authService'
   ];

function EditProfileController($scope, authService) {

    $scope.userData = authService.getIdentity();
    $scope.updateData = function (authData) {
        if($scope.userData.email.$valid &&
            $scope.userData.mobile_phone.$valid) {

            authService.setIdentity($scope.userData);
        }
    };
}

module.exports = EditProfileController;