'use strict';

module.exports = [
    '$http',
    'appSettings',
    function ($http, appSettings) {
        return {
            createNewChat: function (params) {

                return $http
                    .post(appSettings.apiUrl + 'chat/create', params);
            },
            getUsers: function (params) {

                return $http
                    .get(appSettings.apiUrl + 'users', {params: params})
            }
        }
    }
];
