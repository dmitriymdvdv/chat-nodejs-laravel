'use strict';

module.exports = [
    '$http',
    'authService',
    'appSettings',
    '$state',
    '$q',

    function($http, authService, appSettings, $state, $q) {
        return {
            update: function(userData){
                return $http
                    .put(appSettings.apiUrl + 'user/edit', userData)
                    .then(function(data){
                        authService.setIdentity(data.data);
                        $state.go('profile');
                        return data;
                    },function(error){
                        return $q.reject(error);
                    });
            },

            destroy: function(){
                return $http
                    .delete(appSettings.apiUrl + 'user/')
                    .then(function(data){
                        authService.clearIdentity();
                        $state.go('login');
                        return data;
                    }, function(error){
                        return $q.reject(error);
                    });
            },

            fileUpload: function(userData){
                return $http
                    .post(appSettings.apiUrl + 'user/edit', userData)
                    .then(function(data){

                    },function(error){
                        return $q.reject(error);
                    });
            }
        }
    }
];