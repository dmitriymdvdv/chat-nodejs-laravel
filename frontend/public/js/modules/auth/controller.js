'use strict';

module.exports = [
    '$scope',
    'authFactory',

    function ($scope, authFactory) {

        $scope.login = function(authData) {
            authFactory
                .logIn(authData)
                .then(function(data) {
                    console.log('Success!');
                }, function(error) {
                    $scope.error = error.data['error_message'];
                    console.log('Error!');
                });
        };

        $scope.register = function() {
            console.log('register');
        };
    }
];