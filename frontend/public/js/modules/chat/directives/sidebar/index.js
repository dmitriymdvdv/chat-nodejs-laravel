'use strict';

module.exports = function() {
    return {
        restrict: 'AE',
        template: require('./sidebar.html'),
        controller: ['$scope', function($scope) {
        }]
    }
};