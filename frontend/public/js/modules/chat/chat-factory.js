'use strict';

module.exports = [
    '$http',
    'appSettings',
    function ($http, appSettings) {
        return {
            getChatsList: function (params) {
                return $http
                    .get(appSettings.apiUrl + 'chat/list', {params: params});
            },

            updateChat: function (params) {
                return $http
                    .put(appSettings.apiUrl + 'chat', params);
            },

            createNewChat: function (params) {

                return $http
                    .post(appSettings.apiUrl + 'chat/create', params);
            },

            getUsers: function (params) {

                return $http
                    .get(appSettings.apiUrl + 'users', {params: params});
            },

            leaveChat: function (params) {
                return $http
                    .put(appSettings.apiUrl + 'chat/leave', params);
            },

            deleteChat: function (params) {
                return $http
                    .delete(appSettings.apiUrl + 'chat', {params: params});
            }
        }
    }
];