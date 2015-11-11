'use strict';

module.exports = function() {

    ChatController.$inject = [
        '$scope'
    ];

    function ChatController($scope){
        $scope.isChatPicked = false;
    }

    return ChatController;

};
