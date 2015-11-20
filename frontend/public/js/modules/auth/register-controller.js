'use strict';

RegisterController.$inject =[
    '$scope',
    'authService',
    '$http',
    '$state'
];

function RegisterController($scope, authService, $http, $state) {
    
    $scope.authData = { };

    $scope.checkEmail = function(){
        if(!$scope.authData.email.match(/\w+@\w+\.\w/i)){
            
            $scope.signUpForm.email.$setValidity('text',false);

            if($scope.authData.email.indexOf(' ') != -1
                || $scope.authData.email.indexOf('..') != -1){

                $scope.signUpForm.email.$setValidity('text',false);
            }
        }else{
            $scope.signUpForm.email.$setValidity('text', true);
        }
    };

    $scope.checkPhone = function(){
        if(!$scope.authData.mobile_phone.match
            (/^[+.\d|\d]?[\d{2}]?[- .]?(\(\d{2}|\d{3}\)|(\d{2}|\d{3}))[- .]?\d{3}[- .]?\d{4}|\d{2}[- .]?\d{2}$/)
        ){
            $scope.signUpForm.phone.$setValidity('text', false);

        } else{
            $scope.signUpForm.phone.$setValidity('text', true);
        }
    };

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