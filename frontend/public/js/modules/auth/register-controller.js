'use strict'

module.exports = function() {
    RegisterController.$inject = [
        '$scope',
        'authService',
        '$statesProvider',
        'userStates'
    ];

    function RegisterController($scope, authService, $statesProvider, userStates) {

        var loadUserData = function () {
            $scope.authData = authService.getIdentity();
        };
        loadUserData();
        $scope.registration = function (authData) {

            authService.setIdentity(authData);
            userStates($statesProvider, 'user').state.go('/api/v1/user/id');
        }
        return RegisterController;
    }
};
