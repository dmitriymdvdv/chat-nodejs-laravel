'use strict';

module.exports = [

    '$http',
    'authService',
    'appSettings',
    '$state',

    function ($http, authService, appSettings, $state) {

        var error = '';

        return {

            logIn: function (inputs) {
                return $http
                    .post(appSettings.apiUrl + 'login', inputs)
                    .then(function(data){
                        if(data.status === 200) {
                            authService.setIdentity(data.data);
                            $state.go('chats');
                        }
                    },function(data){
                        if(data.status === 401){
                            error = 'check your Email';
                            console.log(error);
                        } else{
                            if(data.status === 411){
                                error = 'check your password';
                                console.log(error);                            }
                        }
                        console.log(error);
                    });
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
                            $state.go('login');
                        }
                    },function(data){
                        if(data.status != 200){
                            error = 'Some problems with server. Try later, please';
                            $state.go('chats');
                        }
                    });
            },

            logErr: error
        }
    }];