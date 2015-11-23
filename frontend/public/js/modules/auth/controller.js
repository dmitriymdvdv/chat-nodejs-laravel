'use strict';

module.exports = [
    '$scope',
    'authService',
    '$http',
    '$state',

    function ($scope, authService, $http, $state) {
        var url = 'http://slack.dev/api/v1';
        var authData = authService.getIdentity();

        $scope.login = function(authData) {
            console.log('login');
            $http.post(url + '/login', authData)
                .success(function(){
                    $state.go('chats');
                }).error(function(status){
                    if(status == 401){ $state.go('register');}
                    else {
                        if(status == 403){ console.log('Invalid data');}
                    }
            });
        };

        $scope.logout = function() {
            console.log('logout');
            $http.get(url + '/logout', authData)
                .success(function(){
                    authData = {};
                    $state.go('login');
                }).error(function(){
                    console.log('Sorry, smth wrong');
            });
        };

        $scope.register = function() {
            console.log('register');
        };

    }

];