'use strict';

module.exports = function() {
    appRun.$inject = [
        '$rootScope',
        '$state',
        'authService',
        'authConfig'
    ];

    function appRun($rootScope, $state, authService, authConfig) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {

            if(authService.hasIdentity()) {
                 if(toState.data.access.indexOf(authConfig.user) !== -1) {
                     $state.go(toState.to);
                 } else {
                     $state.go('chats');
                 }
            }
            else {
                if(toState.data.access.indexOf(authConfig.guest) !== -1) {
                    $state.go(toState.to);
                } else {
                    $state.go('login');
                }
            }

        });

    }

    return appRun;
};