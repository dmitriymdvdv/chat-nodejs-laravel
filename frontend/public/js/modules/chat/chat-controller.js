'use strict';

module.exports =  [
    '$scope',
    '$state',
    'authService',
    function ($scope, $state, authService){
        $state.go('chats.overview');

        $scope.$on('chatName', function (event, data) {
            $scope.chatName = data;
        })
    }

];
