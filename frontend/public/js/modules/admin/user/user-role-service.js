'use strict';

module.exports = [
    'userRoles',
    'defaultUserRole',
    function (userRoles, defaultUserRole) {
        return {
            getRoles: function() {
                return userRoles;
            },
            getDefaultUserRole: function() {
                return defaultUserRole;
            }
        };
    }
];