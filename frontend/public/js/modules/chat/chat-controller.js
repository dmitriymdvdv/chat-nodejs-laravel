'use strict';

module.exports =  [
    '$scope',
    '$state',
    'authService',
    function ($scope, $state, authService){
        $state.go('chats.overview');
    }

];
