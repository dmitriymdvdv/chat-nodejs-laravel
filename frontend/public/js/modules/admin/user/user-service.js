'use strict';

var _ = require('lodash');

module.exports = [
    'userRoleService',
    'defaultUserRole',
    'userRoles',
    function (userRoleService, defaultUserRole, userRoles) {
        var users = [
            {
                id: 1,
                name: 'Yury Chetyrbok',
                email: 'yury.chetyrbok@itechart-group.com',
                role: userRoles.ADMIN
            }
        ];

        this.getUsers = function () {
            return users;
        };

        this.getUser = function (id) {
            return _.find(users, function(user) {
                return user.id === id;
            });
        };

        this.addUser = function (name, email) {
            users.push({
                id: users.length + 1,
                name: name,
                email: email,
                role: defaultUserRole
            });
        };

        this.updateUser = function (id, name, email) {
            var user = this.getUser(id);

            if (user) {
                user.name = name;
                user.email = email;
            }
        };

        this.deleteUser = function(userId) {
            users = users.filter(function(user) {
                return user.id !== userId;
            });
        };
    }
];