'use strict'

var json = require('../../fakeJson.json');

module.exports = function(){
    editController.$inject =[
        '$http',
        '$scope',
        'userService'
    ];

    function editController($scope, authService) {

        var errorFlag = false;
        var badPass = false;
        var messageStr = "";

        var loadUserData = function () {
            $scope.authData = authService.getIdentity();
        };

        loadUserData();

        var updateData = function (name, surname, email, birthDate, mobilePhone) {
            if (authService.hasIdentity()) {
                    $scope.authData.name = name;
                    $scope.authData.surname = surname;
                    $scope.authData.email = email;
                    $scope.authData.birthday = birthDate;
                    $scope.authData.phone = mobilePhone;
            }
        };

        var updatePassword = function (pass) {
            if ($scope.updateForm.cnfrmPass.textContent === $scope.updateForm.pass.textContent) {
                $scope.authData.password = pass;
                $scope.badPass = false;

            } else {
                $scope.badPass = true;
            }
        };

        var updateAvatar = function (url) {
            $scope.authData.avatar = url;
            $scope.errorFlag = false;
            $scope.errorFlag = true;
        };
    //general function messageStr - error message

        var errorMessage = function (generalFlag, passwordFlag){
            $scope.errorFlag ?
                $scope.badPass ? $scope.messageStr= "check your input data and password"
                    : $scope.messageStr= "check your inout data"
                : $scope.badPass ? $scope.messageStr= "your passwords are difference"
                    : $scope.messageStr= "";
        };

        $scope.updateUserData = function (authData) {

            loadUserData();

    //data validation

            if ($scope.updateForm.firstName.$valid || $scope.updateForm.lastName.$valid
                || $scope.updateForm.email.$valid || $scope.updateForm.birthday.$valid
                || $scope.updateForm.phone.$valid) {

                     updateData(authData.name, authData.surname,
                                authData.email, authData.birthday, authData.phone);

                    $scope.errorFlag = false;
                errorMessage( $scope.errorFlag, $scope.badPass);

            } else{
                $scope.errorFlag = true;
                errorMessage( $scope.errorFlag, $scope.badPass);
            }



    //password validation

            if ($scope.updateForm.cnfrmPass.$dirty &&
                $scope.updateForm.pass.$dirty &&
                $scope.updateForm.cnfrmPass.$invalid &&
                $scope.updateForm.pass.$invalid)
            {
                $scope.errorFlag = true;
                errorMessage( $scope.errorFlag, $scope.badPass);

            } else{
                if($scope.updateForm.cnfrmPass.$valid || $scope.updateForm.pass.$valid)
                {
                    updatePassword(authData.password);
                    $scope.errorFlag = false;
                    errorMessage( $scope.errorFlag, $scope.badPass);
                }
            }
    //avatar field validation

            if ($scope.updateForm.avatar.$dirty && $scope.updateForm.avatar.$valid) {

                $scope.errorFlag = false;
                updateAvatar(authData.avatar);
                authService.setIdentity(authData);
                errorMessage( $scope.errorFlag, $scope.badPass);

            } else{

                if($scope.updateForm.avatar.$dirty && $scope.updateForm.avatar.$invalid){

                    $scope.errorFlag = true;
                    errorMessage( $scope.errorFlag, $scope.badPass);

                } else{

                    $scope.errorFlag = false;
                    errorMessage( $scope.errorFlag, $scope.badPass);
                }
            }
        };
    }

    var route = function ($http){
        return{
            editProfile: function(inputs){
                return $http.post('/api/v1/auth/edit', inputs);
            }
        }
    }

    return editController;
};
