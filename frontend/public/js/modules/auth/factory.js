'use strict';

module.exports = [

    '$http',
    'authService',
    'appSettings',
    '$state',

    function ($http, authService, appSettings, $state) {

        var error = {};

        return {

            logIn: function (inputs) {
                return $http.post('/api/v1/auth/login', inputs);

            },

            register: function (inputs) {
                return $http.post('/api/v1/auth/register', inputs);
            },

            logOut: function () {
                return $http
                    .get(appSettings.apiUrl + 'logout')
                    .then(function(data) {
                        if (data.status === 200) {
                            authService.clearIdentity();
                            error = {};
                            $state.go('login', {E:error});
                        }
                    },function(data){
                        if(data.status != 200){
                            error = 'Some problems with server. Try later, please';
                            $state.go('chats', {E: error});
                        }
                    });
            }
        }
    }];