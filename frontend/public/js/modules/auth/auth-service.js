'use strict';

module.exports = [
    'authFactory',
    '$state',
    'authService',
    function (authFactory, $state, authService) {
        this.logout = function () {
            authService.clearIdentity();
            authFactory.logOut();
            $state.go('home');
        }
    }
];
