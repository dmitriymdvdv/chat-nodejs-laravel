'use strict';

var angular = require('angular');

angular
    .module('Settings')
    .constant('appSettings', {
        apiUrl: 'http://localhost/api/v1/',
        port: 80
    });