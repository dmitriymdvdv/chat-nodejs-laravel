'use strict';

module.exports = function() {
    appRun.$inject = [
        '$rootScope',
        '$state',
        'authService'
    ];

    function appRun($rootScope, $state, authService) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {

            if(fromState.url === '^') {
                if(authService.hasIdentity()) {
                    $state.go('home');
                } else {
                    $rootScope.error = null;
                    $state.go('login');
                }
            }
            else {
                if (!authService.hasIdentity()) {
                    $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
                    event.preventDefault();
                }
            }

        });

    }

    return appRun;
};