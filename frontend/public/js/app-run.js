'use strict';

module.exports =  [
    '$rootScope',
    '$state',
    'authService',
    'authRoles',
    function ($rootScope, $state, authService, authRoles) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
                if (authService.hasIdentity()) {
                    if (toState.data.access.indexOf(authRoles.user) === -1) {
                        event.preventDefault();
                        $state.go('chats');
                    }
                } else {
                    if (toState.data.access.indexOf(authRoles.guest) === -1) {
                        event.preventDefault();
                        $state.go('login');
                    }
                }
        });

    }
];