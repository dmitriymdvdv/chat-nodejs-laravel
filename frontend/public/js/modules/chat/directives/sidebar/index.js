'use strict';

module.exports = function() {
    return {
        restrict: 'AE',
        controller: 'SideBarController',
        template: require('./sidebar.html')
    }
};