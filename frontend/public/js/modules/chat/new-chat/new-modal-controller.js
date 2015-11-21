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
                users: [],
                errors: {
                    inputUsersField: {
                        valid: false,
                        message: 'Field must contain at least one user.'
                    },
                    newChatError: {
                        show: false,
                        message: 'An error has occurred. Try again later.'
                    }
                }
            };

            $scope.modalTitle = data.modalTitle;
            $scope.users = [];

            $scope.refreshUsers = function (user) {
                if (user != "") {
                    var params = {
                        user: user,
                        //TODO: delete authorId from request
                        authorId: data.authData.id,
                        usersId: getUsersId($scope.chat.users)
                    };
                    NewChatService.getUsers(JSON.stringify(params))
                        .then(function (response) {
                            $scope.users = response.data;
                        });
                }
                return [];
            };

            function getUsersId(users) {
                var selectedUsersId = [];
                for (var i = 0; i < users.length; i++) {

                    selectedUsersId.push(users[i].id);
                }
                return selectedUsersId;
            }

            $scope.validateUsersField = function () {
                NewChatService
                    .validateUsersField($scope.chat.users)
                    .then(function () {
                        $scope.chat.errors.inputUsersField.valid = true;
                    }, function () {
                        $scope.chat.errors.inputUsersField.valid = false;
                    });

            };

            $scope.create = function () {
                if ($scope.newChatModalForm.$valid && $scope.chat.errors.inputUsersField.valid) {

                    var params = {
                        chatData: {
                            name: $scope.chat.name,
                            description: $scope.chat.description,
                            is_private: data.isPrivate,
                            //TODO: delete authorId from request
                            user_id: data.authData.id
                        },
                        usersInChat: {
                            users_id: getUsersId($scope.chat.users)
                        }
                    };
                    console.log(params);
                    NewChatService
                        .createNewChat(JSON.stringify(params))
                        .then(function () {
                            $modalInstance.close();
                        }, function () {
                            $scope.chat.errors.newChatError.show = true;
                        });
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ];
