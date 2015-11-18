'use strict';

EditProfileController.$inject =[
        '$scope',
        'authService'
   ];

function EditProfileController($scope, authService) {

    $scope.userData = authService.getIdentity();
    //
    $scope.checkEmail = function(){
        if(!$scope.userData.email.match(/\w+@\w+\.\w/i)){

            $scope.updateForm.email.$setValidity('text',false);

            if($scope.userData.email.indexOf(' ') != -1
                || $scope.userData.email.indexOf('..') != -1){

                $scope.updateForm.email.$setValidity('text',false);
            }
        }else{
            $scope.updateForm.email.$setValidity('text', true);
        }
    };
    //
    $scope.checkPhone = function(){
        if(!$scope.userData.mobile_phone.match
            (/^[+.\d|\d]?[\d{2}]?[- .]?(\(\d{2}|\d{3}\)|(\d{2}|\d{3}))[- .]?\d{3}[- .]?\d{4}|\d{2}[- .]?\d{2}$/)
        ){
            $scope.updateForm.phone.$setValidity('text', false);

        } else{
            $scope.updateForm.phone.$setValidity('text', true);
        }
    };
    //
    $scope.updateData = function (authData) {
        if($scope.userData.email.$valid &&
            $scope.userData.mobile_phone.$valid) {

            authService.setIdentity($scope.userData);
        }
    };
}

module.exports = EditProfileController;