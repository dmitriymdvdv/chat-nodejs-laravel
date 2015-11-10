'use strict';

module.exports = function() {
    appRun.$inject = [
        '$rootScope',
        '$state',
        'authService',
        'authRoles'
    ];

    function appRun($rootScope, $state, authService, authRoles) {
        console.log('hello');

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {

            if(authService.hasIdentity()) {
                 if(toState.data.access.indexOf(authRoles.user) !== -1) {
                     $state.go(toState.to);
                 } else {
                     $state.go('chats');
                 }
            }
            else {
                if(toState.data.access.indexOf(authRoles.guest) !== -1) {
                    $state.go(toState.to);
                } else {
                    $state.go('login');
                }
            }

        });

    }

    return appRun;
};