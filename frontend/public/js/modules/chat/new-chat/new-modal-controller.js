'use strict';

var _ = require('lodash');

module.exports = [
    '$scope',
    '$modalInstance',
    'data',
    'NewChatService',
    'authService',
    'ChatFactory',
    'ChatConst',
    function ($scope,
              $modalInstance,
              data,
              NewChatService,
              authService,
              ChatFactory,
              ChatConst) {

        $scope.chat = angular.copy(data.chat || ChatConst.chat);
        $scope.chat.users = unsetAuthUser($scope.chat.users);
        $scope.errors = {
            inputUsersField: {
                valid: false,
                message: 'Field must contain at least one user.'
            },
            newChatError: {
                show: false,
                message: 'An error has occurred. Try again later.'
            }
        };
        $scope.typeOfChat = data.typeOfChat;
        $scope.users = [];

        $scope.$watch('chat.users', function (newValue, oldValue) {
            NewChatService
                .validateUsersField($scope.chat.users)
                .then(function () {
                    $scope.errors.inputUsersField.valid = true;
                }, function () {
                    $scope.errors.inputUsersField.valid = false;
                });

        }, true);

        $scope.refreshUsers = function (query) {
            if (query != "") {
                var params = {
                    query: query,
                    //TODO: delete authorId from request
                    user_id: authService.getIdentity().id,
                    'users_id[]': getUsersId($scope.chat.users)
                };
                ChatFactory.getUsers(params)
                    .then(function (response) {
                        $scope.users = response.data;
                    });
            }
        };

        function getUsersId(users) {
            return _.pluck(users, 'id');
        }

        function unsetAuthUser(users) {
            _.remove(users, 'id', Number(authService.getIdentity().id));
            return users;

        }


        $scope.sendData = function () {
            if ($scope.newChatModalForm.$valid && $scope.errors.inputUsersField.valid) {
                if (!$scope.chat.id) {
                    var params = angular.copy($scope.chat);
                    //TODO: delete authdata from request
                    params.user_id = authService.getIdentity().id;
                    params.users = getUsersId(params.users);
                    params.is_private = data.typeOfChat;
                    ChatFactory
                        .createNewChat(params)
                        .then(function () {
                            $modalInstance.close();
                        }, function () {
                            $scope.errors.newChatError.show = true;
                        });
                } else if ($scope.chat.id) {
                    var params = angular.copy($scope.chat);
                    params.users = getUsersId(params.users);
                    ChatFactory
                        .updateChat(params)
                        .then(function () {
                            data.chat.name = $scope.chat.name;
                            data.chat.description = $scope.chat.description;
                            data.chat.users = $scope.chat.users;
                            $modalInstance.close();
                        }, function () {
                            $scope.errors.newChatError.show = true;
                        });

                }

            }

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
];