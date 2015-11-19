'use strict';

module.exports = [
    '$scope',
    'authFactory',

    function ($scope, authFactory) {

        $scope.login = function() {
            console.log('login');
        };

        $scope.logout = function() {
            console.log('logout');
        };

        $scope.register = function() {
            console.log('register');
        };

    }

];