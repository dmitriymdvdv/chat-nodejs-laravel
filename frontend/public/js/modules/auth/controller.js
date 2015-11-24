'use strict';

module.exports = [
    '$scope',
    'authService',
    '$http',
    '$state',
    'appSettings',
    function ($scope, authService, $http, $state, appSettings) {
        var url = 'http://slack.dev/api/v1';
        /*var authData = authService.getIdentity();*/

        $scope.login = function(authData) {
            $http.post(url + '/login', authData)
                .success(function(){
                    console.log('this:' + authData);
                    authService.setIdentity(authData);
                    $state.go('chats');
                }).error(function(data, status){
                    if(status == 401){
                        //return message about error

                        $state.go('login');
                    }
                    else {
                        if(status == 403){ console.log('Invalid data');}
                    }
            });
        };

        $scope.logout = function() {
            console.log('logout');
            $http.get(url + '/logout', authData)
                .success(function(authData, status){
                    if(status == 200)
                    authService.clearIdentity();
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