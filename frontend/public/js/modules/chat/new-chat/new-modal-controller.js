'use strict';

module.exports = [
        '$scope',
        '$modalInstance',
        'data',
        'NewChatService',
        'NewChatFactory',
        function ($scope, $modalInstance, data, NewChatService, NewChatFactory) {

            $scope.chat = {
                name: '',
                description: '',
                users: []
            };

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

            $scope.modalTitle = data.modalTitle;
            $scope.users = [];

            $scope.refreshUsers = function (query) {
                if (query != "") {
                    var params = {
                        query: query,
                        //TODO: delete authorId from request
                        user_id: data.authData.id,
                        'users_id[]': getUsersId($scope.chat.users)
                    };
                    NewChatFactory.getUsers(params)
                        .then(function (response) {
                            $scope.users = response.data;
                        });
                }
            };

            function getUsersId(users) {

                var selectedUsersId = users.map(function (user) {
                    return user.id;
                });
                return selectedUsersId;
            }

            $scope.validateUsersField = function () {
                NewChatService
                    .validateUsersField($scope.chat.users)
                    .then(function () {
                        $scope.errors.inputUsersField.valid = true;
                    }, function () {
                        $scope.errors.inputUsersField.valid = false;
                    });

            };

            $scope.create = function () {
                if ($scope.newChatModalForm.$valid && $scope.errors.inputUsersField.valid) {

                    var params = {
                        chatData: {
                            name: $scope.chat.name,
                            description: $scope.chat.description,
                            is_private: data.isPrivate,
                            //TODO: delete authorId from request
                            user_id: data.authData.id,
                            users_id: getUsersId($scope.chat.users)
                        }
                    };
                    NewChatFactory
                        .createNewChat(params)
                        .then(function () {
                            $modalInstance.close();
                        }, function () {
                            $scope.errors.newChatError.show = true;
                        });
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ];
