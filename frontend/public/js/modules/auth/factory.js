'use strict';

module.exports = [

    '$http',
    'authService',
    'appSettings',
    '$state',
    '$q',

    function ($http, authService, appSettings, $state, $q) {

        return {

            logIn: function (inputs) {

                return $http
                    .post(appSettings.apiUrl + 'login', inputs)
                    .then(function(data) {
                        authService.setIdentity(data.data);
                        $state.go('chats');
                        return data;
                    }, function(error) {
                        return $q.reject(error);
                    });
            },

            register: function (inputs) {
                return $http.post('/api/v1/auth/register', inputs);
            },

            logOut: function () {
                return $http.get(appSettings.apiUrl + 'logout');
            }
        }
    }];