'use strict';

var angular = require('angular');

module.exports = function () {

    return {

        authData: {},

        $get: function () {

            var self = this;

            return {

                getIdentity: function () {
                    return self.authData
                }
            };
        }
    }
};