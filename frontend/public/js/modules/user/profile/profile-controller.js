'use strict';

module.exports = function(){
    ProfileController.$inject =[
        '$http',
        '$scope',
        'userService'
   ];

    function ProfileController($scope, authService) {

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
                $scope.authData.password = pass;
        };

        var updateAvatar = function (url) {
            $scope.authData.avatar = url;
        };


        $scope.updateUserData = function (authData) {

            loadUserData();
            updateData(authData.name, authData.surname,
                       authData.email, authData.birthday, authData.phone);

            updatePassword(authData.password);
            updateAvatar(authData.avatar);
            authService.setIdentity(authData);
        };
    }
    return ProfileController;
};