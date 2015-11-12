'use strict';

module.exports = function() {
    return {
        restrict: 'AE',
        controller: [
            '$scope',
            '$modal',
            function ($scope, $modal) {
                $scope.openNewChatModal = function () {
                    var $modalInstance = $modal.open({
                        template: require('../../new-chat/template.html'),
                        controller: 'NewModalController'
                    });
                };
            }
        ],
        template: require('./sidebar.html')
    }
};