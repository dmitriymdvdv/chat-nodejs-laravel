'use strict';

module.exports = [
    '$rootScope',
    '$scope',
    '$modalInstance',
    'data',
    'linked',
    'NewChatService',
    'authService',
    'ChatFactory',
    function ($rootScope,
              $scope,
              $modalInstance,
              data,
              linked,
              NewChatService,
              authService,
              ChatFactory) {

        $scope.chat = angular.copy(data);
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
        $scope.users = [];

        $scope.$watch('chat.users', function (newValue, oldValue) {

            if ($scope.chat.users) {
                NewChatService
                    .validateUsersField($scope.chat.users)
                    .then(function () {
                        $scope.errors.inputUsersField.valid = true;
                    }, function () {
                        $scope.errors.inputUsersField.valid = false;
                    });
            } else {
                $scope.errors.inputUsersField.valid = true;
            }

        }, true);

        $scope.refreshUsers = function (query) {
            if (query != "") {
                var params = {
                    query: query,
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

        function create() {
            var params = angular.copy($scope.chat);
            params.users = getUsersId(params.users);
            ChatFactory
                .createNewChat(params)
                .then(function (response) {
                    sendToListener('newChatCreated', response.data);
                    $modalInstance.close();
                }, function () {
                    $scope.errors.newChatError.show = true;
                });
        }

        function sendToListener(event, data) {
            $rootScope.$broadcast(event, data);
        }

        function update() {
            var params = angular.copy($scope.chat);
            params.users = getUsersId(params.users);
            ChatFactory
                .updateChat(params)
                .then(function () {
                    data.name = $scope.chat.name;
                    data.description = $scope.chat.description;
                    data.users = $scope.chat.users;
                    $modalInstance.close();
                }, function () {
                    $scope.errors.newChatError.show = true;
                });
        }


        $scope.sendData = function () {
            if ($scope.newChatModalForm.$valid && $scope.errors.inputUsersField.valid) {
                if (!$scope.chat.id) {
                    create();
                } else if ($scope.chat.id) {
                    update();
                }
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
];