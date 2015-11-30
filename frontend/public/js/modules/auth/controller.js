'use strict';

module.exports = [
    '$scope',
    'authFactory',

    function ($scope, authFactory) {

        $scope.login = function(authData) {
            authFactory
                .logIn(authData)
                .then(function(data) {
                }, function(error) {
                    $scope.error = error.data['error_message'];
                });
        };

        $scope.register = function() {};
    }
];