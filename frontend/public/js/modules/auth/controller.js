'use strict';

module.exports = [
    '$scope',
    'authFactory',

    function ($scope, authFactory) {

        $scope.login = function(authData) {
            authFactory.logIn(authData);
            $scope.error = authFactory.logErr;
        };

        $scope.register = function() {
            console.log('register');
        };
    }
];