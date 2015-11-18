'use strict';

module.exports = [
    '$q',
    function ($q) {

        this.validateUsersField = function (fieldValue) {

            var deferred = $q.defer();

            if (fieldValue.length !== 0) {
                deferred.resolve();

            } else {

                deferred.reject();
            }
            return deferred.promise;
        }
    }
];
