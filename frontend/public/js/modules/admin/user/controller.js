'use strict';

module.exports = [
    '$scope',
    'userService',
    function ($scope, userService) {
        var loadUsers = function () {
            $scope.users = userService.getUsers();
        };

        loadUsers();

        $scope.addUser = function() {
            if ($scope.addUserForm.$valid) {
                if ($scope.userData.id) {
                    userService.updateUser(
                        $scope.userData.id,
                        $scope.userData.name,
                        $scope.userData.email
                    );
                } else {
                    userService.addUser(
                        $scope.userData.name,
                        $scope.userData.email
                    );
                }

                loadUsers();
                $scope.hideAddUserForm();
            }
        };

        $scope.deleteUser = function (user) {
            userService.deleteUser(user.id);
            loadUsers();
        };

        $scope.editUser = function (user) {
            $scope.userData = angular.copy(user);
            $scope.editMode = true;
            $scope.showForm = true;
        };

        $scope.showAddUserForm = function () {
            $scope.editMode = false;
            $scope.showForm = true;
            $scope.userData = {};
        };

        $scope.hideAddUserForm = function () {
            $scope.showForm = false;
        };

        $scope.$watch('userData.name', function(newVal, oldVal) {
            console.log(newVal);
        });
    }
];