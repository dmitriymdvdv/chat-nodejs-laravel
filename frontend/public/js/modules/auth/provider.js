'use strict';

var angular = require('angular');

module.exports = function () {

    return {

        authData: {},

        setCookie: function () {
            // document.cookie = 'Json Token';
        },

        deleteAllCookies: function () {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },

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