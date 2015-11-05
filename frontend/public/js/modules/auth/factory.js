'use strict';

module.exports = [

    '$http',
    'authService',

    function ($http, authService) {

        return {


            logIn: function (inputs) {
                return $http.post('/api/v1/auth/login', inputs);

            },

            register: function (inputs) {
                return $http.post('/api/v1/auth/register', inputs);
            },

            logOut: function () {

                return $http
                    .post('api/v1/auth/logout')
                    .then(function (data) {

                        if (data.status === 200) {
                            authService.deleteAllCookies();
                        }

                    });

            },



        }

    }];