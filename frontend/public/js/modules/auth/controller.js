'use strict';

module.exports = function () {
    authController.$inject = [
        '$scope',
        'authFactory'
    ];

    function authController($scope, authFactory) {

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

    return authController;
};