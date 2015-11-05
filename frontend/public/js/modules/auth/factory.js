'use strict';

module.exports = [

    '$http',
    '$cookies',
    function ($http) {

        return {

            logOut: function () {

                return $http
                    .post('/api/v1/auth/logout')
                    .then(function (data) {

                        if (data.status === 200) {
                            //TODO clear cookie;
                        }
                    });
            }

        }

    }];