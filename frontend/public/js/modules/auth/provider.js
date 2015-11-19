'use strict';

var angular = require('angular');

module.exports = function () {

    return {

        authData: {},

        $get: function () {

            var self = this;

            return {

                getIdentity: function() {
                    return angular.copy(self.authData);
                },

                setIdentity: function(data) {
                    self.authData = data;
                },

                clearIdentity: function() {
                    self.authData = {};
                },

                hasIdentity: function() {
                    return self.authData.email ? true : false;
                }
            };
        }
    }
};