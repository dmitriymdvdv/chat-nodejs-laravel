'use strict';

module.exports = [
    '$scope',
    'authService',
    '$http',
    '$state',
    'appSettings',
    function ($scope, authService, $http, $state, appSettings) {

        $scope.login = function(authData) {
            $http.post(appSettings.apiUrl + 'login', authData)
                .success(function(){
                    authService.setIdentity(authData);
                    $state.go('chats');
                    $scope.error = {};
                }).error(function(data, status){
                    if(status == 401){
                        $scope.error = 'check your email';
                    }
                    else {
                        if(status == 411){
                            $scope.error = 'check your password';
                        }
                    }
            });
        };

        $scope.register = function() {
            console.log('register');
        };

    }

];