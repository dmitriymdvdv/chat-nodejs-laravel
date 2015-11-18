'use strict';

module.exports =

    [
        '$scope',
        '$modalInstance',
        'data',
        '$http',
        'NewChatService',
        function ($scope, $modalInstance, data, $http, NewChatService) {

            $scope.chat = {
                name: '',
                description: '',
                users: []
            };

            $scope.modalTitle = data.modalTitle;
            $scope.users = [];

            $scope.refreshUsers = function (user) {
                var params = {user: user};
                return $http.get('http://slack.dev/api/v1/test/', {params: params})
                    .then(function (response) {
                        $scope.users = response.data;
                    });
            };

            $scope.validateUsersField = function () {
                NewChatService
                    .validateUsersField($scope.chat.users)
                    .then(function () {
                        $scope.isUsersFieldValid = true;
                    }, function () {
                        $scope.isUsersFieldValid = false;
                    });

            };

            $scope.create = function () {
                if ($scope.newChatModalForm.$valid && $scope.isUsersFieldValid) {
                    $modalInstance.close();
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ];
