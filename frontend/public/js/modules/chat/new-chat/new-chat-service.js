'use strict';

module.exports = [
    '$q',
    '$http',
    'appSettings',
    function ($q, $http, appSettings) {

        this.validateUsersField = function (fieldValue) {

            var deferred = $q.defer();

            if (fieldValue.length !== 0) {
                deferred.resolve();

            } else {

                deferred.reject();
            }
            return deferred.promise;
        };
        this.createNewChat = function (params) {

            return $http
                .post(appSettings.apiUrl + 'chat/create', params);
        };
        this.getUsers = function (params) {

            return $http
                .get(appSettings.apiUrl + 'users', {params: params})
        }

    }
];
