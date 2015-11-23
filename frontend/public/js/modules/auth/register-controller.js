'use strict';

RegisterController.$inject =[
    '$scope',
    'authService',
    '$http',
    '$state'
];

function RegisterController($scope, authService, $http, $state) {

    $scope.authData = { };

    $scope.registration = function(authData){

        if($scope.signUpForm.email.$valid && $scope.signUpForm.phone.$valid) {

            var baseUrl = 'http://slack.dev/api/v1/';

            $http.post(baseUrl + 'register', authData)
                .success(function (res) {
                    authService.setIdentity(res);
                    $state.go('chats');
                })
                .error(function() {
                    console.log('error');
                });
        }
    };
}

module.exports = RegisterController;