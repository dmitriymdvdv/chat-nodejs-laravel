'use strict';

module.exports = function() {
    return {
        restrict: 'AE',
        template: require('./messageContainer.html'),
        controller: require('./controller')
    }
};