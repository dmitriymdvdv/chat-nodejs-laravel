'use strict';

var angular = require('angular');

module.exports = function () {

    return {

        authData: {},

        $get: function () {

            var self = this;

            return {

                getIdentity: function() {
                    angular.copy(self.authData, data);
                    return data;
                },

                setIdentity: function(data) {
                    self.authData = data;
                },

                clearIdentity: function() {
                    self.authData = {};
                },

                hasIdentity: function() {
                    return self.authData.id ? true : false;
                }
            };
        }
    }
};